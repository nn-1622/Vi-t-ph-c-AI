import React, { useState, useEffect } from 'react';
import { Sparkles, Download, RefreshCw, Wand2, Image as ImageIcon, Sliders, Check, ExternalLink, CornerDownLeft, Eye, Palette } from 'lucide-react';

interface AiImageStudioProps {
  selectedGarmentName: string;
  selectedColorName: string;
  selectedOccasionName: string;
  selectedPantsName?: string;
  onSelectGarmentByName?: (name: string) => void;
}

interface GeneratedImageItem {
  id: string;
  url: string;
  prompt: string;
  garmentName: string;
  colorName: string;
  timestamp: string;
  isEdited?: boolean;
}

export const AiImageStudio: React.FC<AiImageStudioProps> = ({
  selectedGarmentName,
  selectedColorName,
  selectedOccasionName,
  selectedPantsName = 'Trắng Ngà / Bạch',
}) => {
  const [aspectRatio, setAspectRatio] = useState<'3:4' | '1:1' | '16:9'>('3:4');
  const [activePrompt, setActivePrompt] = useState<string>('');
  const [editPrompt, setEditPrompt] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentImage, setCurrentImage] = useState<GeneratedImageItem | null>(null);
  const [gallery, setGallery] = useState<GeneratedImageItem[]>([]);
  const [selectedScenePreset, setSelectedScenePreset] = useState<string>('hue');

  // Auto-compose detailed authentic prompt whenever selected garment or color changes
  useEffect(() => {
    const sceneDescriptions: Record<string, string> = {
      hue: 'trong sân đình Cố đô Huế rêu phong cổ kính, ánh sáng tự nhiên dịu nhẹ buổi ban mai',
      hoian: 'trên cầu ngói phố cổ Hội An về đêm lung linh ánh đèn lồng lụa vàng ấm áp',
      truong: 'giữa sân trường rợp bóng cây cổ thụ mùa thu, lá vàng rơi nhẹ nhàng, phong thái thanh xuân',
      sen: 'bên bờ đầm sen ngát hương mùa hạ, phản chiếu mặt nước trong xanh, cánh sen hồng e ấp',
      street: 'trên đường phố hiện đại phong cách street-style tao nhã, giao thoa truyền thống và đương đại',
    };

    const sceneText = sceneDescriptions[selectedScenePreset] || sceneDescriptions.hue;

    const basePrompt = `Bức ảnh chụp nghệ thuật tuyệt đẹp của người mẫu Việt Nam mặc ${selectedGarmentName} màu ${selectedColorName}, quần lụa ${selectedPantsName}, khuy vàng ánh kim, phong thái đoan trang đài các, đứng ${sceneText}, ánh sáng tự nhiên chân thực, sắc nét 8k, phong cách lookbook thời trang di sản cao cấp.`;

    setActivePrompt(basePrompt);
  }, [selectedGarmentName, selectedColorName, selectedPantsName, selectedScenePreset]);

  // Initial generation on first mount
  useEffect(() => {
    if (gallery.length === 0 && !currentImage) {
      handleGenerateImage();
    }
  }, [selectedGarmentName]);

  const handleGenerateImage = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/gemini/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: activePrompt,
          garmentName: selectedGarmentName,
          color: selectedColorName,
          occasion: selectedOccasionName,
          aspectRatio,
        }),
      });

      const data = await res.json();
      if (data.success && data.imageUrl) {
        const newItem: GeneratedImageItem = {
          id: `img-${Date.now()}`,
          url: data.imageUrl,
          prompt: data.prompt || activePrompt,
          garmentName: selectedGarmentName,
          colorName: selectedColorName,
          timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        };
        setCurrentImage(newItem);
        setGallery((prev) => [newItem, ...prev.slice(0, 5)]);
      }
    } catch (err) {
      console.error('Image generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleEditImage = async () => {
    if (!editPrompt.trim() || !currentImage) return;
    setIsEditing(true);
    try {
      const res = await fetch('/api/gemini/edit-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: editPrompt,
          imageBase64: currentImage.url,
          garmentName: selectedGarmentName,
          color: selectedColorName,
        }),
      });

      const data = await res.json();
      if (data.success && data.imageUrl) {
        const editedItem: GeneratedImageItem = {
          id: `edit-${Date.now()}`,
          url: data.imageUrl,
          prompt: `${currentImage.prompt} + [Sửa: ${editPrompt}]`,
          garmentName: selectedGarmentName,
          colorName: selectedColorName,
          timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
          isEdited: true,
        };
        setCurrentImage(editedItem);
        setGallery((prev) => [editedItem, ...prev.slice(0, 5)]);
        setEditPrompt('');
      }
    } catch (err) {
      console.error('Image edit error:', err);
    } finally {
      setIsEditing(false);
    }
  };

  const handleDownload = () => {
    if (!currentImage) return;
    const a = document.createElement('a');
    a.href = currentImage.url;
    a.download = `viet-phuc-${selectedGarmentName.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const scenePresets = [
    { id: 'hue', name: '🏛️ Cố Đô Huế Cổ Kính', desc: 'Sân đình rêu phong, mái ngói cổ kính' },
    { id: 'hoian', name: '🏮 Phố Cổ Hội An', desc: 'Đèn lồng lung linh, phố đêm ấm áp' },
    { id: 'truong', name: '🎓 Sân Trường Kỷ Yếu', desc: 'Mùa thu thanh xuân rợp bóng cây' },
    { id: 'sen', name: '🪷 Đầm Sen Mùa Hạ', desc: 'Hồ sen ngát hương, nước trong xanh' },
    { id: 'street', name: '🌆 Đường Phố Hiện Đại', desc: 'High-street đương đại giao thoa di sản' },
  ];

  return (
    <div id="ai-image-studio" className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-7 shadow-sm text-left space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-rose-100 text-rose-950 border border-rose-300 flex items-center">
              <Sparkles className="w-3.5 h-3.5 mr-1 text-rose-700" />
              Tạo Ảnh Áo Dài AI (Gemini)
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-100 border border-stone-200 text-stone-600 font-bold">
              Theo Đúng Mẫu Được Chọn
            </span>
          </div>
          <h2 className="font-serif-vi text-xl sm:text-2xl font-bold text-stone-900 mt-1">
            Studio Ảnh Chân Thực Cho {selectedGarmentName}
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Dùng trí tuệ nhân tạo tạo ra bức ảnh nhiếp ảnh nghệ thuật chân thực theo đúng mẫu áo và màu sắc bạn đang chọn.
          </p>
        </div>

        {/* Current Active Garment Tag */}
        <div className="bg-[#FAF8F5] p-3 rounded-2xl border border-amber-200/80 flex items-center space-x-3 shrink-0">
          <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-lg">
            👘
          </div>
          <div className="text-xs">
            <strong className="block text-stone-900">{selectedGarmentName}</strong>
            <span className="text-amber-800 font-semibold">{selectedColorName}</span>
          </div>
        </div>
      </div>

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Image Display Stage */}
        <div className="lg:col-span-6 flex flex-col items-center space-y-3">
          <div
            className={`w-full max-w-md bg-stone-100 rounded-3xl overflow-hidden border-2 border-stone-200 relative shadow-sm flex items-center justify-center transition-all ${
              aspectRatio === '1:1'
                ? 'aspect-square'
                : aspectRatio === '16:9'
                ? 'aspect-video'
                : 'aspect-[3/4]'
            }`}
          >
            {isGenerating ? (
              <div className="p-8 text-center space-y-3">
                <RefreshCw className="w-10 h-10 text-rose-700 animate-spin mx-auto" />
                <h4 className="font-serif-vi font-bold text-stone-900 text-base">
                  Gemini đang vẽ ảnh chân thực...
                </h4>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Đang tái hiện nếp vải lụa, khuy vàng ngũ thân và bối cảnh ánh sáng tự nhiên.
                </p>
              </div>
            ) : currentImage ? (
              <div className="w-full h-full relative group">
                <img
                  src={currentImage.url}
                  alt={currentImage.prompt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-3xl select-none"
                />
                {/* Floating overlay actions on hover */}
                <div className="absolute top-3 right-3 flex items-center space-x-2 bg-stone-900/60 p-1.5 rounded-2xl backdrop-blur-xs opacity-90 transition-all">
                  <button
                    onClick={handleDownload}
                    className="p-1.5 rounded-xl bg-white/90 hover:bg-white text-stone-800 text-xs font-bold transition-all cursor-pointer shadow-xs"
                    title="Tải ảnh về máy"
                  >
                    <Download className="w-4 h-4 text-stone-800" />
                  </button>
                </div>

                {/* Bottom Prompt Tag */}
                <div className="absolute bottom-3 inset-x-3 bg-stone-900/70 backdrop-blur-sm p-2.5 rounded-2xl text-white text-[11px] leading-tight">
                  <span className="font-bold block text-amber-300">
                    {currentImage.garmentName} • {currentImage.colorName}
                  </span>
                  <span className="line-clamp-2 text-stone-200 text-[10px] mt-0.5">
                    {currentImage.prompt}
                  </span>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-stone-400 space-y-2">
                <ImageIcon className="w-12 h-12 text-stone-300 mx-auto" />
                <p className="text-xs">Chưa có ảnh nào được tạo</p>
              </div>
            )}
          </div>

          {/* Quick Actions for Current Image */}
          {currentImage && (
            <div className="w-full max-w-md flex items-center justify-between gap-2">
              <button
                onClick={handleDownload}
                className="flex-1 py-2 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs border border-stone-300 transition-all flex items-center justify-center space-x-1.5 cursor-pointer shadow-2xs"
              >
                <Download className="w-3.5 h-3.5 text-stone-700" />
                <span>Tải ảnh chất lượng cao</span>
              </button>

              <button
                onClick={handleGenerateImage}
                disabled={isGenerating}
                className="py-2 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-900 font-bold text-xs border border-rose-300 transition-all flex items-center space-x-1 cursor-pointer shadow-2xs"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-rose-700 ${isGenerating ? 'animate-spin' : ''}`} />
                <span>Vẽ lại mẫu này</span>
              </button>
            </div>
          )}

          {/* Gallery of this session */}
          {gallery.length > 1 && (
            <div className="w-full max-w-md pt-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1.5">
                Các ảnh đã tạo gần đây:
              </span>
              <div className="flex items-center space-x-2 overflow-x-auto pb-1">
                {gallery.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCurrentImage(item)}
                    className={`w-14 h-18 rounded-xl overflow-hidden border-2 shrink-0 cursor-pointer transition-all ${
                      currentImage?.id === item.id ? 'border-amber-600 ring-2 ring-amber-300' : 'border-stone-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={item.url} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Prompt Customizer & Image Edit */}
        <div className="lg:col-span-6 space-y-5">
          {/* 1. Chọn bối cảnh chụp ảnh (Scene Presets) */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-amber-900 block">
              1. Chọn bối cảnh chụp ảnh:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {scenePresets.map((scene) => {
                const isSelected = selectedScenePreset === scene.id;
                return (
                  <button
                    key={scene.id}
                    type="button"
                    onClick={() => setSelectedScenePreset(scene.id)}
                    className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-100/90 border-amber-600 text-amber-950 font-bold shadow-2xs'
                        : 'bg-stone-50/70 border-stone-200 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    <span className="text-xs block">{scene.name}</span>
                    <span className="text-[10px] text-stone-500 font-normal block mt-0.5">{scene.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Tùy chỉnh câu lệnh tạo ảnh (Prompt) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-amber-900 block">
                2. Lời nhắc tạo ảnh chi tiết:
              </label>
              {/* Aspect Ratio Selector */}
              <div className="flex items-center space-x-1 text-xs">
                {(['3:4', '1:1', '16:9'] as const).map((ratio) => (
                  <button
                    key={ratio}
                    onClick={() => setAspectRatio(ratio)}
                    className={`px-2 py-0.5 rounded-lg border text-[10px] font-bold cursor-pointer transition-all ${
                      aspectRatio === ratio
                        ? 'bg-amber-800 text-white border-amber-900'
                        : 'bg-stone-100 text-stone-600 border-stone-200 hover:bg-stone-200'
                    }`}
                  >
                    {ratio}
                  </button>
                ))}
              </div>
            </div>

            <textarea
              rows={3}
              value={activePrompt}
              onChange={(e) => setActivePrompt(e.target.value)}
              className="w-full text-xs p-3 rounded-2xl border border-stone-300 bg-stone-50 focus:bg-white focus:outline-none focus:border-rose-500 text-stone-800 leading-relaxed font-mono"
            />

            <button
              onClick={handleGenerateImage}
              disabled={isGenerating}
              className="w-full py-3 px-5 rounded-2xl bg-gradient-to-r from-rose-800 via-amber-800 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white font-bold text-xs shadow-md transition-all active:scale-95 disabled:opacity-50 cursor-pointer flex items-center justify-center space-x-2"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Đang vẽ ảnh với Gemini...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" />
                  <span>Tạo Ảnh Ngay Theo Mẫu Này</span>
                </>
              )}
            </button>
          </div>

          {/* 3. Chỉnh sửa ảnh bằng lời nhắc (Edit Image Feature) */}
          <div className="space-y-2 pt-3 border-t border-stone-100">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-stone-800">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Chỉnh sửa bức ảnh vừa tạo bằng câu lệnh:</span>
            </div>
            <p className="text-[11px] text-stone-500">
              Nhập yêu cầu để thêm bớt chi tiết, đổi ánh sáng hoặc phụ kiện mà không làm mất phom áo.
            </p>

            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={editPrompt}
                onChange={(e) => setEditPrompt(e.target.value)}
                placeholder="Ví dụ: 'Thêm hoa sen trắng trên tay', 'Chuyển sang hoàng hôn vàng'..."
                className="flex-1 text-xs p-2.5 rounded-xl border border-stone-300 bg-stone-50 focus:bg-white focus:outline-none focus:border-amber-600"
              />
              <button
                onClick={handleEditImage}
                disabled={isEditing || !editPrompt.trim() || !currentImage}
                className="px-4 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-700 text-white text-xs font-bold transition-all disabled:opacity-50 cursor-pointer flex items-center space-x-1 shrink-0"
              >
                {isEditing ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <CornerDownLeft className="w-3.5 h-3.5" />
                )}
                <span>Sửa ảnh</span>
              </button>
            </div>

            {/* Quick edit prompt hints */}
            <div className="flex flex-wrap gap-1 pt-1">
              {[
                'Thêm chiếc nón lá cầm tay',
                'Chuyển sang ánh chiều tà hoàng hôn',
                'Thêm hoa sen nở quanh hồ',
              ].map((hint, idx) => (
                <button
                  key={idx}
                  onClick={() => setEditPrompt(hint)}
                  className="text-[10px] px-2 py-0.5 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-600 border border-stone-200 transition-all cursor-pointer"
                >
                  + {hint}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { UserPreferences, CatalogItem, OccasionOption, StyleVibeOption, ColorOption } from '../types';
import { CATALOG_ITEMS, OCCASIONS, STYLE_VIBES, COLOR_OPTIONS } from '../data/culturalDatabase';
import { Sparkles, Shirt, Calendar, Palette, Wand2, Info, Check, RefreshCw, AlertCircle, Eye } from 'lucide-react';

interface StylingFormProps {
  onSubmit: (preferences: UserPreferences) => void;
  isLoading: boolean;
  selectedGarmentId: string;
  onSelectGarmentId: (id: string) => void;
  selectedColors: string[];
  onSelectColors: (colors: string[]) => void;
  selectedPantsColor: string;
  onSelectPantsColor: (hex: string) => void;
  selectedAccessories: string[];
  onSelectAccessories: (accs: string[]) => void;
}

export const StylingForm: React.FC<StylingFormProps> = ({
  onSubmit,
  isLoading,
  selectedGarmentId,
  onSelectGarmentId,
  selectedColors,
  onSelectColors,
  selectedPantsColor,
  onSelectPantsColor,
  selectedAccessories,
  onSelectAccessories,
}) => {
  const [startingPoint, setStartingPoint] = useState<'garment' | 'occasion'>('garment');
  const [selectedOccasionId, setSelectedOccasionId] = useState<string>('ngay-hoi-truong');
  const [selectedStyleVibe, setSelectedStyleVibe] = useState<string>('toi-gian');
  const [customStyle, setCustomStyle] = useState<string>('');
  const [allowAiAccessories, setAllowAiAccessories] = useState<boolean>(true);
  const [customRequest, setCustomRequest] = useState<string>('');

  const garments = CATALOG_ITEMS.filter((i) => i.role === 'main_garment');
  const accessories = CATALOG_ITEMS.filter((i) => i.role === 'accessory' || i.role === 'footwear' || i.role === 'layer');

  const toggleColor = (colorName: string) => {
    if (selectedColors.includes(colorName)) {
      if (selectedColors.length > 1) {
        onSelectColors(selectedColors.filter((c) => c !== colorName));
      }
    } else {
      if (selectedColors.length < 3) {
        onSelectColors([...selectedColors, colorName]);
      }
    }
  };

  const toggleAccessory = (accName: string) => {
    if (selectedAccessories.includes(accName)) {
      onSelectAccessories(selectedAccessories.filter((a) => a !== accName));
    } else {
      onSelectAccessories([...selectedAccessories, accName]);
    }
  };

  const handleApplyQuickPrompt = (promptText: string) => {
    setCustomRequest(promptText);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const prefs: UserPreferences = {
      startingPoint,
      garmentId: selectedGarmentId,
      occasionId: selectedOccasionId,
      styleVibe: selectedStyleVibe,
      customStyleVibe: customStyle,
      selectedColors,
      selectedAccessories,
      allowAiAccessories,
      customRequest: customRequest.trim().slice(0, 200),
    };
    onSubmit(prefs);
  };

  return (
    <form onSubmit={handleSubmit} id="styling-form" className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-8 shadow-sm space-y-8 text-left">
      <div className="border-b border-stone-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="font-serif-vi text-xl sm:text-2xl font-bold text-stone-900 flex items-center">
            <span>Tùy Chọn Phối Đồ & Thay Đổi Trực Tiếp Mô Hình 3D</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Mỗi khi bạn chọn một mẫu áo hoặc màu sắc, mô hình 3D ở phía trên sẽ cập nhật ngay tức thì!
          </p>
        </div>
        <div className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 shrink-0 flex items-center self-start sm:self-auto">
          <Eye className="w-3.5 h-3.5 mr-1 text-amber-600" />
          <span>Xem trực tiếp trên 3D phía trên</span>
        </div>
      </div>

      {/* 1. CHỌN MẪU ÁO CỔ PHỤC (THAY ĐỔI 3D TRỰC TIẾP) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center">
            <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center mr-2 text-xs font-mono">1</span>
            Chọn mẫu trang phục (Mô hình 3D đổi trực tiếp)
          </label>
          <span className="text-[11px] text-stone-500 font-medium">Bấm vào mẫu để ướm thử 3D</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {garments.map((g) => {
            const isSelected = selectedGarmentId === g.id;
            const isVerified = g.demoStatus === 'verified';
            return (
              <div
                key={g.id}
                onClick={() => onSelectGarmentId(g.id)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between text-left ${
                  isSelected
                    ? 'bg-amber-50/95 border-amber-600 ring-2 ring-amber-400 shadow-xs'
                    : 'bg-stone-50/60 border-stone-200 hover:border-amber-400 hover:bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-2xl">{g.imageOrIcon}</span>
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${
                        isVerified
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : 'bg-amber-50 text-amber-800 border-amber-300'
                      }`}
                    >
                      {isVerified ? '✓ Đã có nguồn' : 'Minh họa'}
                    </span>
                  </div>
                  <h4 className="font-serif-vi text-sm sm:text-base font-bold text-stone-900">{g.name}</h4>
                  <p className="text-xs text-stone-600 mt-1 line-clamp-2 leading-relaxed">
                    {g.description}
                  </p>
                </div>

                <div className="mt-2.5 pt-2 border-t border-stone-200/80 flex items-center justify-between text-[10px] text-stone-500">
                  <span className="truncate">{g.historicalPeriod}</span>
                  {isSelected ? (
                    <span className="font-bold text-amber-800 flex items-center bg-amber-200/80 px-2 py-0.5 rounded-full text-[10px]">
                      <Check className="w-3 h-3 mr-0.5" /> Đang hiển thị 3D
                    </span>
                  ) : (
                    <span className="text-stone-400 font-medium">Bấm để xem 3D</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. CHỌN MÀU SẮC TÀ ÁO & QUẦN LỤA (THAY ĐỔI 3D TRỰC TIẾP) */}
      <div className="space-y-4 pt-2 border-t border-stone-100">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center">
            <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center mr-2 text-xs font-mono">2</span>
            Màu sắc tà áo ngoài & Quần lụa (Đổi màu 3D ngay)
          </label>
          <span className="text-[11px] text-stone-500 font-medium">Màu áo: {selectedColors.join(', ')}</span>
        </div>

        {/* Outer Gown Color Swatches */}
        <div>
          <span className="text-xs font-bold text-stone-700 block mb-2">
            Màu tà áo ngoài (chọn màu chính để đổi áo trên mô hình 3D):
          </span>
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2">
            {COLOR_OPTIONS.map((col) => {
              const isSelected = selectedColors.includes(col.name);
              return (
                <button
                  key={col.id}
                  type="button"
                  onClick={() => toggleColor(col.name)}
                  className={`p-2 rounded-xl border flex flex-col items-center justify-center space-y-1.5 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white border-amber-600 ring-2 ring-amber-400 shadow-2xs'
                      : 'bg-stone-50/60 border-stone-200 hover:bg-white'
                  }`}
                >
                  <span
                    className="w-6 h-6 rounded-full border border-stone-300 shadow-2xs block"
                    style={{ backgroundColor: col.hex }}
                  />
                  <span className="text-[10px] text-stone-800 text-center font-bold truncate max-w-full">
                    {col.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Inner Silk Pants Color Swatches */}
        <div className="pt-2">
          <span className="text-xs font-bold text-stone-700 block mb-2">
            Màu quần lụa bên trong (Đổi màu quần trên 3D):
          </span>
          <div className="grid grid-cols-3 gap-2 max-w-md">
            {[
              { name: 'Trắng Ngà / Bạch', hex: '#ffffff' },
              { name: 'Huyền Đen Tuyết', hex: '#1c1917' },
              { name: 'Vàng Tơ Tằm', hex: '#fef08a' },
            ].map((p) => {
              const isSelected = selectedPantsColor.toLowerCase() === p.hex.toLowerCase();
              return (
                <button
                  key={p.hex}
                  type="button"
                  onClick={() => onSelectPantsColor(p.hex)}
                  className={`p-2 rounded-xl border flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white border-amber-600 ring-2 ring-amber-300 shadow-2xs font-bold'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <span
                    className="w-4 h-4 rounded-full border border-stone-300 shadow-2xs"
                    style={{ backgroundColor: p.hex }}
                  />
                  <span className="text-xs">{p.name.split('/')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. DỊP SỬ DỤNG */}
      <div className="space-y-3 pt-2 border-t border-stone-100">
        <label className="text-xs font-bold uppercase tracking-wider text-amber-900 block flex items-center">
          <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center mr-2 text-xs font-mono">3</span>
          Dịp sử dụng (Hoàn cảnh cần mặc)
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {OCCASIONS.map((occ) => {
            const isSelected = selectedOccasionId === occ.id;
            return (
              <div
                key={occ.id}
                onClick={() => setSelectedOccasionId(occ.id)}
                className={`p-3 rounded-2xl border cursor-pointer transition-all text-left flex items-start space-x-3 ${
                  isSelected
                    ? 'bg-rose-50/80 border-rose-500 ring-2 ring-rose-200 shadow-xs'
                    : 'bg-stone-50/60 border-stone-200 hover:border-stone-400 hover:bg-white'
                }`}
              >
                <span className="text-2xl p-1 bg-white rounded-xl shadow-2xs border border-stone-200 shrink-0">{occ.icon}</span>
                <div className="min-w-0">
                  <h5 className="text-xs font-bold text-stone-900 truncate">{occ.name}</h5>
                  <p className="text-[11px] text-stone-500 line-clamp-2 mt-0.5">{occ.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. PHONG CÁCH MONG MUỐN */}
      <div className="space-y-3 pt-2 border-t border-stone-100">
        <label className="text-xs font-bold uppercase tracking-wider text-amber-900 block flex items-center">
          <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center mr-2 text-xs font-mono">4</span>
          Phong cách mong muốn
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {STYLE_VIBES.map((sv) => {
            const isSelected = selectedStyleVibe === sv.id;
            return (
              <button
                key={sv.id}
                type="button"
                onClick={() => setSelectedStyleVibe(sv.id)}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-100/80 border-amber-600 text-amber-950 font-bold shadow-2xs'
                    : 'bg-stone-50/60 border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <span className="text-lg block mb-1">{sv.icon}</span>
                <span className="text-xs font-bold block">{sv.name}</span>
                <span className="text-[10px] text-stone-500 line-clamp-2 mt-0.5">{sv.description}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. PHỤ KIỆN PHỐI KÈM */}
      <div className="space-y-3 pt-2 border-t border-stone-100">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center">
            <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center mr-2 text-xs font-mono">5</span>
            Phụ kiện mong muốn
          </label>
          <label className="flex items-center space-x-2 text-xs text-stone-700 cursor-pointer">
            <input
              type="checkbox"
              checked={allowAiAccessories}
              onChange={(e) => setAllowAiAccessories(e.target.checked)}
              className="rounded text-amber-700 focus:ring-amber-500 w-4 h-4 cursor-pointer"
            />
            <span className="font-semibold text-amber-900">Cho phép AI linh hoạt gợi ý phụ kiện hài hòa</span>
          </label>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {accessories.map((acc) => {
            const isSelected = selectedAccessories.includes(acc.name);
            return (
              <button
                key={acc.id}
                type="button"
                onClick={() => toggleAccessory(acc.name)}
                className={`p-2.5 rounded-xl border text-left flex items-center space-x-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-100/90 border-amber-600 font-bold text-amber-950'
                    : 'bg-stone-50/60 border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <span className="text-lg">{acc.imageOrIcon}</span>
                <span className="text-xs truncate">{acc.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 6. YÊU CẦU THÊM */}
      <div className="space-y-3 pt-2 border-t border-stone-100">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center">
            <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center mr-2 text-xs font-mono">6</span>
            Yêu cầu thêm (Tùy chọn, tối đa 200 ký tự)
          </label>
          <span className="text-[11px] text-stone-400">{customRequest.length}/200 ký tự</span>
        </div>

        <textarea
          rows={2}
          maxLength={200}
          value={customRequest}
          onChange={(e) => setCustomRequest(e.target.value)}
          placeholder="Ví dụ: 'Tôi muốn vẻ tối giản, màu xanh, đi ngày hội trường chụp ảnh cùng bạn bè'..."
          className="w-full text-xs sm:text-sm p-3 rounded-2xl border border-stone-300 bg-stone-50/50 focus:bg-white focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-500 text-stone-800 placeholder:text-stone-400"
        />

        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[11px] text-stone-500 font-semibold mr-1">Gợi ý nhanh:</span>
          {[
            'Tối giản, màu xanh chàm, chụp kỷ yếu hội trường',
            'Trang trọng, dự lễ hội truyền thống đầu năm',
            'Nhẹ nhàng thơ mộng, dạo cà phê phố cổ cuối tuần',
          ].map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleApplyQuickPrompt(prompt)}
              className="text-[11px] px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200 transition-all cursor-pointer"
            >
              + {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* SUBMIT BUTTON */}
      <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-xs text-stone-500 flex items-center">
          <Info className="w-4 h-4 text-stone-400 mr-1.5 shrink-0" />
          <span>Gemini sẽ phân tích và đề xuất tối đa 3 phương án phối đồ có căn cứ văn hóa.</span>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-800 to-rose-800 hover:from-amber-700 hover:to-rose-700 text-white font-bold text-sm shadow-md transition-all active:scale-95 disabled:opacity-50 cursor-pointer flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>AI đang phân tích & xây dựng phối đồ...</span>
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4" />
              <span>Nhờ AI Stylist Đề Xuất Phối Đồ</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

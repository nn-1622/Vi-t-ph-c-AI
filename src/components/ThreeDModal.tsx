import React, { useState } from 'react';
import { ThreeDModelViewer } from './ThreeDModelViewer';
import { COLOR_OPTIONS } from '../data/culturalDatabase';
import { X, Sparkles, Shirt, Palette, ShieldCheck, Check, Layers, Sliders } from 'lucide-react';

interface ThreeDModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialGarmentName?: string;
  initialColorHex?: string;
  initialPantsHex?: string;
  onApplyConfig?: (garmentName: string, colorHex: string, pantsHex: string) => void;
}

export const ThreeDModal: React.FC<ThreeDModalProps> = ({
  isOpen,
  onClose,
  initialGarmentName = 'Áo Ngũ Thân Tay Chẽn',
  initialColorHex = '#1e3a8a',
  initialPantsHex = '#ffffff',
  onApplyConfig,
}) => {
  const [selectedGarment, setSelectedGarment] = useState<string>(initialGarmentName);
  const [selectedColor, setSelectedColor] = useState<string>(initialColorHex);
  const [selectedPantsColor, setSelectedPantsColor] = useState<string>(initialPantsHex);
  const [sleeveType, setSleeveType] = useState<'chen' | 'thung'>(
    initialGarmentName.includes('Tấc') ? 'thung' : 'chen'
  );
  const [hasManCuon, setHasManCuon] = useState<boolean>(true);
  const [hasKiengBac, setHasKiengBac] = useState<boolean>(true);

  if (!isOpen) return null;

  const garmentOptions = [
    { name: 'Áo Ngũ Thân Tay Chẽn', sleeve: 'chen' as const },
    { name: 'Áo Tấc (Ngũ Thân Tay Thụng)', sleeve: 'thung' as const },
    { name: 'Áo Dài Truyền Thống', sleeve: 'chen' as const },
    { name: 'Áo Nhật Bình Cung Đình', sleeve: 'chen' as const },
  ];

  const handleSelectGarment = (name: string, sleeve: 'chen' | 'thung') => {
    setSelectedGarment(name);
    setSleeveType(sleeve);
  };

  const handleApply = () => {
    if (onApplyConfig) {
      onApplyConfig(selectedGarment, selectedColor, selectedPantsColor);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-stone-900/60 backdrop-blur-xs text-left animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-stone-200 max-w-5xl w-full max-h-[92vh] flex flex-col justify-between shadow-2xl overflow-hidden">
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-stone-100 flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-sm">
              3D
            </div>
            <div>
              <h3 className="font-serif-vi text-base sm:text-lg font-bold text-stone-900 flex items-center">
                <span>Phòng Thử 3D Việt Phục & Áo Dài Tương Tác</span>
                <span className="ml-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                  WebGL Real-time
                </span>
              </h3>
              <p className="text-xs text-stone-500 font-medium">
                Xoay 360°, đổi màu vải lụa gấm và kiểm tra quy thức ngũ thân trực quan.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-900 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main 2-Column Body: 3D Viewport on Left, Live Customizer on Right */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-5 p-4 sm:p-6 items-start">
          {/* Left Column: 3D Canvas */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <ThreeDModelViewer
              garmentName={selectedGarment}
              garmentColor={selectedColor}
              pantsColor={selectedPantsColor}
              sleeveType={sleeveType}
              hasManCuon={hasManCuon}
              hasKiengBac={hasKiengBac}
            />
          </div>

          {/* Right Column: Interactive Styling Controls */}
          <div className="lg:col-span-5 space-y-4">
            {/* 1. Chọn dáng trang phục */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center">
                <Shirt className="w-3.5 h-3.5 mr-1 text-amber-700" />
                Dáng áo cổ truyền:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {garmentOptions.map((opt) => {
                  const isSelected = selectedGarment === opt.name;
                  return (
                    <button
                      key={opt.name}
                      onClick={() => handleSelectGarment(opt.name, opt.sleeve)}
                      className={`p-2.5 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-amber-100/90 border-amber-600 text-amber-950 shadow-2xs'
                          : 'bg-stone-50/70 border-stone-200 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      <span>{opt.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Đổi màu tà áo ngoài */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center">
                  <Palette className="w-3.5 h-3.5 mr-1 text-rose-700" />
                  Màu sắc tà áo ngoài:
                </label>
                <span className="text-[11px] text-stone-500 font-mono font-semibold">{selectedColor}</span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {COLOR_OPTIONS.map((c) => {
                  const isSelected = selectedColor.toLowerCase() === c.hex.toLowerCase();
                  return (
                    <button
                      key={c.id}
                      onClick={() => setSelectedColor(c.hex)}
                      className={`p-2 rounded-xl border flex flex-col items-center justify-center space-y-1 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-white border-amber-600 ring-2 ring-amber-400 shadow-2xs'
                          : 'bg-stone-50 border-stone-200 hover:bg-white'
                      }`}
                      title={c.name}
                    >
                      <span
                        className="w-5 h-5 rounded-full border border-stone-300 shadow-2xs"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span className="text-[9px] font-bold text-stone-700 truncate max-w-full">
                        {c.name.split('/')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Màu sắc quần lụa */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-amber-900 block">
                Màu quần lụa bên trong:
              </label>
              <div className="flex items-center space-x-2">
                {[
                  { name: 'Trắng Ngà / Bạch', hex: '#ffffff' },
                  { name: 'Huyền Đen Tuyết', hex: '#1c1917' },
                  { name: 'Vàng Tơ Tằm', hex: '#fef08a' },
                ].map((p) => {
                  const isSelected = selectedPantsColor.toLowerCase() === p.hex.toLowerCase();
                  return (
                    <button
                      key={p.hex}
                      onClick={() => setSelectedPantsColor(p.hex)}
                      className={`flex-1 p-2 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
                        isSelected
                          ? 'bg-white border-amber-600 ring-2 ring-amber-300 shadow-2xs'
                          : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-stone-300"
                        style={{ backgroundColor: p.hex }}
                      />
                      <span className="truncate">{p.name.split('/')[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Tùy chọn phụ kiện 3D */}
            <div className="space-y-2 pt-1 border-t border-stone-100">
              <label className="text-xs font-bold uppercase tracking-wider text-amber-900 block">
                Phụ kiện hiển thị trên mô hình 3D:
              </label>
              <div className="space-y-2">
                <label className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 border border-stone-200 cursor-pointer">
                  <span className="text-xs font-semibold text-stone-800">Mấn gấm cuộn (Đầu)</span>
                  <input
                    type="checkbox"
                    checked={hasManCuon}
                    onChange={(e) => setHasManCuon(e.target.checked)}
                    className="rounded text-amber-700 w-4 h-4 cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 border border-stone-200 cursor-pointer">
                  <span className="text-xs font-semibold text-stone-800">Kiềng bạc hoa sen (Cổ)</span>
                  <input
                    type="checkbox"
                    checked={hasKiengBac}
                    onChange={(e) => setHasKiengBac(e.target.checked)}
                    className="rounded text-amber-700 w-4 h-4 cursor-pointer"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action Footer */}
        <div className="p-4 sm:p-5 border-t border-stone-100 bg-[#FAF8F5] flex items-center justify-between">
          <div className="text-xs text-stone-500 hidden sm:block">
            Mô hình WebGL 3D được dựng thời gian thực trên công nghệ Three.js, tối ưu nhẹ và siêu mượt trên điện thoại.
          </div>

          <div className="flex items-center space-x-2 ml-auto">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold cursor-pointer transition-all"
            >
              Đóng lại
            </button>
            <button
              onClick={handleApply}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-800 to-rose-800 hover:from-amber-700 hover:to-rose-700 text-white text-xs font-bold shadow-xs cursor-pointer transition-all flex items-center space-x-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Áp dụng vào bản phối</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

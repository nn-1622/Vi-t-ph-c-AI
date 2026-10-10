import React, { useState } from 'react';
import { OutfitConfig, Garment, Accessory, ColorItem, EventContext, CityWeather } from '../types';
import { GARMENTS, ACCESSORIES, COLOR_PALETTE, EVENTS, CITIES_WEATHER, AVATARS } from '../data/mockData';
import { Shirt, Palette, Sparkles, MapPin, User, Upload, Check, Info, Compass } from 'lucide-react';

interface SelectorPanelProps {
  config: OutfitConfig;
  onChangeConfig: (newConfig: Partial<OutfitConfig>) => void;
  activeSubTab: 'garment' | 'color' | 'accessory' | 'weather' | 'avatar';
  setActiveSubTab: (tab: 'garment' | 'color' | 'accessory' | 'weather' | 'avatar') => void;
}

export const SelectorPanel: React.FC<SelectorPanelProps> = ({
  config,
  onChangeConfig,
  activeSubTab,
  setActiveSubTab,
}) => {
  const [selectedColorType, setSelectedColorType] = useState<'ngu-hanh' | 'genz-trend'>('ngu-hanh');
  const [colorTarget, setColorTarget] = useState<'outer' | 'pants'>('outer');
  const [accessoryCategory, setAccessoryCategory] = useState<string>('all');

  const selectedGarment = GARMENTS.find((g) => g.id === config.garmentId) || GARMENTS[0];

  const handleAccessoryToggle = (accId: string) => {
    const exists = config.selectedAccessories.includes(accId);
    let next: string[];
    if (exists) {
      next = config.selectedAccessories.filter((id: string) => id !== accId);
    } else {
      next = [...config.selectedAccessories, accId];
    }
    onChangeConfig({ selectedAccessories: next });
  };

  const handleCustomAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onChangeConfig({ customAvatarUrl: event.target.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredAccessories = accessoryCategory === 'all'
    ? ACCESSORIES
    : ACCESSORIES.filter((a) => a.category === accessoryCategory);

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-amber-200/80 p-4 sm:p-5 shadow-sm">
      {/* Sub-tab Navigation */}
      <div className="flex items-center space-x-1 sm:space-x-1.5 border-b border-stone-200 pb-3 mb-4 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveSubTab('garment')}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            activeSubTab === 'garment'
              ? 'bg-amber-100 text-amber-900 border border-amber-300 shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <Shirt className="w-3.5 h-3.5 text-amber-600" />
          <span>1. Trang Phục</span>
        </button>

        <button
          onClick={() => setActiveSubTab('color')}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            activeSubTab === 'color'
              ? 'bg-rose-100 text-rose-900 border border-rose-300 shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <Palette className="w-3.5 h-3.5 text-rose-600" />
          <span>2. Màu & Họa Tiết</span>
        </button>

        <button
          onClick={() => setActiveSubTab('accessory')}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            activeSubTab === 'accessory'
              ? 'bg-purple-100 text-purple-900 border border-purple-300 shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
          <span>3. Phụ Kiện Remix</span>
        </button>

        <button
          onClick={() => setActiveSubTab('weather')}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            activeSubTab === 'weather'
              ? 'bg-sky-100 text-sky-900 border border-sky-300 shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <MapPin className="w-3.5 h-3.5 text-sky-600" />
          <span>4. Sự Kiện & Vùng Miền</span>
        </button>

        <button
          onClick={() => setActiveSubTab('avatar')}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            activeSubTab === 'avatar'
              ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <User className="w-3.5 h-3.5 text-emerald-600" />
          <span>5. Người Mẫu & Tải Ảnh</span>
        </button>
      </div>

      {/* Tab 1: Trang Phục & Lịch Sử Văn Hóa */}
      {activeSubTab === 'garment' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-800">
              Chọn Cổ Phục / Dáng Áo Truyền Thống:
            </span>
            <span className="text-[11px] text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
              {GARMENTS.length} mẫu tiêu biểu
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1">
            {GARMENTS.map((g) => {
              const isSelected = g.id === config.garmentId;
              return (
                <div
                  key={g.id}
                  onClick={() => onChangeConfig({ garmentId: g.id, outerColor: g.defaultColor, innerPantsColor: g.defaultPantsColor })}
                  className={`cursor-pointer rounded-xl p-3.5 border transition-all text-left relative overflow-hidden group ${
                    isSelected
                      ? 'bg-amber-50/90 border-amber-500 shadow-sm ring-2 ring-amber-300/60'
                      : 'bg-stone-50/70 border-stone-200 hover:border-amber-300 hover:bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">
                        {g.dynasty}
                      </span>
                      <h4 className="font-serif-vi text-sm sm:text-base font-bold text-stone-900 mt-0.5">
                        {g.name}
                      </h4>
                    </div>
                    <span className="px-2 py-0.5 text-[9px] font-bold rounded-full bg-rose-100 text-rose-800 border border-rose-200">
                      {g.tag}
                    </span>
                  </div>

                  <p className="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed">
                    {g.description}
                  </p>

                  <div className="mt-3 pt-2 border-t border-stone-200 flex items-center justify-between text-[11px] text-stone-500">
                    <span className="truncate max-w-[200px] font-medium">📍 {g.recommendedOccasion}</span>
                    {isSelected && (
                      <span className="flex items-center text-amber-700 font-bold text-xs ml-1">
                        <Check className="w-3.5 h-3.5 mr-0.5 text-amber-600" /> Đã Chọn
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Deep Cultural Detail Box for Selected Garment */}
          <div className="mt-2 bg-amber-50/70 border border-amber-300/80 rounded-xl p-3.5 text-left">
            <div className="flex items-center space-x-2 text-amber-900 text-xs font-bold mb-1">
              <Compass className="w-4 h-4 text-amber-700" />
              <span>Ý Nghĩa Cổ Phong & Cấu Trúc: {selectedGarment.name}</span>
            </div>
            <p className="text-xs text-stone-700 leading-relaxed">
              <strong className="text-amber-900">Bản sắc di sản: </strong>
              {selectedGarment.heritageMeaning}
            </p>
            <p className="text-xs text-stone-600 mt-1">
              <strong className="text-stone-800">Quy cách cắt may: </strong>
              {selectedGarment.cutStructure}
            </p>
          </div>
        </div>
      )}

      {/* Tab 2: Màu Sắc & Ngũ Hành */}
      {activeSubTab === 'color' && (
        <div className="space-y-4">
          {/* Target toggle: Outer Robe or Inner Pants */}
          <div className="flex items-center justify-between bg-stone-100 p-1 rounded-xl border border-stone-200">
            <button
              onClick={() => setColorTarget('outer')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                colorTarget === 'outer'
                  ? 'bg-white text-stone-900 shadow-sm border border-stone-200'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Màu Áo Ngoài ({config.outerColor})
            </button>
            <button
              onClick={() => setColorTarget('pants')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                colorTarget === 'pants'
                  ? 'bg-white text-stone-900 shadow-sm border border-stone-200'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Màu Quần Lụa ({config.innerPantsColor})
            </button>
          </div>

          {/* Palette selector */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSelectedColorType('ngu-hanh')}
              className={`px-3 py-1 text-xs rounded-lg font-bold transition-all ${
                selectedColorType === 'ngu-hanh'
                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              Ngũ Hành Cung Đình (Tương Sinh)
            </button>
            <button
              onClick={() => setSelectedColorType('genz-trend')}
              className={`px-3 py-1 text-xs rounded-lg font-bold transition-all ${
                selectedColorType === 'genz-trend'
                  ? 'bg-rose-100 text-rose-900 border border-rose-300'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              Bảng Màu Gen Z Trending
            </button>
          </div>

          {/* Swatches Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[220px] overflow-y-auto pr-1">
            {COLOR_PALETTE.filter((c) => c.palettesType === selectedColorType).map((col) => {
              const currentColor = colorTarget === 'outer' ? config.outerColor : config.innerPantsColor;
              const isSelected = currentColor.toLowerCase() === col.hex.toLowerCase();

              return (
                <div
                  key={col.id}
                  onClick={() => {
                    if (colorTarget === 'outer') {
                      onChangeConfig({ outerColor: col.hex });
                    } else {
                      onChangeConfig({ innerPantsColor: col.hex });
                    }
                  }}
                  className={`flex items-center space-x-2.5 p-2 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-300 shadow-sm'
                      : 'bg-stone-50 border-stone-200 hover:bg-white hover:border-stone-400'
                  }`}
                >
                  <div
                    className="w-8 h-8 rounded-lg shadow-inner border border-stone-300 shrink-0"
                    style={{ backgroundColor: col.hex }}
                  />
                  <div className="overflow-hidden text-left">
                    <span className="text-xs font-bold text-stone-800 block truncate">
                      {col.name}
                    </span>
                    <span className="text-[10px] text-amber-800 font-mono block font-semibold">
                      Hành: {col.element}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Họa Tiết Vải Gấm Dệt Chìm */}
          <div className="pt-2 border-t border-stone-200 text-left">
            <span className="text-xs font-bold text-stone-800 block mb-2">
              Họa Tiết Gấm Dệt Chìm Truyền Thống:
            </span>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'van-may', label: 'Vân Mây Thăng Long' },
                { id: 'hoa-sen', label: 'Hoa Sen Thanh Tịnh' },
                { id: 'chim-hac', label: 'Chim Hạc Đông Sơn' },
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => onChangeConfig({ pattern: p.id as any })}
                  className={`p-2 rounded-xl text-xs font-bold border text-center transition-all ${
                    config.pattern === p.id
                      ? 'bg-amber-100 text-amber-900 border-amber-400 shadow-xs'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-white'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Phụ Kiện Remix */}
      {activeSubTab === 'accessory' && (
        <div className="space-y-4">
          <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar pb-1">
            {[
              { id: 'all', label: 'Tất Cả' },
              { id: 'headwear', label: 'Mũ & Mấn' },
              { id: 'jewelry', label: 'Trang Sức' },
              { id: 'outerwear', label: 'Khoác / Thắt Lưng' },
              { id: 'bag', label: 'Quạt & Túi' },
              { id: 'footwear', label: 'Giày & Guốc' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setAccessoryCategory(cat.id)}
                className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  accessoryCategory === cat.id
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[360px] overflow-y-auto pr-1">
            {filteredAccessories.map((acc) => {
              const isSelected = config.selectedAccessories.includes(acc.id);
              return (
                <div
                  key={acc.id}
                  onClick={() => handleAccessoryToggle(acc.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start space-x-3 text-left ${
                    isSelected
                      ? 'bg-purple-50 border-purple-400 shadow-sm ring-1 ring-purple-300'
                      : 'bg-stone-50 border-stone-200 hover:bg-white hover:border-stone-400'
                  }`}
                >
                  <div className="text-2xl p-2 rounded-xl bg-white border border-stone-200 shadow-xs shrink-0">
                    {acc.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-stone-900 truncate">{acc.name}</h4>
                      <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded font-bold bg-stone-200 text-stone-700">
                        {acc.vibe}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-600 mt-1 line-clamp-2 leading-relaxed">
                      {acc.description}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[10px] text-stone-500 font-medium">
                        {acc.category === 'footwear' ? '👟 Giày dép' : acc.category === 'bag' ? '👜 Cầm tay' : '✨ Phụ kiện'}
                      </span>
                      <span
                        className={`text-[11px] font-bold ${
                          isSelected ? 'text-purple-700' : 'text-stone-500'
                        }`}
                      >
                        {isSelected ? '✓ Đang phối' : '+ Thử phối'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 4: Bối Cảnh, Sự Kiện & Thời Tiết */}
      {activeSubTab === 'weather' && (
        <div className="space-y-4 text-left">
          <div>
            <span className="text-xs font-bold text-stone-800 block mb-2">
              1. Bối Cảnh & Sự Kiện Tham Dự:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {EVENTS.map((ev) => {
                const isSelected = config.event === ev.id;
                return (
                  <div
                    key={ev.id}
                    onClick={() => onChangeConfig({ event: ev.id })}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-sky-50 border-sky-400 ring-2 ring-sky-200 shadow-xs'
                        : 'bg-stone-50 border-stone-200 hover:border-stone-400 hover:bg-white'
                    }`}
                  >
                    <span className="text-[10px] text-sky-800 font-bold uppercase block">
                      {ev.category}
                    </span>
                    <h5 className="text-xs font-bold text-stone-900 mt-0.5">{ev.name}</h5>
                    <p className="text-[11px] text-stone-600 mt-1 line-clamp-2">
                      💡 {ev.etiquetteNote}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-2 border-t border-stone-200">
            <span className="text-xs font-bold text-stone-800 block mb-2">
              2. Địa Phương / Vùng Miền & Thời Tiết:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {CITIES_WEATHER.map((cw) => {
                const isSelected = config.city === cw.city;
                return (
                  <div
                    key={cw.city}
                    onClick={() => onChangeConfig({ city: cw.city, weather: `${cw.temp} (${cw.condition})` })}
                    className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-amber-50 border-amber-400 ring-2 ring-amber-200 shadow-xs'
                        : 'bg-stone-50 border-stone-200 hover:border-stone-400 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-stone-900">{cw.city}</span>
                      <span className="text-xs font-mono font-bold text-amber-700">{cw.temp}</span>
                    </div>
                    <span className="text-[10px] text-stone-600 block mt-1 truncate">
                      {cw.condition}
                    </span>
                    <span className="text-[10px] text-emerald-700 font-semibold block mt-1">
                      🧵 {cw.season}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Người Mẫu & Tải Ảnh Cá Nhân */}
      {activeSubTab === 'avatar' && (
        <div className="space-y-4 text-left">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-800">
              Chọn Nhân Vật Mẫu Đại Diện:
            </span>
            {config.customAvatarUrl && (
              <button
                onClick={() => onChangeConfig({ customAvatarUrl: undefined })}
                className="text-[11px] font-bold text-rose-600 hover:underline"
              >
                Gỡ ảnh cá nhân
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {AVATARS.map((av) => {
              const isSelected = !config.customAvatarUrl && config.avatarId === av.id;
              return (
                <div
                  key={av.id}
                  onClick={() => onChangeConfig({ avatarId: av.id, customAvatarUrl: undefined })}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-emerald-50 border-emerald-400 ring-2 ring-emerald-200 shadow-xs'
                      : 'bg-stone-50 border-stone-200 hover:border-stone-400 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center text-sm">
                      {av.gender === 'female' ? '👩' : '👨'}
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-stone-900">{av.name}</h5>
                      <span className="text-[10px] text-stone-500 block">{av.vibe}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 rounded-xl border border-dashed border-stone-300 bg-stone-50 text-center hover:border-amber-400 transition-all">
            <Upload className="w-6 h-6 text-amber-600 mx-auto mb-2" />
            <span className="text-xs font-bold text-stone-800 block">
              Tải Ảnh Khuôn Mặt / Chân Dung Của Bạn
            </span>
            <p className="text-[11px] text-stone-600 mt-1 max-w-xs mx-auto">
              Hệ thống sẽ tự động ghép gương mặt bạn vào người mẫu mặc Việt Phục Remix để bạn chiêm ngưỡng chân thực nhất.
            </p>
            <label className="mt-3 inline-flex items-center space-x-1.5 px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-white text-xs font-bold rounded-xl cursor-pointer transition-all shadow-xs">
              <span>Chọn ảnh từ máy</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleCustomAvatarUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

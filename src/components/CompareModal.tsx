import React from 'react';
import { OutfitConfig, Garment } from '../types';
import { GARMENTS } from '../data/mockData';
import { X, Sparkles, Check, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface CompareModalProps {
  currentConfig: OutfitConfig;
  onApplyConfig: (config: OutfitConfig) => void;
  onClose: () => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  currentConfig,
  onApplyConfig,
  onClose,
}) => {
  const currentGarment = GARMENTS.find((g) => g.id === currentConfig.garmentId) || GARMENTS[0];

  const alternativeConfig: OutfitConfig = {
    garmentId: currentConfig.garmentId === 'ao-tac' ? 'ngu-than-tay-chen' : 'ao-tac',
    outerColor: currentConfig.outerColor === '#831843' ? '#1e3a8a' : '#831843',
    innerPantsColor: '#ffffff',
    collarSide: 'right_over_left',
    pattern: 'hoa-sen',
    styleVibe: 'Gen Z Heritage Classic',
    selectedAccessories: ['man-gam', 'kieng-bac-hoa-sen', 'guoc-moc-son-mai'],
    avatarId: currentConfig.avatarId,
    event: 'le-hoi-du-xuan',
    city: 'Cố Đô Huế',
    weather: '21°C (Mưa phùn cổ kính)',
  };

  const altGarment = GARMENTS.find((g) => g.id === alternativeConfig.garmentId) || GARMENTS[1];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-4xl bg-white border border-amber-200 rounded-3xl shadow-xl p-5 sm:p-7 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200">
          <div>
            <h3 className="font-serif-vi text-lg sm:text-xl font-bold text-stone-900">
              So Sánh Các Phương Án Phối Đồ (A / B Testing)
            </h3>
            <p className="text-xs text-stone-600 mt-0.5">
              Đối chiếu chi tiết giữa 2 phong cách để lựa chọn outfit hoàn hảo nhất cho sự kiện của bạn.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Side-by-Side Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-6">
          {/* Option A: Current */}
          <div className="rounded-2xl border-2 border-amber-300 bg-amber-50/40 p-5 relative text-left shadow-2xs">
            <span className="absolute -top-3 left-4 px-3 py-0.5 rounded-full bg-amber-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-xs">
              Phương Án A (Đang Phối)
            </span>

            <div className="mt-2 space-y-3">
              <div>
                <span className="text-[10px] text-amber-800 font-bold uppercase">{currentGarment.dynasty}</span>
                <h4 className="font-serif-vi text-base font-bold text-stone-900">{currentGarment.name}</h4>
                <span className="text-xs text-rose-700 font-bold">{currentConfig.styleVibe}</span>
              </div>

              <div className="flex items-center space-x-2 text-xs">
                <span className="text-stone-600 font-medium">Bảng màu:</span>
                <span
                  className="w-5 h-5 rounded-md border border-stone-300 inline-block shadow-2xs"
                  style={{ backgroundColor: currentConfig.outerColor }}
                  title="Màu áo"
                />
                <span
                  className="w-5 h-5 rounded-md border border-stone-300 inline-block shadow-2xs"
                  style={{ backgroundColor: currentConfig.innerPantsColor }}
                  title="Màu quần"
                />
              </div>

              {/* Radar Scores */}
              <div className="space-y-2 pt-2 border-t border-amber-200 text-xs">
                <div className="flex justify-between text-stone-700 font-medium">
                  <span className="flex items-center"><Zap className="w-3.5 h-3.5 text-amber-600 mr-1" /> Độ phá cách Gen Z:</span>
                  <span className="font-bold text-amber-800">92/100</span>
                </div>
                <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '92%' }} />
                </div>

                <div className="flex justify-between text-stone-700 font-medium">
                  <span className="flex items-center"><ShieldCheck className="w-3.5 h-3.5 text-emerald-600 mr-1" /> Chuẩn mực di sản:</span>
                  <span className="font-bold text-emerald-800">
                    {currentConfig.collarSide === 'right_over_left' ? '98/100' : '50/100 (Cần sửa vạt)'}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      currentConfig.collarSide === 'right_over_left' ? 'bg-emerald-500' : 'bg-rose-500'
                    }`}
                    style={{ width: currentConfig.collarSide === 'right_over_left' ? '98%' : '50%' }}
                  />
                </div>

                <div className="flex justify-between text-stone-700 font-medium">
                  <span>👟 Tính tiện dụng dạo phố:</span>
                  <span className="font-bold text-sky-800">95/100</span>
                </div>
                <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
                  <div className="h-full bg-sky-500 rounded-full" style={{ width: '95%' }} />
                </div>
              </div>

              <div className="bg-white p-3 rounded-xl border border-amber-200 text-[11px] text-stone-700">
                <strong>Phù hợp nhất cho: </strong>
                Chụp ảnh kỷ yếu học đường, dạo phố cà phê, streetstyle Gen Z, thể hiện cá tính độc bản.
              </div>
            </div>
          </div>

          {/* Option B: Alternative */}
          <div className="rounded-2xl border-2 border-rose-300 bg-rose-50/40 p-5 relative text-left shadow-2xs">
            <span className="absolute -top-3 left-4 px-3 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-xs">
              Phương Án B (Gợi Ý Thay Thế)
            </span>

            <div className="mt-2 space-y-3">
              <div>
                <span className="text-[10px] text-rose-800 font-bold uppercase">{altGarment.dynasty}</span>
                <h4 className="font-serif-vi text-base font-bold text-stone-900">{altGarment.name}</h4>
                <span className="text-xs text-amber-800 font-bold">{alternativeConfig.styleVibe}</span>
              </div>

              <div className="flex items-center space-x-2 text-xs">
                <span className="text-stone-600 font-medium">Bảng màu:</span>
                <span
                  className="w-5 h-5 rounded-md border border-stone-300 inline-block shadow-2xs"
                  style={{ backgroundColor: alternativeConfig.outerColor }}
                  title="Màu áo"
                />
                <span
                  className="w-5 h-5 rounded-md border border-stone-300 inline-block shadow-2xs"
                  style={{ backgroundColor: alternativeConfig.innerPantsColor }}
                  title="Màu quần"
                />
              </div>

              {/* Radar Scores */}
              <div className="space-y-2 pt-2 border-t border-rose-200 text-xs">
                <div className="flex justify-between text-stone-700 font-medium">
                  <span className="flex items-center"><Zap className="w-3.5 h-3.5 text-amber-600 mr-1" /> Độ phá cách Gen Z:</span>
                  <span className="font-bold text-amber-800">84/100</span>
                </div>
                <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '84%' }} />
                </div>

                <div className="flex justify-between text-stone-700 font-medium">
                  <span className="flex items-center"><ShieldCheck className="w-3.5 h-3.5 text-emerald-600 mr-1" /> Chuẩn mực di sản:</span>
                  <span className="font-bold text-emerald-800">100/100</span>
                </div>
                <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '100%' }} />
                </div>

                <div className="flex justify-between text-stone-700 font-medium">
                  <span>👟 Tính tiện dụng dạo phố:</span>
                  <span className="font-bold text-sky-800">86/100</span>
                </div>
                <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
                  <div className="h-full bg-sky-500 rounded-full" style={{ width: '86%' }} />
                </div>
              </div>

              <div className="bg-white p-3 rounded-xl border border-rose-200 text-[11px] text-stone-700">
                <strong>Phù hợp nhất cho: </strong>
                Lễ dâng hương, đại lễ Vu Quy, hội thảo văn hóa, không gian cố đô trầm mặc và trang nghiêm.
              </div>

              <button
                onClick={() => {
                  onApplyConfig(alternativeConfig);
                  onClose();
                }}
                className="w-full py-2.5 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center justify-center space-x-1"
              >
                <span>Chuyển Sang Dùng Phương Án B</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

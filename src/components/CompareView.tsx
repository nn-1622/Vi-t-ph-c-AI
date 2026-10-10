import React from 'react';
import { Look } from '../types';
import { X, SplitSquareVertical, Sparkles, ShieldCheck, Check } from 'lucide-react';

interface CompareViewProps {
  looks: Look[];
  onClose: () => void;
  onSaveLook: (look: Look) => void;
  savedLookIds: string[];
}

export const CompareView: React.FC<CompareViewProps> = ({
  looks,
  onClose,
  onSaveLook,
  savedLookIds,
}) => {
  return (
    <div className="bg-white rounded-3xl border border-stone-300 p-5 sm:p-7 shadow-lg space-y-6 text-left">
      <div className="flex items-center justify-between pb-4 border-b border-stone-200">
        <div className="flex items-center space-x-2">
          <SplitSquareVertical className="w-5 h-5 text-sky-700" />
          <h3 className="font-serif-vi text-lg sm:text-xl font-bold text-stone-900">
            So Sánh Trực Tiếp Các Phương Án Phối Đồ ({looks.length} Lựa Chọn)
          </h3>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className={`grid grid-cols-1 md:grid-cols-${Math.min(looks.length, 3)} gap-5`}>
        {looks.map((look, idx) => {
          const isSaved = savedLookIds.includes(look.id);
          const mainItem = look.items.find((i) => i.role.includes('chính')) || look.items[0];
          const accessories = look.items.filter((i) => i !== mainItem);

          return (
            <div
              key={look.id || idx}
              className="p-5 rounded-2xl border border-stone-200 bg-stone-50/50 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                    Phương án {idx + 1}
                  </span>
                  <button
                    onClick={() => onSaveLook(look)}
                    className="text-xs text-amber-800 hover:underline font-bold"
                  >
                    {isSaved ? '✓ Đã lưu' : '+ Lưu Lookbook'}
                  </button>
                </div>

                <h4 className="font-serif-vi text-base font-bold text-stone-900">
                  {look.name}
                </h4>

                <div className="p-2.5 bg-white rounded-xl border border-stone-200 text-xs">
                  <span className="text-[10px] uppercase font-bold text-stone-400 block mb-1">Trang phục chính:</span>
                  <span className="font-bold text-stone-900">{mainItem?.name}</span>
                  <span className="text-amber-800 font-semibold block text-[11px]">Màu: {mainItem?.color}</span>
                  <p className="text-stone-500 text-[11px] mt-0.5">{mainItem?.reason}</p>
                </div>

                <div className="p-2.5 bg-white rounded-xl border border-stone-200 text-xs">
                  <span className="text-[10px] uppercase font-bold text-stone-400 block mb-1">Phụ kiện kết hợp:</span>
                  <div className="space-y-1">
                    {accessories.map((acc, aIdx) => (
                      <div key={aIdx} className="text-[11px] text-stone-700">
                        • <strong>{acc.name}</strong> ({acc.color})
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-2.5 bg-amber-50/60 rounded-xl border border-amber-200 text-xs">
                  <span className="text-[10px] uppercase font-bold text-amber-900 block mb-1">Gợi ý thẩm mỹ:</span>
                  <p className="text-stone-700 text-[11px] leading-relaxed">{look.stylistic_suggestions}</p>
                </div>

                <div className="p-2.5 bg-stone-100 rounded-xl border border-stone-200 text-xs">
                  <span className="text-[10px] uppercase font-bold text-stone-600 block mb-1">Điểm lưu ý văn hóa:</span>
                  <p className="text-stone-700 text-[11px] leading-relaxed">
                    {look.cultural_notes?.[0]?.text || 'Chưa có thông tin xác minh.'}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

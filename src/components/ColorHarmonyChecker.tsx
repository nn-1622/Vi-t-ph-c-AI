import React from 'react';
import { OutfitConfig } from '../types';
import { COLOR_PALETTE } from '../data/mockData';
import { Sparkles, Check, AlertCircle, Compass } from 'lucide-react';

interface ColorHarmonyCheckerProps {
  config: OutfitConfig;
}

export const ColorHarmonyChecker: React.FC<ColorHarmonyCheckerProps> = ({ config }) => {
  const outerColObj = COLOR_PALETTE.find(
    (c) => c.hex.toLowerCase() === config.outerColor.toLowerCase()
  ) || {
    name: 'Màu Áo Ngoài',
    element: 'Hỏa',
    elementMeaning: 'Nhiệt huyết và sáng tạo',
  };

  const pantsColObj = COLOR_PALETTE.find(
    (c) => c.hex.toLowerCase() === config.innerPantsColor.toLowerCase()
  ) || {
    name: 'Màu Quần Lụa',
    element: 'Kim',
    elementMeaning: 'Thanh khiết và sáng bóng',
  };

  const e1 = outerColObj.element;
  const e2 = pantsColObj.element;

  // Determine Ngu Hanh interaction
  let harmonyType: 'tuong-sinh' | 'ty-hoa' | 'tuong-khac' = 'tuong-sinh';
  let harmonyScore = 92;
  let explanation = '';

  const sinhPairs: Record<string, string> = {
    Mộc: 'Hỏa',
    Hỏa: 'Thổ',
    Thổ: 'Kim',
    Kim: 'Thủy',
    Thủy: 'Mộc',
  };

  const khacPairs: Record<string, string> = {
    Mộc: 'Thổ',
    Thổ: 'Thủy',
    Thủy: 'Hỏa',
    Hỏa: 'Kim',
    Kim: 'Mộc',
  };

  if (sinhPairs[e1] === e2 || sinhPairs[e2] === e1) {
    harmonyType = 'tuong-sinh';
    harmonyScore = 96;
    explanation = `${e1} và ${e2} nằm trong quan hệ TƯƠNG SINH. Sự kết hợp này mang lại vận khí hanh thông, trường năng lượng tích cực và sự hài hòa thị giác tuyệt mỹ theo triết lý ngũ hành phương Đông.`;
  } else if (e1 === e2) {
    harmonyType = 'ty-hoa';
    harmonyScore = 90;
    explanation = `Cùng thuộc hành ${e1} (TỶ HÒA). Tạo nên phong cách Monochrome đồng điệu, sang trọng và thanh nhã cho tổng thể trang phục.`;
  } else if (khacPairs[e1] === e2 || khacPairs[e2] === e1) {
    harmonyType = 'tuong-khac';
    harmonyScore = 84;
    explanation = `${e1} và ${e2} nằm trong thế TƯƠNG KHẮC nhẹ theo ngũ hành. Trong thời trang Gen Z hiện đại, đây là thủ pháp 'Tương Phản Màu Nổi Bật' (Color-Blocking) tạo cá tính mạnh mẽ, có thể làm dịu bằng trang sức ngọc trai hoặc thắt lưng bạc.`;
  } else {
    harmonyType = 'tuong-sinh';
    harmonyScore = 88;
    explanation = `Hai sắc thái phối hợp ăn ý, tạo chiều sâu thị giác phong phú giữa lớp áo ngoài và quần lụa bên trong.`;
  }

  return (
    <div className="bg-white rounded-2xl border border-amber-200/80 p-4 sm:p-5 shadow-sm text-left">
      <div className="flex items-center justify-between pb-3 border-b border-stone-200">
        <div className="flex items-center space-x-2">
          <Compass className="w-4 h-4 text-amber-600" />
          <h4 className="text-xs sm:text-sm font-bold text-stone-900">
            Kiểm Tra Hài Hòa Màu Sắc & Ngũ Hành
          </h4>
        </div>
        <span
          className={`px-2.5 py-0.5 text-xs font-bold rounded-full border ${
            harmonyScore >= 90
              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
              : 'bg-amber-50 text-amber-800 border-amber-300'
          }`}
        >
          {harmonyScore}/100 Điểm
        </span>
      </div>

      {/* Visual Color Chips Comparison */}
      <div className="grid grid-cols-2 gap-3 my-3">
        <div className="flex items-center space-x-2.5 p-2 rounded-xl bg-stone-50 border border-stone-200">
          <div
            className="w-7 h-7 rounded-lg shadow-xs border border-stone-300 shrink-0"
            style={{ backgroundColor: config.outerColor }}
          />
          <div className="min-w-0">
            <span className="text-[10px] text-stone-500 block truncate font-medium">Áo Ngoài ({e1})</span>
            <span className="text-xs font-bold text-stone-900 block truncate">
              {outerColObj.name}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2.5 p-2 rounded-xl bg-stone-50 border border-stone-200">
          <div
            className="w-7 h-7 rounded-lg shadow-xs border border-stone-300 shrink-0"
            style={{ backgroundColor: config.innerPantsColor }}
          />
          <div className="min-w-0">
            <span className="text-[10px] text-stone-500 block truncate font-medium">Quần Lụa ({e2})</span>
            <span className="text-xs font-bold text-stone-900 block truncate">
              {pantsColObj.name}
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bar of Harmony */}
      <div className="space-y-1.5 my-2">
        <div className="flex justify-between text-[11px] text-stone-600 font-medium">
          <span>Chỉ số hòa hợp thẩm mỹ</span>
          <span className="font-bold text-amber-800">{harmonyScore}%</span>
        </div>
        <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden border border-stone-200">
          <div
            className={`h-full rounded-full transition-all duration-700 ${
              harmonyScore >= 90
                ? 'bg-gradient-to-r from-emerald-500 to-amber-500'
                : 'bg-gradient-to-r from-amber-500 to-rose-500'
            }`}
            style={{ width: `${harmonyScore}%` }}
          />
        </div>
      </div>

      <p className="text-xs text-stone-700 leading-relaxed mt-2.5 bg-amber-50/60 p-2.5 rounded-xl border border-amber-200">
        💡 {explanation}
      </p>
    </div>
  );
};

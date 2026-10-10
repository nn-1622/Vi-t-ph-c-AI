import React from 'react';
import { OutfitConfig, Garment } from '../types';
import { AlertOctagon, CheckCircle2, ShieldAlert, ArrowRight } from 'lucide-react';

interface CulturalGuardAlertProps {
  config: OutfitConfig;
  garment: Garment;
  onFixCollar: () => void;
}

export const CulturalGuardAlert: React.FC<CulturalGuardAlertProps> = ({
  config,
  garment,
  onFixCollar,
}) => {
  const isLapelWrong = config.collarSide === 'left_over_right';
  const isSpiritualEvent = config.event === 'di-chua-cau-an';
  const isYemWithoutCoverAtTemple = garment.id === 'yem-remix' && isSpiritualEvent;

  return (
    <div className="w-full">
      {/* Critical Violation 1: Tả Nhậm (Lapel wrong side) */}
      {isLapelWrong && (
        <div className="rounded-2xl border-2 border-rose-400 bg-rose-50/95 p-4 shadow-sm text-left animate-pulse">
          <div className="flex items-start space-x-3">
            <div className="p-2 rounded-xl bg-rose-600 text-white shadow-xs shrink-0">
              <AlertOctagon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-rose-600 text-white">
                  ĐẠI KỴ VĂN HÓA: LỖI TẢ NHẬM
                </span>
                <span className="text-xs text-rose-800 font-bold">Vi phạm quy thức cổ truyền</span>
              </div>
              <p className="text-xs text-stone-800 mt-1.5 leading-relaxed font-medium">
                Bạn đang cài <strong>vạt trái đè lên vạt phải (Tả Nhậm)</strong>. Trong văn hóa cổ truyền Việt Nam, quy cách này <strong>CHỈ DÙNG TRONG TANG LỄ HOẶC CHO NGƯỜI ĐÃ KHUẤT</strong>. Người sống mặc thường nhật hoặc lễ hội luôn luôn cài <strong>HỮU NHẬM (vạt phải đè vạt trái)</strong>.
              </p>
              <div className="mt-3 flex items-center space-x-3">
                <button
                  onClick={onFixCollar}
                  className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all active:scale-95"
                >
                  <span>Chỉnh về Hữu Nhậm (Chuẩn Xác)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] text-rose-700 italic font-semibold">
                  *Tự động bảo vệ chuẩn mực văn hóa dân tộc
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Warning 2: Spiritual space attire caution */}
      {isYemWithoutCoverAtTemple && (
        <div className="mt-2 rounded-2xl border border-amber-300 bg-amber-50 p-3.5 text-left">
          <div className="flex items-start space-x-2.5">
            <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold text-amber-900 block">
                Lưu Ý Không Gian Tâm Linh (Đi Chùa / Đền Phủ)
              </span>
              <p className="text-xs text-stone-700 mt-1 leading-relaxed">
                Yếm lụa rất gợi cảm và thời thượng, nhưng khi đến nơi thờ tự tôn nghiêm, bạn nên khoác thêm áo ngũ thân tay chẽn hoặc áo blazer bên ngoài để giữ trọn sự thanh tịnh, đoan trang.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Positive Culturally Verified Badge */}
      {!isLapelWrong && !isYemWithoutCoverAtTemple && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-3 flex items-center justify-between text-left shadow-2xs">
          <div className="flex items-center space-x-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <span className="text-xs font-bold text-emerald-900">
                Bảo Tồn Chuẩn Mực Di Sản: Hữu Nhậm & Ngũ Thường
              </span>
              <span className="text-[11px] text-stone-600 block">
                Cấu trúc tà áo và cúc chuẩn chỉ, tôn vinh đạo hiếu Tứ thân phụ mẫu & Ngũ thường (Nhân - Lễ - Nghĩa - Trí - Tín).
              </span>
            </div>
          </div>
          <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 whitespace-nowrap ml-2">
            100% Di Sản Chuẩn Xác
          </span>
        </div>
      )}
    </div>
  );
};

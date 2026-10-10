import React from 'react';
import { AlertCircle, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onOpenHowItWorks: () => void;
  onOpenAboutContent: () => void;
  onOpenReport: () => void;
  onOpenSubmissionDoc: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenHowItWorks,
  onOpenAboutContent,
  onOpenReport,
  onOpenSubmissionDoc,
}) => {
  return (
    <footer className="border-t border-stone-200/80 bg-white/70 py-10 mt-12 text-left text-xs text-stone-600">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Top Disclaimer Banner per Brief */}
        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start space-x-2.5">
            <AlertCircle className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-amber-950 block">Lưu ý về tính năng trí tuệ nhân tạo:</span>
              <span className="text-[11px] text-stone-600">
                Mô hình AI có thể đưa ra gợi ý chưa hoàn hảo. Thông tin văn hóa cần được đối chiếu với nguồn tư liệu uy tín trước khi áp dụng vào các nghi lễ trang nghiêm.
              </span>
            </div>
          </div>

          <button
            onClick={onOpenReport}
            className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 text-xs font-bold shrink-0 transition-all cursor-pointer shadow-2xs"
          >
            Báo nội dung cần kiểm tra
          </button>
        </div>

        {/* Links and Credits */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-stone-100">
          <div>
            <span className="font-serif-vi font-bold text-stone-900 text-sm">Việt Phục AI Stylist</span>
            <span className="mx-2">•</span>
            <span>Đề thi Audition | AI Arena Vietnam 2026</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-stone-600">
            <button onClick={onOpenHowItWorks} className="hover:text-stone-900 cursor-pointer">
              Cách hoạt động
            </button>
            <button onClick={onOpenAboutContent} className="hover:text-stone-900 cursor-pointer">
              Về nội dung & Nguồn
            </button>
            <button onClick={onOpenSubmissionDoc} className="hover:text-stone-900 cursor-pointer">
              Thuyết minh đề thi
            </button>
            <button onClick={onOpenReport} className="hover:text-rose-700 cursor-pointer text-rose-800 font-semibold">
              Góp ý văn hóa
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

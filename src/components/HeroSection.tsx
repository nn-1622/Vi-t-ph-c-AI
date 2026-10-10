import React from 'react';
import { Sparkles, ArrowDown, ShieldCheck, BookOpen, Compass } from 'lucide-react';

interface HeroSectionProps {
  onStartStyling: () => void;
  onOpenAboutContent: () => void;
  onOpenThreeD: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartStyling, onOpenAboutContent, onOpenThreeD }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-10 sm:pt-12 sm:pb-14 border-b border-amber-900/10 bg-gradient-to-b from-[#FAF8F5] via-[#F5F0E8] to-[#FAF8F5]">
      {/* Subtle traditional watermark decorative line */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-700 via-rose-700 to-amber-700 opacity-80" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
        {/* Transparency Disclaimer Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-amber-300 text-stone-700 text-xs font-semibold shadow-2xs">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>Công cụ đề xuất & khám phá — Dữ kiện văn hóa được rà soát nguồn minh bạch</span>
        </div>

        {/* Hero Title */}
        <h1 className="font-serif-vi text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight">
          Khám Phá & Phối Đồ Việt Phục <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-800 via-rose-800 to-amber-900">
            Theo Phong Cách Của Bạn
          </span>
        </h1>

        {/* Hero 1-sentence description */}
        <p className="text-stone-700 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-normal">
          Trợ lý AI giúp học sinh, sinh viên tự tin diện trang phục truyền thống Việt Nam — sáng tạo, hài hòa với dịp sử dụng, phân biệt rõ gợi ý thẩm mỹ và kiến thức lịch sử có nguồn.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={onStartStyling}
            className="flex items-center space-x-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-800 to-rose-800 hover:from-amber-700 hover:to-rose-700 text-white font-bold text-sm shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Bắt đầu phối đồ ngay</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>

          <button
            onClick={onOpenThreeD}
            className="flex items-center space-x-2 px-5 py-3 rounded-2xl bg-amber-100/90 hover:bg-amber-200/90 text-amber-950 font-bold text-sm border border-amber-300 transition-all cursor-pointer shadow-xs active:scale-95"
          >
            <span className="text-base">✨</span>
            <span>Mô hình 3D xoay 360°</span>
          </button>

          <button
            onClick={onOpenAboutContent}
            className="flex items-center space-x-1.5 px-4 py-3 rounded-2xl bg-white hover:bg-stone-100 text-stone-800 font-semibold text-sm border border-stone-300 transition-all cursor-pointer shadow-2xs"
          >
            <BookOpen className="w-4 h-4 text-stone-600" />
            <span>Xem nguồn tư liệu</span>
          </button>
        </div>

        {/* 3 Core Ethical Commitments */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 text-left max-w-3xl mx-auto">
          <div className="p-3 bg-white/80 rounded-xl border border-stone-200/80 shadow-2xs">
            <span className="text-xs font-bold text-stone-900 block flex items-center">
              <span className="mr-1.5 text-amber-700">✓</span> Tách biệt thẩm mỹ & lịch sử
            </span>
            <span className="text-[11px] text-stone-600 block mt-0.5">
              Gợi ý phối đồ là ý tưởng thẩm mỹ, không trình bày như sự thật lịch sử duy nhất.
            </span>
          </div>

          <div className="p-3 bg-white/80 rounded-xl border border-stone-200/80 shadow-2xs">
            <span className="text-xs font-bold text-stone-900 block flex items-center">
              <span className="mr-1.5 text-emerald-700">✓</span> Không bịa nguồn tham khảo
            </span>
            <span className="text-[11px] text-stone-600 block mt-0.5">
              Chỉ dẫn nguồn từ tài liệu bảo tàng & nghiên cứu đã nạp; nội dung chưa xác minh được ghi rõ.
            </span>
          </div>

          <div className="p-3 bg-white/80 rounded-xl border border-stone-200/80 shadow-2xs">
            <span className="text-xs font-bold text-stone-900 block flex items-center">
              <span className="mr-1.5 text-rose-700">✓</span> Thân thiện, không phán xét
            </span>
            <span className="text-[11px] text-stone-600 block mt-0.5">
              Tôn trọng sự đa dạng vùng miền; giải thích nhã nhặn về bối cảnh văn hóa.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

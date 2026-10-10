import React from 'react';
import { Sparkles, BookOpen, Info, HelpCircle, AlertCircle, Bookmark } from 'lucide-react';

interface HeaderProps {
  onOpenHowItWorks: () => void;
  onOpenAboutContent: () => void;
  onOpenLookbook: () => void;
  onOpenSubmissionDoc: () => void;
  onOpenThreeD: () => void;
  onScrollToImageStudio?: () => void;
  lookbookCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenHowItWorks,
  onOpenAboutContent,
  onOpenLookbook,
  onOpenSubmissionDoc,
  onOpenThreeD,
  onScrollToImageStudio,
  lookbookCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-amber-900/10 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Product Title */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-700 via-rose-700 to-amber-600 p-[2px] shadow-sm flex items-center justify-center">
              <div className="w-full h-full bg-[#FAF8F5] rounded-[10px] flex items-center justify-center text-amber-800 font-bold text-lg">
                VP
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-serif-vi text-xl sm:text-2xl font-bold tracking-tight text-stone-900">
                  Việt Phục AI Stylist
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300 rounded-full">
                  AI Arena 2026
                </span>
              </div>
              <p className="text-[11px] text-stone-500 font-medium hidden sm:block">
                Khám phá & phối trang phục truyền thống Việt Nam
              </p>
            </div>
          </div>

          {/* Navigation Controls per Brief Section 6 */}
          <nav className="flex items-center space-x-1.5 sm:space-x-2 text-xs font-semibold text-stone-700">
            {onScrollToImageStudio && (
              <button
                onClick={onScrollToImageStudio}
                className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-900 border border-rose-300 shadow-2xs transition-all active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-rose-700" />
                <span>Studio Ảnh AI</span>
              </button>
            )}

            <button
              onClick={onOpenThreeD}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-amber-800 to-rose-800 hover:from-amber-700 hover:to-rose-700 text-white shadow-2xs transition-all active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              <span>Thử 3D (360°)</span>
            </button>

            <button
              onClick={onOpenHowItWorks}
              className="flex items-center space-x-1 px-2.5 py-2 rounded-xl hover:bg-stone-200/60 hover:text-stone-900 transition-all cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-amber-800" />
              <span className="hidden md:inline">Cách hoạt động</span>
            </button>

            <button
              onClick={onOpenAboutContent}
              className="flex items-center space-x-1 px-3 py-2 rounded-xl hover:bg-stone-200/60 hover:text-stone-900 transition-all"
            >
              <Info className="w-4 h-4 text-rose-800" />
              <span className="hidden md:inline">Về nội dung & Nguồn</span>
              <span className="md:hidden">Nguồn</span>
            </button>

            <button
              onClick={onOpenLookbook}
              className="relative flex items-center space-x-1 px-3 py-2 rounded-xl bg-amber-100/80 hover:bg-amber-200/80 text-amber-900 border border-amber-300/80 shadow-2xs transition-all"
            >
              <Bookmark className="w-4 h-4 text-amber-800" />
              <span>Lookbook</span>
              {lookbookCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 text-[10px] font-bold bg-amber-700 text-white rounded-full">
                  {lookbookCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenSubmissionDoc}
              className="hidden lg:flex items-center space-x-1 px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 text-xs font-bold transition-all"
            >
              <BookOpen className="w-3.5 h-3.5 text-stone-700" />
              <span>Đề thi & Thuyết minh</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

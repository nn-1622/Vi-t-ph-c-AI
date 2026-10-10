import React, { useState, useRef } from 'react';
import { OutfitConfig, Garment, Accessory } from '../types';
import { GARMENTS, ACCESSORIES } from '../data/mockData';
import { X, Download, Share2, Sparkles, Check, Bookmark } from 'lucide-react';

interface LookbookModalProps {
  config: OutfitConfig;
  onClose: () => void;
  onSaveLookbook: (title: string, poem: string) => void;
}

export const LookbookModal: React.FC<LookbookModalProps> = ({
  config,
  onClose,
  onSaveLookbook,
}) => {
  const [lookbookTitle, setLookbookTitle] = useState('Thăng Long Tân Thời: Ngũ Thân & Phố Thị');
  const [poemText, setPoemText] = useState('Áo xưa tà lộng gió ngàn / Bước chân thế hệ rỡ ràng nét son.');
  const [isCopied, setIsCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const garment = GARMENTS.find((g) => g.id === config.garmentId) || GARMENTS[0];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSave = () => {
    onSaveLookbook(lookbookTitle, poemText);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-xl bg-white border border-amber-300 rounded-3xl shadow-xl p-5 sm:p-7 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <h3 className="font-serif-vi text-base sm:text-lg font-bold text-stone-900">
              Xuất Bản Tạp Chí Lookbook Việt Phục
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-stone-100 text-stone-600 hover:text-stone-900 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Magazine Cover Card (Exportable Target) */}
        <div
          ref={cardRef}
          className="my-4 relative rounded-2xl overflow-hidden border-2 border-amber-400 bg-gradient-to-b from-amber-50/90 via-orange-50/40 to-stone-50 p-6 sm:p-7 text-center shadow-md"
        >
          {/* Magazine Brand Header */}
          <div className="border-b border-amber-300/80 pb-3 mb-4">
            <span className="text-[10px] tracking-[0.4em] uppercase text-amber-800 font-bold block">
              EDITORIAL FASHION ISSUE • 2026
            </span>
            <h2 className="font-serif-vi text-2xl sm:text-3xl font-extrabold tracking-wider text-stone-900 uppercase mt-0.5">
              VIỆT PHỤC REMIX
            </h2>
            <span className="text-[10px] text-stone-500 italic font-medium">
              AI Arena Vietnam • Tôn vinh di sản, định hình phong cách
            </span>
          </div>

          {/* Title & Concept */}
          <div className="my-3">
            <input
              type="text"
              value={lookbookTitle}
              onChange={(e) => setLookbookTitle(e.target.value)}
              className="w-full text-center font-serif-vi text-lg sm:text-xl font-bold text-stone-900 bg-transparent border-b border-amber-400 focus:border-amber-600 focus:outline-none pb-1"
            />
          </div>

          {/* Central Garment Information Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white border border-amber-300 text-xs font-semibold text-amber-900 my-2 shadow-2xs">
            <span>🏛️ {garment.name}</span>
            <span>•</span>
            <span>{garment.dynasty}</span>
          </div>

          {/* Color Swatch Bar */}
          <div className="flex items-center justify-center space-x-4 my-3">
            <div className="flex items-center space-x-1.5">
              <span
                className="w-6 h-6 rounded-full border-2 border-white shadow-xs inline-block"
                style={{ backgroundColor: config.outerColor }}
              />
              <span className="text-[10px] text-stone-700 font-bold font-mono">Áo Ngoài</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span
                className="w-6 h-6 rounded-full border-2 border-white shadow-xs inline-block"
                style={{ backgroundColor: config.innerPantsColor }}
              />
              <span className="text-[10px] text-stone-700 font-bold font-mono">Quần Lụa</span>
            </div>
          </div>

          {/* Poetry / Story Quote Box */}
          <div className="my-4 bg-white/90 border-l-4 border-amber-500 p-3 rounded-r-xl text-left shadow-2xs">
            <textarea
              rows={2}
              value={poemText}
              onChange={(e) => setPoemText(e.target.value)}
              className="w-full text-xs italic font-medium text-stone-800 bg-transparent resize-none focus:outline-none"
            />
          </div>

          {/* Footer Metadata */}
          <div className="pt-3 border-t border-amber-300/80 flex items-center justify-between text-[11px] text-stone-600">
            <div className="text-left">
              <span className="block font-bold text-stone-900">📍 {config.city}</span>
              <span className="block text-[10px]">{config.weather}</span>
            </div>
            <div className="text-right">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-bold">
                ✓ DI SẢN CHUẨN MỰC
              </span>
              <span className="block text-[10px] text-stone-500 mt-0.5">Mã số: VPR-2026-GENZ</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <button
            onClick={handleSave}
            className="flex items-center justify-center space-x-1.5 py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition-all shadow-xs active:scale-95"
          >
            {isSaved ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>Đã Lưu Vào Bộ Sưu Tập!</span>
              </>
            ) : (
              <>
                <Bookmark className="w-4 h-4" />
                <span>Lưu Vào Bộ Sưu Tập</span>
              </>
            )}
          </button>

          <button
            onClick={handleCopyLink}
            className="flex items-center justify-center space-x-1.5 py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 text-xs font-bold transition-all active:scale-95"
          >
            {isCopied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Đã Sao Chép Link!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                <span>Chia Sẻ Link Lookbook</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

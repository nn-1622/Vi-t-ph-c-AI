import React, { useState } from 'react';
import { OutfitConfig, Garment, Accessory } from '../types';
import { Camera, RefreshCw, ZoomIn, ShieldCheck, AlertTriangle, Eye, Sparkles, UserCheck } from 'lucide-react';

interface MannequinVisualizerProps {
  config: OutfitConfig;
  garment: Garment;
  accessories: Accessory[];
  onToggleCollar: () => void;
  onOpenLookbook: () => void;
  culturalScore: number;
  harmonyScore: number;
}

export const MannequinVisualizer: React.FC<MannequinVisualizerProps> = ({
  config,
  garment,
  accessories,
  onToggleCollar,
  onOpenLookbook,
  culturalScore,
  harmonyScore,
}) => {
  const [viewMode, setViewMode] = useState<'full' | 'upper' | 'cover'>('full');
  const [backgroundTheme, setBackgroundTheme] = useState<'temple' | 'neon' | 'gallery' | 'lotus'>('temple');

  const hasAccessory = (id: string) => config.selectedAccessories.includes(id);

  // Background styling for bright easy-to-read theme
  const getBackgroundStyle = () => {
    switch (backgroundTheme) {
      case 'neon':
        return 'bg-gradient-to-b from-purple-100 via-pink-50 to-amber-50 border-purple-300/80';
      case 'gallery':
        return 'bg-gradient-to-b from-stone-100 via-stone-50 to-white border-stone-300/80';
      case 'lotus':
        return 'bg-gradient-to-b from-emerald-100/80 via-teal-50 to-amber-50/60 border-emerald-300/80';
      case 'temple':
      default:
        return 'bg-gradient-to-b from-amber-100 via-orange-50/80 to-amber-50/50 border-amber-300/80';
    }
  };

  const isLapelCorrect = config.collarSide === 'right_over_left';

  return (
    <div className="relative flex flex-col items-center w-full rounded-2xl border border-amber-200/80 bg-white p-4 sm:p-5 shadow-sm">
      {/* Top Controls Toolbar */}
      <div className="w-full flex flex-wrap items-center justify-between gap-2 mb-3 pb-3 border-b border-stone-200">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-stone-600 uppercase tracking-wider">Khung Cảnh:</span>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setBackgroundTheme('temple')}
              className={`px-2.5 py-1 text-xs rounded-lg font-semibold transition-all ${
                backgroundTheme === 'temple' ? 'bg-amber-600 text-white shadow-xs' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              🏛️ Cổ Đô
            </button>
            <button
              onClick={() => setBackgroundTheme('lotus')}
              className={`px-2.5 py-1 text-xs rounded-lg font-semibold transition-all ${
                backgroundTheme === 'lotus' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              🪷 Hồ Sen
            </button>
            <button
              onClick={() => setBackgroundTheme('neon')}
              className={`px-2.5 py-1 text-xs rounded-lg font-semibold transition-all ${
                backgroundTheme === 'neon' ? 'bg-purple-600 text-white shadow-xs' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              ⚡ Phố Trẻ
            </button>
            <button
              onClick={() => setBackgroundTheme('gallery')}
              className={`px-2.5 py-1 text-xs rounded-lg font-semibold transition-all ${
                backgroundTheme === 'gallery' ? 'bg-stone-700 text-white shadow-xs' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              🖼️ Studio
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode(viewMode === 'full' ? 'upper' : viewMode === 'upper' ? 'cover' : 'full')}
            className="flex items-center space-x-1 px-2.5 py-1 text-xs rounded-lg bg-stone-100 text-stone-700 hover:text-stone-900 border border-stone-200 hover:border-stone-400 transition-all font-medium"
            title="Đổi chế độ góc nhìn"
          >
            <Eye className="w-3.5 h-3.5 text-amber-600" />
            <span className="capitalize">
              {viewMode === 'full' ? 'Toàn Thân' : viewMode === 'upper' ? 'Cận Cảnh' : 'Tạp Chí'}
            </span>
          </button>

          <button
            onClick={onOpenLookbook}
            className="flex items-center space-x-1.5 px-3 py-1 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white text-xs font-bold rounded-lg shadow-sm transition-all active:scale-95"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Tạo Lookbook</span>
          </button>
        </div>
      </div>

      {/* Main Visualizer Stage */}
      <div
        className={`relative w-full max-w-md h-[490px] sm:h-[530px] rounded-xl overflow-hidden flex flex-col items-center justify-end p-4 border transition-all duration-500 shadow-inner ${getBackgroundStyle()}`}
      >
        {/* Ambient Subtle Grid */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:20px_20px]" />

        {/* Traditional Heritage Arch or Header */}
        <div className="absolute top-3 left-0 right-0 flex justify-between px-6 pointer-events-none opacity-50">
          <div className="w-14 h-14 border-t-2 border-l-2 border-amber-600/50 rounded-tl-xl" />
          <div className="text-center pt-1">
            <span className="font-serif-vi text-xs tracking-[0.3em] uppercase text-amber-900/80 font-bold">
              VIỆT PHỤC REMIX
            </span>
          </div>
          <div className="w-14 h-14 border-t-2 border-r-2 border-amber-600/50 rounded-tr-xl" />
        </div>

        {/* Live Heritage Verification Badge */}
        <div className="absolute top-3 left-3 z-20 flex flex-col space-y-1.5">
          <div
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold backdrop-blur-md border shadow-xs ${
              isLapelCorrect
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : 'bg-rose-50 text-rose-800 border-rose-400 animate-bounce'
            }`}
          >
            {isLapelCorrect ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Quy chuẩn: Hữu Nhậm ({culturalScore}đ)</span>
              </>
            ) : (
              <>
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                <span>Cảnh báo: Tả Nhậm (Sai Vạt!)</span>
              </>
            )}
          </div>

          <div className="flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white/90 text-amber-800 border border-amber-300 backdrop-blur-md shadow-xs">
            <Sparkles className="w-3 h-3 text-amber-600" />
            <span>Ngũ Hành: {harmonyScore}% Hài Hòa</span>
          </div>
        </div>

        {/* Quick Lapel Toggle Button for Testing Cultural Guard */}
        <div className="absolute top-3 right-3 z-20">
          <button
            onClick={onToggleCollar}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-[11px] font-bold backdrop-blur-md border transition-all shadow-xs ${
              isLapelCorrect
                ? 'bg-white/90 text-stone-700 border-stone-300 hover:bg-stone-50'
                : 'bg-rose-600 text-white border-rose-600 shadow-md'
            }`}
            title="Đổi hướng cài vạt áo để kiểm thử cảnh báo quy chuẩn văn hóa"
          >
            <RefreshCw className="w-3 h-3" />
            <span>{isLapelCorrect ? 'Vạt Phải (Đúng)' : 'Vạt Trái (Sai)'}</span>
          </button>
        </div>

        {/* Dynamic Interactive SVG Illustrated Canvas of the Outfit */}
        <div
          className={`relative z-10 w-full flex flex-col items-center justify-end transition-transform duration-500 ${
            viewMode === 'upper'
              ? 'scale-130 translate-y-24'
              : viewMode === 'cover'
              ? 'scale-105'
              : 'scale-100'
          }`}
        >
          <svg
            viewBox="0 0 320 440"
            className="w-64 sm:w-72 h-[380px] sm:h-[430px] drop-shadow-[0_12px_20px_rgba(0,0,0,0.15)]"
          >
            <defs>
              {/* Pattern 1: Van May (Cloud Scroll) */}
              <pattern id="pattern-van-may" width="40" height="40" patternUnits="userSpaceOnUse">
                <path
                  d="M 5,20 Q 15,5 25,20 T 35,20"
                  fill="none"
                  stroke="rgba(255,255,255,0.25)"
                  strokeWidth="1.5"
                />
                <circle cx="15" cy="18" r="2" fill="rgba(255,255,255,0.2)" />
              </pattern>

              {/* Pattern 2: Hoa Sen (Lotus) */}
              <pattern id="pattern-hoa-sen" width="45" height="45" patternUnits="userSpaceOnUse">
                <path
                  d="M 22,12 C 16,18 16,28 22,34 C 28,28 28,18 22,12 Z M 16,24 C 10,22 8,28 14,32 Z M 28,24 C 34,22 36,28 30,32 Z"
                  fill="rgba(255,255,255,0.2)"
                />
              </pattern>

              {/* Pattern 3: Chim Hac */}
              <pattern id="pattern-chim-hac" width="50" height="50" patternUnits="userSpaceOnUse">
                <path
                  d="M 15,25 Q 25,15 35,22 Q 40,25 45,20 Q 35,32 25,28 Z"
                  fill="rgba(255,255,255,0.22)"
                />
              </pattern>

              {/* Golden Button Gradient */}
              <radialGradient id="gold-button" cx="30%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="60%" stopColor="#eab308" />
                <stop offset="100%" stopColor="#854d0e" />
              </radialGradient>

              {/* Nhat Binh 5-color collar gradient */}
              <linearGradient id="nhat-binh-collar" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#b91c1c" />
                <stop offset="25%" stopColor="#ca8a04" />
                <stop offset="50%" stopColor="#059669" />
                <stop offset="75%" stopColor="#2563eb" />
                <stop offset="100%" stopColor="#f8fafc" />
              </linearGradient>
            </defs>

            {/* --- 1. SHADOW UNDER FEET --- */}
            <ellipse cx="160" cy="415" rx="55" ry="8" fill="rgba(0,0,0,0.18)" filter="blur(3px)" />

            {/* --- 2. INNER SILK PANTS (QUẦN LỤA) --- */}
            <g id="pants">
              <path
                d="M 125,240 L 115,385 L 148,385 L 158,260 L 168,260 L 178,385 L 211,385 L 201,240 Z"
                fill={config.innerPantsColor}
                stroke="#44403c"
                strokeWidth="1.5"
              />
              <line x1="132" y1="260" x2="130" y2="380" stroke="rgba(0,0,0,0.12)" strokeWidth="1" />
              <line x1="194" y1="260" x2="196" y2="380" stroke="rgba(0,0,0,0.12)" strokeWidth="1" />
            </g>

            {/* --- 3. FOOTWEAR (GIÀY DÉP REMIX) --- */}
            <g id="shoes">
              {hasAccessory('sneaker-chunky-white') ? (
                // Chunky Sneaker Gen Z
                <g>
                  <rect x="110" y="385" width="40" height="24" rx="7" fill="#ffffff" stroke="#475569" strokeWidth="1.5" />
                  <rect x="108" y="401" width="44" height="8" rx="3" fill="#e2e8f0" stroke="#475569" strokeWidth="1.2" />
                  <path d="M 120,390 L 136,390" stroke="#f43f5e" strokeWidth="2.5" />
                  <circle cx="140" cy="397" r="3" fill="#3b82f6" />

                  <rect x="176" y="385" width="40" height="24" rx="7" fill="#ffffff" stroke="#475569" strokeWidth="1.5" />
                  <rect x="174" y="401" width="44" height="8" rx="3" fill="#e2e8f0" stroke="#475569" strokeWidth="1.2" />
                  <path d="M 186,390 L 202,390" stroke="#f43f5e" strokeWidth="2.5" />
                  <circle cx="206" cy="397" r="3" fill="#3b82f6" />
                </g>
              ) : hasAccessory('guoc-moc-son-mai') ? (
                // Guốc mộc sơn mài
                <g>
                  <path d="M 116,392 L 146,392 L 144,406 L 118,406 Z" fill="#9a3412" stroke="#431407" strokeWidth="1.5" />
                  <path d="M 124,388 Q 131,382 138,388" stroke="#be123c" strokeWidth="4" fill="none" />
                  <path d="M 180,392 L 210,392 L 208,406 L 182,406 Z" fill="#9a3412" stroke="#431407" strokeWidth="1.5" />
                  <path d="M 188,388 Q 195,382 202,388" stroke="#be123c" strokeWidth="4" fill="none" />
                </g>
              ) : hasAccessory('boot-da-co-lung') ? (
                // Boot da cổ lửng
                <g>
                  <path d="M 115,365 L 148,365 L 148,405 L 110,405 L 110,380 Z" fill="#1e293b" stroke="#0f172a" strokeWidth="2" />
                  <path d="M 178,365 L 211,365 L 216,380 L 216,405 L 178,405 Z" fill="#1e293b" stroke="#0f172a" strokeWidth="2" />
                  <line x1="130" y1="368" x2="130" y2="400" stroke="#64748b" strokeWidth="1.5" />
                  <line x1="195" y1="368" x2="195" y2="400" stroke="#64748b" strokeWidth="1.5" />
                </g>
              ) : (
                // Default clean shoes
                <g>
                  <ellipse cx="132" cy="398" rx="17" ry="8" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.5" />
                  <ellipse cx="194" cy="398" rx="17" ry="8" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.5" />
                </g>
              )}
            </g>

            {/* --- 4. OUTER GARMENT ROBE (ÁO CHÍNH) --- */}
            <g id="main-garment">
              {garment.id === 'ao-tac' ? (
                <g>
                  <path
                    d="M 120,110 L 80,180 L 40,300 L 75,310 L 115,225 L 105,370 L 221,370 L 211,225 L 251,310 L 286,300 L 246,180 L 206,110 Z"
                    fill={config.outerColor}
                    stroke="#292524"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M 120,110 L 80,180 L 40,300 L 75,310 L 115,225 L 105,370 L 221,370 L 211,225 L 251,310 L 286,300 L 246,180 L 206,110 Z"
                    fill={`url(#pattern-${config.pattern})`}
                  />
                  <path d="M 40,300 Q 60,315 75,310" stroke="rgba(0,0,0,0.3)" strokeWidth="3" fill="none" />
                  <path d="M 286,300 Q 266,315 251,310" stroke="rgba(0,0,0,0.3)" strokeWidth="3" fill="none" />
                </g>
              ) : garment.id === 'nhat-binh' ? (
                <g>
                  <path
                    d="M 120,110 L 70,180 L 82,230 L 118,190 L 110,360 L 216,360 L 208,190 L 244,230 L 256,180 L 206,110 Z"
                    fill={config.outerColor}
                    stroke="#292524"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M 120,110 L 70,180 L 82,230 L 118,190 L 110,360 L 216,360 L 208,190 L 244,230 L 256,180 L 206,110 Z"
                    fill={`url(#pattern-${config.pattern})`}
                  />
                  <rect
                    x="138"
                    y="112"
                    width="50"
                    height="90"
                    rx="4"
                    fill="none"
                    stroke="url(#nhat-binh-collar)"
                    strokeWidth="8"
                  />
                  <line x1="163" y1="202" x2="163" y2="355" stroke="#facc15" strokeWidth="4" />
                </g>
              ) : garment.id === 'ao-tu-than' ? (
                <g>
                  <path d="M 140,115 L 186,115 L 175,200 L 151,200 Z" fill="#e11d48" />
                  <path
                    d="M 122,110 L 75,185 L 88,235 L 118,190 L 112,360 L 145,360 L 140,240 L 186,240 L 181,360 L 214,360 L 208,190 L 238,235 L 251,185 L 204,110 Z"
                    fill={config.outerColor}
                    stroke="#292524"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M 122,110 L 75,185 L 88,235 L 118,190 L 112,360 L 145,360 L 140,240 L 186,240 L 181,360 L 214,360 L 208,190 L 238,235 L 251,185 L 204,110 Z"
                    fill={`url(#pattern-${config.pattern})`}
                  />
                  <rect x="135" y="215" width="56" height="12" rx="4" fill="#059669" />
                  <path d="M 155,227 Q 150,280 148,320" stroke="#f43f5e" strokeWidth="5" fill="none" />
                  <path d="M 168,227 Q 172,280 174,320" stroke="#facc15" strokeWidth="5" fill="none" />
                </g>
              ) : garment.id === 'yem-remix' ? (
                <g>
                  <path d="M 145,115 L 181,115 L 195,215 L 131,215 Z" fill={config.outerColor} stroke="#292524" strokeWidth="1" />
                  <path d="M 145,115 L 181,115 L 195,215 L 131,215 Z" fill={`url(#pattern-${config.pattern})`} />
                  <path d="M 145,115 Q 163,95 181,115" stroke="#fbcfe8" strokeWidth="2.5" fill="none" />
                  <path
                    d="M 115,110 L 65,180 L 78,245 L 110,215 L 110,310 L 135,310 L 130,170 L 115,110 Z"
                    fill="#334155"
                    stroke="#1e293b"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M 211,110 L 261,180 L 248,245 L 216,215 L 216,310 L 191,310 L 196,170 L 211,110 Z"
                    fill="#334155"
                    stroke="#1e293b"
                    strokeWidth="1.5"
                  />
                </g>
              ) : (
                <g>
                  <path
                    d="M 122,110 L 78,175 L 90,225 L 120,185 L 112,365 L 214,365 L 206,185 L 236,225 L 248,175 L 204,110 Z"
                    fill={config.outerColor}
                    stroke="#292524"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M 122,110 L 78,175 L 90,225 L 120,185 L 112,365 L 214,365 L 206,185 L 236,225 L 248,175 L 204,110 Z"
                    fill={`url(#pattern-${config.pattern})`}
                  />
                  <line x1="112" y1="230" x2="112" y2="365" stroke="rgba(0,0,0,0.25)" strokeWidth="1.5" />
                  <line x1="214" y1="230" x2="214" y2="365" stroke="rgba(0,0,0,0.25)" strokeWidth="1.5" />
                </g>
              )}

              {/* --- 5. THE 5 SACRED BUTTONS & LAPEL (NGŨ THƯỜNG & HỮU NHẬM) --- */}
              {garment.id !== 'nhat-binh' && (
                <g id="lapel-and-buttons">
                  {isLapelCorrect ? (
                    <path
                      d="M 163,110 Q 165,130 178,142 Q 192,152 204,158"
                      stroke="#facc15"
                      strokeWidth="2.5"
                      fill="none"
                    />
                  ) : (
                    <path
                      d="M 163,110 Q 161,130 148,142 Q 134,152 122,158"
                      stroke="#f43f5e"
                      strokeWidth="3.5"
                      strokeDasharray="4 2"
                      fill="none"
                    />
                  )}

                  {/* 5 Sacred Buttons */}
                  <circle cx="163" cy="113" r="3.2" fill="url(#gold-button)" stroke="#451a03" strokeWidth="0.8" />
                  <circle
                    cx={isLapelCorrect ? '176' : '150'}
                    cy="133"
                    r="3.2"
                    fill="url(#gold-button)"
                    stroke="#451a03"
                    strokeWidth="0.8"
                  />
                  <circle
                    cx={isLapelCorrect ? '194' : '132'}
                    cy="154"
                    r="3.2"
                    fill="url(#gold-button)"
                    stroke="#451a03"
                    strokeWidth="0.8"
                  />
                  <circle
                    cx={isLapelCorrect ? '203' : '123'}
                    cy="185"
                    r="3.2"
                    fill="url(#gold-button)"
                    stroke="#451a03"
                    strokeWidth="0.8"
                  />
                  <circle
                    cx={isLapelCorrect ? '205' : '121'}
                    cy="215"
                    r="3.2"
                    fill="url(#gold-button)"
                    stroke="#451a03"
                    strokeWidth="0.8"
                  />
                </g>
              )}
            </g>

            {/* --- 6. OVERWEAR / BLAZER OVERLAY --- */}
            {hasAccessory('blazer-oversize') && garment.id !== 'yem-remix' && (
              <g id="blazer-overlay">
                <path
                  d="M 108,105 L 55,175 L 70,240 L 105,210 L 105,320 L 132,320 L 126,170 L 110,105 Z"
                  fill="#334155"
                  stroke="#1e293b"
                  strokeWidth="2"
                />
                <path
                  d="M 218,105 L 271,175 L 256,240 L 221,210 L 221,320 L 194,320 L 200,170 L 216,105 Z"
                  fill="#334155"
                  stroke="#1e293b"
                  strokeWidth="2"
                />
              </g>
            )}

            {hasAccessory('that-lung-da-ban-to') && (
              <g id="belt">
                <rect x="122" y="215" width="82" height="15" rx="3" fill="#27272a" stroke="#71717a" strokeWidth="1.5" />
                <rect x="154" y="213" width="18" height="19" rx="2" fill="#e4e4e7" stroke="#000" strokeWidth="1" />
              </g>
            )}

            {/* --- 7. JEWELRY --- */}
            {hasAccessory('kieng-bac-hoa-sen') && (
              <g id="kieng-bac">
                <path d="M 144,115 Q 163,138 182,115" stroke="#cbd5e1" strokeWidth="4" fill="none" />
                <circle cx="163" cy="128" r="4.5" fill="#f8fafc" stroke="#64748b" strokeWidth="1" />
              </g>
            )}

            {hasAccessory('chuoi-ngoc-trai-chunky') && (
              <g id="ngoc-trai">
                {[144, 150, 157, 163, 169, 176, 182].map((cx, idx) => (
                  <circle
                    key={idx}
                    cx={cx}
                    cy={115 + Math.sin((idx / 6) * Math.PI) * 20}
                    r="4"
                    fill="#ffffff"
                    stroke="#cbd5e1"
                    strokeWidth="0.8"
                  />
                ))}
              </g>
            )}

            {/* --- 8. NECK & HEAD --- */}
            <g id="head-and-neck">
              <rect x="149" y="93" width="28" height="20" rx="3" fill="#fde68a" stroke="#d97706" strokeWidth="0.5" />
              <rect x="151" y="95" width="24" height="6" fill="#ffffff" />

              {config.customAvatarUrl ? (
                <clipPath id="custom-face-clip">
                  <ellipse cx="163" cy="65" rx="20" ry="26" />
                </clipPath>
              ) : null}

              {config.customAvatarUrl ? (
                <image
                  href={config.customAvatarUrl}
                  x="141"
                  y="38"
                  width="44"
                  height="54"
                  clipPath="url(#custom-face-clip)"
                  preserveAspectRatio="xMidYMid slice"
                />
              ) : (
                <g id="default-vector-face">
                  <ellipse cx="163" cy="65" rx="20" ry="26" fill="#fef3c7" stroke="#fcd34d" strokeWidth="0.5" />
                  <path d="M 152,58 Q 156,56 160,58" stroke="#78350f" strokeWidth="1.5" fill="none" />
                  <path d="M 166,58 Q 170,56 174,58" stroke="#78350f" strokeWidth="1.5" fill="none" />
                  <circle cx="156" cy="63" r="2" fill="#451a03" />
                  <circle cx="170" cy="63" r="2" fill="#451a03" />
                  <line x1="163" y1="63" x2="162" y2="72" stroke="#ea580c" strokeWidth="1" />
                  <ellipse cx="163" cy="78" rx="4" ry="2" fill="#e11d48" />

                  {config.avatarId.includes('female') ? (
                    <g>
                      <path
                        d="M 143,62 C 141,40 150,30 163,30 C 176,30 185,40 183,62 C 183,50 178,42 163,42 C 148,42 143,50 143,62 Z"
                        fill="#292524"
                      />
                      <circle cx="163" cy="27" r="14" fill="#292524" />
                    </g>
                  ) : (
                    <g>
                      <path
                        d="M 142,65 C 140,40 148,28 163,28 C 178,28 186,40 184,65 C 184,45 174,38 163,38 C 152,38 142,45 142,65 Z"
                        fill="#292524"
                      />
                      <path d="M 140,65 L 140,82 L 146,75 Z" fill="#292524" />
                      <path d="M 186,65 L 186,82 L 180,75 Z" fill="#292524" />
                    </g>
                  )}
                </g>
              )}

              {hasAccessory('kinh-cyber-retro') && (
                <g id="sunglasses">
                  <ellipse cx="155" cy="63" rx="7" ry="5" fill="#0f172a" stroke="#0284c7" strokeWidth="1.2" />
                  <ellipse cx="171" cy="63" rx="7" ry="5" fill="#0f172a" stroke="#0284c7" strokeWidth="1.2" />
                  <line x1="162" y1="63" x2="164" y2="63" stroke="#0284c7" strokeWidth="1.5" />
                </g>
              )}
            </g>

            {/* --- 9. HEADWEAR --- */}
            {hasAccessory('man-gam') && (
              <g id="man-gam">
                <ellipse cx="163" cy="38" rx="26" ry="12" fill={config.outerColor} stroke="#ca8a04" strokeWidth="2" />
                <ellipse cx="163" cy="36" rx="20" ry="8" fill="#292524" />
                <circle cx="163" cy="46" r="3" fill="#facc15" />
              </g>
            )}

            {hasAccessory('non-quai-thao') && (
              <g id="non-quai-thao">
                <ellipse cx="163" cy="28" rx="60" ry="16" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
                <ellipse cx="163" cy="24" rx="26" ry="7" fill="#fde68a" />
                <path d="M 125,32 Q 132,100 138,200" stroke="#f43f5e" strokeWidth="3" fill="none" />
                <path d="M 201,32 Q 194,100 188,200" stroke="#059669" strokeWidth="3" fill="none" />
              </g>
            )}

            {/* --- 10. HANDHELD ACCESSORIES --- */}
            {hasAccessory('quat-tram-khac-rong') && (
              <g id="quat-tram" transform="translate(225, 230) rotate(-25)">
                <path
                  d="M 0,0 L -25,-45 A 50,50 0 0,1 25,-45 Z"
                  fill="#78350f"
                  stroke="#fbbf24"
                  strokeWidth="1.5"
                />
                <circle cx="0" cy="0" r="4" fill="#fbbf24" />
                <path d="M 0,0 L 0,20" stroke="#ef4444" strokeWidth="2" />
              </g>
            )}

            {hasAccessory('tui-coi-thu-cong') && (
              <g id="tui-coi" transform="translate(65, 240)">
                <path d="M 10,10 L 40,10 L 44,45 L 6,45 Z" fill="#d6d3d1" stroke="#78716c" strokeWidth="1.5" />
                <rect x="14" y="20" width="22" height="12" fill={config.outerColor} rx="2" />
                <path d="M 16,10 Q 25,-8 34,10" stroke="#78350f" strokeWidth="2.5" fill="none" />
              </g>
            )}

            {hasAccessory('tui-tote-thu-phap') && (
              <g id="tui-tote" transform="translate(60, 235)">
                <rect x="8" y="15" width="34" height="42" rx="3" fill="#ffffff" stroke="#475569" strokeWidth="1.5" />
                <text x="25" y="38" fontSize="9" fontFamily="Playfair Display" textAnchor="middle" fill="#dc2626" fontWeight="bold">
                  BẢN SẮC
                </text>
                <path d="M 17,15 Q 25,-4 33,15" stroke="#000" strokeWidth="2" fill="none" />
              </g>
            )}
          </svg>
        </div>

        {/* Fashion Tag Footer Overlay inside visualizer */}
        <div className="relative z-20 w-full mt-2 pt-2 border-t border-stone-300/80 flex items-center justify-between text-xs text-stone-800 bg-white/70 backdrop-blur-xs px-2 rounded-lg">
          <div>
            <span className="font-bold text-stone-900">{garment.name}</span>
            <span className="text-stone-600 text-[11px] block">{config.styleVibe}</span>
          </div>
          <div className="text-right">
            <span className="text-amber-800 font-mono font-bold text-xs">{config.city}</span>
            <span className="text-stone-600 text-[10px] block">{config.weather}</span>
          </div>
        </div>
      </div>

      {/* Quick Summary Badge Row */}
      <div className="w-full grid grid-cols-3 gap-2 mt-3 text-center">
        <div className="bg-amber-50/80 p-2 rounded-xl border border-amber-200">
          <span className="text-[10px] text-amber-800 uppercase tracking-wider block font-bold">Triều Đại</span>
          <span className="text-xs font-bold text-stone-800 truncate block">{garment.dynasty}</span>
        </div>
        <div className="bg-emerald-50/80 p-2 rounded-xl border border-emerald-200">
          <span className="text-[10px] text-emerald-800 uppercase tracking-wider block font-bold">Ngũ Thường</span>
          <span className="text-xs font-bold text-emerald-900 block">5 Cúc Khảm Ngọc</span>
        </div>
        <div className="bg-rose-50/80 p-2 rounded-xl border border-rose-200">
          <span className="text-[10px] text-rose-800 uppercase tracking-wider block font-bold">Phong Cách</span>
          <span className="text-xs font-bold text-rose-900 truncate block">Gen Z Remix</span>
        </div>
      </div>
    </div>
  );
};

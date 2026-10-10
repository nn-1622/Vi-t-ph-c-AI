import React, { useState } from 'react';
import { OutfitConfig, Garment, Accessory, VietPhucStylistResponse } from '../types';
import { GARMENTS, ACCESSORIES } from '../data/mockData';
import { Sparkles, Send, Bot, RefreshCw, Feather, CheckCircle2, Copy, Check, AlertTriangle, Code, Image as ImageIcon, BookOpen, MapPin, ShieldAlert } from 'lucide-react';

interface AiStylistChatProps {
  config: OutfitConfig;
  onApplyStyleAdvice?: (advice: string) => void;
}

export const AiStylistChat: React.FC<AiStylistChatProps> = ({ config }) => {
  const [loading, setLoading] = useState(false);
  const [userQuery, setUserQuery] = useState('');
  const [stylistFeedback, setStylistFeedback] = useState<VietPhucStylistResponse | null>(null);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);
  const [showJsonRaw, setShowJsonRaw] = useState(false);

  const garment = GARMENTS.find((g) => g.id === config.garmentId) || GARMENTS[0];
  const selectedAccNames = ACCESSORIES.filter((a) => config.selectedAccessories.includes(a.id)).map((a) => a.name);

  const handleConsultGemini = async (customQuestion?: string) => {
    setLoading(true);
    try {
      const payload = {
        garment: garment.name,
        style: config.styleVibe,
        color: `${config.outerColor}`,
        accessories: selectedAccNames,
        event: config.event,
        city: config.city,
        weather: config.weather,
        lapelSide: config.collarSide,
        userNote: customQuestion || userQuery || 'Tư vấn cách phối đồ vừa hiện đại, sáng tạo, phù hợp với sự kiện, bảo tồn giá trị văn hóa và xuất prompt tạo ảnh'
      };

      const res = await fetch('/api/gemini/stylist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success && data.data) {
        setStylistFeedback(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const copyImagePrompt = () => {
    if (stylistFeedback?.image_generation_prompt) {
      navigator.clipboard.writeText(stylistFeedback.image_generation_prompt);
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2000);
    }
  };

  const copyJsonRaw = () => {
    if (stylistFeedback) {
      navigator.clipboard.writeText(JSON.stringify(stylistFeedback, null, 2));
      setCopiedJson(true);
      setTimeout(() => setCopiedJson(false), 2000);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-amber-200/80 p-4 sm:p-5 shadow-sm text-left flex flex-col h-full">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-200">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-amber-600 to-rose-600 text-white shadow-xs">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-stone-900">
              Việt Phục AI Stylist (Gemini 3.8)
            </h4>
            <span className="text-[11px] text-amber-800 font-semibold block">
              Trợ lý tư vấn phối đồ & thẩm định di sản văn hóa
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {stylistFeedback && (
            <button
              onClick={() => setShowJsonRaw(!showJsonRaw)}
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg border border-stone-300 bg-stone-50 hover:bg-stone-100 text-stone-700 text-xs font-semibold transition-all"
              title="Xem cấu trúc JSON đầu ra chuẩn"
            >
              <Code className="w-3.5 h-3.5 text-stone-600" />
              <span>{showJsonRaw ? 'Ẩn JSON' : 'Xem JSON'}</span>
            </button>
          )}

          <button
            onClick={() => handleConsultGemini()}
            disabled={loading}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 hover:to-rose-500 text-white text-xs font-bold shadow-xs transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>AI đang phân tích...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Nhờ AI Stylist Tư Vấn</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* JSON RAW VIEWER ACCORDION */}
      {showJsonRaw && stylistFeedback && (
        <div className="my-3 p-3 bg-stone-900 text-amber-300 rounded-xl font-mono text-xs overflow-x-auto max-h-64 relative border border-stone-700">
          <div className="flex justify-between items-center pb-2 mb-2 border-b border-stone-800">
            <span className="text-[11px] text-stone-400 font-bold uppercase">Valid JSON Output:</span>
            <button
              onClick={copyJsonRaw}
              className="flex items-center space-x-1 px-2 py-0.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded text-[11px]"
            >
              {copiedJson ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedJson ? 'Đã chép' : 'Sao chép JSON'}</span>
            </button>
          </div>
          <pre>{JSON.stringify(stylistFeedback, null, 2)}</pre>
        </div>
      )}

      {/* DETAILED STRUCTURED OUTPUT FROM VIET PHUC AI STYLIST */}
      {stylistFeedback ? (
        <div className="my-3 space-y-3.5">
          {/* 1. Outfit Recommendation Block */}
          <div className="p-4 rounded-xl border border-amber-300 bg-gradient-to-br from-amber-50/90 via-orange-50/50 to-white text-left space-y-3 shadow-xs">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200">
                  GỢI Ý PHỐI ĐỒ (OUTFIT RECOMMENDATION)
                </span>
                <h3 className="font-serif-vi text-base sm:text-lg font-bold text-stone-900 mt-1">
                  ✨ {stylistFeedback.outfit_recommendation?.title}
                </h3>
                <span className="text-xs font-semibold text-stone-700">
                  🏛️ {stylistFeedback.outfit_recommendation?.main_garment}
                </span>
              </div>
            </div>

            {/* Modern Twist Callout */}
            <div className="p-3 bg-white rounded-xl border border-amber-200 shadow-2xs">
              <span className="text-xs font-bold text-rose-700 block mb-0.5">
                🔥 Điểm nhấn hiện đại cho Gen Z (Modern Twist):
              </span>
              <p className="text-xs text-stone-700 leading-relaxed font-medium">
                {stylistFeedback.outfit_recommendation?.modern_twist}
              </p>
            </div>

            {/* Colors & Accessories */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {/* Color Palette */}
              <div className="p-2.5 bg-white rounded-xl border border-stone-200">
                <span className="text-[11px] font-bold text-stone-800 block mb-1">
                  🎨 Gam màu chủ đạo & Hài hòa:
                </span>
                <div className="flex items-center space-x-1.5 mb-1.5">
                  {stylistFeedback.outfit_recommendation?.color_palette?.primary_colors?.map((col: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-stone-100 text-stone-800 border border-stone-300"
                    >
                      {col}
                    </span>
                  ))}
                </div>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  {stylistFeedback.outfit_recommendation?.color_palette?.harmony_analysis}
                </p>
              </div>

              {/* Accessories */}
              <div className="p-2.5 bg-white rounded-xl border border-stone-200">
                <span className="text-[11px] font-bold text-stone-800 block mb-1">
                  ✨ Phụ kiện đi kèm:
                </span>
                <ul className="space-y-1">
                  {stylistFeedback.outfit_recommendation?.accessories?.map((acc: string, idx: number) => (
                    <li key={idx} className="flex items-center space-x-1.5 text-xs text-stone-700 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{acc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* 2. Cultural Knowledge Block */}
          <div className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/50 space-y-2">
            <div className="flex items-center space-x-2 text-amber-900 text-xs font-bold">
              <BookOpen className="w-4 h-4 text-amber-700" />
              <span>Kiến Thức Văn Hóa & Nguồn Gốc Lịch Sử:</span>
            </div>
            <p className="text-xs text-stone-700 leading-relaxed">
              <strong className="text-stone-900">Nguồn gốc & Lịch sử: </strong>
              {stylistFeedback.cultural_knowledge?.origin_and_history}
            </p>
            <p className="text-xs text-stone-700 leading-relaxed">
              <strong className="text-stone-900">Ý nghĩa văn hóa: </strong>
              {stylistFeedback.cultural_knowledge?.cultural_meaning}
            </p>
          </div>

          {/* 3. Context & Weather Suitability */}
          <div className="p-3.5 rounded-xl border border-sky-200 bg-sky-50/50 space-y-1.5">
            <div className="flex items-center space-x-2 text-sky-900 text-xs font-bold">
              <MapPin className="w-4 h-4 text-sky-700" />
              <span>Độ Phù Hợp Bối Cảnh & Thời Tiết:</span>
            </div>
            <p className="text-xs text-stone-700 leading-relaxed">
              <strong className="text-stone-900">Phù hợp sự kiện: </strong>
              {stylistFeedback.context_suitability?.event_matching}
            </p>
            <p className="text-xs text-stone-700 leading-relaxed">
              <strong className="text-stone-900">Lưu ý thời tiết: </strong>
              {stylistFeedback.context_suitability?.weather_note}
            </p>
          </div>

          {/* 4. Cultural Preservation Warning (if any) */}
          {stylistFeedback.cultural_preservation_warning?.has_warning ? (
            <div className="p-3.5 rounded-xl border border-rose-400 bg-rose-50 text-rose-900 space-y-1">
              <div className="flex items-center space-x-2 text-xs font-bold text-rose-800">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>CẢNH BÁO BẢO TỒN VĂN HÓA (CULTURAL PRESERVATION WARNING):</span>
              </div>
              <p className="text-xs leading-relaxed font-medium">
                {stylistFeedback.cultural_preservation_warning?.warning_message}
              </p>
            </div>
          ) : (
            <div className="p-2.5 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-900 flex items-center space-x-2 text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-semibold">
                Chuẩn mực văn hóa: Phối đồ hoàn toàn chuẩn chỉ, tôn trọng tối đa giá trị di sản.
              </span>
            </div>
          )}

          {/* 5. Image Generation Prompt (ImageFX / Imagen) */}
          <div className="p-3 rounded-xl border border-purple-200 bg-purple-50/60 space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-purple-900">
                <ImageIcon className="w-4 h-4 text-purple-700" />
                <span>Prompt Tạo Ảnh Mockup / Lookbook (ImageFX / Imagen):</span>
              </div>
              <button
                onClick={copyImagePrompt}
                className="flex items-center space-x-1 px-2.5 py-1 rounded-md bg-white border border-purple-300 hover:bg-purple-100 text-purple-800 text-[11px] font-bold shadow-2xs transition-all"
              >
                {copiedPrompt ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-purple-700" />}
                <span>{copiedPrompt ? 'Đã sao chép!' : 'Sao chép Prompt'}</span>
              </button>
            </div>
            <p className="text-xs text-stone-700 italic bg-white p-2.5 rounded-lg border border-purple-200 font-mono leading-relaxed">
              "{stylistFeedback.image_generation_prompt}"
            </p>
          </div>
        </div>
      ) : (
        /* Starter Call to Action State */
        <div className="my-4 p-5 rounded-xl border border-dashed border-amber-300 bg-amber-50/40 text-center space-y-2">
          <Sparkles className="w-8 h-8 text-amber-600 mx-auto" />
          <h5 className="text-xs font-bold text-stone-800 uppercase tracking-wider">
            Bạn đã sẵn sàng cho diện mạo Việt Phục Remix?
          </h5>
          <p className="text-xs text-stone-600 max-w-sm mx-auto">
            Nhấn nút <strong>"Nhờ AI Stylist Tư Vấn"</strong> ở góc phải phía trên để nhận ngay phân tích phong cách, câu chuyện di sản và prompt tạo ảnh mockup độc bản!
          </p>
        </div>
      )}

      {/* Mini Chat / Quick Question Suggestion */}
      <div className="mt-2 space-y-2 pt-2 border-t border-stone-200">
        <span className="text-[11px] text-stone-600 font-bold block">
          Gợi Ý Tình Huống Phối Đồ Nhanh:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {[
            'Chụp kỷ yếu Văn Miếu nên tạo điểm nhấn Gen Z gì?',
            'Đi cà phê phố cổ Hà Nội mùa thu phối giày gì?',
            'Đi chùa mặc Việt Phục cần lưu ý chuẩn mực gì?',
          ].map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleConsultGemini(q)}
              className="text-[11px] px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200 transition-all text-left font-medium"
            >
              💬 {q}
            </button>
          ))}
        </div>
      </div>

      {/* Input query field */}
      <div className="mt-3 pt-3 border-t border-stone-200 flex items-center space-x-2">
        <input
          type="text"
          value={userQuery}
          onChange={(e) => setUserQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && userQuery.trim()) {
              handleConsultGemini();
            }
          }}
          placeholder="Nhập bối cảnh, vóc dáng hoặc phụ kiện muốn kết hợp..."
          className="flex-1 bg-stone-50 text-stone-900 text-xs px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:border-amber-500 focus:bg-white placeholder:text-stone-400 font-medium"
        />
        <button
          onClick={() => handleConsultGemini()}
          disabled={!userQuery.trim() || loading}
          className="p-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white disabled:opacity-50 transition-all shadow-xs"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

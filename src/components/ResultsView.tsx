import React, { useState } from 'react';
import { Look, GeminiStylistResponse, VerifiedSource } from '../types';
import { VERIFIED_SOURCES } from '../data/culturalDatabase';
import { Sparkles, Bookmark, BookmarkCheck, Check, Info, ShieldCheck, AlertCircle, RefreshCw, Layers, ExternalLink, HelpCircle, SplitSquareVertical, Image as ImageIcon } from 'lucide-react';

interface ResultsViewProps {
  response: GeminiStylistResponse;
  onSaveLook: (look: Look) => void;
  savedLookIds: string[];
  onRegenerate: () => void;
  onCompareLooks: (looks: Look[]) => void;
  onAnswerClarification: (answer: string) => void;
  onOpenLookInThreeD?: (look: Look) => void;
  onGenerateImageForLook?: (look: Look) => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  response,
  onSaveLook,
  savedLookIds,
  onRegenerate,
  onCompareLooks,
  onAnswerClarification,
  onOpenLookInThreeD,
  onGenerateImageForLook,
}) => {
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);
  const [clarificationInput, setClarificationInput] = useState('');

  const { clarification_question, looks, isDemoFallback } = response;

  const toggleCompareSelect = (id: string) => {
    if (selectedForCompare.includes(id)) {
      setSelectedForCompare(selectedForCompare.filter((i) => i !== id));
    } else {
      if (selectedForCompare.length < 3) {
        setSelectedForCompare([...selectedForCompare, id]);
      }
    }
  };

  const handleStartCompare = () => {
    const chosen = looks.filter((l) => selectedForCompare.includes(l.id));
    if (chosen.length >= 2) {
      onCompareLooks(chosen);
    }
  };

  // Helper to map citation ID to authentic source object
  const resolveCitations = (citationIds: string[] = []): VerifiedSource[] => {
    return citationIds
      .map((id) => VERIFIED_SOURCES.find((src) => src.id === id))
      .filter((src): src is VerifiedSource => Boolean(src));
  };

  return (
    <div className="space-y-6 text-left py-4">
      {/* Fallback Notice Badge if offline */}
      {isDemoFallback && (
        <div className="p-3.5 bg-amber-50/90 rounded-2xl border border-amber-300 flex items-start space-x-2.5">
          <Info className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
          <div className="text-xs text-stone-700">
            <span className="font-bold text-amber-950 block">Chế độ Kết Quả Mẫu (Local Demo Mode)</span>
            <span>
              Hệ thống đang hiển thị kết quả mẫu từ cơ sở dữ liệu di sản địa phương để đảm bảo trải nghiệm thử nghiệm mượt mà.
            </span>
          </div>
        </div>
      )}

      {/* CLARIFICATION QUESTION FROM AI IF ANY */}
      {clarification_question && (
        <div className="p-5 bg-rose-50/90 rounded-3xl border border-rose-300 text-left space-y-3 shadow-xs">
          <div className="flex items-center space-x-2 text-rose-900 font-bold text-sm">
            <HelpCircle className="w-5 h-5 text-rose-700 shrink-0" />
            <span>AI Stylist cần thêm một chút thông tin để gợi ý chuẩn xác:</span>
          </div>
          <p className="text-xs sm:text-sm text-stone-800 font-medium pl-7">
            "{clarification_question}"
          </p>
          <div className="flex items-center space-x-2 pt-1 pl-7">
            <input
              type="text"
              value={clarificationInput}
              onChange={(e) => setClarificationInput(e.target.value)}
              placeholder="Nhập câu trả lời của bạn..."
              className="flex-1 text-xs p-2.5 rounded-xl border border-rose-200 bg-white focus:outline-none focus:border-rose-500"
            />
            <button
              onClick={() => {
                if (clarificationInput.trim()) {
                  onAnswerClarification(clarificationInput.trim());
                }
              }}
              className="px-4 py-2.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold transition-all"
            >
              Gửi phản hồi
            </button>
          </div>
        </div>
      )}

      {/* Action Bar Header */}
      {looks && looks.length > 0 && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs">
          <div>
            <h3 className="font-serif-vi text-lg font-bold text-stone-900 flex items-center">
              <Sparkles className="w-4 h-4 text-amber-700 mr-2" />
              Đề Xuất Phối Đồ ({looks.length} Phương Án)
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Phân tách rõ ràng giữa thẩm mỹ phối đồ và dữ kiện văn hóa có nguồn.
            </p>
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            {selectedForCompare.length >= 2 && (
              <button
                onClick={handleStartCompare}
                className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-sky-700 hover:bg-sky-800 text-white text-xs font-bold transition-all shadow-2xs"
              >
                <SplitSquareVertical className="w-4 h-4" />
                <span>So sánh ({selectedForCompare.length})</span>
              </button>
            )}

            <button
              onClick={onRegenerate}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold border border-stone-300 transition-all ml-auto sm:ml-0"
            >
              <RefreshCw className="w-3.5 h-3.5 text-stone-600" />
              <span>Gợi ý lại</span>
            </button>
          </div>
        </div>
      )}

      {/* GRID OF MAXIMUM 3 LOOKS PER BRIEF */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {looks?.map((look, index) => {
          const isSaved = savedLookIds.includes(look.id);
          const isSelectedCompare = selectedForCompare.includes(look.id);

          return (
            <div
              key={look.id || index}
              className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-6 shadow-sm flex flex-col justify-between space-y-5 hover:border-amber-300 transition-all relative overflow-hidden"
            >
              {/* Badge Look Number */}
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">
                  Phương án #{index + 1}
                </span>

                <div className="flex items-center space-x-1">
                  <label className="flex items-center space-x-1 text-[11px] text-stone-500 font-medium cursor-pointer pr-1">
                    <input
                      type="checkbox"
                      checked={isSelectedCompare}
                      onChange={() => toggleCompareSelect(look.id)}
                      className="rounded text-sky-600 focus:ring-sky-500 w-3.5 h-3.5 cursor-pointer"
                    />
                    <span>So sánh</span>
                  </label>

                  <button
                    onClick={() => onSaveLook(look)}
                    className={`p-1.5 rounded-xl border transition-all cursor-pointer ${
                      isSaved
                        ? 'bg-amber-100 text-amber-900 border-amber-300'
                        : 'bg-stone-50 hover:bg-stone-100 text-stone-600 border-stone-200'
                    }`}
                    title={isSaved ? 'Đã lưu trong Lookbook' : 'Lưu vào Lookbook'}
                  >
                    {isSaved ? <BookmarkCheck className="w-4 h-4 text-amber-800" /> : <Bookmark className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Title & Occasion fit */}
              <div>
                <h4 className="font-serif-vi text-base sm:text-lg font-bold text-stone-900 leading-snug">
                  {look.name}
                </h4>
                <p className="text-xs text-stone-600 mt-1.5 leading-relaxed bg-[#FAF8F5] p-2.5 rounded-xl border border-stone-100">
                  🎯 <strong>Phù hợp với dịp:</strong> {look.occasion_fit}
                </p>
              </div>

              {/* Items Breakdown Table/List */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
                  Các Món Đồ Phối Hợp:
                </span>
                <div className="space-y-2">
                  {look.items?.map((item, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-stone-50/70 border border-stone-200/80 text-xs">
                      <div className="flex items-center justify-between font-bold text-stone-800">
                        <span>{item.name}</span>
                        <span className="text-[10px] px-1.5 py-0.2 bg-white rounded border border-stone-200 text-amber-900">
                          {item.color}
                        </span>
                      </div>
                      <span className="text-[11px] text-stone-500 block mt-0.5 font-normal">
                        Vai trò: {item.role} • {item.reason}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION A: STYLISTIC SUGGESTIONS (GỢI Ý THẨM MỸ) */}
              <div className="p-3 bg-amber-50/50 rounded-2xl border border-amber-200/80 text-xs space-y-1">
                <span className="text-[11px] font-bold text-amber-950 flex items-center">
                  <Sparkles className="w-3.5 h-3.5 text-amber-700 mr-1" />
                  Gợi Ý Thẩm Mỹ Đương Đại:
                </span>
                <p className="text-stone-700 leading-relaxed font-normal">
                  {look.stylistic_suggestions}
                </p>
                <span className="text-[9px] text-amber-800/80 italic block pt-1">
                  *Gợi ý mang tính tham khảo phối đồ, không phải quy chuẩn lịch sử duy nhất.
                </span>
              </div>

              {/* SECTION B: CULTURAL NOTES (THẺ THÔNG TIN VĂN HÓA - SEPARATED BY RULE) */}
              <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-stone-900 flex items-center">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 mr-1" />
                    Thông Tin Văn Hóa:
                  </span>
                </div>

                {look.cultural_notes && look.cultural_notes.length > 0 ? (
                  look.cultural_notes.map((note, nIdx) => {
                    const citations = resolveCitations(note.citation_ids);
                    const isVerified = note.verification_status === 'verified' && citations.length > 0;

                    return (
                      <div key={nIdx} className="space-y-1.5 pt-1">
                        <div className="flex items-start space-x-1.5">
                          <span
                            className={`px-1.5 py-0.5 rounded text-[9px] font-bold shrink-0 mt-0.5 ${
                              isVerified
                                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                                : 'bg-amber-100 text-amber-900 border border-amber-300'
                            }`}
                          >
                            {isVerified ? '✓ Đã xác minh' : 'Minh họa'}
                          </span>
                          <p className="text-stone-700 leading-relaxed text-xs">
                            {note.text}
                          </p>
                        </div>

                        {/* Citation Details mapping strictly to authentic sources */}
                        {isVerified && (
                          <div className="pl-2 border-l-2 border-emerald-400 text-[11px] text-stone-500 space-y-0.5">
                            {citations.map((c) => (
                              <div key={c.id}>
                                <span className="font-semibold text-stone-700">Nguồn: {c.title}</span>
                                <span className="block text-[10px]">{c.authorOrInstitution} ({c.publicationYear})</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {!isVerified && (
                          <p className="text-[10px] text-amber-800 italic pl-2 border-l-2 border-amber-400">
                            Nội dung minh họa — Chưa có thông tin đã xác minh trong dữ liệu demo.
                          </p>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <p className="text-[11px] text-stone-500 italic">
                    Chưa có thông tin đã xác minh trong dữ liệu demo.
                  </p>
                )}
              </div>

              {/* Uncertainties or Care note if provided */}
              {look.care_note && (
                <div className="text-[11px] text-stone-600 bg-white p-2 rounded-xl border border-stone-200">
                  <span className="font-semibold text-stone-800">Lưu ý giữ gìn: </span>
                  {look.care_note}
                </div>
              )}

              {/* Action Buttons: 3D Preview & AI Image Generation */}
              <div className="space-y-2 pt-1">
                {onOpenLookInThreeD && (
                  <button
                    type="button"
                    onClick={() => onOpenLookInThreeD(look)}
                    className="w-full py-2.5 px-3 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 text-amber-950 font-bold text-xs border border-amber-300 transition-all flex items-center justify-center space-x-1.5 cursor-pointer shadow-2xs active:scale-95"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                    <span>Mở Xem Demo 3D Look Này (360°)</span>
                  </button>
                )}

                {onGenerateImageForLook && (
                  <button
                    type="button"
                    onClick={() => onGenerateImageForLook(look)}
                    className="w-full py-2.5 px-3 rounded-2xl bg-gradient-to-r from-rose-50 to-pink-50 hover:from-rose-100 hover:to-pink-100 text-rose-950 font-bold text-xs border border-rose-300 transition-all flex items-center justify-center space-x-1.5 cursor-pointer shadow-2xs active:scale-95"
                  >
                    <ImageIcon className="w-3.5 h-3.5 text-rose-700" />
                    <span>Tạo Ảnh Chân Thực AI Cho Look Này</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

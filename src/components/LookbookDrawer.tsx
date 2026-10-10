import React from 'react';
import { SavedLookbookEntry } from '../types';
import { X, Trash2, Bookmark, ExternalLink, Calendar, Copy, Check } from 'lucide-react';

interface LookbookDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  entries: SavedLookbookEntry[];
  onRemoveEntry: (id: string) => void;
  onClearAll: () => void;
}

export const LookbookDrawer: React.FC<LookbookDrawerProps> = ({
  isOpen,
  onClose,
  entries,
  onRemoveEntry,
  onClearAll,
}) => {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopyLookSummary = (entry: SavedLookbookEntry) => {
    const text = `Look Việt Phục: ${entry.look.name}
Phù hợp: ${entry.look.occasion_fit}
Món đồ: ${entry.look.items.map((i) => `${i.name} (${i.color})`).join(', ')}
Gợi ý: ${entry.look.stylistic_suggestions}`;
    navigator.clipboard.writeText(text);
    setCopiedId(entry.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-stone-900/40 backdrop-blur-2xs">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between text-left border-l border-stone-200 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-5 border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bookmark className="w-5 h-5 text-amber-800" />
            <h3 className="font-serif-vi text-lg font-bold text-stone-900">
              Lookbook Việt Phục ({entries.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-600 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          <p className="text-xs text-stone-500 bg-amber-50/70 p-3 rounded-xl border border-amber-200/80">
            📌 Các phương án này được lưu tạm trên bộ nhớ trình duyệt máy bạn (localStorage), không gửi hay lưu trữ bất kỳ thông tin cá nhân nào lên server.
          </p>

          {entries.length === 0 ? (
            <div className="py-16 text-center text-stone-400 space-y-2">
              <Bookmark className="w-10 h-10 text-stone-300 mx-auto" />
              <p className="text-sm font-semibold text-stone-600">Lookbook đang trống</p>
              <p className="text-xs text-stone-400 max-w-xs mx-auto">
                Khi nhận được gợi ý ưng ý, hãy nhấn nút biểu tượng Bookmark để lưu lại vào đây nhé.
              </p>
            </div>
          ) : (
            <div className="space-y-3.5">
              {entries.map((entry) => (
                <div
                  key={entry.id}
                  className="p-4 rounded-2xl border border-stone-200 bg-stone-50/60 space-y-2.5 relative group hover:border-amber-300 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <h4 className="font-serif-vi text-sm font-bold text-stone-900 pr-6">
                      {entry.look.name}
                    </h4>
                    <button
                      onClick={() => onRemoveEntry(entry.id)}
                      className="text-stone-400 hover:text-rose-600 p-1 cursor-pointer"
                      title="Xóa phương án này"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-stone-600 line-clamp-2">
                    {entry.look.stylistic_suggestions}
                  </p>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {entry.look.items.map((i, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-white border border-stone-200 text-stone-700"
                      >
                        {i.name}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-[10px] text-stone-400">
                    <span>Lưu lúc: {entry.savedAt}</span>
                    <button
                      onClick={() => handleCopyLookSummary(entry)}
                      className="flex items-center space-x-1 text-amber-800 hover:underline font-bold cursor-pointer"
                    >
                      {copiedId === entry.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedId === entry.id ? 'Đã sao chép' : 'Sao chép tóm tắt'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {entries.length > 0 && (
          <div className="p-4 border-t border-stone-100 bg-stone-50 flex items-center justify-between">
            <button
              onClick={onClearAll}
              className="text-xs text-rose-700 hover:underline font-bold cursor-pointer"
            >
              Xóa tất cả lookbook
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-900 text-white text-xs font-bold transition-all cursor-pointer"
            >
              Đóng
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

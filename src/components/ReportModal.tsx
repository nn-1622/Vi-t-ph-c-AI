import React, { useState } from 'react';
import { X, AlertCircle, CheckCircle2, Send } from 'lucide-react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose }) => {
  const [topic, setTopic] = useState('Thông tin văn hóa cần kiểm chứng lại');
  const [content, setContent] = useState('');
  const [sourceRef, setSourceRef] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-2xs">
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 max-w-lg w-full shadow-2xl text-left space-y-5">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center space-x-2 text-rose-800">
            <AlertCircle className="w-5 h-5" />
            <h3 className="font-serif-vi text-lg font-bold text-stone-900">
              Góp Ý / Báo Nội Dung Cần Kiểm Tra
            </h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl bg-stone-100 text-stone-600 hover:text-stone-900 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h4 className="font-bold text-stone-900 text-sm">Cảm ơn bạn đã đóng góp!</h4>
            <p className="text-xs text-stone-600 max-w-xs mx-auto">
              Ý kiến của bạn giúp chúng tôi rà soát và nâng cao tính chân xác của kho dữ liệu văn hóa.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
            <p className="text-xs text-stone-600">
              Nếu bạn phát hiện chi tiết nào chưa chuẩn xác về trang phục hoặc muốn đề xuất thêm tư liệu lịch sử có nguồn, hãy chia sẻ cùng chúng tôi:
            </p>

            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-800">Vấn đề cần phản ánh</label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-stone-300 bg-stone-50 focus:bg-white"
              >
                <option value="Thông tin văn hóa cần kiểm chứng lại">Thông tin văn hóa cần kiểm chứng lại</option>
                <option value="Đề xuất nguồn tài liệu học thuật / bảo tàng mới">Đề xuất nguồn tài liệu học thuật / bảo tàng mới</option>
                <option value="Gợi ý cách phối đồ chưa hợp lý">Gợi ý cách phối đồ chưa hợp lý</option>
                <option value="Ý kiến khác">Ý kiến khác</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-800">Mô tả chi tiết *</label>
              <textarea
                rows={3}
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Nêu rõ tên trang phục hoặc nội dung cần kiểm tra..."
                className="w-full text-xs p-3 rounded-xl border border-stone-300 bg-stone-50 focus:bg-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-800">Nguồn dẫn chứng (nếu có)</label>
              <input
                type="text"
                value={sourceRef}
                onChange={(e) => setSourceRef(e.target.value)}
                placeholder="Tên sách, bài báo nghiên cứu, bảo tàng..."
                className="w-full text-xs p-2.5 rounded-xl border border-stone-300 bg-stone-50 focus:bg-white"
              />
            </div>

            <div className="pt-2 flex items-center justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold cursor-pointer"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-rose-800 hover:bg-rose-700 text-white text-xs font-bold cursor-pointer flex items-center space-x-1"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Gửi góp ý</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

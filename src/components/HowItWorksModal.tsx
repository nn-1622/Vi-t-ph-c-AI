import React from 'react';
import { X, HelpCircle, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowItWorksModal: React.FC<HowItWorksModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-2xs">
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 max-w-2xl w-full shadow-2xl text-left space-y-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-stone-100 pb-4">
          <div className="flex items-center space-x-2">
            <HelpCircle className="w-5 h-5 text-amber-800" />
            <h3 className="font-serif-vi text-xl font-bold text-stone-900">
              Cách Hoạt Động Của Việt Phục AI Stylist
            </h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl bg-stone-100 text-stone-600 hover:text-stone-900 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed">
          <p>
            <strong>Việt Phục AI Stylist</strong> được thiết kế theo nguyên tắc <strong>AI Có Trách Nhiệm (Responsible AI)</strong> dành cho di sản văn hóa, giúp học sinh - sinh viên tìm tòi và ứng dụng cổ phục vào đời sống một cách văn minh.
          </p>

          <div className="space-y-3 pt-2">
            <div className="p-3.5 bg-amber-50/70 rounded-2xl border border-amber-200">
              <span className="font-bold text-amber-950 block text-xs uppercase mb-1">
                Bước 1: Tiếp nhận nhu cầu cá nhân
              </span>
              <p className="text-xs text-stone-600">
                Người dùng chọn dịp (ngày hội trường, chụp ảnh, lễ hội...), loại trang phục, màu sắc yêu thích và phong cách mong muốn.
              </p>
            </div>

            <div className="p-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-200">
              <span className="font-bold text-emerald-950 block text-xs uppercase mb-1">
                Bước 2: Cung cấp ngữ cảnh đã xác minh (Grounding)
              </span>
              <p className="text-xs text-stone-600">
                Hệ thống nạp danh mục trang phục cùng các dữ kiện văn hóa từ nguồn lưu trữ đáng tin cậy (Bảo tàng Lịch sử, Cục Di sản Văn hóa) vào prompt gửi cho mô hình Gemini.
              </p>
            </div>

            <div className="p-3.5 bg-sky-50/70 rounded-2xl border border-sky-200">
              <span className="font-bold text-sky-950 block text-xs uppercase mb-1">
                Bước 3: Tách biệt rõ ràng gợi ý thẩm mỹ và dữ kiện lịch sử
              </span>
              <p className="text-xs text-stone-600">
                Gemini được chỉ dẫn nghiêm ngặt: Gợi ý cách phối đồ chỉ là ý tưởng thẩm mỹ mang tính tham khảo, không tự bịa nguồn trích dẫn hay áp đặt một quy chuẩn duy nhất.
              </p>
            </div>

            <div className="p-3.5 bg-rose-50/70 rounded-2xl border border-rose-200">
              <span className="font-bold text-rose-950 block text-xs uppercase mb-1">
                Bước 4: Kiểm tra và minh bạch nhãn nguồn
              </span>
              <p className="text-xs text-stone-600">
                Giao diện đối chiếu mã nguồn trích dẫn; nếu không có nguồn kiểm chứng, nội dung lập tức được gắn nhãn minh bạch "Nội dung minh họa — cần xác minh".
              </p>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-stone-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-stone-900 text-white font-bold text-xs hover:bg-stone-800 cursor-pointer"
          >
            Đã hiểu
          </button>
        </div>
      </div>
    </div>
  );
};

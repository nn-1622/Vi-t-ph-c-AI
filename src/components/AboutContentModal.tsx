import React from 'react';
import { X, BookOpen, ShieldCheck, ExternalLink, Info, AlertTriangle } from 'lucide-react';
import { VERIFIED_SOURCES } from '../data/culturalDatabase';

interface AboutContentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutContentModal: React.FC<AboutContentModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-2xs">
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 max-w-2xl w-full shadow-2xl text-left space-y-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-stone-100 pb-4">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-rose-800" />
            <h3 className="font-serif-vi text-xl font-bold text-stone-900">
              Về Nội Dung & Nguồn Tư Liệu Lịch Sử
            </h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl bg-stone-100 text-stone-600 hover:text-stone-900 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed">
          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-950 space-y-1.5">
            <span className="font-bold flex items-center">
              <ShieldCheck className="w-4 h-4 text-amber-800 mr-1.5" />
              Chính sách biên tập nội dung minh bạch
            </span>
            <p>
              Để bảo tồn tính chân xác của di sản dân tộc, ứng dụng phân biệt rõ 2 loại nội dung trên giao diện:
            </p>
            <ul className="list-disc list-inside space-y-1 pt-1 font-medium">
              <li>
                <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-900 font-bold">✓ Đã xác minh</span>:
                Thông tin được đối chiếu từ tài liệu học thuật, bảo tàng hoặc hồ sơ di sản chính thống.
              </li>
              <li>
                <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 font-bold">Minh họa</span>:
                Ý tưởng phối đồ mang tính khám phá cá nhân hoặc phụ kiện remix hiện đại, chưa coi là quy chuẩn lịch sử.
              </li>
            </ul>
          </div>

          <div className="space-y-3 pt-2">
            <span className="font-bold text-stone-900 text-xs uppercase tracking-wider block">
              Danh mục nguồn tư liệu đã đối chiếu trong dữ liệu demo:
            </span>

            <div className="space-y-3">
              {VERIFIED_SOURCES.map((src) => (
                <div key={src.id} className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 space-y-1">
                  <div className="flex items-start justify-between">
                    <h5 className="font-bold text-stone-900 text-xs sm:text-sm">{src.title}</h5>
                    {src.url ? (
                      <a
                        href={src.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-amber-800 hover:underline flex items-center text-xs shrink-0 ml-2"
                      >
                        <span>Cổng tra cứu</span>
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    ) : (
                      <span className="text-[10px] text-stone-400 shrink-0 ml-2 italic">Ấn phẩm sách xuất bản</span>
                    )}
                  </div>
                  <p className="text-xs text-stone-600">
                    <strong>Đơn vị / Tác giả:</strong> {src.authorOrInstitution} ({src.publicationYear})
                  </p>
                  <p className="text-[11px] text-stone-500">{src.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3.5 bg-stone-100 rounded-2xl text-xs text-stone-600 space-y-1">
            <strong>Lưu ý cho đội thi & người dùng:</strong>
            <p>
              Dữ liệu demo là bộ khung kiểm thử. Trước khi công bố phiên bản hoàn chỉnh cho cộng đồng, tất cả nội dung cần được hội đồng chuyên môn hoặc người thực hành di sản rà soát kỹ lưỡng.
            </p>
          </div>
        </div>

        <div className="pt-2 border-t border-stone-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-stone-900 text-white font-bold text-xs hover:bg-stone-800 cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

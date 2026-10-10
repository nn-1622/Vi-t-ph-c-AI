import React from 'react';
import { LookbookCardData, OutfitConfig } from '../types';
import { GARMENTS } from '../data/mockData';
import { Camera, Sparkles, Trash2, ArrowUpRight, MapPin } from 'lucide-react';

interface LookbookListProps {
  lookbooks: LookbookCardData[];
  onSelectLookbook: (config: OutfitConfig) => void;
  onDeleteLookbook: (id: string) => void;
  onNewOutfit: () => void;
}

export const LookbookList: React.FC<LookbookListProps> = ({
  lookbooks,
  onSelectLookbook,
  onDeleteLookbook,
  onNewOutfit,
}) => {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 text-left pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-amber-200/80 shadow-xs">
        <div>
          <h2 className="font-serif-vi text-xl sm:text-2xl font-bold text-stone-900">
            Bộ Sưu Tập Lookbook Việt Phục Của Bạn
          </h2>
          <p className="text-xs text-stone-600 mt-1">
            Tổng hợp những bộ trang phục bạn đã dày công phối đồ, thẩm định chuẩn mực văn hóa và xuất bản thành lookbook.
          </p>
        </div>
        <button
          onClick={onNewOutfit}
          className="flex items-center space-x-1.5 px-4 py-2 bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 hover:to-rose-500 text-white text-xs font-bold rounded-xl shadow-xs transition-all active:scale-95"
        >
          <Sparkles className="w-4 h-4" />
          <span>Tạo Phối Đồ Mới</span>
        </button>
      </div>

      {lookbooks.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-dashed border-stone-300 bg-white">
          <Camera className="w-10 h-10 text-stone-400 mx-auto mb-3" />
          <h4 className="text-sm font-bold text-stone-800">Chưa có Lookbook nào được lưu</h4>
          <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
            Hãy vào phòng Studio Phối Đồ, tùy chỉnh trang phục và nhấn nút "Tạo Lookbook" để lưu giữ tác phẩm của bạn nhé!
          </p>
          <button
            onClick={onNewOutfit}
            className="mt-4 px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-xl shadow-xs"
          >
            Bắt đầu phối ngay
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lookbooks.map((lb) => {
            const garment = GARMENTS.find((g) => g.id === lb.config.garmentId) || GARMENTS[0];
            return (
              <div
                key={lb.id}
                className="group relative rounded-2xl overflow-hidden border border-stone-200 bg-white hover:border-amber-400 hover:shadow-md transition-all p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full font-bold bg-amber-100 text-amber-900 border border-amber-300">
                      {garment.dynasty}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteLookbook(lb.id);
                      }}
                      className="text-stone-400 hover:text-rose-600 p-1"
                      title="Xóa Lookbook"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <h3 className="font-serif-vi text-base font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                    {lb.title}
                  </h3>

                  <div className="flex items-center space-x-2 my-2.5">
                    <span
                      className="w-4 h-4 rounded-full border border-stone-300 inline-block shadow-2xs"
                      style={{ backgroundColor: lb.config.outerColor }}
                    />
                    <span
                      className="w-4 h-4 rounded-full border border-stone-300 inline-block shadow-2xs"
                      style={{ backgroundColor: lb.config.innerPantsColor }}
                    />
                    <span className="text-xs text-stone-600 font-semibold">
                      {garment.name}
                    </span>
                  </div>

                  <p className="text-xs text-stone-700 italic line-clamp-2 bg-stone-50 p-2.5 rounded-xl border border-stone-200 font-medium">
                    "{lb.poem}"
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                  <div className="text-[10px] text-stone-500 font-medium">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3 text-stone-400" />
                      <span>{lb.config.city}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectLookbook(lb.config)}
                    className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-amber-600 hover:text-white text-stone-800 text-xs font-bold transition-all"
                  >
                    <span>Mở Trên Canvas</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

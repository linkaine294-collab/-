import React, { useState, useEffect } from 'react';
import { Spot, DayPlan } from '../types/itinerary';
import { SafeImage } from './SafeImage';
import {
  X,
  ExternalLink,
  Navigation,
  Compass,
  Clock,
  MapPin,
  Sparkles,
  Bed,
  UtensilsCrossed,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Edit3,
  Trash2,
  Film,
} from 'lucide-react';
import { getGoogleMapsSpotUrl, getGoogleMapsNavigateUrl } from '../utils/mapUtils';
import { GOURMET_DINING, LUXURY_HOTELS } from './HotelDiningGuide';

interface SpotDetailModalProps {
  spot: Spot | null;
  dayPlan?: DayPlan;
  onClose: () => void;
  onEdit?: (spot: Spot) => void;
  onDelete?: (spotId: string) => void;
  onOpenVideos?: (country?: string) => void;
}

export const SpotDetailModal: React.FC<SpotDetailModalProps> = ({
  spot,
  dayPlan,
  onClose,
  onEdit,
  onDelete,
  onOpenVideos,
}) => {
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    setActiveImgIndex(0);
  }, [spot]);

  // Handle ESC key for lightbox & modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxOpen) {
          setLightboxOpen(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, onClose]);

  if (!spot) return null;

  const images = spot.images && spot.images.length > 0 ? spot.images : [
    {
      url: '/src/assets/images/gamla_stan_stockholm_winter_1791104433260.jpg',
      caption: '北歐奢華冬日風景',
      author: 'Google AI Studio Editorial',
      license: 'Editorial License',
    },
  ];

  const currentImage = images[activeImgIndex] || images[0];

  const handlePrevImg = () => {
    setActiveImgIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImg = () => {
    setActiveImgIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      {/* Main Modal Backdrop */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
        <div className="relative w-full max-w-3xl my-auto bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 bg-slate-950/70 hover:bg-slate-900 border border-slate-700 text-slate-300 hover:text-white rounded-full transition-colors backdrop-blur-xs"
            aria-label="關閉"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Media Header / Carousel */}
          <div className="relative w-full h-64 sm:h-84 shrink-0 bg-slate-950">
            <SafeImage
              src={currentImage.url}
              alt={currentImage.caption || spot.name}
              aspectRatioClass="h-full w-full"
              author={currentImage.author}
              license={currentImage.license}
              showCredit={true}
              className="cursor-pointer object-cover"
              onClick={() => setLightboxOpen(true)}
            />

            {/* Lightbox trigger badge */}
            <button
              onClick={() => setLightboxOpen(true)}
              className="absolute top-4 left-4 z-10 px-3 py-1.5 bg-slate-950/70 hover:bg-slate-900 text-slate-200 hover:text-white rounded-lg text-xs font-medium backdrop-blur-sm border border-slate-700 flex items-center gap-1.5 transition-colors"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>點擊放大圖片</span>
            </button>

            {/* Carousel navigation arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImg}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-slate-950/60 hover:bg-slate-900 border border-slate-700 text-white rounded-full backdrop-blur-xs transition-colors"
                  aria-label="上一張圖片"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextImg}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-slate-950/60 hover:bg-slate-900 border border-slate-700 text-white rounded-full backdrop-blur-xs transition-colors"
                  aria-label="下一張圖片"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Thumbnail dots/bar */}
            {images.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 bg-slate-950/70 rounded-full backdrop-blur-xs border border-slate-800">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImgIndex(idx)}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === activeImgIndex ? 'w-5 bg-emerald-400' : 'w-1.5 bg-slate-500 hover:bg-slate-300'
                    }`}
                    aria-label={`切換至圖片 ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Photo Gallery Thumbnails Strip (When multiple photos available) */}
          {images.length > 1 && (
            <div className="px-6 pt-3 pb-1 bg-slate-950/40 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="text-[11px] font-medium text-slate-400 shrink-0">
                全部圖片 ({images.length})：
              </span>
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImgIndex(idx)}
                  className={`relative w-14 h-10 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                    idx === activeImgIndex
                      ? 'border-emerald-400 scale-105 shadow-md'
                      : 'border-slate-700 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img.url}
                    alt={img.caption || `相片 ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Modal Body */}
          <div className="p-6 overflow-y-auto space-y-6 text-slate-200">
            {/* Header info */}
            <div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-1.5">
                <span className="text-emerald-400 font-semibold">Day {spot.day}</span>
                <span>·</span>
                <span>{spot.city}</span>
                <span>·</span>
                <span>{spot.country}</span>
                {spot.time && (
                  <>
                    <span>·</span>
                    <span className="flex items-center gap-1 text-slate-300">
                      <Clock className="w-3 h-3" />
                      {spot.time}
                    </span>
                  </>
                )}
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                {spot.name}
              </h2>
              {spot.originalName && (
                <p className="text-sm font-sans text-slate-400 mt-0.5 tracking-wide">
                  {spot.originalName}
                </p>
              )}
            </div>

            {/* Detailed Description */}
            <div className="text-sm sm:text-base leading-relaxed text-slate-300 space-y-3 font-sans">
              <p className="whitespace-pre-line">{spot.description}</p>
            </div>

            {/* Travel Tips */}
            {spot.tips && spot.tips.length > 0 && (
              <div className="p-4 rounded-xl bg-slate-950/60 border border-emerald-900/40">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm mb-2.5">
                  <Sparkles className="w-4 h-4" />
                  <span>旅行小提醒 & 最佳體驗建議</span>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-sans">
                  {spot.tips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✦</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Hotel & Dining Recommendations */}
            {(() => {
              const hotelName = spot.hotelRecommendation?.name || dayPlan?.hotel;
              const hotelDesc = spot.hotelRecommendation?.description || dayPlan?.hotelDetail;
              const diningMatch = spot.diningRecommendation || GOURMET_DINING.find((d) => d.dayOccurrences.includes(spot.day));

              if (!hotelName && !diningMatch) return null;

              return (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {/* Hotel */}
                  {hotelName && (
                    <div className="p-3.5 rounded-2xl bg-slate-800/50 border border-slate-700/70 flex flex-col justify-between shadow-md">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-xl bg-indigo-500/15 text-indigo-400 shrink-0">
                          <Bed className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-0.5">
                            推薦住宿飯店
                          </h4>
                          <p className="text-sm font-bold text-white">
                            {hotelName}
                          </p>
                          {hotelDesc && (
                            <p className="text-xs text-slate-400 mt-1 leading-snug">
                              {hotelDesc}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="mt-3 pt-2 border-t border-slate-700/60 flex justify-end">
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotelName + ' ' + spot.city)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1"
                        >
                          <span>查看飯店地圖</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Dining */}
                  {diningMatch && (
                    <div className="p-3.5 rounded-2xl bg-slate-800/50 border border-slate-700/70 flex flex-col justify-between shadow-md">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-xl bg-rose-500/15 text-rose-400 shrink-0">
                          <UtensilsCrossed className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold text-rose-300 uppercase tracking-wider mb-0.5">
                            推薦美食餐廳
                          </h4>
                          <p className="text-sm font-bold text-white">
                            {diningMatch.name}
                          </p>
                          <p className="text-xs text-slate-400 mt-1 leading-snug">
                            {diningMatch.description}
                          </p>
                          {'signatureDish' in diningMatch && Boolean((diningMatch as { signatureDish?: string }).signatureDish) && (
                            <p className="text-[11px] text-amber-300/90 mt-1.5 font-medium">
                              ★ 招牌必點：{String((diningMatch as { signatureDish?: string }).signatureDish)}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="mt-3 pt-2 border-t border-slate-700/60 flex justify-end">
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(diningMatch.name + ' ' + spot.city)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-rose-400 hover:text-rose-300 font-medium flex items-center gap-1"
                        >
                          <span>查看餐廳地圖</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* Address */}
            {spot.address && (
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span className="truncate">{spot.address}</span>
              </div>
            )}

            {/* Action Bar */}
            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {onEdit && (
                  <button
                    onClick={() => onEdit(spot)}
                    className="px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>編輯景點</span>
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={() => {
                      if (confirm(`確定要刪除景點「${spot.name}」嗎？`)) {
                        onDelete(spot.id);
                        onClose();
                      }
                    }}
                    className="px-3 py-2 text-xs font-medium text-rose-400 hover:text-rose-300 bg-rose-950/30 hover:bg-rose-950/60 border border-rose-900/50 rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>刪除</span>
                  </button>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                {onOpenVideos && (
                  <button
                    onClick={() => onOpenVideos(spot.country)}
                    className="px-4 py-2 text-xs font-semibold text-cyan-300 hover:text-white bg-cyan-950/70 hover:bg-cyan-900 border border-cyan-500/40 rounded-lg transition-colors flex items-center gap-1.5 shadow-md cursor-pointer"
                  >
                    <Film className="w-3.5 h-3.5 text-cyan-400" />
                    <span>查看景點影片</span>
                  </button>
                )}
                <a
                  href={getGoogleMapsSpotUrl(spot)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-xs font-semibold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>在 Google 地圖開啟</span>
                </a>
                <a
                  href={getGoogleMapsNavigateUrl(spot)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center gap-1.5 shadow-lg shadow-emerald-500/20"
                >
                  <Navigation className="w-3.5 h-3.5 fill-current" />
                  <span>導航到這裡</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-60 bg-black/95 flex flex-col items-center justify-center p-4">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-5 right-5 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-md"
            aria-label="關閉燈箱"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Lightbox Image */}
          <div className="relative max-w-5xl max-h-[80vh] flex flex-col items-center justify-center">
            <img
              src={currentImage.url}
              alt={currentImage.caption || spot.name}
              className="max-h-[75vh] w-auto max-w-full object-contain rounded-lg shadow-2xl"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  '/src/assets/images/gamla_stan_stockholm_winter_1791104433260.jpg';
              }}
            />
            <div className="mt-4 text-center">
              <p className="text-white text-base font-serif font-medium">
                {currentImage.caption || spot.name}
              </p>
              {currentImage.author && (
                <p className="text-xs text-slate-400 mt-1">
                  攝影授權：{currentImage.author} {currentImage.license ? `(${currentImage.license})` : ''}
                </p>
              )}
            </div>
          </div>

          {/* Navigation inside Lightbox */}
          {images.length > 1 && (
            <div className="flex items-center gap-4 mt-4">
              <button
                onClick={handlePrevImg}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-medium transition-colors flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" /> 上一張
              </button>
              <span className="text-xs text-slate-400 font-mono">
                {activeImgIndex + 1} / {images.length}
              </span>
              <button
                onClick={handleNextImg}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-medium transition-colors flex items-center gap-1"
              >
                下一張 <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

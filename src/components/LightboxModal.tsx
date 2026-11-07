import React, { useEffect } from 'react';
import { X, ZoomIn, ChevronLeft, ChevronRight, Download, Cpu } from 'lucide-react';
import { GalleryItem } from '../types/portfolio';

interface LightboxModalProps {
  item: GalleryItem | null;
  allItems?: GalleryItem[];
  onClose: () => void;
  onNavigate?: (direction: 'prev' | 'next') => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  item,
  allItems = [],
  onClose,
  onNavigate,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onNavigate) onNavigate('prev');
      if (e.key === 'ArrowRight' && onNavigate) onNavigate('next');
    };

    if (item) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose, onNavigate]);

  if (!item) return null;

  const currentIndex = allItems.findIndex((i) => i.id === item.id);
  const hasNav = allItems.length > 1 && onNavigate;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#081325]/90 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-[#1E293B] border border-[#334155] rounded-[4px] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-[#334155] bg-[#101B2D]">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold tracking-wider text-[#22D3EE] uppercase">
              <Cpu className="w-3.5 h-3.5 text-[#22D3EE]" />
              {item.tool} // {item.stage}
            </span>
            <span className="hidden sm:inline text-xs text-[#94A3B8]">·</span>
            <span className="hidden sm:inline text-xs text-[#94A3B8] font-mono">
              [ASSET ID: {item.id}]
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={item.imagePath}
              download
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono text-[#94A3B8] hover:text-[#22D3EE] border border-[#334155] hover:border-[#22D3EE] rounded-[4px] transition-colors"
              title="Download original image"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Download Raw</span>
            </a>
            <button
              onClick={onClose}
              className="p-1.5 text-[#94A3B8] hover:text-[#F8FAFC] border border-[#334155] hover:border-[#22D3EE] rounded-[4px] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body: Image & Telemetry Split */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 min-h-0">
          {/* Main Visual Display */}
          <div className="lg:col-span-8 relative flex items-center justify-center p-4 sm:p-6 bg-[#081325]/70 border-b lg:border-b-0 lg:border-r border-[#334155]">
            <img
              src={item.imagePath}
              alt={item.title}
              className="max-h-[60vh] lg:max-h-[70vh] w-auto max-w-full object-contain rounded-[2px] border border-[#334155]/60 shadow-lg"
            />

            {/* Navigation Arrows */}
            {hasNav && (
              <>
                <button
                  onClick={() => onNavigate('prev')}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-[#101B2D]/80 hover:bg-[#101B2D] text-[#94A3B8] hover:text-[#22D3EE] border border-[#334155] rounded-[4px] transition-colors"
                  aria-label="Previous screenshot"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onNavigate('next')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-[#101B2D]/80 hover:bg-[#101B2D] text-[#94A3B8] hover:text-[#22D3EE] border border-[#334155] rounded-[4px] transition-colors"
                  aria-label="Next screenshot"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {/* Technical Telemetry & Notes Panel */}
          <div className="lg:col-span-4 p-5 sm:p-6 flex flex-col justify-between bg-[#152032] space-y-5">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#22D3EE] mb-1.5">
                <span>{item.category}</span>
                {currentIndex >= 0 && (
                  <>
                    <span className="text-[#334155]">/</span>
                    <span className="text-[#94A3B8]">
                      {currentIndex + 1} of {allItems.length}
                    </span>
                  </>
                )}
              </div>

              <h3 id="modal-title" className="text-lg font-semibold text-[#F8FAFC] tracking-tight">
                {item.title}
              </h3>

              <p className="mt-3 text-sm text-[#94A3B8] leading-relaxed">
                {item.description}
              </p>

              {/* Technical Parameter Notes */}
              <div className="mt-5 pt-4 border-t border-[#334155]">
                <h4 className="font-mono text-[11px] font-semibold text-[#F59E0B] uppercase tracking-wider mb-2.5">
                  Extracted Telemetry & Metrics
                </h4>
                <ul className="space-y-2">
                  {item.technicalNotes.map((note, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-xs font-mono text-[#D8E3FC]"
                    >
                      <span className="text-[#22D3EE] mt-0.5">▸</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-[#334155] text-[11px] font-mono text-[#94A3B8] flex items-center justify-between">
              <span>Aspect: {item.aspectRatio}</span>
              <span>Cadence Innovus</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

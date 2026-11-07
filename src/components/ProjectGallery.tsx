import React, { useState } from 'react';
import { galleryItems } from '../data/gallery';
import { GalleryItem } from '../types/portfolio';
import { Maximize2, Cpu, Terminal, Filter, ZoomIn } from 'lucide-react';

interface ProjectGalleryProps {
  onOpenLightbox: (item: GalleryItem) => void;
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({ onOpenLightbox }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'CVA6 Floorplan',
    'Congestion',
    'Density',
    'Terminal Telemetry',
  ];

  const filteredItems =
    selectedCategory === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  return (
    <section id="gallery" className="py-20 bg-[#081325] border-b border-[#334155]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-[#22D3EE] uppercase tracking-wider mb-2">
              <span>05. EDA Artifacts &amp; Verification</span>
              <span className="text-[#334155]">/</span>
              <span className="text-[#94A3B8]">Cadence Innovus Screenshots</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F8FAFC] tracking-tight">
              Implementation Gallery.
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#94A3B8]">
              High-resolution captures of floorplan layouts, macro spacing, routing congestion heatmaps, and command-line execution telemetry.
            </p>
          </div>

          {/* Filter Bar (Zero-pill button group) */}
          <div className="flex items-center gap-1.5 p-1 bg-[#1E293B] border border-[#334155] rounded-[4px] self-start md:self-auto overflow-x-auto max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-mono rounded-[2px] transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#22D3EE] text-[#101B2D] font-semibold'
                    : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onOpenLightbox(item)}
              className="bg-[#1E293B] border border-[#334155] hover:border-[#22D3EE] rounded-[4px] overflow-hidden group cursor-pointer transition-all flex flex-col justify-between"
            >
              <div>
                {/* Image Container with Aspect Ratio and Overlay */}
                <div className="relative aspect-[4/3] bg-[#081325] overflow-hidden border-b border-[#334155]">
                  <img
                    src={item.imagePath}
                    alt={item.title}
                    className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-[#101B2D]/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <span className="px-3 py-1.5 text-xs font-mono bg-[#1E293B] border border-[#22D3EE] text-[#22D3EE] rounded-[4px] flex items-center gap-2 shadow-lg">
                      <ZoomIn className="w-3.5 h-3.5" />
                      <span>Inspect in Lightbox</span>
                    </span>
                  </div>

                  {/* Stage tag overlay */}
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-[#101B2D]/90 border border-[#334155] text-[10px] font-mono text-[#22D3EE] rounded-[2px]">
                    {item.stage}
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8]">
                    <span>{item.tool}</span>
                    <span className="text-[#F59E0B]">{item.category}</span>
                  </div>

                  <h3 className="text-base font-semibold text-[#F8FAFC] group-hover:text-[#22D3EE] transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#94A3B8] line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Bottom Quick-Metric Strip */}
              <div className="px-5 py-3 border-t border-[#334155] bg-[#152032] flex items-center justify-between text-[11px] font-mono text-[#94A3B8]">
                <span>Click for full telemetry</span>
                <Maximize2 className="w-3.5 h-3.5 text-[#22D3EE]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

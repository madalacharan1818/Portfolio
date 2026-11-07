import React, { useEffect } from 'react';
import { X, Cpu, Clock, Layers, CheckCircle2, AlertCircle, ExternalLink } from 'lucide-react';
import { ProjectData } from '../types/portfolio';

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
  onOpenImage: (imagePath: string, title: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onOpenImage,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#081325]/90 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-[#1E293B] border border-[#334155] rounded-[4px] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#334155] bg-[#101B2D]">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] font-semibold tracking-wider text-[#22D3EE] uppercase">
              {project.badge}
            </span>
            <span className="text-[#334155]">/</span>
            <span
              className={`font-mono text-[11px] font-semibold tracking-wider ${
                project.statusType === 'progress' ? 'text-[#F59E0B]' : 'text-[#22D3EE]'
              }`}
            >
              STATUS: {project.status.toUpperCase()}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#94A3B8] hover:text-[#F8FAFC] border border-[#334155] hover:border-[#22D3EE] rounded-[4px] transition-colors"
            aria-label="Close project modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Title & Summary */}
          <div>
            <h2 id="project-modal-title" className="text-2xl sm:text-3xl font-bold text-[#F8FAFC]">
              {project.title}
            </h2>
            <p className="mt-1 text-sm text-[#22D3EE] font-mono">{project.subtitle}</p>
            <p className="mt-4 text-sm sm:text-base text-[#94A3B8] leading-relaxed">
              {project.summary}
            </p>
          </div>

          {/* Key Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#101B2D] border border-[#334155] rounded-[4px]">
            <div>
              <span className="block font-mono text-[10px] text-[#94A3B8] uppercase tracking-wider">
                Scale
              </span>
              <span className="font-mono text-base font-semibold text-[#F8FAFC]">
                {project.scale}
              </span>
            </div>
            <div>
              <span className="block font-mono text-[10px] text-[#94A3B8] uppercase tracking-wider">
                Clock Target
              </span>
              <span className="font-mono text-base font-semibold text-[#22D3EE]">
                {project.targetPeriod} ({project.targetFreq})
              </span>
            </div>
            <div>
              <span className="block font-mono text-[10px] text-[#94A3B8] uppercase tracking-wider">
                Clock Domains
              </span>
              <span className="font-mono text-base font-semibold text-[#F8FAFC]">
                {project.clockDomains}
              </span>
            </div>
            <div>
              <span className="block font-mono text-[10px] text-[#94A3B8] uppercase tracking-wider">
                Macros
              </span>
              <span className="font-mono text-base font-semibold text-[#F59E0B]">
                {project.macros}
              </span>
            </div>
          </div>

          {/* Tools & Environment */}
          <div>
            <h3 className="font-mono text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-3">
              Tools & Automation Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs font-mono bg-[#101B2D] border border-[#334155] text-[#D8E3FC] rounded-[4px]"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Implementation Responsibilities */}
          <div>
            <h3 className="font-mono text-xs font-semibold text-[#22D3EE] uppercase tracking-wider mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4" />
              Physical Implementation Milestones
            </h3>
            <div className="space-y-2.5">
              {project.keyResponsibilities.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 bg-[#101B2D]/60 border border-[#334155]/60 rounded-[4px]"
                >
                  <span className="font-mono text-xs text-[#22D3EE] mt-0.5">0{idx + 1}.</span>
                  <p className="text-xs sm:text-sm text-[#D8E3FC] leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Highlights & Findings */}
          <div>
            <h3 className="font-mono text-xs font-semibold text-[#F59E0B] uppercase tracking-wider mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Technical Findings & Observations
            </h3>
            <ul className="space-y-2">
              {project.technicalHighlights.map((hl, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-[#94A3B8]"
                >
                  <span className="text-[#F59E0B] mt-0.5">▪</span>
                  <span>{hl}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Associated Cadence Screenshots (if any) */}
          {project.associatedImages.length > 0 && (
            <div>
              <h3 className="font-mono text-xs font-semibold text-[#F8FAFC] uppercase tracking-wider mb-3 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#22D3EE]" />
                Cadence Innovus Implementation Artifacts ({project.associatedImages.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.associatedImages.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => onOpenImage(img.path, img.title)}
                    className="group cursor-pointer p-3 bg-[#101B2D] border border-[#334155] hover:border-[#22D3EE] rounded-[4px] transition-all"
                  >
                    <div className="relative aspect-video overflow-hidden bg-[#081325] rounded-[2px] mb-2.5">
                      <img
                        src={img.path}
                        alt={img.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-[#101B2D]/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <span className="px-2.5 py-1 text-xs font-mono bg-[#1E293B] border border-[#22D3EE] text-[#22D3EE] rounded-[4px] flex items-center gap-1.5">
                          Inspect <ExternalLink className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                    <div className="font-mono text-xs font-semibold text-[#F8FAFC] group-hover:text-[#22D3EE] transition-colors">
                      {img.title}
                    </div>
                    <div className="text-[11px] text-[#94A3B8] mt-1 line-clamp-2">
                      {img.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-[#334155] bg-[#101B2D] text-xs font-mono text-[#94A3B8]">
          <span>Project ID: {project.id}</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-[#101B2D] bg-[#22D3EE] hover:bg-[#67E8F9] rounded-[4px] transition-colors"
          >
            Close Overview
          </button>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { projectsData } from '../data/projects';
import { ProjectData } from '../types/portfolio';
import { Cpu, ArrowRight, Clock, Layers, ShieldCheck, ExternalLink, Image as ImageIcon } from 'lucide-react';

interface ProjectsProps {
  onSelectProject: (project: ProjectData) => void;
  onOpenImage: (imagePath: string, title: string) => void;
}

export const Projects: React.FC<ProjectsProps> = ({
  onSelectProject,
  onOpenImage,
}) => {
  return (
    <section id="projects" className="py-20 bg-[#081325] border-b border-[#334155]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-[#22D3EE] uppercase tracking-wider mb-2">
            <span>03. Implementation Portfolio</span>
            <span className="text-[#334155]">/</span>
            <span className="text-[#94A3B8]">Physical Design Projects</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F8FAFC] tracking-tight">
            Tapeout-Ready Silicon Implementations &amp; Case Studies.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#94A3B8]">
            Physical synthesis, macro floorplanning, placement, and constraint engineering executed across processor cores and hardware IP blocks.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="space-y-8">
          {projectsData.map((project) => {
            const isFlagship = project.id === 'cva6-riscv';

            return (
              <div
                key={project.id}
                className="bg-[#1E293B] border border-[#334155] hover:border-[#22D3EE] rounded-[4px] p-6 lg:p-8 transition-colors group flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Badge & Strict Status */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-[#334155]">
                    <div className="flex items-center gap-3 text-xs font-mono">
                      <span className="text-[#22D3EE] font-semibold">{project.badge}</span>
                      <span className="text-[#334155]">/</span>
                      <span className="text-[#94A3B8]">{project.scale}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`font-mono text-xs font-semibold px-2.5 py-1 rounded-[2px] ${
                          project.statusType === 'progress'
                            ? 'bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/40'
                            : 'bg-[#22D3EE]/10 text-[#22D3EE] border border-[#22D3EE]/40'
                        }`}
                      >
                        STATUS: {project.status.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Main Project Details */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-8 space-y-4">
                      <div>
                        <h3 className="text-2xl font-bold text-[#F8FAFC] group-hover:text-[#22D3EE] transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-xs font-mono text-[#94A3B8] mt-0.5">
                          {project.subtitle}
                        </p>
                      </div>

                      <p className="text-sm text-[#D8E3FC] leading-relaxed">
                        {project.summary}
                      </p>

                      {/* Responsibilities / Highlights preview */}
                      <div className="pt-2">
                        <span className="block font-mono text-[11px] text-[#94A3B8] uppercase tracking-wider mb-2">
                          Core Implementation Accomplishments
                        </span>
                        <ul className="space-y-1.5">
                          {project.keyResponsibilities.slice(0, 3).map((resp, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs text-[#94A3B8]">
                              <span className="text-[#22D3EE] mt-0.5 font-mono">▸</span>
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tool Tags */}
                      <div className="flex flex-wrap items-center gap-2 pt-2">
                        {project.tools.map((t, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 text-[11px] font-mono bg-[#101B2D] border border-[#334155] text-[#94A3B8] rounded-[2px]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right: Technical Specs & Screenshots */}
                    <div className="lg:col-span-4 space-y-4">
                      {/* Metric Grid */}
                      <div className="grid grid-cols-2 gap-3 p-4 bg-[#101B2D] border border-[#334155] rounded-[4px]">
                        {project.metrics.map((m, idx) => (
                          <div key={idx}>
                            <span className="block font-mono text-[10px] text-[#94A3B8] uppercase">
                              {m.label}
                            </span>
                            <span
                              className={`font-mono text-base font-bold tabular-nums ${
                                m.isAmber ? 'text-[#F59E0B]' : 'text-[#F8FAFC]'
                              }`}
                            >
                              {m.value}
                            </span>
                            {m.sublabel && (
                              <span className="block text-[10px] text-[#94A3B8] font-mono truncate">
                                {m.sublabel}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* If flagship project, show screenshot previews with click to zoom */}
                      {isFlagship && project.associatedImages.length > 0 && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8]">
                            <span>Cadence Layout Artifacts</span>
                            <span className="text-[#22D3EE]">{project.associatedImages.length} Captures</span>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            {project.associatedImages.slice(0, 2).map((img, idx) => (
                              <div
                                key={idx}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onOpenImage(img.path, img.title);
                                }}
                                className="relative aspect-video bg-[#081325] border border-[#334155] hover:border-[#22D3EE] rounded-[2px] overflow-hidden cursor-pointer group/img"
                              >
                                <img
                                  src={img.path}
                                  alt={img.title}
                                  className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-[#101B2D]/50 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity">
                                  <ImageIcon className="w-4 h-4 text-[#22D3EE]" />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom Action Bar */}
                <div className="mt-6 pt-4 border-t border-[#334155] flex flex-wrap items-center justify-between gap-4">
                  <div className="text-xs font-mono text-[#94A3B8]">
                    Clock Period Target: <span className="text-[#22D3EE] font-semibold">{project.targetPeriod}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    {isFlagship && (
                      <a
                        href="#analysis"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-[#22D3EE] hover:text-[#67E8F9] transition-colors"
                      >
                        <span>Inspect Hotspot Analysis</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                    <button
                      onClick={() => onSelectProject(project)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold font-mono text-[#101B2D] bg-[#22D3EE] hover:bg-[#67E8F9] rounded-[4px] transition-all"
                    >
                      <span>Deep Dive Specification</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

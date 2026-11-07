import React from 'react';
import { Download, ArrowRight, Mail, Linkedin, Github, MapPin, Cpu, CheckCircle, FileText } from 'lucide-react';
import { downloadResumeFile } from '../utils/resumeDownload';
import { SiliconFloorplanViewer } from './SiliconFloorplanViewer';

interface HeroProps {
  onOpenAnalysis?: () => void;
  onOpenResume?: () => void;
  onOpenImage?: (imagePath: string, title: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume, onOpenImage }) => {
  return (
    <section className="relative overflow-hidden bg-[#081325] pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-[#334155]">
      {/* Subtle silicon floorplan grid pattern in background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(to right, #22D3EE 1px, transparent 1px), linear-gradient(to bottom, #22D3EE 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split-screen Hero (Left: Typographic Impact, Right: Silicon Floorplan Viewer) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Core Identity & Professional Stature */}
          <div className="lg:col-span-7 space-y-6">
            {/* Unboxed Metadata Header */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#94A3B8]">
              <span className="text-[#22D3EE] font-semibold tracking-wider">
                VLSI PHYSICAL DESIGN ENGINEER
              </span>
              <span aria-hidden="true" className="text-[#334155]">·</span>
              <span className="inline-flex items-center gap-1.5 text-[#F8FAFC]">
                <MapPin className="w-3.5 h-3.5 text-[#22D3EE]" />
                Hyderabad, India
              </span>
              <span aria-hidden="true" className="text-[#334155]">·</span>
              <span className="text-[#F59E0B] font-medium">Cadence Genus & Innovus</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F8FAFC] leading-[1.1] text-balance">
              Transforming Complex RTL into High-Performance <span className="text-[#22D3EE]">Silicon Silicon Realities.</span>
            </h1>

            {/* Narrative Summary */}
            <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed max-w-2xl font-normal">
              Electronics and Communication graduate specializing in RTL-to-GDSII physical implementation. Hands-on experience executing floorplanning, 24-macro placement, power distribution networks, standard-cell placement, and clock tree synthesis on the 64-bit CVA6 RISC-V processor and high-speed cryptographic cores.
            </p>

            {/* Primary Action Row */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                onClick={async () => {
                  try {
                    await downloadResumeFile('Charan_Madala_VLSI_Physical_Design_Resume.pdf');
                  } catch {
                    if (onOpenResume) onOpenResume();
                  }
                }}
                className="inline-flex items-center gap-2.5 px-5 py-3 text-sm font-semibold text-[#101B2D] bg-[#22D3EE] hover:bg-[#67E8F9] rounded-[4px] transition-all shadow-[0_0_16px_rgba(34,211,238,0.25)] whitespace-nowrap cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#101B2D]" />
                <span>Download Official Résumé</span>
              </button>

              {onOpenResume && (
                <button
                  onClick={onOpenResume}
                  className="inline-flex items-center gap-2 px-4 py-3 text-sm font-mono text-[#D8E3FC] hover:text-[#22D3EE] bg-[#1E293B] hover:bg-[#1E293B]/80 border border-[#334155] hover:border-[#22D3EE] rounded-[4px] transition-all whitespace-nowrap cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-[#22D3EE]" />
                  <span>Preview &amp; Print</span>
                </button>
              )}

              <a
                href="#analysis"
                className="inline-flex items-center gap-2 px-4 py-3 text-sm font-mono text-[#94A3B8] hover:text-[#22D3EE] transition-all whitespace-nowrap"
              >
                <span>Congestion Telemetry</span>
                <ArrowRight className="w-4 h-4 text-[#22D3EE]" />
              </a>
            </div>

            {/* Contact & Social Links */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs font-mono text-[#94A3B8]">
              <a
                href="mailto:madalacharan1818@gmail.com"
                className="hover:text-[#22D3EE] flex items-center gap-2 transition-colors"
              >
                <Mail className="w-4 h-4 text-[#22D3EE]" />
                <span>madalacharan1818@gmail.com</span>
              </a>

              <a
                href="https://www.linkedin.com/in/charan-madala-b8072321b"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#22D3EE] flex items-center gap-2 transition-colors"
              >
                <Linkedin className="w-4 h-4 text-[#22D3EE]" />
                <span>LinkedIn Profile</span>
              </a>

              <a
                href="https://github.com/madalacharan1818"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#22D3EE] flex items-center gap-2 transition-colors"
              >
                <Github className="w-4 h-4 text-[#22D3EE]" />
                <span>GitHub Repository</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Silicon Floorplan with 24 Macros, Std Cells, and Metal Layers */}
          <div className="lg:col-span-5">
            <SiliconFloorplanViewer onOpenImage={onOpenImage} />
          </div>
        </div>

        {/* Full-width 4-Column Technical Metrics Strip below Hero Split */}
        <div className="mt-16 pt-8 border-t border-[#334155] grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          <div className="p-4 bg-[#1E293B] border border-[#334155] rounded-[4px]">
            <span className="block font-mono text-[11px] text-[#94A3B8] tracking-wider uppercase mb-1">
              Design Scale
            </span>
            <span className="font-mono text-2xl lg:text-3xl font-bold text-[#F8FAFC] tabular-nums">
              ~100K
            </span>
            <span className="block text-xs text-[#94A3B8] mt-1 font-mono">
              Instances (CVA6 Core)
            </span>
          </div>

          <div className="p-4 bg-[#1E293B] border border-[#334155] rounded-[4px]">
            <span className="block font-mono text-[11px] text-[#94A3B8] tracking-wider uppercase mb-1">
              Hard Memory Blocks
            </span>
            <span className="font-mono text-2xl lg:text-3xl font-bold text-[#22D3EE] tabular-nums">
              24 Macros
            </span>
            <span className="block text-xs text-[#94A3B8] mt-1 font-mono">
              Floorplanned &amp; Placed
            </span>
          </div>

          <div className="p-4 bg-[#1E293B] border border-[#334155] rounded-[4px]">
            <span className="block font-mono text-[11px] text-[#94A3B8] tracking-wider uppercase mb-1">
              Target Clock Period
            </span>
            <span className="font-mono text-2xl lg:text-3xl font-bold text-[#F8FAFC] tabular-nums">
              1.5 ns
            </span>
            <span className="block text-xs text-[#94A3B8] mt-1 font-mono">
              Single Domain Constraints
            </span>
          </div>

          <div className="p-4 bg-[#1E293B] border border-[#334155] rounded-[4px]">
            <span className="block font-mono text-[11px] text-[#94A3B8] tracking-wider uppercase mb-1">
              Implementation Flow
            </span>
            <span className="font-mono text-xl lg:text-2xl font-bold text-[#F59E0B] tracking-tight">
              CTS In Progress
            </span>
            <span className="block text-xs text-[#94A3B8] mt-1 font-mono">
              Cadence Innovus &amp; Genus
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

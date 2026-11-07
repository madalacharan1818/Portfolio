import React from 'react';
import { Target, Terminal, Cpu, Zap, GitBranch, ArrowUpRight } from 'lucide-react';

export const About: React.FC = () => {
  const pillars = [
    {
      icon: Cpu,
      title: 'RTL-to-GDSII Physical Implementation',
      description:
        'Hands-on execution of full ASIC physical design flow from Verilog RTL elaboration through synthesis, floorplanning, placement, and clock tree synthesis using Cadence Genus and Innovus.',
    },
    {
      icon: Zap,
      title: 'Macro Placement & Power Distribution',
      description:
        'Architecting robust chip floorplans with 24 memory macros, calculating routing channels, establishing keepout halos, and constructing low-IR-drop power rings and stripes.',
    },
    {
      icon: Target,
      title: 'Timing-Driven Placement & Congestion',
      description:
        'Analyzing Gcell routing tracks and standard cell density maps to identify hotspots early, mitigating routing overflow while preserving setup and hold timing margins.',
    },
    {
      icon: GitBranch,
      title: 'Clock Domains & SDC Timing Constraints',
      description:
        'Developing precise Synopsys Design Constraints (SDC) for single-domain and multi-clock systems, modeling generated clocks, false paths, and clock uncertainty.',
    },
    {
      icon: Terminal,
      title: 'Tcl Automation & Linux Tool Pipelines',
      description:
        'Authoring reusable Tcl scripts to automate EDA tool runs, parameter sweeps, and parsing Innovus congestion and density reports directly in Linux.',
    },
  ];

  return (
    <section id="about" className="py-20 bg-[#081325] border-b border-[#334155]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-[#22D3EE] uppercase tracking-wider mb-2">
            <span>01. Engineering Background</span>
            <span className="text-[#334155]">/</span>
            <span className="text-[#94A3B8]">VLSI Profile</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F8FAFC] tracking-tight">
            Bridging Architectural Logic with Silicon Physics.
          </h2>
        </div>

        {/* 2-Column Overview Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Summary & Career Objective */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 bg-[#1E293B] border border-[#334155] rounded-[4px] space-y-4">
              <h3 className="text-lg font-semibold text-[#F8FAFC] font-display flex items-center justify-between">
                <span>Professional Summary</span>
                <span className="text-xs font-mono text-[#22D3EE]">[HYD · IN]</span>
              </h3>
              <p className="text-sm sm:text-base text-[#D8E3FC] leading-relaxed">
                Electronics and Communication graduate building a dedicated career in VLSI Physical Design, with a solid foundation in CMOS technology, digital logic design, and Verilog HDL.
              </p>
              <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                Possesses hands-on RTL-to-GDS implementation experience across Cadence Genus and Cadence Innovus. Practical exposure includes synthesis, floorplanning, macro placement, power planning, standard-cell placement, and clock tree synthesis, proven on the 64-bit CVA6 RISC-V processor (approx. 100K instances, 24 macros), an AES cryptographic hardware block, and multi-clock synthesis test cases.
              </p>
            </div>

            {/* Career Objective Card */}
            <div className="p-6 bg-[#101B2D] border border-[#334155] rounded-[4px]">
              <div className="text-xs font-mono text-[#F59E0B] uppercase tracking-wider mb-2">
                Career Goal &amp; Long-Term Trajectory
              </div>
              <p className="text-sm text-[#D8E3FC] leading-relaxed">
                To grow as a high-impact Physical Design Engineer by contributing to block- and chip-level implementation, deepening technical mastery in timing optimization, clock tree synthesis, and timing closure on advanced, high-performance designs, progressing toward sign-off and complete physical design flow ownership.
              </p>
            </div>
          </div>

          {/* Right: Technical Competency Matrix */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-mono text-[#94A3B8] uppercase tracking-wider mb-2">
              Core Physical Implementation Pillars
            </div>
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-4 bg-[#1E293B] border border-[#334155] hover:border-[#22D3EE] rounded-[4px] transition-colors group"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="p-2 bg-[#101B2D] border border-[#334155] group-hover:border-[#22D3EE] rounded-[4px] shrink-0 transition-colors">
                      <Icon className="w-4 h-4 text-[#22D3EE]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#F8FAFC] group-hover:text-[#22D3EE] transition-colors">
                        {pillar.title}
                      </h4>
                      <p className="mt-1 text-xs text-[#94A3B8] leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

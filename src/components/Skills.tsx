import React, { useState } from 'react';
import { skillCategories } from '../data/skills';
import { Cpu, Terminal, Layers, ShieldCheck, Check } from 'lucide-react';

export const Skills: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const filteredCategories =
    activeTab === 'all'
      ? skillCategories
      : skillCategories.filter((cat) => cat.id === activeTab);

  return (
    <section id="skills" className="py-20 bg-[#101B2D] border-b border-[#334155]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-[#22D3EE] uppercase tracking-wider mb-2">
              <span>02. Technical Competencies</span>
              <span className="text-[#334155]">/</span>
              <span className="text-[#94A3B8]">EDA &amp; Silicon Skills</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F8FAFC] tracking-tight">
              Tools, Protocols &amp; Physical Implementation Matrix.
            </h2>
          </div>

          {/* Functional Category Filter (Zero-pill button group) */}
          <div className="flex items-center gap-1.5 p-1 bg-[#1E293B] border border-[#334155] rounded-[4px] self-start md:self-auto overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 text-xs font-mono rounded-[2px] transition-colors whitespace-nowrap ${
                activeTab === 'all'
                  ? 'bg-[#22D3EE] text-[#101B2D] font-semibold'
                  : 'text-[#94A3B8] hover:text-[#F8FAFC]'
              }`}
            >
              All Domains
            </button>
            <button
              onClick={() => setActiveTab('eda-tools')}
              className={`px-3 py-1.5 text-xs font-mono rounded-[2px] transition-colors whitespace-nowrap ${
                activeTab === 'eda-tools'
                  ? 'bg-[#22D3EE] text-[#101B2D] font-semibold'
                  : 'text-[#94A3B8] hover:text-[#F8FAFC]'
              }`}
            >
              EDA &amp; Tools
            </button>
            <button
              onClick={() => setActiveTab('pd-stages')}
              className={`px-3 py-1.5 text-xs font-mono rounded-[2px] transition-colors whitespace-nowrap ${
                activeTab === 'pd-stages'
                  ? 'bg-[#22D3EE] text-[#101B2D] font-semibold'
                  : 'text-[#94A3B8] hover:text-[#F8FAFC]'
              }`}
            >
              Physical Design
            </button>
            <button
              onClick={() => setActiveTab('fundamentals')}
              className={`px-3 py-1.5 text-xs font-mono rounded-[2px] transition-colors whitespace-nowrap ${
                activeTab === 'fundamentals'
                  ? 'bg-[#22D3EE] text-[#101B2D] font-semibold'
                  : 'text-[#94A3B8] hover:text-[#F8FAFC]'
              }`}
            >
              Hardware Concepts
            </button>
          </div>
        </div>

        {/* Skill Category Cards */}
        <div className="space-y-8">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className="bg-[#1E293B] border border-[#334155] rounded-[4px] p-6 lg:p-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-6 border-b border-[#334155]">
                <div>
                  <h3 className="text-xl font-bold text-[#F8FAFC] tracking-tight">
                    {category.name}
                  </h3>
                  <p className="text-xs text-[#94A3B8] mt-1 font-mono">
                    {category.description}
                  </p>
                </div>
                <span className="font-mono text-xs text-[#22D3EE]">
                  [{category.skills.length} COMPETENCIES]
                </span>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.skills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-[#101B2D] border border-[#334155] hover:border-[#22D3EE] rounded-[4px] transition-all group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-sm font-semibold text-[#F8FAFC] group-hover:text-[#22D3EE] transition-colors">
                        {skill.name}
                      </span>
                      <Check className="w-3.5 h-3.5 text-[#22D3EE]" />
                    </div>
                    <p className="text-xs text-[#94A3B8] leading-relaxed">
                      {skill.details}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Reference Summary Bar */}
        <div className="mt-8 p-5 bg-[#152032] border border-[#334155] rounded-[4px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs text-[#94A3B8]">
          <div>
            <span className="text-[#22D3EE] block font-semibold mb-0.5">Primary EDA Suites</span>
            <span>Cadence Innovus · Cadence Genus</span>
          </div>
          <div>
            <span className="text-[#22D3EE] block font-semibold mb-0.5">Hardware &amp; Scripting</span>
            <span>Verilog HDL · Tcl · Linux Shell</span>
          </div>
          <div>
            <span className="text-[#22D3EE] block font-semibold mb-0.5">Timing &amp; Constraints</span>
            <span>SDC · Clock Domains · Generated Clocks</span>
          </div>
          <div>
            <span className="text-[#F59E0B] block font-semibold mb-0.5">Physical Closure</span>
            <span>Floorplan · Placement · CTS · Hotspot</span>
          </div>
        </div>
      </div>
    </section>
  );
};

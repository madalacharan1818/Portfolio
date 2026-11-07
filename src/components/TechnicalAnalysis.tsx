import React, { useState } from 'react';
import { congestionMetrics, densityMetrics } from '../data/analysis';
import {
  Activity,
  Layers,
  BarChart3,
  Terminal,
  Maximize2,
  Info,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';

interface TechnicalAnalysisProps {
  onOpenImage: (imagePath: string, title: string) => void;
}

export const TechnicalAnalysis: React.FC<TechnicalAnalysisProps> = ({ onOpenImage }) => {
  const [activeTab, setActiveTab] = useState<'congestion' | 'density'>('congestion');
  const [selectedRemain, setSelectedRemain] = useState<number | null>(null);
  const [selectedDensityRange, setSelectedDensityRange] = useState<string | null>(null);

  return (
    <section id="analysis" className="py-20 bg-[#101B2D] border-b border-[#334155]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-mono text-[#22D3EE] uppercase tracking-wider mb-2">
              <span>04. Physical Verification &amp; Telemetry</span>
              <span className="text-[#334155]">/</span>
              <span className="text-[#F59E0B]">Cadence Innovus Results</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F8FAFC] tracking-tight">
              Physical Design Analysis Dashboard.
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#94A3B8]">
              Empirical routing track congestion and standard-cell density distribution extracted directly from Cadence Innovus console logs.
            </p>
          </div>

          {/* Tab Selector & Engineering Disclaimer */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex items-center gap-1 p-1 bg-[#1E293B] border border-[#334155] rounded-[4px]">
              <button
                onClick={() => setActiveTab('congestion')}
                className={`px-4 py-2 text-xs font-mono rounded-[2px] transition-colors flex items-center gap-2 ${
                  activeTab === 'congestion'
                    ? 'bg-[#22D3EE] text-[#101B2D] font-semibold'
                    : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Congestion Analysis</span>
              </button>
              <button
                onClick={() => setActiveTab('density')}
                className={`px-4 py-2 text-xs font-mono rounded-[2px] transition-colors flex items-center gap-2 ${
                  activeTab === 'density'
                    ? 'bg-[#22D3EE] text-[#101B2D] font-semibold'
                    : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Cell Density Analysis</span>
              </button>
            </div>
          </div>
        </div>

        {/* Status Disclaimer Notice */}
        <div className="mb-8 p-3.5 bg-[#1E293B] border border-[#334155] rounded-[4px] flex items-start sm:items-center gap-3 text-xs font-mono text-[#94A3B8]">
          <Info className="w-4 h-4 text-[#22D3EE] shrink-0 mt-0.5 sm:mt-0" />
          <div className="flex-1">
            <span className="text-[#F8FAFC] font-semibold">Intermediate Design State: </span>
            <span>
              Telemetry reflects post-placement / global routing verification on the CVA6 RISC-V implementation before Clock Tree Synthesis (CTS). Values represent real tool output, not final sign-off closure.
            </span>
          </div>
        </div>

        {/* TAB 1: CONGESTION ANALYSIS */}
        {activeTab === 'congestion' && (
          <div className="space-y-8">
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
              <div className="p-4 bg-[#1E293B] border border-[#334155] rounded-[4px]">
                <span className="block font-mono text-[10px] text-[#94A3B8] uppercase">
                  Horizontal Usage
                </span>
                <span className="font-mono text-xl sm:text-2xl font-bold text-[#22D3EE] tabular-nums">
                  {congestionMetrics.usageH}%
                </span>
                <span className="block font-mono text-[10px] text-[#94A3B8] mt-1">
                  WL: 3.102e+06 µm
                </span>
              </div>

              <div className="p-4 bg-[#1E293B] border border-[#334155] rounded-[4px]">
                <span className="block font-mono text-[10px] text-[#94A3B8] uppercase">
                  Vertical Usage
                </span>
                <span className="font-mono text-xl sm:text-2xl font-bold text-[#22D3EE] tabular-nums">
                  {congestionMetrics.usageV}%
                </span>
                <span className="block font-mono text-[10px] text-[#94A3B8] mt-1">
                  WL: 2.884e+06 µm
                </span>
              </div>

              <div className="p-4 bg-[#1E293B] border border-[#334155] rounded-[4px]">
                <span className="block font-mono text-[10px] text-[#94A3B8] uppercase">
                  H Overflow
                </span>
                <span className="font-mono text-xl sm:text-2xl font-bold text-[#F8FAFC] tabular-nums">
                  {congestionMetrics.overflowH}
                </span>
                <span className="block font-mono text-[10px] text-[#94A3B8] mt-1">
                  0.03% Tracks
                </span>
              </div>

              <div className="p-4 bg-[#1E293B] border border-[#334155] rounded-[4px]">
                <span className="block font-mono text-[10px] text-[#94A3B8] uppercase">
                  V Overflow
                </span>
                <span className="font-mono text-xl sm:text-2xl font-bold text-[#F59E0B] tabular-nums">
                  {congestionMetrics.overflowV}
                </span>
                <span className="block font-mono text-[10px] text-[#94A3B8] mt-1">
                  1.07% Tracks
                </span>
              </div>

              <div className="p-4 bg-[#1E293B] border border-[#334155] rounded-[4px]">
                <span className="block font-mono text-[10px] text-[#94A3B8] uppercase">
                  Total Overflow
                </span>
                <span className="font-mono text-xl sm:text-2xl font-bold text-[#F59E0B] tabular-nums">
                  {congestionMetrics.totalOverflow}
                </span>
                <span className="block font-mono text-[10px] text-[#94A3B8] mt-1">
                  Tracks Across Die
                </span>
              </div>

              <div className="p-4 bg-[#1E293B] border border-[#334155] rounded-[4px]">
                <span className="block font-mono text-[10px] text-[#94A3B8] uppercase">
                  Max Hotspot
                </span>
                <span className="font-mono text-xl sm:text-2xl font-bold text-[#F8FAFC] tabular-nums">
                  {congestionMetrics.normalizedMaxHotspot}
                </span>
                <span className="block font-mono text-[10px] text-[#94A3B8] mt-1">
                  Normalized Area
                </span>
              </div>

              <div className="p-4 bg-[#1E293B] border border-[#334155] rounded-[4px]">
                <span className="block font-mono text-[10px] text-[#94A3B8] uppercase">
                  Total Hotspot
                </span>
                <span className="font-mono text-xl sm:text-2xl font-bold text-[#F8FAFC] tabular-nums">
                  {congestionMetrics.normalizedTotalHotspot}
                </span>
                <span className="block font-mono text-[10px] text-[#94A3B8] mt-1">
                  Normalized Area
                </span>
              </div>
            </div>

            {/* Split: Interactive Congestion Distribution Histogram + Screenshot Artifacts */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Interactive Remain Track Distribution */}
              <div className="lg:col-span-7 bg-[#1E293B] border border-[#334155] rounded-[4px] p-6 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#334155]">
                  <div>
                    <h3 className="text-base font-semibold text-[#F8FAFC] font-display">
                      Routing Channel Distribution (Remain Tracks)
                    </h3>
                    <p className="text-xs font-mono text-[#94A3B8]">
                      Positive = Available Tracks · Negative = Gcell Routing Overflow
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-mono">
                    <span className="flex items-center gap-1.5 text-[#22D3EE]">
                      <span className="w-2.5 h-2.5 bg-[#22D3EE] rounded-[1px]" /> Horizontal (cntH)
                    </span>
                    <span className="flex items-center gap-1.5 text-[#F59E0B]">
                      <span className="w-2.5 h-2.5 bg-[#F59E0B] rounded-[1px]" /> Vertical (cntV)
                    </span>
                  </div>
                </div>

                {/* Interactive Histogram Bars */}
                <div className="space-y-3 font-mono text-xs">
                  {congestionMetrics.remainDistribution.map((row) => {
                    const isSelected = selectedRemain === row.remain;
                    const isOverflow = row.remain < 0;

                    return (
                      <div
                        key={row.remain}
                        onClick={() => setSelectedRemain(isSelected ? null : row.remain)}
                        className={`p-2.5 rounded-[2px] border transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#152032] border-[#22D3EE]'
                            : isOverflow
                            ? 'bg-[#101B2D]/90 border-red-900/40 hover:border-red-500/50'
                            : 'bg-[#101B2D]/50 border-[#334155]/60 hover:border-[#334155]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span
                            className={`font-semibold ${
                              isOverflow ? 'text-red-400' : 'text-[#F8FAFC]'
                            }`}
                          >
                            Remain: {row.remain > 0 ? `+${row.remain}` : row.remain}
                          </span>
                          <span className="text-[11px] text-[#94A3B8]">
                            H: {row.cntH.toLocaleString()} ({row.pctH.toFixed(2)}%) · V: {row.cntV.toLocaleString()} ({row.pctV.toFixed(2)}%)
                          </span>
                        </div>

                        {/* Dual Bar Representation */}
                        <div className="space-y-1">
                          {/* Horizontal track bar */}
                          <div className="h-2 bg-[#081325] rounded-[1px] overflow-hidden flex">
                            <div
                              className="bg-[#22D3EE] transition-all"
                              style={{ width: `${Math.min(100, Math.max(row.pctH, row.cntH > 0 ? 1 : 0))}%` }}
                            />
                          </div>
                          {/* Vertical track bar */}
                          <div className="h-2 bg-[#081325] rounded-[1px] overflow-hidden flex">
                            <div
                              className="bg-[#F59E0B] transition-all"
                              style={{ width: `${Math.min(100, Math.max(row.pctV, row.cntV > 0 ? 1 : 0))}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Engineering Interpretation */}
                <div className="p-4 bg-[#101B2D] border border-[#334155] rounded-[2px] space-y-2">
                  <div className="font-mono text-xs font-semibold text-[#22D3EE] uppercase tracking-wider flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Key Routing Analysis Takeaways
                  </div>
                  <ul className="text-xs text-[#94A3B8] space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="text-[#22D3EE]">▸</span>
                      <span>
                        <strong>Healthy Horizontal Routing:</strong> Horizontal overflow is only 68 tracks (0.03%), proving macro boundary channels provide generous horizontal routing track supply.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#F59E0B]">▸</span>
                      <span>
                        <strong>Localized Vertical Demand:</strong> 2,904 vertical overflow tracks (1.07%) stem from vertical pin access density above the macro interface, manageable through pin density de-clustering.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#22D3EE]">▸</span>
                      <span>
                        <strong>Hotspot Normalization:</strong> Max hotspot factor of 1.04 confirms localized hotspots are contained and do not cause global routability blockage.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right Column: Original Screenshots Side-by-Side */}
              <div className="lg:col-span-5 space-y-6">
                {/* Cadence Innovus Congestion Heatmap */}
                <div className="bg-[#1E293B] border border-[#334155] rounded-[4px] p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-[#F8FAFC]">
                        CVA6 Global Routing Congestion Heatmap
                      </h4>
                      <span className="text-[11px] font-mono text-[#22D3EE]">
                        Cadence Innovus 21.1 GUI
                      </span>
                    </div>
                    <button
                      onClick={() =>
                        onOpenImage(
                          '/assets/congestion/cva6_routing_congestion_map.jpeg',
                          'CVA6 Global Routing Congestion Heatmap'
                        )
                      }
                      className="p-1.5 text-[#94A3B8] hover:text-[#22D3EE] border border-[#334155] rounded-[4px] transition-colors"
                      title="Inspect full image in Lightbox"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div
                    onClick={() =>
                      onOpenImage(
                        '/assets/congestion/cva6_routing_congestion_map.jpeg',
                        'CVA6 Global Routing Congestion Heatmap'
                      )
                    }
                    className="relative aspect-square sm:aspect-[4/3] bg-[#081325] border border-[#334155] rounded-[2px] overflow-hidden cursor-pointer group"
                  >
                    <img
                      src="/assets/congestion/cva6_routing_congestion_map.jpeg"
                      alt="CVA6 Routing Congestion Heatmap"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-[#081325]/30 group-hover:bg-transparent transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 px-3 py-1 text-xs font-mono bg-[#101B2D]/90 border border-[#22D3EE] text-[#22D3EE] rounded-[4px] transition-opacity">
                        Click to Inspect (463×428)
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-[#94A3B8]">
                    Layout viewer capture showing macro placement at bottom and active routing congestion heatmap across standard cell channels.
                  </p>
                </div>

                {/* Innovus Terminal Capture */}
                <div className="bg-[#1E293B] border border-[#334155] rounded-[4px] p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-[#F8FAFC]">
                        Terminal Telemetry Capture
                      </h4>
                      <span className="text-[11px] font-mono text-[#F59E0B]">
                        report_congestion -overflow -hotspot
                      </span>
                    </div>
                    <button
                      onClick={() =>
                        onOpenImage(
                          '/assets/congestion/congestion_overflow_report.jpeg',
                          'Innovus Congestion Overflow Console Output'
                        )
                      }
                      className="p-1.5 text-[#94A3B8] hover:text-[#22D3EE] border border-[#334155] rounded-[4px] transition-colors"
                      title="Inspect full terminal log in Lightbox"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div
                    onClick={() =>
                      onOpenImage(
                        '/assets/congestion/congestion_overflow_report.jpeg',
                        'Innovus Congestion Overflow Console Output'
                      )
                    }
                    className="relative aspect-[2/1] bg-[#081325] border border-[#334155] rounded-[2px] overflow-hidden cursor-pointer group"
                  >
                    <img
                      src="/assets/congestion/congestion_overflow_report.jpeg"
                      alt="Cadence Innovus Congestion Overflow Console Output"
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-[#081325]/20 group-hover:bg-transparent transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 px-3 py-1 text-xs font-mono bg-[#101B2D]/90 border border-[#22D3EE] text-[#22D3EE] rounded-[4px] transition-opacity">
                        View Raw Terminal Log (904×457)
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-[#94A3B8]">
                    Direct terminal output demonstrating usage wirelength (3.102e+06um H / 2.884e+06um V) and overflow summation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DENSITY ANALYSIS */}
        {activeTab === 'density' && (
          <div className="space-y-8">
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
              <div className="p-4 bg-[#1E293B] border border-[#334155] rounded-[4px]">
                <span className="block font-mono text-[10px] text-[#94A3B8] uppercase">
                  Density Threshold
                </span>
                <span className="font-mono text-2xl font-bold text-[#F8FAFC] tabular-nums">
                  0.750
                </span>
                <span className="block font-mono text-[10px] text-[#94A3B8] mt-1">
                  75.0% Core Density
                </span>
              </div>

              <div className="p-4 bg-[#1E293B] border border-[#334155] rounded-[4px]">
                <span className="block font-mono text-[10px] text-[#94A3B8] uppercase">
                  Bins &gt; 0.750
                </span>
                <span className="font-mono text-2xl font-bold text-[#F59E0B] tabular-nums">
                  {densityMetrics.binsAboveThreshold.toLocaleString()}
                </span>
                <span className="block font-mono text-[10px] text-[#94A3B8] mt-1">
                  Bins Over Threshold
                </span>
              </div>

              <div className="p-4 bg-[#1E293B] border border-[#334155] rounded-[4px]">
                <span className="block font-mono text-[10px] text-[#94A3B8] uppercase">
                  Total Core Bins
                </span>
                <span className="font-mono text-2xl font-bold text-[#F8FAFC] tabular-nums">
                  {densityMetrics.totalBins.toLocaleString()}
                </span>
                <span className="block font-mono text-[10px] text-[#94A3B8] mt-1">
                  106 × 103 Matrix
                </span>
              </div>

              <div className="p-4 bg-[#1E293B] border border-[#334155] rounded-[4px]">
                <span className="block font-mono text-[10px] text-[#94A3B8] uppercase">
                  Threshold Ratio
                </span>
                <span className="font-mono text-2xl font-bold text-[#22D3EE] tabular-nums">
                  {densityMetrics.percentage}%
                </span>
                <span className="block font-mono text-[10px] text-[#94A3B8] mt-1">
                  7407 / 10918 Bins
                </span>
              </div>

              <div className="p-4 bg-[#1E293B] border border-[#334155] rounded-[4px] col-span-2 sm:col-span-1">
                <span className="block font-mono text-[10px] text-[#94A3B8] uppercase">
                  Bin Dimension
                </span>
                <span className="font-mono text-lg font-bold text-[#F8FAFC]">
                  64 sites × 10 rows
                </span>
                <span className="block font-mono text-[10px] text-[#94A3B8] mt-1">
                  Fine-Grained Grid
                </span>
              </div>
            </div>

            {/* Split: Interactive Density Range Histogram + Screenshots */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Interactive Density Ranges */}
              <div className="lg:col-span-7 bg-[#1E293B] border border-[#334155] rounded-[4px] p-6 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#334155]">
                  <div>
                    <h3 className="text-base font-semibold text-[#F8FAFC] font-display">
                      Standard Cell Density Range Breakdown
                    </h3>
                    <p className="text-xs font-mono text-[#94A3B8]">
                      Histogram of evaluated core bins categorized by local cell utilization
                    </p>
                  </div>
                  <span className="text-xs font-mono text-[#22D3EE]">
                    7,407 Bins &gt; 0.750
                  </span>
                </div>

                {/* Range Bars */}
                <div className="space-y-2.5 font-mono text-xs">
                  {densityMetrics.densityRanges.map((item) => {
                    const isPeak = item.percentage > 40;
                    const isOverDense = item.range.includes('1.') || item.range.startsWith('>');
                    const isSelected = selectedDensityRange === item.range;

                    return (
                      <div
                        key={item.range}
                        onClick={() => setSelectedDensityRange(isSelected ? null : item.range)}
                        className={`p-2.5 rounded-[2px] border transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#152032] border-[#22D3EE]'
                            : isPeak
                            ? 'bg-[#152032] border-[#22D3EE]/50 hover:border-[#22D3EE]'
                            : isOverDense
                            ? 'bg-[#101B2D] border-[#F59E0B]/30 hover:border-[#F59E0B]'
                            : 'bg-[#101B2D]/60 border-[#334155]/60 hover:border-[#334155]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span
                            className={`font-semibold ${
                              isPeak
                                ? 'text-[#22D3EE]'
                                : isOverDense
                                ? 'text-[#F59E0B]'
                                : 'text-[#F8FAFC]'
                            }`}
                          >
                            Range {item.range}
                          </span>
                          <span className="text-[11px] text-[#94A3B8]">
                            {item.bins.toLocaleString()} bins ({item.percentage.toFixed(2)}%)
                          </span>
                        </div>

                        <div className="h-2 bg-[#081325] rounded-[1px] overflow-hidden flex">
                          <div
                            className={`transition-all ${
                              isPeak
                                ? 'bg-[#22D3EE]'
                                : isOverDense
                                ? 'bg-[#F59E0B]'
                                : 'bg-[#94A3B8]'
                            }`}
                            style={{ width: `${Math.min(100, Math.max(item.percentage, 2))}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Density Analysis Takeaways */}
                <div className="p-4 bg-[#101B2D] border border-[#334155] rounded-[2px] space-y-2">
                  <div className="font-mono text-xs font-semibold text-[#F59E0B] uppercase tracking-wider flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5" />
                    Physical Interpretation of Density Metrics
                  </div>
                  <ul className="text-xs text-[#94A3B8] space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="text-[#22D3EE]">▸</span>
                      <span>
                        <strong>Macro Footprint Displacement:</strong> The 24 SRAM macros occupy approximately 50-60% of the die perimeter, naturally concentrating the ~100K standard cells into the central and upper core area.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#22D3EE]">▸</span>
                      <span>
                        <strong>Predominant Density Bracket:</strong> 47.49% of bins (5,185 bins) fall in the (0.950 - 1.000] range, representing a tightly packed yet physically legal placement.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#F59E0B]">▸</span>
                      <span>
                        <strong>Over-Density Targeted Remediation:</strong> Only 347 bins (3.18%) have density &gt; 1.000, which are addressed during Clock Tree Synthesis (CTS) and early post-placement cell spreading before final route.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right Column: Screenshots */}
              <div className="lg:col-span-5 space-y-6">
                {/* Cadence Innovus Density Map GUI */}
                <div className="bg-[#1E293B] border border-[#334155] rounded-[4px] p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-[#F8FAFC]">
                        CVA6 Core Density Map
                      </h4>
                      <span className="text-[11px] font-mono text-[#F59E0B]">
                        Cadence Innovus GUI (Red Highlight)
                      </span>
                    </div>
                    <button
                      onClick={() =>
                        onOpenImage(
                          '/assets/density/cva6_density_map_innovus.jpeg',
                          'CVA6 Core Density Map with High-Density Regions'
                        )
                      }
                      className="p-1.5 text-[#94A3B8] hover:text-[#22D3EE] border border-[#334155] rounded-[4px] transition-colors"
                      title="Inspect full density map in Lightbox"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div
                    onClick={() =>
                      onOpenImage(
                        '/assets/density/cva6_density_map_innovus.jpeg',
                        'CVA6 Core Density Map with High-Density Regions'
                      )
                    }
                    className="relative aspect-square sm:aspect-[4/3] bg-[#081325] border border-[#334155] rounded-[2px] overflow-hidden cursor-pointer group"
                  >
                    <img
                      src="/assets/density/cva6_density_map_innovus.jpeg"
                      alt="CVA6 Core Density Map in Cadence Innovus"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-[#081325]/30 group-hover:bg-transparent transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 px-3 py-1 text-xs font-mono bg-[#101B2D]/90 border border-[#22D3EE] text-[#22D3EE] rounded-[4px] transition-opacity">
                        Click to Inspect (497×472)
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-[#94A3B8]">
                    Red highlighted zone signifies bins exceeding the 0.750 density threshold, validating the 47.49% cluster observed in the upper logic core.
                  </p>
                </div>

                {/* Density Console Log Screenshot */}
                <div className="bg-[#1E293B] border border-[#334155] rounded-[4px] p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-[#F8FAFC]">
                        Terminal Density Distribution
                      </h4>
                      <span className="text-[11px] font-mono text-[#22D3EE]">
                        report_density_map Output
                      </span>
                    </div>
                    <button
                      onClick={() =>
                        onOpenImage(
                          '/assets/density/density_distribution_report.jpeg',
                          'Cadence Innovus Density Distribution Console Report'
                        )
                      }
                      className="p-1.5 text-[#94A3B8] hover:text-[#22D3EE] border border-[#334155] rounded-[4px] transition-colors"
                      title="Inspect full terminal log in Lightbox"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div
                    onClick={() =>
                      onOpenImage(
                        '/assets/density/density_distribution_report.jpeg',
                        'Cadence Innovus Density Distribution Console Report'
                      )
                    }
                    className="relative aspect-[2.3/1] bg-[#081325] border border-[#334155] rounded-[2px] overflow-hidden cursor-pointer group"
                  >
                    <img
                      src="/assets/density/density_distribution_report.jpeg"
                      alt="Cadence Innovus Density Distribution Terminal Log"
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-[#081325]/20 group-hover:bg-transparent transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 px-3 py-1 text-xs font-mono bg-[#101B2D]/90 border border-[#22D3EE] text-[#22D3EE] rounded-[4px] transition-opacity">
                        View Raw Terminal Log (680×296)
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-[#94A3B8]">
                    Verifies bin count (64 sites by 10 rows), 10,918 total core bins, and exact bin distribution percentages.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

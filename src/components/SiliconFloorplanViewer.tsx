import React, { useState, useMemo } from 'react';
import {
  Layers,
  Zap,
  Activity,
  Cpu,
  Eye,
  Maximize2,
  ZoomIn,
  Check,
  Compass,
} from 'lucide-react';

interface SiliconFloorplanViewerProps {
  onOpenImage?: (imagePath: string, title: string) => void;
}

interface MacroDef {
  id: string;
  name: string;
  type: string;
  x: number;
  y: number;
  w: number;
  h: number;
  orientation: string;
  pins: number;
}

export const SiliconFloorplanViewer: React.FC<SiliconFloorplanViewerProps> = ({
  onOpenImage,
}) => {
  // Layer visibility toggles
  const [showMacros, setShowMacros] = useState(true);
  const [showStdCells, setShowStdCells] = useState(true);
  const [showPowerMesh, setShowPowerMesh] = useState(true);
  const [showSignalNets, setShowSignalNets] = useState(true);
  const [showHotspots, setShowHotspots] = useState(true);

  // Hover state
  const [hoveredMacro, setHoveredMacro] = useState<MacroDef | null>(null);
  const [cursorCoords, setCursorCoords] = useState<{ x: number; y: number }>({
    x: 850.4,
    y: 620.2,
  });

  // 24 SRAM Macros definitions based on CVA6 floorplan architecture
  // Die normalized: 0 to 1000 coordinate space
  const macros: MacroDef[] = useMemo(() => {
    const list: MacroDef[] = [];

    // Left boundary: 6 SRAM macros (Cache tags & TLB memory blocks)
    // Double column on left
    const leftMacroNames = [
      'sram_itlb_tag',
      'sram_dtlb_tag',
      'sram_icache_tag_0',
      'sram_icache_tag_1',
      'sram_dcache_tag_0',
      'sram_dcache_tag_1',
    ];
    for (let i = 0; i < 6; i++) {
      const col = i % 2;
      const row = Math.floor(i / 2);
      list.push({
        id: `M_L${i + 1}`,
        name: leftMacroNames[i],
        type: 'SRAM 128x64b',
        x: 45 + col * 95,
        y: 220 + row * 195,
        w: 80,
        h: 175,
        orientation: col === 0 ? 'R0' : 'MY',
        pins: 48,
      });
    }

    // Bottom boundary: 14 SRAM macros arranged in pairs across channels
    // (Data arrays for L1 instruction & data caches)
    const bottomMacroNames = [
      'sram_icache_data_0',
      'sram_icache_data_1',
      'sram_icache_data_2',
      'sram_icache_data_3',
      'sram_dcache_data_0',
      'sram_dcache_data_1',
      'sram_dcache_data_2',
      'sram_dcache_data_3',
      'sram_branch_pred_0',
      'sram_branch_pred_1',
      'sram_btb_array_0',
      'sram_btb_array_1',
      'sram_ras_stack_0',
      'sram_ras_stack_1',
    ];
    for (let i = 0; i < 14; i++) {
      const col = i;
      list.push({
        id: `M_B${i + 1}`,
        name: bottomMacroNames[i],
        type: 'SRAM 512x32b',
        x: 45 + col * 64,
        y: 530,
        w: 52,
        h: 420,
        orientation: i % 2 === 0 ? 'R0' : 'MX',
        pins: 64,
      });
    }

    // Right boundary: 4 SRAM macros (Write-buffer & MMU scratchpads)
    const rightMacroNames = [
      'sram_wbuffer_0',
      'sram_wbuffer_1',
      'sram_mmu_context_0',
      'sram_mmu_context_1',
    ];
    for (let i = 0; i < 4; i++) {
      const col = i % 2;
      const row = Math.floor(i / 2);
      list.push({
        id: `M_R${i + 1}`,
        name: rightMacroNames[i],
        type: 'SRAM 256x32b',
        x: 770 + col * 95,
        y: 350 + row * 170,
        w: 80,
        h: 155,
        orientation: 'MY',
        pins: 52,
      });
    }

    return list;
  }, []);

  // Track mouse coordinates over SVG
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const py = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    setCursorCoords({
      x: +(px * 1800).toFixed(1),
      y: +(py * 1800).toFixed(1),
    });
  };

  return (
    <div className="bg-[#1E293B] border border-[#334155] rounded-[4px] p-4 sm:p-5 shadow-2xl relative overflow-hidden flex flex-col justify-between">
      {/* Top EDA Window Title Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-[#334155]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-[1px] bg-[#22D3EE] animate-pulse" />
          <span className="font-mono text-xs font-semibold text-[#F8FAFC]">
            INNOVUS 21.1 // CVA6_CORE_FLOORPLAN
          </span>
          <span className="hidden sm:inline text-xs text-[#334155]">·</span>
          <span className="hidden sm:inline font-mono text-[11px] text-[#94A3B8]">
            1.8mm × 1.8mm DIE
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] px-2 py-0.5 rounded-[2px] bg-[#F59E0B]/10 border border-[#F59E0B]/40 text-[#F59E0B] font-semibold">
            CTS_IN_PROGRESS
          </span>
          {onOpenImage && (
            <button
              onClick={() =>
                onOpenImage(
                  '/assets/cva6/cva6_floorplan_macro_placement.jpeg',
                  'Original Cadence Innovus CVA6 Floorplan'
                )
              }
              className="p-1 text-[#94A3B8] hover:text-[#22D3EE] border border-[#334155] rounded-[2px] transition-colors"
              title="Inspect raw Cadence Innovus screenshot"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Layer Visibility Toggle Bar (EDA Inspector Bar) */}
      <div className="flex flex-wrap items-center gap-1.5 pb-3 mb-3 border-b border-[#334155]/60 text-[10px] font-mono">
        <span className="text-[#94A3B8] mr-1 hidden sm:inline">LAYERS:</span>

        {/* Macros Toggle */}
        <button
          onClick={() => setShowMacros(!showMacros)}
          className={`px-2 py-1 rounded-[2px] border transition-colors flex items-center gap-1 ${
            showMacros
              ? 'bg-[#152032] border-[#22D3EE] text-[#22D3EE]'
              : 'bg-[#101B2D] border-[#334155] text-[#94A3B8] opacity-50'
          }`}
          title="Toggle 24 SRAM hard memory macros"
        >
          <span className="w-2 h-2 rounded-[1px] bg-[#22D3EE]" />
          <span>24 Macros</span>
        </button>

        {/* Std Cells Toggle */}
        <button
          onClick={() => setShowStdCells(!showStdCells)}
          className={`px-2 py-1 rounded-[2px] border transition-colors flex items-center gap-1 ${
            showStdCells
              ? 'bg-[#152032] border-[#22D3EE] text-[#22D3EE]'
              : 'bg-[#101B2D] border-[#334155] text-[#94A3B8] opacity-50'
          }`}
          title="Toggle ~100K standard cell placement rows"
        >
          <span className="w-2 h-2 rounded-[1px] bg-emerald-400" />
          <span>Std Cells (~100K)</span>
        </button>

        {/* Power Mesh Toggle */}
        <button
          onClick={() => setShowPowerMesh(!showPowerMesh)}
          className={`px-2 py-1 rounded-[2px] border transition-colors flex items-center gap-1 ${
            showPowerMesh
              ? 'bg-[#152032] border-[#22D3EE] text-[#22D3EE]'
              : 'bg-[#101B2D] border-[#334155] text-[#94A3B8] opacity-50'
          }`}
          title="Toggle M6/M7 VDD/VSS Power Distribution Network"
        >
          <span className="w-2 h-2 rounded-[1px] bg-[#F59E0B]" />
          <span>Power Mesh (PDN)</span>
        </button>

        {/* Signal Nets Toggle */}
        <button
          onClick={() => setShowSignalNets(!showSignalNets)}
          className={`px-2 py-1 rounded-[2px] border transition-colors flex items-center gap-1 ${
            showSignalNets
              ? 'bg-[#152032] border-[#22D3EE] text-[#22D3EE]'
              : 'bg-[#101B2D] border-[#334155] text-[#94A3B8] opacity-50'
          }`}
          title="Toggle M3-M5 routing nets and flight lines"
        >
          <span className="w-2 h-2 rounded-[1px] bg-indigo-400" />
          <span>Signal Nets</span>
        </button>

        {/* Hotspots Toggle */}
        <button
          onClick={() => setShowHotspots(!showHotspots)}
          className={`px-2 py-1 rounded-[2px] border transition-colors flex items-center gap-1 ${
            showHotspots
              ? 'bg-[#152032] border-[#22D3EE] text-[#22D3EE]'
              : 'bg-[#101B2D] border-[#334155] text-[#94A3B8] opacity-50'
          }`}
          title="Toggle Cadence Innovus congestion & density heatmap"
        >
          <span className="w-2 h-2 rounded-[1px] bg-rose-500" />
          <span>Hotspots</span>
        </button>
      </div>

      {/* Main Floorplan Canvas Viewer */}
      <div className="relative aspect-square sm:aspect-[4/3] bg-[#060D1A] border border-[#334155] rounded-[2px] overflow-hidden select-none">
        <svg
          viewBox="0 0 1000 1000"
          className="w-full h-full cursor-crosshair"
          onMouseMove={handleMouseMove}
        >
          <defs>
            {/* Fine Substrate Gcell grid */}
            <pattern
              id="gcellGrid"
              width="25"
              height="25"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 25 0 L 0 0 0 25"
                fill="none"
                stroke="#152032"
                strokeWidth="0.7"
              />
            </pattern>

            {/* Standard Cell Site Rows Pattern */}
            <pattern
              id="stdCellRows"
              width="1000"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <rect x="0" y="0" width="1000" height="4.5" fill="#111C2E" />
              <rect x="0" y="4.5" width="1000" height="0.8" fill="#1E293B" />
              <rect x="0" y="5.3" width="1000" height="4" fill="#0C1626" />
              <line
                x1="0"
                y1="10"
                x2="1000"
                y2="10"
                stroke="#1E293B"
                strokeWidth="0.5"
              />
            </pattern>

            {/* Macro memory core internal crosshatch */}
            <pattern
              id="macroCrosshatch"
              width="8"
              height="8"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 0 0 L 8 8 M 8 0 L 0 8"
                fill="none"
                stroke="#2A3548"
                strokeWidth="0.5"
              />
            </pattern>

            {/* Halo keepout stripe pattern */}
            <pattern
              id="haloKeepout"
              width="12"
              height="12"
              patternTransform="rotate(45)"
              patternUnits="userSpaceOnUse"
            >
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="12"
                stroke="#22D3EE"
                strokeWidth="2"
                strokeOpacity="0.15"
              />
            </pattern>

            {/* Congestion Hotspot Radial Gradients (matching Innovus red cluster in upper-center & right) */}
            <radialGradient id="hotspotRed" cx="65%" cy="32%" r="28%">
              <stop offset="0%" stopColor="#EF4444" stopOpacity="0.7" />
              <stop offset="45%" stopColor="#F97316" stopOpacity="0.55" />
              <stop offset="75%" stopColor="#FACC15" stopOpacity="0.3" />
              <stop offset="95%" stopColor="#06B6D4" stopOpacity="0.1" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="hotspotSecondary" cx="30%" cy="40%" r="22%">
              <stop offset="0%" stopColor="#F97316" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#FACC15" stopOpacity="0.3" />
              <stop offset="85%" stopColor="#06B6D4" stopOpacity="0.15" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Background Silicon Substrate */}
          <rect width="1000" height="1000" fill="#081325" />
          <rect width="1000" height="1000" fill="url(#gcellGrid)" />

          {/* Die Boundary & Core Ring */}
          <rect
            x="20"
            y="20"
            width="960"
            height="960"
            fill="none"
            stroke="#334155"
            strokeWidth="2"
          />

          {/* Core Power Ring (VDD outside in cyan, VSS inside in amber) */}
          {showPowerMesh && (
            <g id="corePowerRings">
              {/* Outer Ring VDD */}
              <rect
                x="30"
                y="30"
                width="940"
                height="940"
                fill="none"
                stroke="#22D3EE"
                strokeWidth="2.5"
                strokeOpacity="0.8"
              />
              {/* Inner Ring VSS */}
              <rect
                x="36"
                y="36"
                width="928"
                height="928"
                fill="none"
                stroke="#F59E0B"
                strokeWidth="2.5"
                strokeOpacity="0.8"
              />
            </g>
          )}

          {/* Standard Cell Area Rows (~100K standard cell placement region) */}
          {showStdCells && (
            <g id="standardCellRegion">
              {/* Main logic core standard cell region: top corridor & center channel */}
              <rect
                x="45"
                y="45"
                width="910"
                height="460"
                fill="url(#stdCellRows)"
              />

              {/* Central Channel between macro clusters */}
              <rect
                x="250"
                y="505"
                width="500"
                height="440"
                fill="url(#stdCellRows)"
                opacity="0.8"
              />

              {/* Standard cell logic gates simulated clusters */}
              {/* Alternating logic gates (Inverters, DFFs, MUX, NAND) rendered in micro tracks */}
              {Array.from({ length: 32 }).map((_, r) => {
                const yPos = 55 + r * 14;
                return (
                  <g key={`row-${r}`} opacity="0.6">
                    {/* Varied width standard cell blocks */}
                    <rect
                      x={60 + (r % 5) * 8}
                      y={yPos}
                      width={18 + (r % 7) * 4}
                      height="9"
                      fill="#38BDF8"
                      opacity="0.35"
                    />
                    <rect
                      x={140 + (r % 9) * 12}
                      y={yPos}
                      width={26 + (r % 4) * 6}
                      height="9"
                      fill="#34D399"
                      opacity="0.4"
                    />
                    <rect
                      x={280 + (r % 6) * 15}
                      y={yPos}
                      width={32 + (r % 5) * 5}
                      height="9"
                      fill="#FBBF24"
                      opacity="0.35"
                    />
                    <rect
                      x={420 + (r % 8) * 10}
                      y={yPos}
                      width={40 + (r % 3) * 8}
                      height="9"
                      fill="#818CF8"
                      opacity="0.4"
                    />
                    <rect
                      x={560 + (r % 7) * 14}
                      y={yPos}
                      width={22 + (r % 6) * 4}
                      height="9"
                      fill="#F87171"
                      opacity="0.35"
                    />
                    <rect
                      x={680 + (r % 5) * 16}
                      y={yPos}
                      width={35 + (r % 4) * 5}
                      height="9"
                      fill="#38BDF8"
                      opacity="0.4"
                    />
                    <rect
                      x={800 + (r % 4) * 12}
                      y={yPos}
                      width={24 + (r % 7) * 3}
                      height="9"
                      fill="#34D399"
                      opacity="0.35"
                    />
                  </g>
                );
              })}
            </g>
          )}

          {/* Congestion Hotspot Overlay (Exact Innovus heatmap replica) */}
          {showHotspots && (
            <g id="congestionHeatmap" style={{ mixBlendMode: 'screen' }}>
              {/* Primary Hotspot: upper right quadrant above bottom macros */}
              <circle cx="680" cy="270" r="230" fill="url(#hotspotRed)" />
              {/* Secondary Hotspot: macro channel pin junction */}
              <circle
                cx="350"
                cy="380"
                r="160"
                fill="url(#hotspotSecondary)"
              />
              {/* Micro hotspots along macro boundary edge */}
              <ellipse
                cx="480"
                cy="515"
                rx="340"
                ry="45"
                fill="#F97316"
                opacity="0.45"
              />
            </g>
          )}

          {/* Signal Routing Nets (M3, M4, M5 routing flight lines) */}
          {showSignalNets && (
            <g id="signalRoutingNets" strokeWidth="1" opacity="0.6">
              {/* Horizontal signal tracks M3 / M5 */}
              {Array.from({ length: 24 }).map((_, i) => (
                <line
                  key={`sig-h-${i}`}
                  x1="50"
                  y1={70 + i * 18}
                  x2="950"
                  y2={70 + i * 18}
                  stroke="#38BDF8"
                  strokeWidth="0.8"
                  strokeDasharray={i % 3 === 0 ? '6, 4' : 'none'}
                  opacity={0.3 + (i % 4) * 0.15}
                />
              ))}

              {/* Vertical signal tracks M4 */}
              {Array.from({ length: 26 }).map((_, i) => (
                <line
                  key={`sig-v-${i}`}
                  x1={75 + i * 34}
                  y1="50"
                  x2={75 + i * 34}
                  y2="520"
                  stroke="#818CF8"
                  strokeWidth="0.8"
                  strokeDasharray={i % 4 === 0 ? '8, 5' : 'none'}
                  opacity={0.25 + (i % 3) * 0.15}
                />
              ))}

              {/* Local routing connection nets between macro pins and standard cell gates */}
              <path
                d="M 125 395 L 180 395 L 180 280 L 260 280"
                fill="none"
                stroke="#22D3EE"
                strokeWidth="1.2"
                opacity="0.8"
              />
              <path
                d="M 220 310 L 290 310 L 290 190 L 370 190"
                fill="none"
                stroke="#22D3EE"
                strokeWidth="1.2"
                opacity="0.8"
              />
              <path
                d="M 500 530 L 500 460 L 590 460 L 590 310"
                fill="none"
                stroke="#F59E0B"
                strokeWidth="1.2"
                opacity="0.85"
              />
              <path
                d="M 690 530 L 690 410 L 750 410 L 750 250"
                fill="none"
                stroke="#F59E0B"
                strokeWidth="1.2"
                opacity="0.85"
              />
            </g>
          )}

          {/* 24 Hard Macros (SRAM Memory Instances with Halos & Pins) */}
          {showMacros && (
            <g id="hardMacrosLayer">
              {macros.map((m) => {
                const isHovered = hoveredMacro?.id === m.id;

                return (
                  <g
                    key={m.id}
                    className="cursor-pointer transition-all"
                    onMouseEnter={() => setHoveredMacro(m)}
                    onMouseLeave={() => setHoveredMacro(null)}
                  >
                    {/* Macro Placement Keepout Halo (Routing Halo) */}
                    <rect
                      x={m.x - 5}
                      y={m.y - 5}
                      width={m.w + 10}
                      height={m.h + 10}
                      fill="url(#haloKeepout)"
                      stroke="#22D3EE"
                      strokeWidth="1"
                      strokeDasharray="3, 2"
                      opacity={isHovered ? 0.8 : 0.35}
                    />

                    {/* Macro Main Body Container */}
                    <rect
                      x={m.x}
                      y={m.y}
                      width={m.w}
                      height={m.h}
                      fill="#1E293B"
                      stroke={isHovered ? '#22D3EE' : '#334155'}
                      strokeWidth={isHovered ? 2 : 1.2}
                    />

                    {/* Macro Memory Array Internal Pattern */}
                    <rect
                      x={m.x + 3}
                      y={m.y + 3}
                      width={m.w - 6}
                      height={m.h - 6}
                      fill="url(#macroCrosshatch)"
                      opacity="0.75"
                    />

                    {/* Macro Pin Bars (Gold pins along the interface edge) */}
                    {/* If bottom macro, pins along top edge */}
                    {m.y >= 500 && (
                      <g>
                        {Array.from({ length: 6 }).map((_, pi) => (
                          <rect
                            key={`pin-t-${pi}`}
                            x={m.x + 5 + pi * 7}
                            y={m.y - 2}
                            width="4"
                            height="4"
                            fill="#F59E0B"
                            stroke="#081325"
                            strokeWidth="0.5"
                          />
                        ))}
                      </g>
                    )}

                    {/* If left macro, pins along right edge */}
                    {m.x < 300 && m.y < 500 && (
                      <g>
                        {Array.from({ length: 8 }).map((_, pi) => (
                          <rect
                            key={`pin-r-${pi}`}
                            x={m.x + m.w - 2}
                            y={m.y + 10 + pi * 18}
                            width="4"
                            height="4"
                            fill="#F59E0B"
                            stroke="#081325"
                            strokeWidth="0.5"
                          />
                        ))}
                      </g>
                    )}

                    {/* If right macro, pins along left edge */}
                    {m.x >= 700 && (
                      <g>
                        {Array.from({ length: 8 }).map((_, pi) => (
                          <rect
                            key={`pin-l-${pi}`}
                            x={m.x - 2}
                            y={m.y + 10 + pi * 16}
                            width="4"
                            height="4"
                            fill="#F59E0B"
                            stroke="#081325"
                            strokeWidth="0.5"
                          />
                        ))}
                      </g>
                    )}

                    {/* Macro Label */}
                    <text
                      x={m.x + m.w / 2}
                      y={m.y + m.h / 2 - 4}
                      fill={isHovered ? '#22D3EE' : '#F8FAFC'}
                      fontSize="9"
                      fontFamily="JetBrains Mono"
                      fontWeight="600"
                      textAnchor="middle"
                    >
                      {m.id}
                    </text>
                    <text
                      x={m.x + m.w / 2}
                      y={m.y + m.h / 2 + 8}
                      fill="#94A3B8"
                      fontSize="7"
                      fontFamily="JetBrains Mono"
                      textAnchor="middle"
                    >
                      SRAM
                    </text>
                  </g>
                );
              })}
            </g>
          )}

          {/* Top Metal Power Mesh Stripes (M6 Horizontal & M7 Vertical) */}
          {showPowerMesh && (
            <g id="powerMeshStripes" pointerEvents="none">
              {/* Vertical VDD stripes (M7) - Cyan lines */}
              {Array.from({ length: 15 }).map((_, i) => (
                <line
                  key={`pm-v-vdd-${i}`}
                  x1={80 + i * 60}
                  y1="35"
                  x2={80 + i * 60}
                  y2="965"
                  stroke="#22D3EE"
                  strokeWidth="1.8"
                  strokeOpacity="0.5"
                />
              ))}

              {/* Vertical VSS stripes (M7) - Amber lines */}
              {Array.from({ length: 15 }).map((_, i) => (
                <line
                  key={`pm-v-vss-${i}`}
                  x1={95 + i * 60}
                  y1="35"
                  x2={95 + i * 60}
                  y2="965"
                  stroke="#F59E0B"
                  strokeWidth="1.8"
                  strokeOpacity="0.45"
                />
              ))}

              {/* Horizontal VDD stripes (M6) */}
              {Array.from({ length: 14 }).map((_, i) => (
                <line
                  key={`pm-h-vdd-${i}`}
                  x1="35"
                  y1={85 + i * 64}
                  x2="965"
                  y2={85 + i * 64}
                  stroke="#22D3EE"
                  strokeWidth="1.8"
                  strokeOpacity="0.4"
                />
              ))}

              {/* Horizontal VSS stripes (M6) */}
              {Array.from({ length: 14 }).map((_, i) => (
                <line
                  key={`pm-h-vss-${i}`}
                  x1="35"
                  y1={105 + i * 64}
                  x2="965"
                  y2={105 + i * 64}
                  stroke="#F59E0B"
                  strokeWidth="1.8"
                  strokeOpacity="0.35"
                />
              ))}
            </g>
          )}

          {/* I/O Bond Pads around boundary */}
          <g id="bondPads" opacity="0.75">
            {/* Top pads */}
            {Array.from({ length: 20 }).map((_, i) => (
              <rect
                key={`pad-t-${i}`}
                x={65 + i * 45}
                y="22"
                width="22"
                height="6"
                fill="#F59E0B"
                stroke="#081325"
                strokeWidth="0.5"
              />
            ))}
            {/* Bottom pads */}
            {Array.from({ length: 20 }).map((_, i) => (
              <rect
                key={`pad-b-${i}`}
                x={65 + i * 45}
                y="972"
                width="22"
                height="6"
                fill="#F59E0B"
                stroke="#081325"
                strokeWidth="0.5"
              />
            ))}
            {/* Left pads */}
            {Array.from({ length: 20 }).map((_, i) => (
              <rect
                key={`pad-l-${i}`}
                x="22"
                y={65 + i * 45}
                width="6"
                height="22"
                fill="#22D3EE"
                stroke="#081325"
                strokeWidth="0.5"
              />
            ))}
            {/* Right pads */}
            {Array.from({ length: 20 }).map((_, i) => (
              <rect
                key={`pad-r-${i}`}
                x="972"
                y={65 + i * 45}
                width="6"
                height="22"
                fill="#22D3EE"
                stroke="#081325"
                strokeWidth="0.5"
              />
            ))}
          </g>

          {/* Macro Channel Dimension Callouts */}
          <g id="channelAnnotations" opacity="0.8">
            <line
              x1="45"
              y1="515"
              x2="955"
              y2="515"
              stroke="#94A3B8"
              strokeWidth="0.8"
              strokeDasharray="4, 3"
            />
            <text
              x="500"
              y="511"
              fill="#22D3EE"
              fontSize="9"
              fontFamily="JetBrains Mono"
              textAnchor="middle"
            >
              HORIZONTAL ROUTING CHANNEL &amp; HALO CORRIDOR
            </text>
          </g>
        </svg>

        {/* Live Hover Macro Inspector Tooltip Overlay */}
        {hoveredMacro && (
          <div className="absolute top-3 left-3 bg-[#101B2D]/95 border border-[#22D3EE] p-3 rounded-[3px] shadow-2xl backdrop-blur-md font-mono text-[11px] space-y-1 pointer-events-none z-20 max-w-xs">
            <div className="flex items-center justify-between text-[#22D3EE] font-bold">
              <span>{hoveredMacro.id}</span>
              <span>{hoveredMacro.orientation}</span>
            </div>
            <div className="text-[#F8FAFC] font-semibold">{hoveredMacro.name}</div>
            <div className="text-[#94A3B8] text-[10px]">
              Type: {hoveredMacro.type} · Pins: {hoveredMacro.pins}
            </div>
            <div className="text-[#F59E0B] text-[10px] pt-1 border-t border-[#334155]">
              Position: [{hoveredMacro.x * 1.8}µm, {hoveredMacro.y * 1.8}µm]
            </div>
          </div>
        )}

        {/* Top-Right HUD Coordinates Readout */}
        <div className="absolute bottom-2 right-2 bg-[#101B2D]/90 border border-[#334155] px-2.5 py-1 rounded-[2px] font-mono text-[10px] text-[#94A3B8] flex items-center gap-2 pointer-events-none">
          <Compass className="w-3 h-3 text-[#22D3EE]" />
          <span>X: {cursorCoords.x} µm</span>
          <span>·</span>
          <span>Y: {cursorCoords.y} µm</span>
        </div>
      </div>

      {/* Bottom Telemetry & Console Status Quote */}
      <div className="mt-3 p-3 bg-[#101B2D] border border-[#334155] rounded-[2px] font-mono text-xs space-y-1">
        <div className="flex flex-wrap items-center justify-between text-[11px] text-[#22D3EE]">
          <span>@innovus 35&gt; report_congestion -overflow</span>
          <span className="text-[#F59E0B]">overflow: 2972 tracks</span>
        </div>
        <div className="flex flex-wrap items-center justify-between text-[11px] text-[#94A3B8]">
          <span>Usage: (22.9% H, 38.5% V)</span>
          <span className="text-[#F8FAFC]">Normalized Hotspot: 1.04</span>
        </div>
      </div>
    </div>
  );
};

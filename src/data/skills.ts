import { SkillCategory } from '../types/portfolio';

export const skillCategories: SkillCategory[] = [
  {
    id: 'eda-tools',
    name: 'EDA & Physical Design Tools',
    description: 'Industry-standard synthesis and physical design implementation suites for digital IC tapeouts.',
    skills: [
      {
        name: 'Cadence Innovus',
        details: 'Floorplanning, macro placement, power network design, standard-cell placement, CTS, global routing, congestion & density map extraction.',
      },
      {
        name: 'Cadence Genus',
        details: 'High-effort logic synthesis, RTL elaboration, area/timing/power optimization, SDC timing constraints, generated clock modeling.',
      },
      {
        name: 'Tcl Scripting',
        details: 'Design automation, constraint manipulation, flow customization, custom report parsing, and batch execution scripts.',
      },
      {
        name: 'Linux / Unix Environment',
        details: 'EDA runtime environment, shell scripting, regex stream processing (grep/awk/sed), job management, and tool licensing pipelines.',
      },
    ],
  },
  {
    id: 'pd-stages',
    name: 'RTL-to-GDSII Physical Design Stages',
    description: 'Hands-on practical execution across core physical implementation milestones.',
    skills: [
      {
        name: 'Logic Synthesis',
        details: 'Mapping RTL Verilog onto target technology standard-cell libraries while adhering to timing, area, and power budgets.',
      },
      {
        name: 'Floorplanning & Macro Placement',
        details: 'Core aspect ratio selection, core-to-IO boundary margins, 24-macro clustering, channel sizing, and placement keepouts/halos.',
      },
      {
        name: 'Power Planning (PDN)',
        details: 'Core rings, mesh stripes across intermediate and top metal layers, standard-cell followpins and rails to ensure low IR drop.',
      },
      {
        name: 'Standard Cell Placement',
        details: 'Timing-driven and congestion-aware placement, scan chain reordering, hotspot containment, and density balancing.',
      },
      {
        name: 'Clock Tree Synthesis (CTS)',
        details: 'Clock tree modeling, buffer/inverter tree insertion, clock skew reduction, insertion delay balancing, and clock transition control.',
      },
      {
        name: 'Congestion & Routability Analysis',
        details: 'Gcell track utilization analysis, overflow mitigation, hotspot normalization, and pin access verification.',
      },
    ],
  },
  {
    id: 'fundamentals',
    name: 'Hardware Design & Silicon Fundamentals',
    description: 'Theoretical grounding in solid-state devices, digital microarchitecture, and timing signoff.',
    skills: [
      {
        name: 'Verilog HDL',
        details: 'RTL description of synchronous digital circuits, pipelined datapath design, state machines, and simulation testbenches.',
      },
      {
        name: 'Static Timing Analysis (STA)',
        details: 'Setup and hold check formulation, data path vs clock path delay calculation, clock jitter, uncertainty, and slack closure.',
      },
      {
        name: 'Clock Domains & SDC Constraints',
        details: 'Master clocks, generated clocks, divide-by-N logic, asynchronous domain grouping, multicycle paths, and false paths.',
      },
      {
        name: 'CMOS Circuit Fundamentals',
        details: 'MOSFET operation, CMOS inverter characteristics, propagation delay, transistor sizing, dynamic and leakage power dissipation.',
      },
    ],
  },
];

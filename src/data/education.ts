import { EducationItem } from '../types/portfolio';

export const educationList: EducationItem[] = [
  {
    id: 'sumedha-it',
    degree: 'Physical Design Training',
    field: 'VLSI RTL-to-GDSII Implementation',
    institution: 'Sumedha IT',
    location: 'Hyderabad, India',
    period: 'June 2026 – December 2026',
    result: 'In Progress / Completed Modules',
    type: 'training',
    highlights: [
      'Comprehensive RTL-to-GDS implementation training using Cadence Genus and Innovus.',
      'Rigorous execution of floorplanning, macro placement & halos, power grid planning, timing-driven placement, and clock tree synthesis.',
      'Active development of Tcl scripts and Linux pipelines for EDA run automation and report generation.',
    ],
  },
  {
    id: 'northumbria-msc',
    degree: 'M.Sc. Computing and Technology',
    field: 'Computing & Advanced Technology',
    institution: 'Northumbria University',
    period: 'Jan 2022 – Jan 2024',
    result: 'Result: 61/100 (Pass with Merit)',
    type: 'education',
    highlights: [
      'Advanced computer systems architecture, algorithmic complexity, software engineering principles, and distributed computing.',
      'Research methods, technical documentation, and structured computational problem solving.',
    ],
  },
  {
    id: 'sathyabama-btech',
    degree: 'B.Tech. Electronics and Communication Engineering',
    field: 'Electronics & Communication',
    institution: 'Sathyabama University, Chennai',
    period: 'Jun 2017 – May 2021',
    result: 'CGPA: 7.3 / 10',
    type: 'education',
    highlights: [
      'In-depth coursework in CMOS VLSI Design, Digital Electronics, Microprocessors, Signals & Systems, and Semiconductor Physics.',
      'Hardware laboratory work in Verilog HDL logic simulation, digital circuit synthesis, and FPGA prototyping.',
    ],
  },
];

export const certifications = [
  {
    id: 'coursera-vlsi',
    title: 'Introduction to VLSI Flow',
    issuer: 'Coursera',
    description: 'Foundations of ASIC design methodology, RTL verification, logic synthesis, and physical layout principles.',
  },
  {
    id: 'nptel-python',
    title: 'Data Structures and Computing with Python',
    issuer: 'NPTEL (National Programme on Technology Enhanced Learning)',
    description: 'Data structure algorithms, complexity analysis, and computational scripting for engineering workflows.',
  },
];

export const languages = [
  { name: 'English', proficiency: 'Professional Working Proficiency' },
  { name: 'Telugu', proficiency: 'Native' },
  { name: 'Hindi', proficiency: 'Conversational' },
];

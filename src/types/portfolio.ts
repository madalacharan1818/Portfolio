export interface ProjectMetric {
  label: string;
  value: string;
  sublabel?: string;
  isAmber?: boolean;
}

export interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  status: 'CTS In Progress' | 'Synthesis & Placement Completed' | 'Synthesis & SDC Verification Completed';
  statusType: 'progress' | 'completed';
  targetPeriod: string;
  targetFreq: string;
  scale: string;
  macros: number | string;
  clockDomains: string;
  tools: string[];
  summary: string;
  keyResponsibilities: string[];
  technicalHighlights: string[];
  metrics: ProjectMetric[];
  associatedImages: {
    title: string;
    description: string;
    path: string;
    category: string;
  }[];
}

export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  skills: {
    name: string;
    level?: string;
    details: string;
  }[];
}

export interface CongestionData {
  usageH: number;
  usageV: number;
  overflowH: number;
  overflowHPercent: number;
  overflowV: number;
  overflowVPercent: number;
  totalOverflow: number;
  normalizedMaxHotspot: number;
  normalizedTotalHotspot: number;
  wirelengthH_um: string;
  wirelengthV_um: string;
  remainDistribution: {
    remain: number;
    cntH: number;
    pctH: number;
    cntV: number;
    pctV: number;
  }[];
}

export interface DensityData {
  threshold: number;
  binsAboveThreshold: number;
  totalBins: number;
  percentage: number;
  binSize: string;
  gridDimensions: string;
  densityRanges: {
    range: string;
    bins: number;
    percentage: number;
  }[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'CVA6 Floorplan' | 'Congestion' | 'Density' | 'Terminal Telemetry';
  imagePath: string;
  tool: string;
  stage: string;
  description: string;
  aspectRatio: string;
  technicalNotes: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  field: string;
  institution: string;
  location?: string;
  period: string;
  result: string;
  type: 'education' | 'training';
  highlights?: string[];
}

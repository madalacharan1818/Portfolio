import { CongestionData, DensityData } from '../types/portfolio';

export const congestionMetrics: CongestionData = {
  usageH: 22.9,
  usageV: 38.5,
  overflowH: 68,
  overflowHPercent: 0.03,
  overflowV: 2904,
  overflowVPercent: 1.07,
  totalOverflow: 2972,
  normalizedMaxHotspot: 1.04,
  normalizedTotalHotspot: 2.60,
  wirelengthH_um: '3.102e+06',
  wirelengthV_um: '2.884e+06',
  remainDistribution: [
    { remain: -5, cntH: 1, pctH: 0.00, cntV: 29, pctV: 0.01 },
    { remain: -4, cntH: 1, pctH: 0.00, cntV: 65, pctV: 0.02 },
    { remain: -3, cntH: 6, pctH: 0.00, cntV: 228, pctV: 0.08 },
    { remain: -2, cntH: 19, pctH: 0.01, cntV: 558, pctV: 0.21 },
    { remain: -1, cntH: 27, pctH: 0.01, cntV: 1523, pctV: 0.56 },
    { remain: 0, cntH: 79, pctH: 0.03, cntV: 4419, pctV: 1.63 },
    { remain: 1, cntH: 163, pctH: 0.06, cntV: 15024, pctV: 5.55 },
    { remain: 2, cntH: 270, pctH: 0.10, cntV: 16133, pctV: 5.96 },
    { remain: 3, cntH: 478, pctH: 0.18, cntV: 17150, pctV: 6.33 },
    { remain: 4, cntH: 754, pctH: 0.28, cntV: 17407, pctV: 6.43 },
    { remain: 5, cntH: 269066, pctH: 99.34, cntV: 198328, pctV: 73.22 },
  ],
};

export const densityMetrics: DensityData = {
  threshold: 0.750,
  binsAboveThreshold: 7407,
  totalBins: 10918,
  percentage: 67.84,
  binSize: '64 sites by 10 row(s)',
  gridDimensions: '106 by 103 bins',
  densityRanges: [
    { range: '(0.750 - 0.800]', bins: 555, percentage: 5.08 },
    { range: '(0.800 - 0.850]', bins: 510, percentage: 4.67 },
    { range: '(0.850 - 0.900]', bins: 503, percentage: 4.61 },
    { range: '(0.900 - 0.950]', bins: 307, percentage: 2.81 },
    { range: '(0.950 - 1.000]', bins: 5185, percentage: 47.49 },
    { range: '(1.000 - 1.050]', bins: 93, percentage: 0.85 },
    { range: '(1.050 - 1.100]', bins: 77, percentage: 0.71 },
    { range: '(1.100 - 1.150]', bins: 57, percentage: 0.52 },
    { range: '(1.150 - 1.200]', bins: 43, percentage: 0.39 },
    { range: '> 1.200', bins: 77, percentage: 0.71 },
  ],
};

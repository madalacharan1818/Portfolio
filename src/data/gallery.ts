import { GalleryItem } from '../types/portfolio';

export const galleryItems: GalleryItem[] = [
  {
    id: 'cva6-congestion-map',
    title: 'CVA6 Global Routing Congestion Heatmap',
    category: 'Congestion',
    imagePath: '/assets/congestion/cva6_routing_congestion_map.jpeg',
    tool: 'Cadence Innovus',
    stage: 'Post-Placement Routing Analysis',
    description:
      'Gcell routing congestion map extracted after standard-cell placement on the CVA6 RISC-V core. Saturated points denote localized routing demand where pin density concentrates adjacent to the macro boundary.',
    aspectRatio: '463/428',
    technicalNotes: [
      'Horizontal track utilization: 22.9% (minimal overflow: 68 tracks)',
      'Vertical track utilization: 38.5% (overflow: 2904 tracks)',
      'Total overflow: 2972 tracks',
      'Normalized maximum hotspot: 1.04',
      'Normalized total hotspot: 2.60',
    ],
  },
  {
    id: 'cva6-floorplan-macro',
    title: 'CVA6 Macro Placement & PDN Floorplan',
    category: 'CVA6 Floorplan',
    imagePath: '/assets/cva6/cva6_floorplan_macro_placement.jpeg',
    tool: 'Cadence Innovus',
    stage: 'Floorplanning & Macro Orientation',
    description:
      'Floorplan layout highlighting the orientation and clustering of 24 SRAM macros. Macro halos and channels are arranged to enable continuous power mesh routing and keepout zones for standard cell gates.',
    aspectRatio: '443/424',
    technicalNotes: [
      '24 Memory Macros arranged along peripheral boundaries',
      'Uniform macro channel spacing for routing feeder lines',
      'Dedicated power stripes on upper metal layers (VDD / VSS)',
      'Core aspect ratio configured for optimal pin access to standard cells',
    ],
  },
  {
    id: 'cva6-density-heatmap',
    title: 'CVA6 Standard Cell Core Density Map',
    category: 'Density',
    imagePath: '/assets/density/cva6_density_map_innovus.jpeg',
    tool: 'Cadence Innovus',
    stage: 'Post-Placement Density Map',
    description:
      'Color-coded density map displaying bins that exceed the 0.750 (75%) utilization threshold. Prominent red regions signify high standard cell packing (47.49% of bins in 0.95-1.00 density range), analyzed prior to CTS.',
    aspectRatio: '497/472',
    technicalNotes: [
      'Threshold parameter: 0.750 core cell density',
      '7,407 of 10,918 bins (67.84%) exceed threshold',
      'Bin dimensions: 64 sites by 10 rows (106 x 103 matrix)',
      'Peak concentration in upper logic block, verifying standard cell spreading requirements',
    ],
  },
  {
    id: 'innovus-congestion-terminal',
    title: 'Cadence Innovus `report_congestion` Telemetry',
    category: 'Terminal Telemetry',
    imagePath: '/assets/congestion/congestion_overflow_report.jpeg',
    tool: 'Cadence Innovus CLI',
    stage: 'report_congestion -overflow -hotspot',
    description:
      'Direct Cadence Innovus console capture showing quantitative wirelength distribution, track usage in horizontal (22.9%) and vertical (38.5%) directions, and Remain track histogram from -5 to +5.',
    aspectRatio: '904/457',
    technicalNotes: [
      'H wirelength: 3.102e+06 um (1,723,566 tracks)',
      'V wirelength: 2.884e+06 um (1,602,303 tracks)',
      'Overflow distribution: H 68 (0.03%), V 2904 (1.07%)',
      'Hotspot area: Normalized max = 1.04, normalized total = 2.60',
    ],
  },
  {
    id: 'innovus-density-terminal',
    title: 'Cadence Innovus `report_density_map` Telemetry',
    category: 'Terminal Telemetry',
    imagePath: '/assets/density/density_distribution_report.jpeg',
    tool: 'Cadence Innovus CLI',
    stage: 'report_density_map',
    description:
      'Cadence Innovus console report delineating the exact breakdown of standard cell bins from 0.750 to >1.200 density, confirming that 5,185 bins reside in the 0.950-1.000 interval.',
    aspectRatio: '680/296',
    technicalNotes: [
      'Total evaluated core bins: 10,918',
      'Bins > 0.750: 7,407 (67.84%)',
      'Primary cluster: 5,185 bins (47.49%) in 0.950 - 1.000 interval',
      'Bins > 1.00: 347 bins (3.18%) targeted for post-placement spreading',
    ],
  },
];

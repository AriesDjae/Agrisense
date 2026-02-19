// Mock API data untuk IrrigaPlan DSS
// Semua perhitungan diasumsikan dilakukan di backend, data ini hanya hasil respons API

export interface CropSuitability {
  crop: string;
  suitabilityScore: number;
  factors: {
    vegetation: number;
    soilPh: number;
    rainfall: number;
    temperature: number;
  };
}

export interface IrrigationDemand {
  level: 'Rendah' | 'Sedang' | 'Tinggi';
  waterRequirement: number; // mm/minggu
  confidence: number;
}

export interface GrowthPhase {
  name: string;
  startDay: number;
  endDay: number;
  status: 'selesai' | 'aktif' | 'akan datang';
  ndviExpected: number;
}

export interface FertilizationSchedule {
  phase: string;
  timing: string;
  dayFromPlanting: number;
  fertilizers: {
    type: 'Nitrogen' | 'Fosfor' | 'Kalium' | 'Organik';
    amount: string;
  }[];
}

export interface CropRotationSuggestion {
  nextCrop: string;
  reason: string;
  suitabilityScore: number;
  restPeriod: number; // hari
}

export interface LandAnalysis {
  landId: string;
  coordinates: [number, number];
  area: number; // hektar
  cropSuitability: CropSuitability[];
  recommendedCrop: string;
  irrigationDemand: IrrigationDemand;
  growthTimeline: {
    plantingDate: string;
    harvestWindow: { start: string; end: string };
    totalDays: number;
    phases: GrowthPhase[];
  };
  fertilizationSchedule: FertilizationSchedule[];
  cropRotation: CropRotationSuggestion[];
  explanation: string;
  currentNdvi: number;
  soilPh: number;
  recentRainfall: number; // mm dalam 30 hari terakhir
  avgTemperature: number; // celsius
}

// Data analisis lahan mock - hasil dari backend ML
export const mockLandAnalysis: LandAnalysis = {
  landId: "LAHAN-001",
  coordinates: [-6.9175, 107.6191], // Bandung, Indonesia
  area: 2.5,
  cropSuitability: [
    {
      crop: "Padi",
      suitabilityScore: 0.89,
      factors: { vegetation: 0.85, soilPh: 0.92, rainfall: 0.88, temperature: 0.91 }
    },
    {
      crop: "Jagung",
      suitabilityScore: 0.76,
      factors: { vegetation: 0.78, soilPh: 0.85, rainfall: 0.70, temperature: 0.72 }
    },
    {
      crop: "Kedelai",
      suitabilityScore: 0.72,
      factors: { vegetation: 0.75, soilPh: 0.80, rainfall: 0.65, temperature: 0.68 }
    },
    {
      crop: "Singkong",
      suitabilityScore: 0.68,
      factors: { vegetation: 0.70, soilPh: 0.75, rainfall: 0.60, temperature: 0.67 }
    },
    {
      crop: "Ubi Jalar",
      suitabilityScore: 0.65,
      factors: { vegetation: 0.68, soilPh: 0.72, rainfall: 0.58, temperature: 0.62 }
    }
  ],
  recommendedCrop: "Padi",
  irrigationDemand: {
    level: "Sedang",
    waterRequirement: 45,
    confidence: 0.87
  },
  growthTimeline: {
    plantingDate: "2024-03-15",
    harvestWindow: { start: "2024-07-01", end: "2024-07-15" },
    totalDays: 120,
    phases: [
      { name: "Perkecambahan", startDay: 0, endDay: 10, status: "selesai", ndviExpected: 0.15 },
      { name: "Vegetatif", startDay: 11, endDay: 50, status: "aktif", ndviExpected: 0.55 },
      { name: "Reproduktif", startDay: 51, endDay: 85, status: "akan datang", ndviExpected: 0.75 },
      { name: "Pemasakan", startDay: 86, endDay: 110, status: "akan datang", ndviExpected: 0.60 },
      { name: "Siap Panen", startDay: 111, endDay: 120, status: "akan datang", ndviExpected: 0.40 }
    ]
  },
  fertilizationSchedule: [
    {
      phase: "Pra-tanam",
      timing: "7 hari sebelum tanam",
      dayFromPlanting: -7,
      fertilizers: [
        { type: "Fosfor", amount: "100 kg/ha" },
        { type: "Organik", amount: "2 ton/ha" }
      ]
    },
    {
      phase: "Vegetatif Awal",
      timing: "14 hari setelah tanam",
      dayFromPlanting: 14,
      fertilizers: [
        { type: "Nitrogen", amount: "50 kg/ha" }
      ]
    },
    {
      phase: "Vegetatif Tengah",
      timing: "35 hari setelah tanam",
      dayFromPlanting: 35,
      fertilizers: [
        { type: "Nitrogen", amount: "50 kg/ha" },
        { type: "Kalium", amount: "50 kg/ha" }
      ]
    },
    {
      phase: "Reproduktif",
      timing: "55 hari setelah tanam",
      dayFromPlanting: 55,
      fertilizers: [
        { type: "Nitrogen", amount: "30 kg/ha" },
        { type: "Kalium", amount: "30 kg/ha" }
      ]
    }
  ],
  cropRotation: [
    {
      nextCrop: "Kedelai",
      reason: "Tanaman legum pengikat nitrogen untuk memperbaiki kesuburan tanah setelah budidaya padi",
      suitabilityScore: 0.85,
      restPeriod: 14
    },
    {
      nextCrop: "Jagung",
      reason: "Kebutuhan unsur hara yang berbeda mencegah penipisan tanah",
      suitabilityScore: 0.78,
      restPeriod: 21
    },
    {
      nextCrop: "Kacang Hijau",
      reason: "Masa tanam pendek dan pengayaan nitrogen tanah",
      suitabilityScore: 0.72,
      restPeriod: 7
    }
  ],
  explanation: "Padi direkomendasikan karena kondisi vegetasi mendukung (NDVI: 0,72), pH tanah berada dalam kisaran optimal (6,2), dan curah hujan baru-baru ini sebesar 185mm mendukung ketersediaan air. Citra satelit terkini menunjukkan tingkat kelembaban tanah yang sehat dan cocok untuk budidaya padi. Pola historis menunjukkan bahwa lahan ini berhasil mendukung budidaya padi dengan kondisi lingkungan yang serupa.",
  currentNdvi: 0.72,
  soilPh: 6.2,
  recentRainfall: 185,
  avgTemperature: 26.5
};

// Data layer peta mock
export interface MapLayer {
  id: string;
  name: string;
  type: 'vegetation' | 'irrigation' | 'soil' | 'temperature';
  visible: boolean;
  opacity: number;
}

export const mockMapLayers: MapLayer[] = [
  { id: 'ndvi', name: 'Indeks Vegetasi (NDVI)', type: 'vegetation', visible: true, opacity: 0.7 },
  { id: 'irrigation', name: 'Zona Irigasi', type: 'irrigation', visible: false, opacity: 0.6 },
  { id: 'soil', name: 'Tingkat pH Tanah', type: 'soil', visible: false, opacity: 0.6 },
  { id: 'temp', name: 'Suhu Permukaan', type: 'temperature', visible: false, opacity: 0.5 }
];

// Koordinat polygon contoh untuk lahan terpilih
export const samplePolygon = [
  [-6.9150, 107.6170],
  [-6.9150, 107.6210],
  [-6.9200, 107.6210],
  [-6.9200, 107.6170],
  [-6.9150, 107.6170]
];

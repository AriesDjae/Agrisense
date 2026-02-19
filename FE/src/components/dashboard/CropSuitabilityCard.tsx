import { CropSuitability } from "@/data/mockApi";
import { motion } from "framer-motion";
import { TrendingUp, Leaf, Droplets, Thermometer, TestTube } from "lucide-react";

interface CropSuitabilityCardProps {
  crops: CropSuitability[];
  recommendedCrop: string;
}

export function CropSuitabilityCard({ crops, recommendedCrop }: CropSuitabilityCardProps) {
  return (
    <div 
      className="bg-card rounded-xl border border-border p-6 shadow-card"
      role="region"
      aria-labelledby="crop-suitability-title"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 id="crop-suitability-title" className="font-display font-semibold text-lg">
          Kesesuaian Tanaman
        </h3>
        <div className="flex items-center gap-2 text-sm text-success">
          <TrendingUp className="h-4 w-4" aria-hidden="true" />
          <span>Analisis AI</span>
        </div>
      </div>

      <div className="space-y-3" role="list" aria-label="Daftar kesesuaian tanaman">
        {crops.map((crop, index) => (
          <motion.div
            key={crop.crop}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative p-4 rounded-lg border transition-all ${
              crop.crop === recommendedCrop
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/30"
            }`}
            role="listitem"
            aria-label={`${crop.crop}: skor kesesuaian ${Math.round(crop.suitabilityScore * 100)}%${crop.crop === recommendedCrop ? ', direkomendasikan' : ''}`}
          >
            {crop.crop === recommendedCrop && (
              <span className="absolute top-2 right-2 text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                Direkomendasikan
              </span>
            )}

            <div className="flex items-center justify-between mb-3">
              <span className="font-medium text-foreground">{crop.crop}</span>
              <span className="text-2xl font-bold text-primary">
                {Math.round(crop.suitabilityScore * 100)}%
              </span>
            </div>

            {/* Progress Bar */}
            <div 
              className="h-2 bg-muted rounded-full overflow-hidden mb-3"
              role="progressbar"
              aria-valuenow={Math.round(crop.suitabilityScore * 100)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Skor kesesuaian ${crop.crop}`}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${crop.suitabilityScore * 100}%` }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`h-full rounded-full ${
                  crop.suitabilityScore >= 0.8
                    ? "bg-success"
                    : crop.suitabilityScore >= 0.6
                    ? "bg-growth"
                    : "bg-warning"
                }`}
              />
            </div>

            {/* Rincian Faktor */}
            <div className="grid grid-cols-4 gap-2">
              <div className="flex flex-col items-center text-center">
                <Leaf className="h-3 w-3 text-growth mb-1" aria-hidden="true" />
                <span className="text-xs text-muted-foreground">Veg</span>
                <span className="text-xs font-medium">
                  {Math.round(crop.factors.vegetation * 100)}%
                </span>
              </div>
              <div className="flex flex-col items-center text-center">
                <TestTube className="h-3 w-3 text-soil mb-1" aria-hidden="true" />
                <span className="text-xs text-muted-foreground">pH</span>
                <span className="text-xs font-medium">
                  {Math.round(crop.factors.soilPh * 100)}%
                </span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Droplets className="h-3 w-3 text-irrigation mb-1" aria-hidden="true" />
                <span className="text-xs text-muted-foreground">Hujan</span>
                <span className="text-xs font-medium">
                  {Math.round(crop.factors.rainfall * 100)}%
                </span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Thermometer className="h-3 w-3 text-harvest mb-1" aria-hidden="true" />
                <span className="text-xs text-muted-foreground">Suhu</span>
                <span className="text-xs font-medium">
                  {Math.round(crop.factors.temperature * 100)}%
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

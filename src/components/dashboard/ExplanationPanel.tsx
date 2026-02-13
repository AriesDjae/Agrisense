import { MessageCircle, Lightbulb, Leaf, Droplets, TestTube, Thermometer } from "lucide-react";
import { motion } from "framer-motion";

interface ExplanationPanelProps {
  explanation: string;
  currentNdvi: number;
  soilPh: number;
  recentRainfall: number;
  avgTemperature: number;
  recommendedCrop: string;
}

export function ExplanationPanel({
  explanation,
  currentNdvi,
  soilPh,
  recentRainfall,
  avgTemperature,
  recommendedCrop,
}: ExplanationPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-xl border border-primary/20 p-6 shadow-card"
      role="region"
      aria-labelledby="explanation-title"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-lg bg-primary/10">
          <Lightbulb className="h-5 w-5 text-primary" aria-hidden="true" />
        </div>
        <div>
          <h3 id="explanation-title" className="font-display font-semibold text-lg">
            Mengapa {recommendedCrop}?
          </h3>
          <span className="text-xs text-muted-foreground">Penjelasan dari AI</span>
        </div>
      </div>

      {/* Teks Penjelasan */}
      <div className="bg-primary/5 rounded-lg p-4 mb-6 border border-primary/10">
        <div className="flex gap-3">
          <MessageCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-foreground leading-relaxed">{explanation}</p>
        </div>
      </div>

      {/* Data Pendukung */}
      <h4 className="text-sm font-medium text-muted-foreground mb-3">
        Data Pendukung
      </h4>
      <div className="grid grid-cols-2 gap-3" role="list" aria-label="Data lingkungan pendukung rekomendasi">
        <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg" role="listitem">
          <div className="p-2 rounded-lg bg-growth/10">
            <Leaf className="h-4 w-4 text-growth" aria-hidden="true" />
          </div>
          <div>
            <span className="text-xs text-muted-foreground block">Vegetasi (NDVI)</span>
            <span className="font-semibold">{currentNdvi.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg" role="listitem">
          <div className="p-2 rounded-lg bg-soil/10">
            <TestTube className="h-4 w-4 text-soil" aria-hidden="true" />
          </div>
          <div>
            <span className="text-xs text-muted-foreground block">pH Tanah</span>
            <span className="font-semibold">{soilPh.toFixed(1)}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg" role="listitem">
          <div className="p-2 rounded-lg bg-irrigation/10">
            <Droplets className="h-4 w-4 text-irrigation" aria-hidden="true" />
          </div>
          <div>
            <span className="text-xs text-muted-foreground block">Curah Hujan Terkini</span>
            <span className="font-semibold">{recentRainfall} mm</span>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg" role="listitem">
          <div className="p-2 rounded-lg bg-harvest/10">
            <Thermometer className="h-4 w-4 text-harvest" aria-hidden="true" />
          </div>
          <div>
            <span className="text-xs text-muted-foreground block">Suhu Rata-rata</span>
            <span className="font-semibold">{avgTemperature}°C</span>
          </div>
        </div>
      </div>

      {/* Indikator Kepercayaan */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" aria-hidden="true" />
          <span>
            Rekomendasi ini didasarkan pada analisis machine learning terhadap data lingkungan
          </span>
        </div>
      </div>
    </motion.div>
  );
}

import { CropRotationSuggestion } from "@/data/mockApi";
import { RefreshCw, ArrowRight, Calendar } from "lucide-react";
import { motion } from "framer-motion";

interface CropRotationCardProps {
  suggestions: CropRotationSuggestion[];
  currentCrop: string;
}

export function CropRotationCard({ suggestions, currentCrop }: CropRotationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-xl border border-border p-6 shadow-card"
      role="region"
      aria-labelledby="crop-rotation-title"
    >
      <div className="flex items-center gap-2 mb-4">
        <RefreshCw className="h-5 w-5 text-primary" aria-hidden="true" />
        <h3 id="crop-rotation-title" className="font-display font-semibold text-lg">
          Rotasi Tanaman
        </h3>
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        Setelah memanen <span className="font-medium text-foreground">{currentCrop}</span>,
        pertimbangkan tanaman berikut untuk siklus tanam selanjutnya:
      </p>

      <div className="space-y-3" role="list" aria-label="Daftar rekomendasi rotasi tanaman">
        {suggestions.map((suggestion, index) => (
          <motion.div
            key={suggestion.nextCrop}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-lg border transition-all ${
              index === 0
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/30"
            }`}
            role="listitem"
            aria-label={`${suggestion.nextCrop}: skor kesesuaian ${Math.round(suggestion.suitabilityScore * 100)}%${index === 0 ? ', pilihan terbaik' : ''}`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-primary" aria-hidden="true" />
                <span className="font-medium text-foreground">{suggestion.nextCrop}</span>
                {index === 0 && (
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                    Pilihan Terbaik
                  </span>
                )}
              </div>
              <span className="text-lg font-bold text-primary">
                {Math.round(suggestion.suitabilityScore * 100)}%
              </span>
            </div>

            <p className="text-sm text-muted-foreground mb-2">{suggestion.reason}</p>

            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" aria-hidden="true" />
              <span>Masa istirahat: {suggestion.restPeriod} hari sebelum tanam</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

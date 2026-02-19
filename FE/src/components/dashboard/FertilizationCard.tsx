import { FertilizationSchedule } from "@/data/mockApi";
import { FlaskConical, Calendar } from "lucide-react";
import { motion } from "framer-motion";

interface FertilizationCardProps {
  schedule: FertilizationSchedule[];
}

export function FertilizationCard({ schedule }: FertilizationCardProps) {
  const getFertilizerColor = (type: string) => {
    switch (type) {
      case "Nitrogen":
        return "bg-irrigation/20 text-irrigation border-irrigation/30";
      case "Fosfor":
        return "bg-harvest/20 text-harvest border-harvest/30";
      case "Kalium":
        return "bg-growth/20 text-growth border-growth/30";
      case "Organik":
        return "bg-soil/20 text-soil border-soil/30";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const getFertilizerLabel = (type: string) => {
    switch (type) {
      case "Nitrogen":
        return "Nitrogen (N)";
      case "Fosfor":
        return "Fosfor (P)";
      case "Kalium":
        return "Kalium (K)";
      case "Organik":
        return "Organik";
      default:
        return type;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-xl border border-border p-6 shadow-card"
      role="region"
      aria-labelledby="fertilization-title"
    >
      <div className="flex items-center gap-2 mb-4">
        <FlaskConical className="h-5 w-5 text-soil" aria-hidden="true" />
        <h3 id="fertilization-title" className="font-display font-semibold text-lg">
          Jadwal Pemupukan
        </h3>
      </div>

      <div className="space-y-4" role="list" aria-label="Daftar jadwal pemupukan">
        {schedule.map((item, index) => (
          <motion.div
            key={item.phase}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative pl-6 pb-4 border-l-2 border-border last:pb-0"
            role="listitem"
          >
            {/* Titik Timeline */}
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary border-2 border-background" aria-hidden="true" />

            <div className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-foreground">{item.phase}</h4>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" aria-hidden="true" />
                  {item.timing}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {item.fertilizers.map((fert) => (
                  <span
                    key={fert.type}
                    className={`text-xs font-medium px-2 py-1 rounded-full border ${getFertilizerColor(
                      fert.type
                    )}`}
                  >
                    {getFertilizerLabel(fert.type)}: {fert.amount}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Legenda */}
      <div className="mt-6 pt-4 border-t border-border">
        <h4 className="text-xs font-medium text-muted-foreground mb-2">
          Jenis Pupuk
        </h4>
        <div className="flex flex-wrap gap-2" role="list" aria-label="Legenda jenis pupuk">
          {[
            { key: "Nitrogen", label: "Nitrogen (N)" },
            { key: "Fosfor", label: "Fosfor (P)" },
            { key: "Kalium", label: "Kalium (K)" },
            { key: "Organik", label: "Organik" }
          ].map((item) => (
            <span
              key={item.key}
              className={`text-xs px-2 py-1 rounded-full border ${getFertilizerColor(item.key)}`}
              role="listitem"
            >
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

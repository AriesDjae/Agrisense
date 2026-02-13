import { IrrigationDemand } from "@/data/mockApi";
import { Droplets, AlertTriangle, CheckCircle, Info } from "lucide-react";
import { motion } from "framer-motion";

interface IrrigationCardProps {
  irrigation: IrrigationDemand;
}

export function IrrigationCard({ irrigation }: IrrigationCardProps) {
  const getLevelStyles = (level: string) => {
    switch (level) {
      case "Rendah":
        return {
          bg: "bg-success/10",
          border: "border-success/30",
          text: "text-success",
          icon: CheckCircle,
          description: "Irigasi minimal diperlukan. Curah hujan alami sudah cukup.",
        };
      case "Sedang":
        return {
          bg: "bg-irrigation/10",
          border: "border-irrigation/30",
          text: "text-irrigation",
          icon: Info,
          description: "Irigasi sedang direkomendasikan. Tambahkan air saat periode kering.",
        };
      case "Tinggi":
        return {
          bg: "bg-warning/10",
          border: "border-warning/30",
          text: "text-warning",
          icon: AlertTriangle,
          description: "Kebutuhan irigasi tinggi. Jadwal penyiraman rutin diperlukan.",
        };
      default:
        return {
          bg: "bg-muted",
          border: "border-border",
          text: "text-foreground",
          icon: Droplets,
          description: "",
        };
    }
  };

  const styles = getLevelStyles(irrigation.level);
  const StatusIcon = styles.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-xl border border-border p-6 shadow-card"
      role="region"
      aria-labelledby="irrigation-title"
    >
      <div className="flex items-center gap-2 mb-4">
        <Droplets className="h-5 w-5 text-irrigation" aria-hidden="true" />
        <h3 id="irrigation-title" className="font-display font-semibold text-lg">
          Kebutuhan Irigasi
        </h3>
      </div>

      <div className={`rounded-lg p-4 ${styles.bg} ${styles.border} border mb-4`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <StatusIcon className={`h-5 w-5 ${styles.text}`} aria-hidden="true" />
            <span className={`font-semibold text-xl ${styles.text}`}>
              {irrigation.level}
            </span>
          </div>
          <span className="text-sm text-muted-foreground">
            Kepercayaan: {Math.round(irrigation.confidence * 100)}%
          </span>
        </div>
        <p className="text-sm text-muted-foreground">{styles.description}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-muted/50 rounded-lg p-4">
          <span className="text-sm text-muted-foreground block mb-1">
            Kebutuhan Mingguan
          </span>
          <span className="text-2xl font-bold text-foreground">
            {irrigation.waterRequirement} <span className="text-sm font-normal">mm</span>
          </span>
        </div>
        <div className="bg-muted/50 rounded-lg p-4">
          <span className="text-sm text-muted-foreground block mb-1">
            Per Hektar
          </span>
          <span className="text-2xl font-bold text-foreground">
            {Math.round(irrigation.waterRequirement * 10)}{" "}
            <span className="text-sm font-normal">m³</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
}

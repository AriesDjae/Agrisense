import { GrowthPhase } from "@/data/mockApi";
import { Calendar, CheckCircle, Clock, Hourglass } from "lucide-react";
import { motion } from "framer-motion";

interface GrowthTimelineCardProps {
  plantingDate: string;
  harvestWindow: { start: string; end: string };
  totalDays: number;
  phases: GrowthPhase[];
}

export function GrowthTimelineCard({
  plantingDate,
  harvestWindow,
  totalDays,
  phases,
}: GrowthTimelineCardProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "selesai":
        return <CheckCircle className="h-4 w-4 text-success" aria-hidden="true" />;
      case "aktif":
        return <Clock className="h-4 w-4 text-growth" aria-hidden="true" />;
      default:
        return <Hourglass className="h-4 w-4 text-muted-foreground" aria-hidden="true" />;
    }
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "selesai":
        return "bg-success";
      case "aktif":
        return "bg-growth";
      default:
        return "bg-muted";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "selesai":
        return "Selesai";
      case "aktif":
        return "Sedang Berlangsung";
      case "akan datang":
        return "Akan Datang";
      default:
        return status;
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-xl border border-border p-6 shadow-card"
      role="region"
      aria-labelledby="growth-timeline-title"
    >
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="h-5 w-5 text-harvest" aria-hidden="true" />
        <h3 id="growth-timeline-title" className="font-display font-semibold text-lg">
          Jadwal Pertumbuhan
        </h3>
      </div>

      {/* Ringkasan */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-muted/50 rounded-lg p-3 text-center">
          <span className="text-xs text-muted-foreground block">Tanam</span>
          <span className="text-sm font-semibold">{formatDate(plantingDate)}</span>
        </div>
        <div className="bg-muted/50 rounded-lg p-3 text-center">
          <span className="text-xs text-muted-foreground block">Durasi</span>
          <span className="text-sm font-semibold">{totalDays} hari</span>
        </div>
        <div className="bg-harvest/10 rounded-lg p-3 text-center border border-harvest/20">
          <span className="text-xs text-harvest block">Panen</span>
          <span className="text-sm font-semibold text-harvest">
            {formatDate(harvestWindow.start)}
          </span>
        </div>
      </div>

      {/* Bar Timeline */}
      <div className="relative mb-6">
        <div 
          className="flex gap-1 h-4 rounded-full overflow-hidden"
          role="img"
          aria-label="Visualisasi jadwal pertumbuhan tanaman"
        >
          {phases.map((phase) => {
            const widthPercent = ((phase.endDay - phase.startDay) / totalDays) * 100;
            return (
              <motion.div
                key={phase.name}
                initial={{ width: 0 }}
                animate={{ width: `${widthPercent}%` }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={`${getStatusStyles(phase.status)} rounded-sm`}
                title={phase.name}
              />
            );
          })}
        </div>
        <div className="flex justify-between mt-1 text-xs text-muted-foreground">
          <span>Hari 0</span>
          <span>Hari {totalDays}</span>
        </div>
      </div>

      {/* Daftar Fase */}
      <div className="space-y-2" role="list" aria-label="Daftar fase pertumbuhan">
        {phases.map((phase, index) => (
          <motion.div
            key={phase.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-center justify-between p-3 rounded-lg ${
              phase.status === "aktif"
                ? "bg-growth/10 border border-growth/30"
                : "bg-muted/30"
            }`}
            role="listitem"
          >
            <div className="flex items-center gap-3">
              {getStatusIcon(phase.status)}
              <div>
                <span className="font-medium text-sm">{phase.name}</span>
                <span className="text-xs text-muted-foreground ml-2">
                  Hari {phase.startDay} - {phase.endDay}
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs text-muted-foreground block">
                NDVI: {phase.ndviExpected.toFixed(2)}
              </span>
              <span className="text-xs text-muted-foreground">
                {getStatusLabel(phase.status)}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

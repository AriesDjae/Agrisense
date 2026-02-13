import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { mockLandAnalysis } from "@/data/mockApi";
import { CropSuitabilityCard } from "@/components/dashboard/CropSuitabilityCard";
import { IrrigationCard } from "@/components/dashboard/IrrigationCard";
import { GrowthTimelineCard } from "@/components/dashboard/GrowthTimelineCard";
import { FertilizationCard } from "@/components/dashboard/FertilizationCard";
import { ExplanationPanel } from "@/components/dashboard/ExplanationPanel";
import { CropRotationCard } from "@/components/dashboard/CropRotationCard";
import { InteractiveMap } from "@/components/map/InteractiveMap";
import { motion } from "framer-motion";
import { MapPin, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const data = mockLandAnalysis;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container py-8" role="main">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground">
                Dashboard Analisis Lahan
              </h1>
              <p className="text-muted-foreground mt-1">
                Rekomendasi berbasis data untuk lahan pertanian yang Anda pilih
              </p>
            </div>
            <div 
              className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-4 py-2 rounded-lg"
              aria-label={`Koordinat lahan: ${data.coordinates[0].toFixed(4)}, ${data.coordinates[1].toFixed(4)}, Luas: ${data.area} hektar`}
            >
              <MapPin className="h-4 w-4" aria-hidden="true" />
              <span>
                {data.coordinates[0].toFixed(4)}, {data.coordinates[1].toFixed(4)}
              </span>
              <span className="text-foreground font-medium ml-2">
                {data.area} ha
              </span>
            </div>
          </div>
        </motion.div>

        {/* Pratinjau Peta */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-lg">Lahan Terpilih</h2>
            <Link to="/map">
              <Button variant="outline" size="sm" aria-label="Lihat peta dalam tampilan penuh">
                <Maximize2 className="h-4 w-4" aria-hidden="true" />
                Tampilan Peta Penuh
              </Button>
            </Link>
          </div>
          <InteractiveMap className="h-[300px]" showLayerControls={false} />
        </motion.div>

        {/* Grid Konten Utama */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Kolom Kiri - Kesesuaian Tanaman */}
          <div className="lg:col-span-1">
            <CropSuitabilityCard
              crops={data.cropSuitability}
              recommendedCrop={data.recommendedCrop}
            />
          </div>

          {/* Kolom Tengah */}
          <div className="lg:col-span-1 space-y-6">
            <IrrigationCard irrigation={data.irrigationDemand} />
            <GrowthTimelineCard
              plantingDate={data.growthTimeline.plantingDate}
              harvestWindow={data.growthTimeline.harvestWindow}
              totalDays={data.growthTimeline.totalDays}
              phases={data.growthTimeline.phases}
            />
          </div>

          {/* Kolom Kanan */}
          <div className="lg:col-span-1 space-y-6">
            <ExplanationPanel
              explanation={data.explanation}
              currentNdvi={data.currentNdvi}
              soilPh={data.soilPh}
              recentRainfall={data.recentRainfall}
              avgTemperature={data.avgTemperature}
              recommendedCrop={data.recommendedCrop}
            />
          </div>
        </div>

        {/* Baris Bawah */}
        <div className="grid lg:grid-cols-2 gap-6 mt-6">
          <FertilizationCard schedule={data.fertilizationSchedule} />
          <CropRotationCard
            suggestions={data.cropRotation}
            currentCrop={data.recommendedCrop}
          />
        </div>

        {/* CTA Laporan */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-muted/30 rounded-xl p-6 border border-border text-center"
        >
          <h3 className="font-display font-semibold text-lg mb-2">
            Siap Mengekspor Hasil Analisis?
          </h3>
          <p className="text-muted-foreground mb-4">
            Buat laporan lengkap dengan semua rekomendasi dan jadwal pertumbuhan.
          </p>
          <Link to="/report">
            <Button variant="default" size="lg">
              Lihat Ringkasan Laporan
            </Button>
          </Link>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { InteractiveMap } from "@/components/map/InteractiveMap";
import { useState } from "react";
import { motion } from "framer-motion";
import { mockLandAnalysis } from "@/data/mockApi";
import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, Droplets, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const MapView = () => {
  const [selectedPolygon, setSelectedPolygon] = useState<number[][] | null>(null);
  const data = mockLandAnalysis;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 flex flex-col" role="main">
        <div className="container py-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4"
          >
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground">
                Analisis Spasial
              </h1>
              <p className="text-muted-foreground text-sm">
                Klik pada peta untuk memilih lahan pertanian yang akan dianalisis
              </p>
            </div>
            {selectedPolygon && (
              <Link to="/dashboard">
                <Button aria-label="Analisis lahan yang telah dipilih">
                  Analisis Lahan Terpilih
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </Link>
            )}
          </motion.div>
        </div>

        <div className="flex-1 flex">
          {/* Kontainer Peta */}
          <div className="flex-1 relative">
            <InteractiveMap
              className="h-full"
              onPolygonSelect={setSelectedPolygon}
              selectedPolygon={selectedPolygon}
            />
          </div>

          {/* Panel Samping */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-80 bg-card border-l border-border p-6 hidden lg:block overflow-y-auto"
            aria-label="Informasi lahan terpilih"
          >
            <h2 className="font-display font-semibold text-lg mb-4">
              Informasi Lahan
            </h2>

            {selectedPolygon || true ? (
              <div className="space-y-4">
                {/* Lokasi */}
                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                    <span>Lokasi Terpilih</span>
                  </div>
                  <p className="font-medium text-foreground">
                    {data.coordinates[0].toFixed(4)}, {data.coordinates[1].toFixed(4)}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Luas: {data.area} hektar
                  </p>
                </div>

                {/* Statistik Cepat */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-growth/10 rounded-lg border border-growth/20">
                    <div className="flex items-center gap-2">
                      <Leaf className="h-4 w-4 text-growth" aria-hidden="true" />
                      <span className="text-sm">NDVI</span>
                    </div>
                    <span className="font-semibold">{data.currentNdvi.toFixed(2)}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-irrigation/10 rounded-lg border border-irrigation/20">
                    <div className="flex items-center gap-2">
                      <Droplets className="h-4 w-4 text-irrigation" aria-hidden="true" />
                      <span className="text-sm">Curah Hujan</span>
                    </div>
                    <span className="font-semibold">{data.recentRainfall} mm</span>
                  </div>
                </div>

                {/* Pratinjau Tanaman Direkomendasikan */}
                <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                  <span className="text-xs text-primary font-medium">
                    Tanaman Direkomendasikan
                  </span>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-display font-bold text-lg">
                      {data.recommendedCrop}
                    </span>
                    <span className="text-lg font-bold text-primary">
                      {Math.round(data.cropSuitability[0].suitabilityScore * 100)}%
                    </span>
                  </div>
                </div>

                <Link to="/dashboard" className="block">
                  <Button className="w-full" size="lg" aria-label="Lihat analisis lengkap untuk lahan ini">
                    Lihat Analisis Lengkap
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" aria-hidden="true" />
                <p>Pilih lahan pertanian pada peta untuk melihat informasinya.</p>
              </div>
            )}
          </motion.aside>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MapView;

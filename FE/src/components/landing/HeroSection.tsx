import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, Droplets, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section 
      className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/90 py-20 lg:py-32"
      aria-labelledby="hero-heading"
    >
      {/* Pola Latar Belakang */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-primary-foreground blur-3xl" />
        <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-primary-foreground blur-3xl" />
      </div>

      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-2 text-sm text-primary-foreground mb-6">
              <Leaf className="h-4 w-4" aria-hidden="true" />
              <span>Sistem Pendukung Keputusan Pertanian</span>
            </div>

            <h1 
              id="hero-heading"
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6"
            >
              Rencanakan Lebih Cerdas,
              <br />
              <span className="text-accent">Panen Lebih Baik</span>
            </h1>

            <p className="text-lg text-primary-foreground/80 max-w-xl mb-8">
              IrrigaPlan menggunakan citra satelit dan data iklim untuk memberikan
              rekomendasi berbasis data untuk pemilihan tanaman, perencanaan irigasi,
              dan penjadwalan pemupukan.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/dashboard">
                <Button 
                  variant="hero" 
                  size="xl" 
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                  aria-label="Mulai menganalisis lahan pertanian Anda"
                >
                  Analisis Lahan Saya
                  <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </Button>
              </Link>
              <Link to="/map">
                <Button 
                  variant="heroOutline" 
                  size="xl"
                  aria-label="Jelajahi peta interaktif untuk melihat zona pertanian"
                >
                  Jelajahi Peta
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:block"
            aria-hidden="true"
          >
            <div className="relative bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 border border-primary-foreground/20">
              {/* Pratinjau Dashboard Mock */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-primary-foreground/10 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-primary-foreground/70 text-sm mb-2">
                    <Leaf className="h-4 w-4" />
                    Kesesuaian Tanaman
                  </div>
                  <div className="text-2xl font-bold text-primary-foreground">89%</div>
                  <div className="text-sm text-accent">Padi Direkomendasikan</div>
                </div>
                <div className="bg-primary-foreground/10 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-primary-foreground/70 text-sm mb-2">
                    <Droplets className="h-4 w-4" />
                    Kebutuhan Irigasi
                  </div>
                  <div className="text-2xl font-bold text-primary-foreground">Sedang</div>
                  <div className="text-sm text-primary-foreground/60">45 mm/minggu</div>
                </div>
              </div>
              <div className="bg-primary-foreground/10 rounded-lg p-4">
                <div className="flex items-center gap-2 text-primary-foreground/70 text-sm mb-3">
                  <BarChart3 className="h-4 w-4" />
                  Jadwal Pertumbuhan
                </div>
                <div className="flex gap-1">
                  {["Perkecambahan", "Vegetatif", "Reproduktif", "Pemasakan", "Panen"].map((phase, i) => (
                    <div
                      key={phase}
                      className={`flex-1 h-3 rounded-full ${
                        i === 0
                          ? "bg-success"
                          : i === 1
                          ? "bg-growth"
                          : "bg-primary-foreground/20"
                      }`}
                      title={phase}
                    />
                  ))}
                </div>
                <div className="flex justify-between text-xs text-primary-foreground/60 mt-2">
                  <span>Hari 0</span>
                  <span>Hari 120</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

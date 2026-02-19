import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { mockLandAnalysis } from "@/data/mockApi";
import { motion } from "framer-motion";
import { 
  FileText, 
  Calendar, 
  MapPin, 
  Leaf, 
  Droplets, 
  TestTube,
  Thermometer,
  RefreshCw,
  FlaskConical,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Report = () => {
  const data = mockLandAnalysis;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container py-8" role="main">
        {/* Header Laporan */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-xl border border-border p-8 mb-8 shadow-card"
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 text-primary mb-2">
                <FileText className="h-5 w-5" aria-hidden="true" />
                <span className="text-sm font-medium">Laporan Analisis Lahan</span>
              </div>
              <h1 className="font-display text-3xl font-bold text-foreground mb-2">
                Ringkasan Rekomendasi Pertanian
              </h1>
              <p className="text-muted-foreground">
                Dibuat oleh Sistem Pendukung Keputusan IrrigaPlan
              </p>
            </div>
            <Button variant="outline" className="hidden md:flex" aria-label="Ekspor laporan ke format PDF">
              <FileText className="h-4 w-4" aria-hidden="true" />
              Ekspor PDF
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
              <div>
                <span className="text-xs text-muted-foreground block">Lokasi</span>
                <span className="font-medium">
                  {data.coordinates[0].toFixed(4)}, {data.coordinates[1].toFixed(4)}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
              <div>
                <span className="text-xs text-muted-foreground block">Tanggal Laporan</span>
                <span className="font-medium">{formatDate(new Date().toISOString())}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Leaf className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
              <div>
                <span className="text-xs text-muted-foreground block">Luas Lahan</span>
                <span className="font-medium">{data.area} hektar</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Kondisi Lingkungan */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-xl border border-border p-6 mb-6 shadow-card"
          aria-labelledby="environmental-heading"
        >
          <h2 id="environmental-heading" className="font-display font-semibold text-xl mb-4">
            Kondisi Lingkungan
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-growth/5 rounded-lg p-4 border border-growth/20">
              <div className="flex items-center gap-2 mb-2">
                <Leaf className="h-5 w-5 text-growth" aria-hidden="true" />
                <span className="text-sm text-muted-foreground">Indeks Vegetasi</span>
              </div>
              <span className="text-2xl font-bold">{data.currentNdvi.toFixed(2)}</span>
              <span className="text-xs text-success ml-2">Baik</span>
            </div>
            <div className="bg-soil/5 rounded-lg p-4 border border-soil/20">
              <div className="flex items-center gap-2 mb-2">
                <TestTube className="h-5 w-5 text-soil" aria-hidden="true" />
                <span className="text-sm text-muted-foreground">pH Tanah</span>
              </div>
              <span className="text-2xl font-bold">{data.soilPh.toFixed(1)}</span>
              <span className="text-xs text-success ml-2">Optimal</span>
            </div>
            <div className="bg-irrigation/5 rounded-lg p-4 border border-irrigation/20">
              <div className="flex items-center gap-2 mb-2">
                <Droplets className="h-5 w-5 text-irrigation" aria-hidden="true" />
                <span className="text-sm text-muted-foreground">Curah Hujan Terkini</span>
              </div>
              <span className="text-2xl font-bold">{data.recentRainfall}</span>
              <span className="text-sm ml-1">mm</span>
            </div>
            <div className="bg-harvest/5 rounded-lg p-4 border border-harvest/20">
              <div className="flex items-center gap-2 mb-2">
                <Thermometer className="h-5 w-5 text-harvest" aria-hidden="true" />
                <span className="text-sm text-muted-foreground">Suhu Rata-rata</span>
              </div>
              <span className="text-2xl font-bold">{data.avgTemperature}</span>
              <span className="text-sm ml-1">°C</span>
            </div>
          </div>
        </motion.section>

        {/* Rekomendasi Tanaman */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-primary/5 rounded-xl border border-primary/20 p-6 mb-6"
          aria-labelledby="crop-recommendation-heading"
        >
          <h2 id="crop-recommendation-heading" className="font-display font-semibold text-xl mb-4 flex items-center gap-2">
            <Leaf className="h-5 w-5 text-primary" aria-hidden="true" />
            Tanaman yang Direkomendasikan
          </h2>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-4xl font-display font-bold text-primary">
                {data.recommendedCrop}
              </span>
              <p className="text-muted-foreground mt-2 max-w-2xl">
                {data.explanation}
              </p>
            </div>
            <div className="text-center bg-card rounded-lg p-4 border border-border min-w-[120px]">
              <span className="text-4xl font-bold text-primary">
                {Math.round(data.cropSuitability[0].suitabilityScore * 100)}%
              </span>
              <span className="text-sm text-muted-foreground block">Kesesuaian</span>
            </div>
          </div>
        </motion.section>

        {/* Jadwal Pertumbuhan */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-xl border border-border p-6 mb-6 shadow-card"
          aria-labelledby="growth-timeline-heading"
        >
          <h2 id="growth-timeline-heading" className="font-display font-semibold text-xl mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-harvest" aria-hidden="true" />
            Jadwal Pertumbuhan
          </h2>
          
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-muted/30 rounded-lg p-4">
              <span className="text-sm text-muted-foreground block mb-1">Tanggal Tanam</span>
              <span className="font-semibold">{formatDate(data.growthTimeline.plantingDate)}</span>
            </div>
            <div className="bg-muted/30 rounded-lg p-4">
              <span className="text-sm text-muted-foreground block mb-1">Masa Tanam</span>
              <span className="font-semibold">{data.growthTimeline.totalDays} hari</span>
            </div>
            <div className="bg-harvest/10 rounded-lg p-4 border border-harvest/20">
              <span className="text-sm text-harvest block mb-1">Jendela Panen</span>
              <span className="font-semibold">
                {formatDate(data.growthTimeline.harvestWindow.start)} - {formatDate(data.growthTimeline.harvestWindow.end)}
              </span>
            </div>
          </div>

          <h3 className="font-medium mb-3">Fase Pertumbuhan</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm" role="table" aria-label="Tabel fase pertumbuhan tanaman">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 font-medium" scope="col">Fase</th>
                  <th className="text-left py-2 font-medium" scope="col">Hari</th>
                  <th className="text-left py-2 font-medium" scope="col">NDVI Diharapkan</th>
                  <th className="text-left py-2 font-medium" scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.growthTimeline.phases.map((phase) => (
                  <tr key={phase.name} className="border-b border-border/50">
                    <td className="py-3">{phase.name}</td>
                    <td className="py-3">Hari {phase.startDay} - {phase.endDay}</td>
                    <td className="py-3">{phase.ndviExpected.toFixed(2)}</td>
                    <td className="py-3">
                      <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                        phase.status === 'selesai' 
                          ? 'bg-success/10 text-success' 
                          : phase.status === 'aktif' 
                          ? 'bg-growth/10 text-growth' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {phase.status === 'selesai' && <CheckCircle className="h-3 w-3" aria-hidden="true" />}
                        {getStatusLabel(phase.status)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>

        {/* Jadwal Pemupukan */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card rounded-xl border border-border p-6 mb-6 shadow-card"
          aria-labelledby="fertilization-heading"
        >
          <h2 id="fertilization-heading" className="font-display font-semibold text-xl mb-4 flex items-center gap-2">
            <FlaskConical className="h-5 w-5 text-soil" aria-hidden="true" />
            Jadwal Pemupukan
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm" role="table" aria-label="Tabel jadwal pemupukan">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 font-medium" scope="col">Fase</th>
                  <th className="text-left py-2 font-medium" scope="col">Waktu</th>
                  <th className="text-left py-2 font-medium" scope="col">Jenis Pupuk</th>
                </tr>
              </thead>
              <tbody>
                {data.fertilizationSchedule.map((item) => (
                  <tr key={item.phase} className="border-b border-border/50">
                    <td className="py-3 font-medium">{item.phase}</td>
                    <td className="py-3">{item.timing}</td>
                    <td className="py-3">
                      <div className="flex flex-wrap gap-2">
                        {item.fertilizers.map((fert) => (
                          <span 
                            key={fert.type}
                            className="text-xs bg-muted px-2 py-1 rounded-full"
                          >
                            {fert.type}: {fert.amount}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>

        {/* Rotasi Tanaman */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card rounded-xl border border-border p-6 shadow-card"
          aria-labelledby="crop-rotation-heading"
        >
          <h2 id="crop-rotation-heading" className="font-display font-semibold text-xl mb-4 flex items-center gap-2">
            <RefreshCw className="h-5 w-5 text-primary" aria-hidden="true" />
            Rekomendasi Rotasi Tanaman
          </h2>
          
          <p className="text-muted-foreground mb-4">
            Setelah memanen {data.recommendedCrop}, pertimbangkan tanaman berikut untuk siklus tanam selanjutnya:
          </p>

          <div className="grid md:grid-cols-3 gap-4" role="list" aria-label="Daftar rekomendasi rotasi tanaman">
            {data.cropRotation.map((rotation, index) => (
              <div 
                key={rotation.nextCrop}
                className={`p-4 rounded-lg border ${
                  index === 0 
                    ? 'bg-primary/5 border-primary/20' 
                    : 'bg-muted/30 border-border'
                }`}
                role="listitem"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">{rotation.nextCrop}</span>
                  <span className={`font-bold ${index === 0 ? 'text-primary' : 'text-foreground'}`}>
                    {Math.round(rotation.suitabilityScore * 100)}%
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{rotation.reason}</p>
                <span className="text-xs text-muted-foreground">
                  Masa istirahat: {rotation.restPeriod} hari sebelum tanam
                </span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Catatan Kaki */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center text-sm text-muted-foreground"
        >
          <p>
            Laporan ini dihasilkan oleh IrrigaPlan DSS sebagai alat bantu pengambilan keputusan.
            <br />
            Keputusan pertanian akhir harus mempertimbangkan keahlian lokal dan kondisi lapangan.
          </p>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Report;

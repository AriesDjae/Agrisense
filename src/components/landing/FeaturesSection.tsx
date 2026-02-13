import { motion } from "framer-motion";
import { 
  Sprout, 
  Droplets, 
  Calendar, 
  RefreshCw, 
  Map, 
  Brain 
} from "lucide-react";

const features = [
  {
    icon: Sprout,
    title: "Analisis Kesesuaian Tanaman",
    description:
      "Rekomendasi berbasis AI untuk pemilihan tanaman optimal berdasarkan data tanah, iklim, dan vegetasi.",
    color: "bg-growth/10 text-growth",
  },
  {
    icon: Droplets,
    title: "Perencanaan Irigasi",
    description:
      "Prediksi kebutuhan air yang tepat untuk mengoptimalkan jadwal irigasi dan menghemat sumber daya.",
    color: "bg-irrigation/10 text-irrigation",
  },
  {
    icon: Calendar,
    title: "Jadwal Pertumbuhan",
    description:
      "Pantau fase perkembangan tanaman dengan perkiraan tanggal tanam dan jendela panen.",
    color: "bg-harvest/10 text-harvest",
  },
  {
    icon: RefreshCw,
    title: "Rotasi Tanaman",
    description:
      "Saran cerdas untuk tanaman berikutnya guna menjaga kesehatan tanah dan memaksimalkan hasil.",
    color: "bg-soil/10 text-soil",
  },
  {
    icon: Map,
    title: "Analisis Spasial",
    description:
      "Peta interaktif dengan lapisan satelit untuk vegetasi, zona irigasi, dan lainnya.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Brain,
    title: "AI yang Dapat Dijelaskan",
    description:
      "Penjelasan transparan untuk setiap rekomendasi, membangun kepercayaan dalam pengambilan keputusan.",
    color: "bg-accent/10 text-accent",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-background" aria-labelledby="features-heading">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 
            id="features-heading"
            className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4"
          >
            Keputusan Pertanian Berbasis Data
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sistem kami menganalisis citra satelit, data iklim, dan karakteristik
            tanah untuk memberikan wawasan yang dapat ditindaklanjuti untuk lahan Anda.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
          {features.map((feature, index) => (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-card rounded-xl p-6 border border-border hover:border-primary/30 hover:shadow-card transition-all duration-300"
              role="listitem"
            >
              <div
                className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${feature.color} mb-4`}
                aria-hidden="true"
              >
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

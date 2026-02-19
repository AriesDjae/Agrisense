import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const benefits = [
  "Analisis vegetasi berbasis satelit",
  "Perencanaan irigasi yang mempertimbangkan iklim",
  "Rekomendasi tanaman berbasis data",
  "Penjelasan AI yang transparan",
];

export function CTASection() {
  return (
    <section className="py-20 bg-muted/30" aria-labelledby="cta-heading">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-card"
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 
                id="cta-heading"
                className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4"
              >
                Siap Mengoptimalkan Lahan Anda?
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Mulai menganalisis lahan pertanian Anda dan dapatkan rekomendasi
                personal untuk hasil panen yang lebih baik dan efisiensi sumber daya.
              </p>
              <ul className="space-y-3 mb-8" role="list" aria-label="Keuntungan menggunakan IrrigaPlan">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-success" aria-hidden="true" />
                    <span className="text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
              <Link to="/dashboard">
                <Button 
                  variant="hero" 
                  size="xl"
                  aria-label="Mulai analisis lahan pertanian Anda sekarang"
                >
                  Analisis Lahan Saya
                  <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </Button>
              </Link>
            </div>

            <div className="relative" aria-hidden="true">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-growth/20 rounded-xl flex items-center justify-center border border-border">
                <div className="text-center p-6">
                  <div className="text-5xl font-display font-bold text-primary mb-2">
                    89%
                  </div>
                  <p className="text-muted-foreground">
                    Rata-rata Skor Kesesuaian
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    untuk tanaman yang direkomendasikan
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

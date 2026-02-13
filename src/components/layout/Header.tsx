import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf, Map, BarChart3, FileText, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navigation = [
  { name: "Beranda", href: "/", icon: Leaf },
  { name: "Analisis Lahan", href: "/dashboard", icon: BarChart3 },
  { name: "Peta", href: "/map", icon: Map },
  { name: "Laporan", href: "/report", icon: FileText },
];

export function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header 
      className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      role="banner"
    >
      <div className="container flex h-16 items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-2"
          aria-label="IrrigaPlan - Kembali ke beranda"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Leaf className="h-5 w-5 text-primary-foreground" aria-hidden="true" />
          </div>
          <span className="font-display text-xl font-bold text-foreground">
            IrrigaPlan
          </span>
        </Link>

        {/* Navigasi Desktop */}
        <nav className="hidden md:flex items-center gap-1" role="navigation" aria-label="Menu utama">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link key={item.name} to={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  size="sm"
                  className={isActive ? "bg-primary/10 text-primary" : ""}
                  aria-current={isActive ? "page" : undefined}
                >
                  <item.icon className="h-4 w-4" aria-hidden="true" />
                  {item.name}
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* CTA Desktop */}
        <div className="hidden md:block">
          <Link to="/dashboard">
            <Button variant="default" size="sm">
              Mulai Analisis
            </Button>
          </Link>
        </div>

        {/* Tombol Menu Mobile */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={mobileMenuOpen ? "Tutup menu" : "Buka menu"}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Menu Mobile */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-background"
          >
            <nav className="container py-4 flex flex-col gap-2" role="navigation" aria-label="Menu mobile">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      size="lg"
                      className={`w-full justify-start ${isActive ? "bg-primary/10 text-primary" : ""}`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <item.icon className="h-5 w-5" aria-hidden="true" />
                      {item.name}
                    </Button>
                  </Link>
                );
              })}
              <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="default" size="lg" className="w-full mt-2">
                  Mulai Analisis
                </Button>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

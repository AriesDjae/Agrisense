import { Leaf } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30" role="contentinfo">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Leaf className="h-4 w-4 text-primary-foreground" aria-hidden="true" />
            </div>
            <span className="font-display font-semibold text-foreground">
              IrrigaPlan
            </span>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Sistem Pendukung Keputusan Berbasis Data untuk Pertanian Cerdas
          </p>
          <p className="text-sm text-muted-foreground">
            © 2024 IrrigaPlan. Hak cipta dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}

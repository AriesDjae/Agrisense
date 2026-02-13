import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("Kesalahan 404: Pengguna mencoba mengakses halaman yang tidak ada:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center p-8">
        <h1 className="mb-4 text-6xl font-bold text-primary">404</h1>
        <h2 className="mb-2 text-2xl font-semibold text-foreground">
          Halaman Tidak Ditemukan
        </h2>
        <p className="mb-6 text-muted-foreground max-w-md">
          Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.
        </p>
        <Link to="/">
          <Button size="lg">
            <Home className="h-4 w-4" aria-hidden="true" />
            Kembali ke Beranda
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

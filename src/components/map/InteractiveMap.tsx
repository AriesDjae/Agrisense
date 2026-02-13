import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapLayer, mockMapLayers, samplePolygon } from "@/data/mockApi";
import { Button } from "@/components/ui/button";
import { Layers, MousePointer, Square, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface InteractiveMapProps {
  onPolygonSelect?: (coordinates: number[][]) => void;
  selectedPolygon?: number[][] | null;
  className?: string;
  showLayerControls?: boolean;
}

export function InteractiveMap({
  onPolygonSelect,
  selectedPolygon,
  className,
  showLayerControls = true,
}: InteractiveMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const polygonLayerRef = useRef<L.Polygon | null>(null);
  const [layers, setLayers] = useState<MapLayer[]>(mockMapLayers);
  const [drawMode, setDrawMode] = useState(false);
  const [showLayers, setShowLayers] = useState(false);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Inisialisasi peta yang berpusat di Indonesia
    const map = L.map(mapRef.current, {
      center: [-6.9175, 107.6191],
      zoom: 14,
      zoomControl: true,
    });

    // Tambahkan tile layer (OpenStreetMap)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    // Tambahkan polygon contoh jika ada
    if (selectedPolygon || samplePolygon) {
      const coords = selectedPolygon || samplePolygon;
      const polygon = L.polygon(coords as L.LatLngExpression[], {
        color: "#2d6a4f",
        fillColor: "#40916c",
        fillOpacity: 0.4,
        weight: 2,
      }).addTo(map);
      polygonLayerRef.current = polygon;

      // Tambahkan popup
      polygon.bindPopup(`
        <div class="p-2">
          <strong>Lahan Terpilih</strong><br/>
          Luas: ~2,5 hektar<br/>
          NDVI: 0,72
        </div>
      `);
    }

    mapInstanceRef.current = map;

    // Handler klik untuk pemilihan polygon
    map.on("click", (e) => {
      if (drawMode && onPolygonSelect) {
        // Pemilihan klik sederhana - di aplikasi nyata akan menggunakan kontrol gambar
        const center = e.latlng;
        const offset = 0.002;
        const newPolygon = [
          [center.lat - offset, center.lng - offset],
          [center.lat - offset, center.lng + offset],
          [center.lat + offset, center.lng + offset],
          [center.lat + offset, center.lng - offset],
          [center.lat - offset, center.lng - offset],
        ];
        onPolygonSelect(newPolygon);
      }
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Perbarui polygon ketika selectedPolygon berubah
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    if (polygonLayerRef.current) {
      polygonLayerRef.current.remove();
    }

    if (selectedPolygon) {
      const polygon = L.polygon(selectedPolygon as L.LatLngExpression[], {
        color: "#2d6a4f",
        fillColor: "#40916c",
        fillOpacity: 0.4,
        weight: 2,
      }).addTo(mapInstanceRef.current);
      polygonLayerRef.current = polygon;
    }
  }, [selectedPolygon]);

  const toggleLayer = (layerId: string) => {
    setLayers((prev) =>
      prev.map((layer) =>
        layer.id === layerId ? { ...layer, visible: !layer.visible } : layer
      )
    );
  };

  return (
    <div 
      className={cn("relative rounded-xl overflow-hidden border border-border", className)}
      role="application"
      aria-label="Peta interaktif untuk pemilihan lahan pertanian"
    >
      <div ref={mapRef} className="w-full h-full min-h-[400px]" />

      {/* Kontrol Peta */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-[1000]">
        <Button
          variant={drawMode ? "default" : "secondary"}
          size="sm"
          onClick={() => setDrawMode(!drawMode)}
          className="shadow-md"
          aria-pressed={drawMode}
          aria-label={drawMode ? "Mode menggambar aktif - klik untuk berhenti" : "Klik untuk mulai memilih lahan"}
        >
          {drawMode ? <Square className="h-4 w-4" aria-hidden="true" /> : <MousePointer className="h-4 w-4" aria-hidden="true" />}
          {drawMode ? "Menggambar" : "Pilih"}
        </Button>

        {showLayerControls && (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowLayers(!showLayers)}
            className="shadow-md"
            aria-expanded={showLayers}
            aria-controls="layer-panel"
            aria-label="Tampilkan atau sembunyikan panel lapisan peta"
          >
            <Layers className="h-4 w-4" aria-hidden="true" />
            Lapisan
          </Button>
        )}
      </div>

      {/* Panel Lapisan */}
      {showLayers && showLayerControls && (
        <div 
          id="layer-panel"
          className="absolute top-4 left-4 z-[1000] bg-card rounded-lg border border-border shadow-lg p-4 min-w-[200px]"
          role="region"
          aria-label="Kontrol lapisan peta"
        >
          <h4 className="font-semibold text-sm mb-3">Lapisan Peta</h4>
          <div className="space-y-2" role="group">
            {layers.map((layer) => (
              <button
                key={layer.id}
                onClick={() => toggleLayer(layer.id)}
                className="flex items-center gap-2 w-full text-left text-sm hover:bg-muted p-2 rounded-md transition-colors"
                aria-pressed={layer.visible}
                aria-label={`${layer.name} - ${layer.visible ? 'aktif' : 'nonaktif'}`}
              >
                {layer.visible ? (
                  <Eye className="h-4 w-4 text-primary" aria-hidden="true" />
                ) : (
                  <EyeOff className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                )}
                <span className={layer.visible ? "text-foreground" : "text-muted-foreground"}>
                  {layer.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Legenda */}
      <div 
        className="absolute bottom-4 left-4 z-[1000] bg-card/95 backdrop-blur-sm rounded-lg border border-border shadow-md p-3"
        role="img"
        aria-label="Legenda NDVI: Merah untuk rendah, Kuning untuk sedang, Hijau untuk tinggi"
      >
        <h4 className="font-semibold text-xs mb-2 text-muted-foreground">Legenda NDVI</h4>
        <div className="flex gap-1">
          <div className="flex flex-col items-center">
            <div className="w-6 h-3 bg-destructive rounded-sm" />
            <span className="text-[10px] text-muted-foreground">Rendah</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-6 h-3 bg-warning rounded-sm" />
            <span className="text-[10px] text-muted-foreground">Sedang</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-6 h-3 bg-success rounded-sm" />
            <span className="text-[10px] text-muted-foreground">Tinggi</span>
          </div>
        </div>
      </div>
    </div>
  );
}

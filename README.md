# Agrisense

Agrisense adalah web yang dibuat dengan tujuan membantu petani Indonesia memilih tanaman apa yang cocok untuk ditanam berdasarkan kondisi tanah dan cuaca.

Proyek ini adalah kelanjutan dari **IrrigaPlan** (2025), sistem pendukung keputusan perencanaan irigasi berbasis metode MADM. Di Agrisense, cakupannya diperluas dari irigasi saja menjadi rekomendasi tanaman, jadwal pemupukan, dan rotasi tanam, dan antarmukanya dibangun ulang dari awal.

## Cara kerja

Petani memasukkan wilayah tempat tinggalnya. Website lalu memberikan rekomendasi tanaman yang cocok untuk ditanam berdasarkan cuaca wilayah dan kondisi tanah.

## Fitur

Halaman yang sudah ada di frontend:

| Halaman | Isi |
| --- | --- |
| `/` | Halaman depan: penjelasan singkat dan fitur utama |
| `/dashboard` | Analisis satu lahan: skor kesesuaian tanaman, kebutuhan irigasi, linimasa fase pertumbuhan, jadwal pemupukan, saran rotasi tanaman, dan penjelasan rekomendasinya |
| `/map` | Peta interaktif lahan (Leaflet + OpenStreetMap) |
| `/report` | Laporan hasil analisis lahan |

Faktor yang dipakai untuk menilai kesesuaian tanaman: indeks vegetasi (NDVI), pH tanah, curah hujan, dan suhu.

## Teknologi

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, React Router, TanStack Query, Leaflet, Recharts
- **Backend (direncanakan):** Golang dengan Gin

## Status

Agrisense masih berupa **prototipe frontend**.

- Data yang tampil di dashboard, peta, dan laporan masih berasal dari data contoh di [`FE/src/data/mockApi.ts`](FE/src/data/mockApi.ts), bukan dari perhitungan sungguhan.
- Folder `BE/Golang` baru berisi `go.mod`. API Go belum dibuat.
- Sensor lapangan (IoT) untuk kelembapan tanah, suhu tanah, dan curah hujan lokal belum dikerjakan.

Rencana berikutnya: membuat API Go yang menggantikan `mockApi.ts`, memakai lagi logika MADM dari IrrigaPlan untuk perhitungan kesesuaian, lalu menyambungkan data cuaca dan data tanah yang sebenarnya.

## Menjalankan

Butuh Node.js 18 atau lebih baru.

```bash
cd FE
npm install
npm run dev
```

Perintah lain:

```bash
npm run build   # build produksi
npm run lint    # ESLint
npm test        # Vitest
```

## Struktur folder

```
Agrisense/
├── FE/                     # Frontend React + Vite
│   └── src/
│       ├── pages/          # Index, Dashboard, MapView, Report
│       ├── components/     # dashboard/, landing/, layout/, map/, ui/
│       └── data/mockApi.ts # data contoh pengganti API
└── BE/
    └── Golang/             # kerangka backend Go (belum ada kode)
```

## Tim

- Muhammad Aries Djaenuri ([@AriesDjae](https://github.com/AriesDjae))
- [@tyasprabas91](https://github.com/tyasprabas91)

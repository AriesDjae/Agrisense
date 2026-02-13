# IrrigaPlan
### Agri-Comprehensive Decision Support System for Land Suitability and Irrigation Optimization

---

## 📌 Project Overview

IrrigaPlan adalah sistem pendukung keputusan berbasis Machine Learning yang dirancang untuk menganalisis kesesuaian lahan dan memberikan rekomendasi irigasi optimal guna meningkatkan produktivitas pertanian berbasis data.

Sistem ini mengintegrasikan data satelit, sensor lapangan, dan data historis untuk menghasilkan rekomendasi agronomis yang presisi.

---

# 🧭 System Methodology

Pengembangan IrrigaPlan mengikuti alur metodologi terstruktur dalam lima tahap utama:

---

## 1️⃣ Data Acquisition

### 🔹 Remote Sensing
- NDVI (Normalized Difference Vegetation Index)
- Data citra satelit untuk analisis vegetasi

### 🔹 IoT Field Sensors (Opsional pada Prototipe)
- Kelembapan tanah
- Suhu tanah
- Curah hujan lokal

### 🔹 External Data Sources
- Data historis hasil panen
- Data cuaca regional
- Data karakteristik tanah

Output tahap ini:
Dataset terintegrasi multi-sumber.

---

## 2️⃣ Data Preprocessing

Tahap ini bertujuan meningkatkan kualitas data sebelum digunakan dalam model Machine Learning.

### Proses:
- Data Fusion
- Data Cleaning
- Missing Value Imputation
- Normalization & Scaling
- Feature Engineering

Output:
Dataset siap latih (model-ready dataset)

---

## 3️⃣ Model Development

### 🎯 Model Utama:
- Crop Suitability Classification (Random Forest)

### 🎯 Model Pendukung:
- Yield Prediction (XGBoost / Regresi)

Model dilatih menggunakan:
- Cross-validation
- Hyperparameter tuning
- Evaluasi menggunakan Accuracy, F1-Score, RMSE

Output:
Model prediksi kesesuaian lahan & estimasi produktivitas.

---

## 4️⃣ System Integration

Model yang telah dilatih diintegrasikan ke dalam sistem berbasis web.

### Komponen:
- Backend API
- Analytical Engine
- Dashboard Visualisasi
- Laporan rekomendasi otomatis

Sistem menghasilkan:
- Tingkat kesesuaian (S1, S2, S3, N)
- Tanaman rekomendasi
- Rencana irigasi
- Saran perbaikan lahan

---

## 5️⃣ Validation & Refinement

Validasi dilakukan melalui:

- Uji coba simulasi data lapangan
- Evaluasi performa model
- Analisis error (RMSE, Confusion Matrix)
- Iterasi penyempurnaan model

Feedback pengguna digunakan untuk:
- Penyempurnaan rekomendasi
- Peningkatan akurasi sistem

---

# 📊 Output System

- Skor kesesuaian lahan
- Rekomendasi komoditas
- Prediksi hasil panen
- Rencana irigasi optimal
- Saran tindakan agronomis

---

# 🚀 Innovation Value

✔ Integrasi remote sensing + ML  
✔ DSS berbasis klasifikasi kesesuaian lahan  
✔ Rekomendasi irigasi berbasis prediksi  
✔ Mendukung pertanian presisi  

---

# ⚠️ Scope Limitation (Prototipe PKM)

- Model dilatih menggunakan dataset regional terbatas
- Integrasi IoT bersifat simulatif
- Sistem belum dalam skala nasional

---

# 📌 Development Status

🔄 Prototype Development Stage (PKM-KC 2026)


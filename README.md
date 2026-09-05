# 🚀 CareerSync

> **Bridging the gap between your skills and industry needs.**

CareerSync adalah platform berbasis web yang dirancang untuk membantu pengguna mengukur kesiapan kerja secara objektif, mengidentifikasi kesenjangan keterampilan (*skill gap*), dan membuktikan kemampuan praktis melalui pendekatan berbasis proyek nyata.

---

## 👥 Tim

**Kata Bu Kuri kita harus DUMOR – SMK Negeri 26 Jakarta**

| Nama | Role |
|---|---|
| Alif Athaullah Rasyad | Backend Developer |
| Khuzaefah Hauna | UI/UX Designer | 
| Lutfi Idham Puro | Frontend Developer | 

---

## 📌 Tentang Project

Banyak lulusan dan pelajar yang belum siap memasuki dunia kerja karena tidak tahu apakah keterampilan mereka sudah sesuai dengan kebutuhan industri. CareerSync hadir sebagai solusi dengan menyediakan:

- Sistem analisis kesiapan kerja berbasis **weighted scoring**
- Identifikasi *skill gap* yang jelas dan terstruktur
- Rekomendasi proyek berbasis dunia nyata (*project-based learning*)
- **Portfolio builder** untuk membuktikan kemampuan secara nyata
- Integrasi **AI** untuk menganalisis dan memberikan feedback personal

---

## ✨ Fitur Utama

| Fitur | Deskripsi |
|---|---|
| 📊 **Skill Gap Analysis** | Menganalisis kesenjangan antara skill yang dimiliki dengan standar industri |
| 🤖 **AI Insights** | Feedback AI personal berdasarkan data kesiapan kerja pengguna |
| 📁 **Project Recommendation** | Rekomendasi proyek relevan berdasarkan skill yang perlu ditingkatkan |
| 📈 **Progress Tracker** | Dashboard untuk memantau perkembangan skill dari waktu ke waktu |
| 🌐 **Portfolio Builder** | Buat portofolio digital personal yang bisa dibagikan ke rekruter |
| 🎯 **Job Readiness Score** | Skor kesiapan kerja yang dihitung secara objektif dengan metode pembobotan |

---

## 🧮 Cara Kerja Skor Kesiapan Kerja

CareerSync menggunakan metode **weighted scoring** untuk menghitung skor kesiapan kerja pengguna secara objektif:

$$
\text{Skor Kesiapan Kerja} = \frac{\sum_{i=1}^{n}(b_i \cdot L_i)}{\sum_{i=1}^{n}(b_i \cdot L_{max})} \times 100\%
$$

| Variabel | Keterangan |
|---|---|
| `b_i` | Bobot skill ke-i |
| `L_i` | Level skill pengguna |
| `L_max` | Level maksimal yang tersedia |
| `n` | Jumlah skill yang dievaluasi |

---

## 🛠️ Tech Stack

**Frontend**
- React.js
- Tailwind CSS v4
- React Router DOM
- Recharts / Chart.js

**Backend**
- Laravel v.13
- REST API

**AI Integration**
- Gemini 3.5 Flash-lite API (AI Insights & Feedback)

---

## 🗂️ Struktur Halaman

```
/                   → Landing Page
/auth               → Login & Register
/pretest            → Pemilihan karir & input skill awal
/dashboard          → Home dashboard utama
/dashboard/analysis → Skill gap analysis + AI insights
/dashboard/progress → Progress tracker skill journey
/dashboard/project  → Rekomendasi & detail proyek
/dashboard/portfolio→ Manage portfolio
/portfolio/:username→ Halaman portfolio publik
```

---

## 🚀 Cara Menjalankan Project

### Prerequisites
- Node.js >= 18
- npm atau yarn

### Installation

```bash
# Clone repository
git clone https://github.com/[username]/careersync.git
cd careersync

# Install dependencies frontend
cd Frontend
npm install

# Jalankan development server
npm run dev
```

Frontend akan berjalan di `http://localhost:5173`

### Environment Variables

Buat file `.env` di folder `Frontend`:

```env
VITE_API_URL=http://localhost:8000/api/v1
```

---

## 📐 Subtema

**Human Capital & Future Skills Inclusivity**

CareerSync berfokus pada solusi inovatif untuk meningkatkan kualitas sumber daya manusia dan pemerataan akses terhadap keterampilan masa depan.

---

## 📊 Impact Projection

Berdasarkan simulasi dengan 100 pengguna:

| Indikator | Nilai |
|---|---|
| User Engagement Rate | 80% |
| Project Participation Rate | 75% |
| Project Completion Rate | ~83% |
| Readiness Improvement | +20 poin |
| **Total Impact Score** | **67.1%** *(dampak sedang menuju tinggi)* |

---

## 📄 Lisensi

Project ini dibuat untuk keperluan kompetisi. All rights reserved © 2026 Tim **Kata Bu Kuri kita harus DUMOR**.

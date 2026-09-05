# 🚀 CareerSync

> **Bridging the gap between your skills and industry needs.**

CareerSync adalah platform berbasis web yang membantu pelajar dan calon tenaga kerja mengukur **kesiapan kerja**, mengidentifikasi **skill gap**, mengembangkan kompetensi melalui **project-based learning**, dan membangun portfolio sebagai bukti kemampuan praktis.

CareerSync menjembatani kesenjangan antara **kompetensi individu** dan **kebutuhan industri** melalui pendekatan berbasis data, weighted scoring, rekomendasi proyek, progress tracking, dan AI-powered insights.

---

# 👥 Tim

### Kata Bu Kuri kita harus DUMOR — SMK Negeri 26 Jakarta

| Nama                  | Role               |
| --------------------- | ------------------ |
| Alif Athaullah Rasyad | Backend Developer  |
| Khuzaefah Hauna       | UI/UX Designer     |
| Lutfi Idham Puro      | Frontend Developer |

---

# 📌 Tentang CareerSync

Perkembangan teknologi dan perubahan kebutuhan industri membuat keterampilan yang dibutuhkan dunia kerja terus berkembang.

Namun, banyak pelajar dan calon tenaga kerja masih mengalami kesulitan dalam menjawab pertanyaan:

* **Apakah saya sudah siap bekerja?**
* **Skill apa yang masih kurang?**
* **Skill mana yang paling penting untuk dikembangkan?**
* **Apa yang harus saya lakukan untuk meningkatkan kemampuan tersebut?**
* **Bagaimana cara membuktikan kemampuan saya kepada perusahaan?**

CareerSync hadir sebagai solusi untuk menjawab permasalahan tersebut.

CareerSync mengubah proses persiapan kerja dari sekadar **"belajar sebanyak mungkin"** menjadi proses yang lebih terarah:

```text
Assess
   ↓
Analyze
   ↓
Improve
   ↓
Build
   ↓
Showcase
```

Pengguna dapat mengetahui kondisi skill mereka, memahami kesenjangan dengan kebutuhan karier yang dituju, mendapatkan rekomendasi proyek untuk meningkatkan kemampuan, serta membangun portfolio sebagai bukti kompetensi.

---

# ✨ Fitur Utama

| Fitur                         | Deskripsi                                                                                                   |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------- |
| 📊 **Skill Gap Analysis**     | Menganalisis kesenjangan antara skill pengguna dengan kompetensi yang dibutuhkan pada career path tertentu. |
| 🎯 **Job Readiness Score**    | Menghasilkan skor kesiapan kerja menggunakan metode weighted scoring.                                       |
| 🤖 **AI Insights**            | Memberikan analisis dan feedback personal berdasarkan profil serta hasil assessment pengguna.               |
| 📁 **Project Recommendation** | Merekomendasikan proyek yang relevan untuk meningkatkan skill yang masih memiliki gap.                      |
| 📈 **Progress Tracker**       | Memantau perkembangan kompetensi pengguna dari waktu ke waktu.                                              |
| 🌐 **Portfolio Builder**      | Membantu pengguna membuat portfolio digital untuk menunjukkan kemampuan dan hasil proyek.                   |
| 🔗 **Public Portfolio**       | Menyediakan halaman portfolio yang dapat dibagikan kepada calon recruiter atau perusahaan.                  |

---

# 🧮 Job Readiness Score

CareerSync menggunakan metode **Weighted Scoring** untuk menghitung tingkat kesiapan kerja berdasarkan tingkat kepentingan setiap skill terhadap career path yang dipilih.

$$
\text{Job Readiness Score} =
\frac{\sum_{i=1}^{n}(b_i \cdot L_i)}
{\sum_{i=1}^{n}(b_i \cdot L_{max})}
\times 100\%
$$

### Variabel

| Variabel | Keterangan                         |
| -------- | ---------------------------------- |
| `bᵢ`     | Bobot kepentingan skill ke-i       |
| `Lᵢ`     | Level skill yang dimiliki pengguna |
| `Lmax`   | Level maksimum skill               |
| `n`      | Jumlah skill yang dievaluasi       |

Dengan pendekatan ini, setiap skill tidak dianggap memiliki tingkat kepentingan yang sama.

Sebagai contoh, pada career path **Frontend Developer**, skill seperti:

```text
HTML
CSS
JavaScript
React
Git
UI Implementation
```

dapat diberikan bobot yang berbeda sesuai dengan relevansinya terhadap pekerjaan tersebut.

Hasil akhirnya adalah skor 0–100 yang memberikan gambaran mengenai tingkat kesiapan pengguna terhadap career path yang dipilih.

> **Catatan:** Job Readiness Score merupakan indikator kesiapan berdasarkan data assessment CareerSync, bukan jaminan bahwa pengguna pasti diterima bekerja.

---

# 🤖 AI-Powered Career Insights

CareerSync menggunakan **Google Gemini 2.5 Flash-Lite** sebagai AI engine untuk menghasilkan insight yang lebih personal berdasarkan data pengguna.

AI tidak menggantikan sistem scoring CareerSync. Sebaliknya, AI digunakan sebagai **lapisan analisis dan rekomendasi** di atas data yang telah dihitung oleh sistem.

### AI digunakan untuk:

* Menganalisis hasil skill assessment.
* Menjelaskan skill gap pengguna.
* Memberikan feedback personal.
* Menentukan prioritas pengembangan skill.
* Memberikan saran pembelajaran.
* Membantu menghasilkan rekomendasi proyek.
* Memberikan insight mengenai kesiapan pengguna terhadap career path tertentu.

### AI Architecture

```text
User Assessment
       ↓
Laravel Backend
       ↓
Skill Gap Analysis
       ↓
Weighted Scoring
       ↓
User Skill Profile
       ↓
Gemini 2.5 Flash-Lite
       ↓
AI Insights
       ↓
Personalized Recommendation
```

Pendekatan ini memungkinkan AI memberikan rekomendasi berdasarkan **data pengguna yang terstruktur**, bukan hanya berdasarkan prompt umum.

---

# 🌍 CareerSync & SDG 8

## **SDG 8 — Decent Work and Economic Growth**

CareerSync berkontribusi terhadap **Sustainable Development Goal 8 (SDG 8): Decent Work and Economic Growth**, terutama dalam aspek peningkatan keterampilan, kesiapan tenaga kerja, produktivitas, dan akses terhadap peluang kerja yang lebih sesuai.

### 🔗 Korelasi CareerSync dengan SDG 8

| Fokus SDG 8                      | Kontribusi CareerSync                                                                                              |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| 👨‍💼 **Decent Work**            | Membantu individu memahami kompetensi yang dibutuhkan untuk career path yang dituju.                               |
| 📚 **Skill Development**         | Mengidentifikasi skill gap dan menentukan kompetensi yang perlu dikembangkan.                                      |
| 🛠️ **Practical Skills**         | Mengarahkan pengguna untuk belajar melalui proyek yang relevan dengan kebutuhan dunia kerja.                       |
| 🎯 **Employability**             | Job Readiness Score memberikan gambaran mengenai kesiapan pengguna memasuki dunia kerja.                           |
| 📁 **Proof of Competence**       | Portfolio Builder membantu pengguna menunjukkan hasil pekerjaan sebagai bukti kemampuan.                           |
| 🤖 **Personalized Development**  | AI memberikan feedback dan rekomendasi berdasarkan kondisi masing-masing pengguna.                                 |
| 📈 **Human Capital Development** | Pengembangan kompetensi yang lebih terarah dapat membantu membentuk tenaga kerja yang lebih relevan dan produktif. |

### 🎯 Permasalahan → Solusi → Dampak

```text
SKILL GAP
Pelajar tidak mengetahui
kesenjangan skill mereka
        ↓
CAREERSYNC
        ↓
Skill Assessment
        ↓
Job Readiness Score
        ↓
Skill Gap Analysis
        ↓
AI Insights
        ↓
Project Recommendation
        ↓
Skill Development
        ↓
Portfolio Building
        ↓
IMPROVED EMPLOYABILITY
        ↓
Mendukung SDG 8
Decent Work & Economic Growth
```

Dengan pendekatan tersebut, CareerSync berperan sebagai platform yang membantu individu bergerak dari:

> **"Saya tidak tahu apakah saya siap bekerja."**

menjadi:

> **"Saya tahu posisi saya, tahu skill yang kurang, tahu cara meningkatkannya, dan memiliki bukti kemampuan."**

---

# 🔄 User Journey

```text
Register
   ↓
Choose Career Path
   ↓
Skill Assessment
   ↓
Job Readiness Score
   ↓
Skill Gap Analysis
   ↓
AI Career Insights
   ↓
Project Recommendation
   ↓
Complete Project
   ↓
Update Skill Progress
   ↓
Build Portfolio
   ↓
Public Portfolio
```

CareerSync dirancang sebagai proses pengembangan berkelanjutan, bukan hanya platform untuk melakukan satu kali assessment.

---

# 🏗️ System Architecture

```text
┌──────────────────────────┐
│       React Frontend     │
│                          │
│  Dashboard               │
│  Skill Analysis          │
│  Progress                │
│  Projects                │
│  Portfolio               │
└────────────┬─────────────┘
             │
             │ REST API
             ↓
┌──────────────────────────┐
│     Laravel Backend      │
│                          │
│  Authentication          │
│  Skill Assessment        │
│  Weighted Scoring        │
│  Skill Gap Analysis      │
│  Project Recommendation  │
│  Portfolio Management    │
│  AI Service              │
└───────┬───────────┬──────┘
        │           │
        ↓           ↓
┌─────────────┐  ┌──────────────────┐
│   Database  │  │ Gemini 2.5        │
│             │  │ Flash-Lite        │
│ Users       │  │                  │
│ Skills      │  │ AI Insights      │
│ Assessments │  │ Feedback         │
│ Projects    │  │ Recommendation   │
│ Portfolio   │  └──────────────────┘
└─────────────┘
```

---

# 🛠️ Tech Stack

## Frontend

* React.js
* Tailwind CSS v4
* React Router DOM
* Recharts / Chart.js

## Backend

* Laravel
* PHP
* REST API
* Laravel Sanctum
* MySQL

## AI

* Google Gemini 2.5 Flash-Lite
* AI-powered career insights
* Personalized feedback
* Project recommendation

## Development Tools

* Git
* GitHub
* npm
* Composer

---

# 🗂️ Struktur Halaman

```text
/
├── Landing Page
│
├── /auth
│   ├── Login
│   └── Register
│
├── /pretest
│   ├── Career Path Selection
│   └── Initial Skill Assessment
│
├── /dashboard
│   └── Main Dashboard
│
├── /dashboard/analysis
│   ├── Job Readiness Score
│   ├── Skill Gap Analysis
│   └── AI Insights
│
├── /dashboard/progress
│   └── Skill Progress Tracker
│
├── /dashboard/project
│   ├── Project Recommendations
│   └── Project Details
│
├── /dashboard/portfolio
│   └── Portfolio Management
│
└── /portfolio/:username
    └── Public Portfolio
```

---

# 📊 Impact Projection

Simulasi awal dilakukan menggunakan populasi **100 pengguna**.

| Indikator                  |  Proyeksi |
| -------------------------- | --------: |
| User Engagement Rate       |       80% |
| Project Participation Rate |       75% |
| Project Completion Rate    |      ~83% |
| Readiness Improvement      |  +20 poin |
| **Total Impact Score**     | **67.1%** |

Angka tersebut merupakan **proyeksi/simulasi** untuk menggambarkan potensi dampak CareerSync dan bukan hasil penelitian pada populasi pengguna nyata.

---

# 🎯 Expected Impact

## 👤 Individual Impact

CareerSync diharapkan membantu pengguna:

* Mengetahui tingkat kesiapan kerja.
* Memahami skill gap.
* Menentukan prioritas pengembangan kompetensi.
* Memperoleh pengalaman melalui proyek praktis.
* Membangun portfolio.
* Meningkatkan employability.

## 🏢 Industry Impact

CareerSync membantu mengurangi kesenjangan antara kompetensi calon tenaga kerja dan kebutuhan industri melalui pengembangan skill yang lebih terarah.

## 🌏 Social Impact

CareerSync berpotensi membantu menciptakan sumber daya manusia yang lebih siap menghadapi perubahan kebutuhan dunia kerja serta mendukung peningkatan kualitas dan produktivitas tenaga kerja.

---

# 🚀 Cara Menjalankan Project

## Prerequisites

Pastikan sudah terinstall:

* Node.js >= 18
* PHP >= 8.2
* Composer
* MySQL
* Git

---

## 1. Clone Repository

```bash
git clone https://github.com/[username]/careersync.git

cd careersync
```

---

# 2. Setup Backend

```bash
cd Backend

composer install

cp .env.example .env

php artisan key:generate
```

Konfigurasikan database pada `.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=careersync
DB_USERNAME=root
DB_PASSWORD=
```

Kemudian jalankan migration:

```bash
php artisan migrate
```

Jalankan Laravel:

```bash
php artisan serve
```

Backend akan berjalan pada:

```text
http://localhost:8000
```

---

# 3. Setup Frontend

Buka terminal baru:

```bash
cd Frontend

npm install

npm run dev
```

Frontend akan berjalan pada:

```text
http://localhost:5173
```

---

# 🔐 Environment Variables

## Frontend

Buat `.env`:

```env
VITE_API_URL=http://localhost:8000/api/v1
```

## Backend

Tambahkan konfigurasi AI pada `.env`:

```env
GEMINI_API_KEY=your_gemini_api_key
```

API key digunakan oleh Laravel Backend untuk berkomunikasi dengan Gemini.

> API key tidak boleh disimpan di frontend atau di-commit ke repository publik.

---

# 📡 API Architecture

CareerSync menggunakan pendekatan **REST API** antara frontend dan backend.

Contoh endpoint:

```text
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/logout

GET    /api/v1/profile

GET    /api/v1/careers
GET    /api/v1/careers/{id}

POST   /api/v1/assessment
GET    /api/v1/assessment/result

GET    /api/v1/skills
GET    /api/v1/skills/gap

GET    /api/v1/projects
GET    /api/v1/projects/recommendations

GET    /api/v1/progress
POST   /api/v1/progress

POST   /api/v1/ai/insights

GET    /api/v1/portfolio
POST   /api/v1/portfolio

GET    /api/v1/portfolio/{username}
```

---

# 🔒 Security

CareerSync menerapkan beberapa mekanisme keamanan pada backend:

* Laravel Sanctum untuk authentication.
* API validation menggunakan Laravel Form Request.
* Environment variables untuk credential/API key.
* Password hashing.
* Authentication middleware.
* Authorization terhadap resource pengguna.
* CORS configuration.
* API rate limiting untuk endpoint tertentu.

---

# 📈 Future Development

CareerSync dapat dikembangkan lebih lanjut dengan:

* Integrasi lowongan kerja berdasarkan skill.
* Career matching dengan kebutuhan industri.
* Sertifikasi kompetensi.
* AI-powered resume analysis.
* AI interview preparation.
* Employer dashboard.
* Industry skill benchmark.
* Skill trend monitoring.
* Gamification dan achievement system.

---

# 📄 License

Project ini dibuat untuk keperluan kompetisi.

**All Rights Reserved © 2026
Tim Kata Bu Kuri kita harus DUMOR
SMK Negeri 26 Jakarta**

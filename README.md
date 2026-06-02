# 🎓 Aplikasi Pintar — Smart Adaptive Learning Companion (SALC)

> **Capstone Project Coding Camp 2026 — Powered by DBS Foundation**
> 🆔 ID Tim: **CC26-PSU314** | 🎯 Tema: **Accessible & Adaptive Learning**

---

**Aplikasi Pintar** adalah platform pembelajaran adaptif berbasis kecerdasan buatan (*Artificial Intelligence*) yang dirancang untuk mentransformasi cara belajar menjadi lebih personal, interaktif, dan berbasis data. Dengan mengintegrasikan Machine Learning, Natural Language Processing (NLP), dan dashboard analitik yang informatif, SALC hadir sebagai solusi cerdas untuk mendukung keberhasilan belajar setiap siswa — sambil membantu guru memantau perkembangan kelas secara real-time.

🌐 **Demo Langsung:** [capstone-dbs.vercel.app](https://capstone-dbs.vercel.app/dashboard)

---

## ✨ Fitur Utama

### 🖥️ Frontend — Antarmuka yang Intuitif & Responsif

Frontend SALC dibangun dengan arsitektur modern menggunakan **React.js + Vite**, dirancang agar terasa cepat, responsif, dan nyaman digunakan di berbagai perangkat.

- **🔐 Autentikasi & Role-Based Access Control (RBAC)**
  Sistem login yang aman dengan pemisahan hak akses penuh antara tiga peran: **Siswa**, **Guru**, dan **Admin** — masing-masing mendapatkan tampilan dan fitur yang disesuaikan dengan kebutuhannya.

- **📊 Dashboard Interaktif & Personal**
  Setiap peran memiliki halaman dashboard tersendiri. Siswa dapat memantau progress belajar dan skor mereka, sementara Guru dapat melihat ringkasan performa kelas beserta daftar siswa yang berisiko tertinggal.

- **📝 Essay Answer Input dengan AI Feedback**
  Siswa dapat mengirimkan jawaban essay secara langsung melalui platform. Jawaban akan dinilai otomatis oleh model AI yang menghasilkan **skor** (0–100), **kategori** (Baik / Cukup / Kurang), dan **umpan balik konstruktif** dalam hitungan detik.

- **📚 Materi Belajar & Rekomendasi Cerdas**
  Sistem penjelajahan materi yang lengkap dengan *progress tracking* dan rekomendasi materi yang dipersonalisasi — disesuaikan dengan aktivitas dan performa belajar masing-masing siswa.

- **⚠️ Early Warning System (EWS)**
  Fitur eksklusif untuk Guru dan Admin untuk mendeteksi dini siswa yang berisiko tertinggal berdasarkan dua model prediksi: **Aktivitas Belajar** dan **Performa Akademik**. Sistem menghasilkan level risiko (Aman / Perhatian / Kritis) beserta rekomendasi tindakan yang konkret.

- **🌗 Dark / Light Mode**
  Desain premium dengan dukungan tema terang dan gelap yang bisa diubah kapan saja, memastikan kenyamanan visual bagi semua pengguna.

- **🌐 Multi-bahasa (i18n Ready)**
  Antarmuka yang mendukung pergantian bahasa untuk pengalaman belajar yang lebih inklusif.

---

### ⚙️ Backend — API yang Andal & Terstruktur

Backend SALC dibangun menggunakan **Node.js + Express.js** dengan arsitektur RESTful API yang bersih dan termodularisasi. Seluruh data disimpan di **MySQL** (Aiven Cloud) untuk keandalan dan skalabilitas.

**Endpoint Utama:**

| Modul | Deskripsi |
|---|---|
| `/api/auth` | Registrasi, login, dan manajemen token JWT |
| `/api/predictions` | Submit jawaban essay → penilaian AI real-time |
| `/api/materials` | CRUD materi belajar beserta kategori dan tingkat kesulitan |
| `/api/progress` | Pencatatan dan pembaruan progress belajar siswa |
| `/api/recommendations` | Rekomendasi materi berbasis aktivitas (Model ML 1) |
| `/api/early-warning` | Prediksi risiko siswa berbasis aktivitas & performa akademik |
| `/api/dashboard` | Agregasi data ringkasan untuk tampilan dashboard |
| `/api/users` | Manajemen data pengguna (Admin) |

**Fitur Teknis Backend:**
- 🔒 **JWT Authentication** dengan middleware proteksi berbasis role
- 🔗 **Integrasi AI Service** — backend terhubung langsung ke ML service yang dideploy di Hugging Face Spaces
- 🔄 **Graceful Fallback** — jika AI service tidak tersedia, sistem tetap berjalan menggunakan logika berbasis aturan (*rule-based fallback*)
- 🛡️ **SSL Database** — koneksi database menggunakan SSL untuk keamanan di lingkungan cloud

---

### 🤖 AI / Machine Learning — Otak di Balik Sistem

SALC mengintegrasikan tiga model kecerdasan buatan yang berjalan pada **FastAPI** (Python) dan dideploy di **Hugging Face Spaces**:

| Model | Fungsi | Endpoint |
|---|---|---|
| **NLP Essay Grader** | Menilai jawaban essay siswa secara otomatis | `POST /predict` |
| **Activity Risk Model** | Memprediksi risiko siswa berdasarkan aktivitas belajar | `POST /api/predict/activity` |
| **Performance Risk Model** | Memprediksi risiko siswa berdasarkan skor akademik | `POST /api/predict/performance` |

🔗 **AI Service URL:** `https://adriellllll34-salc-ai.hf.space`
📖 **Dokumentasi API (Swagger):** [adriellllll34-salc-ai.hf.space/docs](https://adriellllll34-salc-ai.hf.space/docs)

---

## 🏗️ Arsitektur Sistem

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT (Browser)                     │
│              React.js + Vite (Vercel)                   │
│         https://capstone-dbs.vercel.app                 │
└───────────────────────┬─────────────────────────────────┘
                        │ HTTP Request (Axios)
                        ▼
┌─────────────────────────────────────────────────────────┐
│                 BACKEND API (Node.js)                   │
│              Express.js (Render.com)                    │
│         https://salc-backend-dicoding.onrender.com      │
└───────────────┬───────────────────┬─────────────────────┘
                │                   │
        MySQL Query          Axios HTTP Request
                │                   │
                ▼                   ▼
┌───────────────────┐   ┌───────────────────────────────┐
│  Aiven MySQL DB   │   │     AI / ML Service (Python)  │
│  (Cloud Database) │   │  FastAPI + HuggingFace Spaces │
└───────────────────┘   └───────────────────────────────┘
```

---

## 💻 Tech Stack

| Layer | Teknologi |
|---|---|
| **Frontend Framework** | React.js v18 + Vite |
| **Styling** | Tailwind CSS v3 |
| **Routing** | React Router DOM v6 |
| **HTTP Client** | Axios |
| **State Management** | React Context API |
| **Icons** | Lucide React |
| **Backend Framework** | Node.js + Express.js |
| **Database** | MySQL (Aiven Cloud) |
| **Authentication** | JWT (JSON Web Token) + Bcrypt |
| **AI/ML Framework** | Python + FastAPI |
| **ML Libraries** | scikit-learn, TensorFlow/Keras, NLTK |
| **Frontend Deployment** | Vercel |
| **Backend Deployment** | Render.com |
| **AI Deployment** | Hugging Face Spaces |

---

## 🚀 Cara Menjalankan Proyek Secara Lokal

Pastikan Anda telah menginstal **Node.js (v18+)** dan **npm** di komputer Anda.

### 1. Frontend

```bash
# Clone repository
git clone https://github.com/natasia-dicod/Capstone-dicoding-nat-team.git
cd Capstone-dicoding-nat-team

# Instal dependensi
npm install

# Buat file environment
cp .env.example .env
# Edit .env dan isi VITE_API_BASE_URL dengan URL backend

# Jalankan development server
npm run dev
```

Akses frontend di: `http://localhost:5173`

---

### 2. Backend

```bash
cd salc-backend

# Instal dependensi
npm install

# Buat file environment
cp .env.example .env
# Edit .env dan isi semua variabel yang diperlukan (lihat bagian Konfigurasi Environment)

# Jalankan backend server
npm run dev
```

Backend berjalan di: `http://localhost:3000`

---

## 🔧 Konfigurasi Environment

### Frontend (`/.env`)

```env
VITE_API_BASE_URL=http://localhost:3000
```

Untuk production, ganti dengan URL backend yang sudah dideploy:
```env
VITE_API_BASE_URL=https://salc-backend-dicoding.onrender.com
```

### Backend (`/salc-backend/.env`)

Salin file `.env.example` menjadi `.env` lalu isi nilainya:

```env
# Server
PORT=3000

# Database (MySQL / Aiven)
DB_HOST=your-db-host
DB_PORT=3306
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_NAME=salc_db
DB_SSL=false  # Set 'true' untuk cloud database seperti Aiven

# Security
JWT_SECRET=ganti-dengan-kunci-rahasia-yang-kuat
JWT_EXPIRES_IN=7d

# AI / ML Service
ML_SERVICE_URL=https://adriellllll34-salc-ai.hf.space
```

> ⚠️ **Penting:** Jangan pernah meng-commit file `.env` yang berisi kredensial asli ke repository. Gunakan `.env.example` sebagai template untuk anggota tim.

---

## 🤖 Model AI

Model Machine Learning yang digunakan dalam proyek ini tersedia untuk diunduh melalui tautan berikut:

📥 **[Download Model AI — Google Drive](https://drive.google.com/drive/folders/1DMdISE93eNEcuXrgt7sqt7TTumTZw5Gh?usp=drive_link)**

> Pastikan akun `capstone@student.devacademy.id` memiliki akses untuk melihat dan mengunduh file model tersebut.

---

## 📁 Struktur Folder

```
Capstone-dicoding-nat-team/
├── public/                    # Asset statis
├── src/                       # Source code frontend (React)
│   ├── components/            # Komponen UI yang dapat digunakan kembali
│   ├── pages/                 # Halaman-halaman utama aplikasi
│   ├── services/              # Konfigurasi Axios & API calls
│   ├── context/               # React Context (Auth, Theme, Language)
│   └── utils/                 # Helper functions & constants
├── salc-backend/              # Source code backend (Node.js)
│   ├── src/
│   │   ├── controllers/       # Logic handler untuk setiap endpoint
│   │   ├── routes/            # Definisi routing API
│   │   ├── models/            # Query database (MySQL)
│   │   ├── middleware/        # Auth middleware & validator
│   │   └── config/            # Konfigurasi database & env
│   ├── .env.example           # Template variabel environment
│   └── server.js              # Entry point server
├── salc-ml/                   # Source code & model AI/ML (Python)
│   ├── api/                   # FastAPI app
│   ├── model/                 # File model (.h5, .pkl, dll.)
│   └── utils/                 # Preprocessing & inference helper
├── .env.example               # Template environment frontend
├── vercel.json                # Konfigurasi deployment Vercel
└── README.md                  # Dokumentasi proyek ini
```

---

## 🌐 Deployment

| Komponen | Platform | URL |
|---|---|---|
| Frontend | Vercel | [capstone-dbs.vercel.app](https://capstone-dbs.vercel.app) |
| Backend | Render.com | [salc-backend-dicoding.onrender.com](https://salc-backend-dicoding.onrender.com) |
| AI Service | Hugging Face Spaces | [adriellllll34-salc-ai.hf.space](https://adriellllll34-salc-ai.hf.space) |
| Database | Aiven (MySQL Cloud) | *(Akses privat via environment variable)* |

---

> Dikembangkan dengan penuh dedikasi untuk mendorong inovasi dan kemajuan pendidikan digital Indonesia. 🇮🇩❤️

# Aplikasi Pintar — Adaptive Learning Platform 🧠✨

Aplikasi Pintar (sebelumnya EduMind AI) adalah platform pembelajaran adaptif masa depan yang mengintegrasikan asisten virtual berbasis kecerdasan buatan (AI). Dirancang khusus untuk membantu pengalaman belajar siswa sekaligus mempermudah guru dalam memantau performa kelas secara real-time.

Proyek ini merupakan bagian dari pengembangan **Capstone Project DBS**, yang menggabungkan interaksi mulus ala *Meta AI di WhatsApp* dengan gaya interaksi kasual seperti *SimSimi*, menjadikannya platform pendidikan yang asyik, interaktif, dan tepat guna.

---

## 🎯 Fitur Utama Frontend

Frontend aplikasi ini telah dibangun dengan struktur arsitektur modern dan fungsionalitas UI yang komprehensif:

- **Autentikasi & Role-Based Access Control (RBAC):** Login/Register dengan pemisahan hak akses antara **Siswa**, **Guru**, dan **Admin**.
- **Dashboard Interaktif:** Tampilan ringkasan performa yang berbeda untuk Guru (memantau rata-rata kelas & siswa berisiko) dan Siswa (memantau progress materi & skor).
- **💬 AI Chat Assistant:** Fitur utama! Interface chat yang dinamis ala WhatsApp/SimSimi, lengkap dengan animasi *typing*, *quick actions*, dan saran prompt AI.
- **Materi & Rekomendasi Belajar:** Sistem penjelajahan materi dengan *progress bar* dan rekomendasi personalisasi berbasis skor AI.
- **Early Warning System (EWS):** Halaman khusus Guru/Admin untuk mendeteksi siswa yang berisiko tertinggal (High Risk, Medium Risk, Safe).
- **Essay Answer Input:** Formulir penyerahan jawaban essay yang terintegrasi dengan simulasi analisis dan *feedback* dari AI.
- **🌗 Dark / Light Mode:** Desain sistem premium dengan *glass-morphism* yang mendukung pergantian tema terang dan gelap secara mulus.

---

## 💻 Tech Stack

Proyek ini dibangun menggunakan teknologi modern yang berfokus pada kecepatan dan performa:

| Kategori | Teknologi |
|---|---|
| **Core** | React.js (v18), Vite |
| **Styling** | Tailwind CSS (v3) |
| **Routing** | React Router DOM (v6) |
| **Icons** | Lucide React |
| **HTTP Client** | Axios (siap digunakan untuk integrasi) |
| **State Management** | React Context API (`AuthContext`, `ThemeContext`) |

---

## 🚀 Cara Menjalankan Proyek (Lokal)

Pastikan Anda sudah menginstal **Node.js** dan **npm** di komputer Anda.

1. **Clone repository ini** (jika Anda belum melakukannya):
   ```bash
   git clone https://github.com/yafetpurnama-ops/Capstone_DBS.git
   cd Capstone_DBS
   ```

2. **Instal dependensi:**
   ```bash
   npm install
   ```

3. **Jalankan Development Server:**
   ```bash
   npm run dev
   ```

4. **Buka di Browser:**
   Akses URL `http://localhost:5173` (atau port lain yang ditampilkan di terminal).

### 🔑 Akun Demo (Mock Data)
Platform ini sudah dilengkapi dengan *mock API* untuk tahap pengujian. Anda bisa login menggunakan akun berikut:
- **Guru:** `rina@edumind.ai` | Pass: `guru123`
- **Siswa:** `budi@edumind.ai` | Pass: `siswa123`
- **Admin:** `admin@edumind.ai` | Pass: `admin123`

---

## 🏗️ Status Pengembangan & Handoff

*Fase Frontend Dasar (UI/UX Foundation) telah selesai.*

**Yang perlu dikerjakan selanjutnya oleh Tim (AI Engineer / Backend Developer):**
- Mengganti sumber *mock data* di `src/mock/data.js` dengan koneksi API *real* dari Backend (Python/Flask).
- Menyempurnakan logika AI Chat (Response Generator, Image/Voice analysis).
- Integrasi Library Chart (seperti *Recharts* atau *Chart.js*) untuk visualisasi data interaktif di Dashboard dan Early Warning System.

---

> Didevelop dengan dedikasi untuk inovasi pendidikan digital Indonesia. 🇮🇩

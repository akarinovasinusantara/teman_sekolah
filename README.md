# 🏫 Teman Sekolah - Sistem Manajemen Sekolah Terpadu

**Teman Sekolah** adalah aplikasi web manajemen sekolah berbasis React (Frontend) dan Node.js (Backend) dengan komponen Material-UI yang modern dan responsif.

![Status](https://img.shields.io/badge/status-development-green)
![React](https://img.shields.io/badge/React-18-blue)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Material-UI](https://img.shields.io/badge/Material--UI-5-blueviolet)

---

## 📋 Daftar Isi

- [Fitur Utama](#-fitur-utama)
- [Struktur Folder](#-struktur-folder)
- [Teknologi](#-teknologi)
- [Instalasi](#-instalasi)
- [Menjalankan Aplikasi](#-menjalankan-aplikasi)
- [Akun Default](#-akun-default)
- [API Endpoints](#-api-endpoints)
- [Database Models](#-database-models)
- [Autentikasi](#-autentikasi)
- [Struktur Menu per Role](#-struktur-menu-per-role)
- [Kontribusi](#-kontribusi)
- [License](#-license)

---

## 🚀 Fitur Utama

### 1. 🎯 Super Admin (Yayasan/Pengembang)
| Fitur | Deskripsi |
|-------|-----------|
| 📊 Dashboard | Ringkasan statistik sekolah dan pengguna |
| 🏫 Manajemen Sekolah | Tambah, edit, hapus data sekolah |
| 💰 Laporan Keuangan | Laporan pemasukan & tunggakan SPP total |
| 📈 Kinerja Guru | Monitoring kinerja guru (jurnal mengajar) |
| ⚙️ Pengaturan | Atur biaya langganan aplikasi |

### 2. 📝 Staf Administrasi (TU - Tata Usaha)
| Fitur | Deskripsi |
|-------|-----------|
| 📊 Dashboard | Ringkasan statistik sekolah |
| 🎓 PPDB | Kelola pendaftaran siswa baru online |
| 💳 Keuangan SPP | Kelola tagihan & konfirmasi pembayaran |
| 📅 Jadwal Pelajaran | Atur jadwal mata pelajaran per kelas |
| 📄 Surat Menyurat | Cetak surat edaran, ijazah, dll |

### 3. 👨‍🏫 Guru
| Fitur | Deskripsi |
|-------|-----------|
| 📊 Dashboard | Ringkasan kelas dan jadwal mengajar |
| ✅ Absensi Siswa | Input kehadiran siswa per pertemuan |
| 📝 Input Nilai | Input nilai harian, UTS, UAS |
| 📖 E-Rapor | Isi deskripsi perkembangan siswa |
| 📢 Pengumuman Kelas | Kirim pengumuman ke kelas yang diampu |

### 4. 👨‍👩‍👧 Orang Tua & Siswa
| Fitur | Deskripsi |
|-------|-----------|
| 📊 Dashboard | Ringkasan informasi pribadi |
| 💳 Pembayaran | Lihat tagihan & bayar via QRIS/VA |
| 📅 Monitoring Kehadiran | Lihat riwayat kehadiran real-time |
| 📊 Hasil Belajar | Lihat nilai ujian & rapor digital |
| 📬 Informasi & Surat | Terima surat edaran digital |

---

## 📁 Struktur Folder

```
Teman_Sekolah/
│
├── 📂 frontend/                    # React Frontend (Vite)
│   ├── 📂 public/                  # Static assets
│   ├── 📂 src/
│   │   ├── 📂 components/
│   │   │   ├── 📂 common/          # Komponen reusable
│   │   │   │   ├── ResponsiveDialog.jsx
│   │   │   │   ├── ResponsiveForm.jsx
│   │   │   │   └── ResponsiveTable.jsx
│   │   │   └── 📂 layout/          # Layout components
│   │   │       └── MainLayout.jsx  # Layout utama dengan sidebar
│   │   ├── 📂 pages/               # Halaman per role
│   │   │   ├── 📂 super-admin/     # Halaman Super Admin
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── ManajemenSekolah.jsx
│   │   │   │   ├── LaporanKeuangan.jsx
│   │   │   │   └── KinerjaGuru.jsx
│   │   │   ├── 📂 tu/              # Halaman TU
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── PPDB.jsx
│   │   │   │   ├── KeuanganSPP.jsx
│   │   │   │   ├── JadwalPelajaran.jsx
│   │   │   │   └── SuratMenyurat.jsx
│   │   │   ├── 📂 guru/            # Halaman Guru
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── AbsensiSiswa.jsx
│   │   │   │   ├── InputNilai.jsx
│   │   │   │   ├── ERapor.jsx
│   │   │   │   └── PengumumanKelas.jsx
│   │   │   ├── 📂 ortu/            # Halaman Orang Tua
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── Pembayaran.jsx
│   │   │   │   ├── MonitoringKehadiran.jsx
│   │   │   │   ├── HasilBelajar.jsx
│   │   │   │   └── InformasiSurat.jsx
│   │   │   └── 📂 siswa/           # Halaman Siswa
│   │   │       └── Dashboard.jsx
│   │   ├── 📂 utils/               # Utility functions
│   │   │   └── responsive.js       # Responsive helpers
│   │   ├── App.jsx                 # Main app component & routing
│   │   ├── main.jsx                # Entry point
│   │   └── index.css               # Global styles
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
└── 📂 backend/                     # Node.js Backend (Express)
    ├── 📂 src/
    │   ├── 📂 config/              # Konfigurasi
    │   │   └── database.js         # Konfigurasi database (Sequelize)
    │   ├── 📂 models/              # Database models
    │   │   ├── index.js            # Relasi antar models
    │   │   ├── User.js             # Model user (auth)
    │   │   ├── Sekolah.js          # Model sekolah
    │   │   ├── Siswa.js            # Model siswa
    │   │   ├── Guru.js             # Model guru
    │   │   ├── Kelas.js            # Model kelas
    │   │   ├── MataPelajaran.js    # Model mata pelajaran
    │   │   ├── JadwalPelajaran.js  # Model jadwal
    │   │   ├── Absensi.js          # Model absensi
    │   │   ├── Nilai.js            # Model nilai
    │   │   ├── Keuangan.js         # Model keuangan
    │   │   ├── Pengumuman.js       # Model pengumuman
    │   │   ├── SuratEdaran.js      # Model surat edaran
    │   │   └── PPDB.js             # Model PPDB
    │   ├── 📂 routes/              # API routes
    │   │   ├── auth.js             # Route autentikasi
    │   │   ├── users.js            # Route users
    │   │   ├── sekolah.js          # Route sekolah
    │   │   ├── siswa.js            # Route siswa
    │   │   ├── guru.js             # Route guru
    │   │   ├── kelas.js            # Route kelas
    │   │   ├── absensi.js          # Route absensi
    │   │   ├── nilai.js            # Route nilai
    │   │   ├── keuangan.js         # Route keuangan
    │   │   ├── pengumuman.js       # Route pengumuman
    │   │   └── ppdb.js             # Route PPDB
    │   ├── 📂 middleware/          # Middleware
    │   │   └── auth.js             # Auth middleware (JWT)
    │   ├── 📂 database/            # Database scripts
    │   │   └── seed.js             # Seed data dummy
    │   └── index.js                # Main server file
    ├── .env                        # Environment variables
    ├── package.json
    └── database.sqlite             # SQLite database file
```

---

## 🛠️ Teknologi

### Frontend
| Teknologi | Versi | Deskripsi |
|-----------|-------|-----------|
| React | 18.x | UI Library |
| Vite | 5.x | Build tool & dev server |
| Material-UI (MUI) | 5.x | Component library |
| React Router DOM | 6.x | Routing |
| Axios | 1.x | HTTP client |

### Backend
| Teknologi | Versi | Deskripsi |
|-----------|-------|-----------|
| Node.js | 18+ | Runtime environment |
| Express.js | 4.x | Web framework |
| Sequelize | 6.x | ORM untuk database |
| SQLite | 3.x | Database (development) |
| JWT | 9.x | Authentication token |
| Bcryptjs | 2.x | Password hashing |
| Dotenv | 16.x | Environment variables |

---

## 📦 Instalasi

### Prasyarat
- Node.js >= 18.x
- npm atau yarn
- Git (untuk clone repository)

### 1. Clone Repository
```bash
cd D:\Project\Teman_Sekolah
```

### 2. Setup Frontend
```bash
cd frontend
npm install
```

### 3. Setup Backend
```bash
cd backend
npm install
```

### 4. Konfigurasi Environment

Edit file `backend/.env`:
```env
# Server Port
PORT=5000

# JWT Secret
JWT_SECRET=teman-sekolah-secret-key-2026
JWT_EXPIRE=7d

# Node Environment
NODE_ENV=development
```

> **Catatan:** Aplikasi menggunakan SQLite untuk development, jadi tidak perlu setup MySQL.

### 5. Seed Database (Data Awal)
```bash
cd backend
npm run seed
```

Perintah ini akan membuat:
- Tabel database
- User dummy (5 role)
- Data sekolah, guru, mata pelajaran, dan kelas

---

## 🚀 Menjalankan Aplikasi

### 1. Jalankan Backend
```bash
cd backend
npm run dev
```
✅ Backend berjalan di `http://localhost:5000`

### 2. Jalankan Frontend (terminal baru)
```bash
cd frontend
npm run dev
```
✅ Frontend berjalan di `http://localhost:3000`

---

## 🔐 Akun Default

Setelah menjalankan `npm run seed`, akun berikut tersedia:

| Role | Username | Password | Akses |
|------|----------|----------|-------|
| 🎯 Super Admin | `yayasan_sejahtera` | `admin123` | Full Access |
| 📝 TU | `tu_admin` | `tu123` | Administrasi |
| 👨‍🏫 Guru | `guru_budi` | `guru123` | Mengajar |
| 👨‍👩‍👧 Orang Tua | `ortu_ahmad` | `ortu123` | Monitoring |
| 🎓 Siswa | `siswa_ahmad` | `siswa123` | Informasi |

---

## 📡 API Endpoints

Base URL: `http://localhost:5000/api`

### Authentication (`/auth`)
| Method | Endpoint | Deskripsi | Auth |
|--------|----------|-----------|------|
| POST | `/login` | Login user | ❌ |
| POST | `/register` | Register user baru | ✅ Super Admin |
| GET | `/me` | Get user yang sedang login | ✅ |

### Users (`/users`)
| Method | Endpoint | Deskripsi | Auth |
|--------|----------|-----------|------|
| GET | `/` | List semua user | ✅ Super Admin, TU |
| GET | `/:id` | Detail user | ✅ |
| PUT | `/:id` | Update user | ✅ Super Admin, TU |
| DELETE | `/:id` | Hapus user | ✅ Super Admin |

### Sekolah (`/sekolah`)
| Method | Endpoint | Deskripsi | Auth |
|--------|----------|-----------|------|
| GET | `/` | List sekolah | ✅ Super Admin |
| GET | `/:id` | Detail sekolah | ✅ Super Admin |
| POST | `/` | Tambah sekolah | ✅ Super Admin |
| PUT | `/:id` | Update sekolah | ✅ Super Admin |
| DELETE | `/:id` | Hapus sekolah | ✅ Super Admin |

### Siswa (`/siswa`)
| Method | Endpoint | Deskripsi | Auth |
|--------|----------|-----------|------|
| GET | `/` | List siswa | ✅ |
| GET | `/:id` | Detail siswa | ✅ |
| POST | `/` | Tambah siswa | ✅ TU, Super Admin |
| PUT | `/:id` | Update siswa | ✅ TU, Super Admin |
| DELETE | `/:id` | Hapus siswa | ✅ TU, Super Admin |

### Guru (`/guru`)
| Method | Endpoint | Deskripsi | Auth |
|--------|----------|-----------|------|
| GET | `/` | List guru | ✅ Super Admin, TU, Guru |
| GET | `/:id` | Detail guru | ✅ |
| POST | `/` | Tambah guru | ✅ Super Admin, TU |
| PUT | `/:id` | Update guru | ✅ Super Admin, TU |
| DELETE | `/:id` | Hapus guru | ✅ Super Admin, TU |

### Kelas (`/kelas`)
| Method | Endpoint | Deskripsi | Auth |
|--------|----------|-----------|------|
| GET | `/` | List kelas | ✅ |
| GET | `/:id` | Detail kelas | ✅ |
| POST | `/` | Tambah kelas | ✅ Super Admin, TU |
| PUT | `/:id` | Update kelas | ✅ Super Admin, TU |
| DELETE | `/:id` | Hapus kelas | ✅ Super Admin, TU |

### Absensi (`/absensi`)
| Method | Endpoint | Deskripsi | Auth |
|--------|----------|-----------|------|
| GET | `/` | List absensi | ✅ |
| POST | `/` | Tambah absensi | ✅ Guru, TU |
| PUT | `/:id` | Update absensi | ✅ Guru, TU |
| DELETE | `/:id` | Hapus absensi | ✅ Guru, TU |

### Nilai (`/nilai`)
| Method | Endpoint | Deskripsi | Auth |
|--------|----------|-----------|------|
| GET | `/` | List nilai | ✅ |
| GET | `/siswa/:siswaId` | Nilai per siswa | ✅ |
| POST | `/` | Tambah nilai | ✅ Guru, TU |
| PUT | `/:id` | Update nilai | ✅ Guru, TU |
| DELETE | `/:id` | Hapus nilai | ✅ Guru, TU |

### Keuangan (`/keuangan`)
| Method | Endpoint | Deskripsi | Auth |
|--------|----------|-----------|------|
| GET | `/` | List transaksi | ✅ Super Admin, TU |
| GET | `/siswa/:siswaId` | Transaksi per siswa | ✅ |
| GET | `/summary/total` | Ringkasan keuangan | ✅ Super Admin, TU |
| POST | `/` | Tambah transaksi | ✅ TU |
| PUT | `/:id` | Update/konfirmasi bayar | ✅ TU |
| DELETE | `/:id` | Hapus transaksi | ✅ TU |

### Pengumuman (`/pengumuman`)
| Method | Endpoint | Deskripsi | Auth |
|--------|----------|-----------|------|
| GET | `/` | List pengumuman | ✅ |
| GET | `/:id` | Detail pengumuman | ✅ |
| POST | `/` | Tambah pengumuman | ✅ Guru, TU, Super Admin |
| PUT | `/:id` | Update pengumuman | ✅ Guru, TU, Super Admin |
| DELETE | `/:id` | Hapus pengumuman | ✅ Guru, TU, Super Admin |

### PPDB (`/ppdb`)
| Method | Endpoint | Deskripsi | Auth |
|--------|----------|-----------|------|
| GET | `/` | List pendaftaran | ✅ Super Admin, TU |
| GET | `/:id` | Detail pendaftaran | ✅ Super Admin, TU |
| POST | `/` | Daftar baru (Public) | ❌ |
| PUT | `/:id` | Update status | ✅ TU |
| DELETE | `/:id` | Hapus pendaftaran | ✅ TU |

---

## 🗄️ Database Models

### Entity Relationship Diagram (Simplified)

```
┌─────────────┐       ┌─────────────┐
│   Sekolah   │───────│    User     │
└─────────────┘       └──────┬──────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
        ▼                    ▼                    ▼
┌─────────────┐       ┌─────────────┐     ┌─────────────┐
│    Guru     │       │    Siswa    │     │    Kelas    │
└──────┬──────┘       └──────┬──────┘     └──────┬──────┘
       │                     │                    │
       │    ┌────────────────┘                    │
       │    │                                     │
       ▼    ▼                                     ▼
┌─────────────────┐                     ┌─────────────────┐
│  JadwalPelajaran│                     │     Absensi     │
└─────────────────┘                     └────────┬────────┘
                                                 │
┌─────────────┐       ┌─────────────┐           │
│ MataPelajaran│──────│    Nilai    │◀──────────┘
└─────────────┘       └─────────────┘

┌─────────────┐       ┌─────────────┐
│  Keuangan   │       │  Pengumuman │
└─────────────┘       └─────────────┘

┌─────────────┐       ┌─────────────┐
│ SuratEdaran │       │    PPDB     │
└─────────────┘       └─────────────┘
```

### Model Details

| Model | Deskripsi | Field Utama |
|-------|-----------|-------------|
| **User** | Pengguna sistem | user_id, username, password, role, nama_lengkap |
| **Sekolah** | Data sekolah | nama, npsn, alamat, status, biaya_langganan |
| **Siswa** | Data siswa | nis, nisn, nama_lengkap, kelas_id, orang_tua |
| **Guru** | Data guru | nip, nama_lengkap, pendidikan, total_jurnal |
| **Kelas** | Data kelas | nama, tingkat, wali_kelas_id, tahun_ajaran |
| **MataPelajaran** | Daftar mapel | kode, nama, kelompok, kkm |
| **JadwalPelajaran** | Jadwal per kelas | kelas_id, mapel_id, guru_id, hari, jam |
| **Absensi** | Kehadiran siswa | siswa_id, kelas_id, tanggal, status |
| **Nilai** | Nilai siswa | siswa_id, mapel_id, jenis, nilai_angka |
| **Keuangan** | Transaksi keuangan | siswa_id, jenis, jumlah, status |
| **Pengumuman** | Pengumuman guru | judul, isi, kategori, prioritas |
| **SuratEdaran** | Surat edaran | nomor_surat, judul, isi, lampiran |
| **PPDB** | Pendaftaran siswa baru | no_pendaftaran, status, asal_sekolah |

---

## 🔒 Autentikasi

Aplikasi menggunakan **JWT (JSON Web Token)** untuk autentikasi.

### Flow Autentikasi

1. **Login**: User mengirim username & password ke `/api/auth/login`
2. **Generate Token**: Server memvalidasi dan menghasilkan JWT token
3. **Simpan Token**: Frontend menyimpan token di localStorage
4. **Request dengan Token**: Setiap request mengirim token via header:
   ```
   Authorization: Bearer <token>
   ```
5. **Verifikasi Token**: Middleware memverifikasi token dan attach user ke request

### Token Expiry

- Default: **7 hari** (`JWT_EXPIRE=7d`)
- Dapat diubah di file `backend/.env`

---

## 📱 Struktur Menu per Role

### 🎯 Super Admin
```
├── Dashboard
├── Manajemen Sekolah
├── Laporan Keuangan
└── Kinerja Guru
```

### 📝 TU (Tata Usaha)
```
├── Dashboard
├── PPDB
├── Keuangan SPP
├── Jadwal Pelajaran
└── Surat Menyurat
```

### 👨‍🏫 Guru
```
├── Dashboard
├── Absensi Siswa
├── Input Nilai
├── E-Rapor
└── Pengumuman Kelas
```

### 👨‍👩‍👧 Orang Tua
```
├── Dashboard
├── Pembayaran
├── Monitoring Kehadiran
├── Hasil Belajar
└── Informasi & Surat
```

### 🎓 Siswa
```
├── Dashboard
├── Pembayaran
├── Monitoring Kehadiran
├── Hasil Belajar
└── Informasi & Surat
```

---

## 🤝 Kontribusi

Kontribusi sangat diapresiasi! Silakan:

1. Fork repository ini
2. Buat branch fitur (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buka Pull Request

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👨‍💻 Developer

**Teman Sekolah** © 2026

Sistem Manajemen Sekolah Terpadu - Membantu digitalisasi administrasi sekolah.

---

## 📞 Kontak

Untuk pertanyaan atau dukungan, silakan buat issue di repository ini.

# Teman Sekolah - Sistem Manajemen Sekolah

Aplikasi web manajemen sekolah berbasis React (Frontend) dan Node.js (Backend) dengan komponen Material-UI.

## 🚀 Fitur Utama

### 1. Super Admin (Yayasan)
- Melihat laporan keuangan total (pemasukan & tunggakan SPP)
- Memantau kinerja guru
- Menambah atau menghapus data sekolah
- Mengatur biaya langganan aplikasi

### 2. Staf Administrasi (TU - Tata Usaha)
- Mengurus pendaftaran siswa baru (PPDB)
- Mengelola tagihan SPP dan konfirmasi pembayaran
- Mengatur jadwal mata pelajaran dan pembagian kelas
- Mencetak surat-surat administratif

### 3. Guru
- Absensi siswa
- Input nilai harian, UTS, dan UAS
- E-Rapor (deskripsi perkembangan siswa)
- Pengumuman untuk kelas

### 4. Orang Tua & Siswa
- Melihat tagihan dan pembayaran via QRIS/VA
- Monitoring kehadiran real-time
- Melihat nilai ujian dan rapor digital
- Menerima surat edaran digital

## 📁 Struktur Folder

```
Teman_Sekolah/
├── frontend/                 # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   └── layout/
│   │   ├── pages/
│   │   │   ├── super-admin/
│   │   │   ├── tu/
│   │   │   ├── guru/
│   │   │   └── ortu/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── backend/                  # Node.js Backend
    ├── src/
    │   ├── config/
    │   ├── models/
    │   ├── routes/
    │   ├── middleware/
    │   ├── database/
    │   └── index.js
    ├── package.json
    └── .env
```

## 🛠️ Teknologi

### Frontend
- React 18
- Vite
- Material-UI (MUI)
- React Router DOM
- Axios

### Backend
- Node.js
- Express.js
- Sequelize ORM
- MySQL
- JWT Authentication
- Bcryptjs

## 📦 Instalasi

### Prasyarat
- Node.js >= 18.x
- MySQL >= 8.0
- npm atau yarn

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

### 4. Konfigurasi Database
1. Buat database MySQL:
```sql
CREATE DATABASE teman_sekolah;
```

2. Edit file `backend/.env`:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=teman_sekolah
JWT_SECRET=your-secret-key
PORT=5000
```

### 5. Seed Database (Data Awal)
```bash
cd backend
npm run seed
```

## 🚀 Menjalankan Aplikasi

### 1. Jalankan Backend
```bash
cd backend
npm run dev
```
Backend akan berjalan di `http://localhost:5000`

### 2. Jalankan Frontend
```bash
cd frontend
npm run dev
```
Frontend akan berjalan di `http://localhost:3000`

## 🔐 Akun Default

| Role | Username | Password |
|------|----------|----------|
| Super Admin | yayasan_sejahtera | admin123 |
| TU (Tata Usaha) | tu_admin | tu123 |
| Guru | guru_budi | guru123 |
| Orang Tua | ortu_ahmad | ortu123 |
| Siswa | siswa_ahmad | siswa123 |

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` - Login user
- `POST /api/auth/register` - Register user baru
- `GET /api/auth/me` - Get user saat ini

### Users
- `GET /api/users` - List semua user
- `GET /api/users/:id` - Detail user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Hapus user

### Sekolah
- `GET /api/sekolah` - List sekolah
- `POST /api/sekolah` - Tambah sekolah
- `PUT /api/sekolah/:id` - Update sekolah
- `DELETE /api/sekolah/:id` - Hapus sekolah

### Siswa
- `GET /api/siswa` - List siswa
- `POST /api/siswa` - Tambah siswa
- `PUT /api/siswa/:id` - Update siswa
- `DELETE /api/siswa/:id` - Hapus siswa

### Guru
- `GET /api/guru` - List guru
- `POST /api/guru` - Tambah guru
- `PUT /api/guru/:id` - Update guru
- `DELETE /api/guru/:id` - Hapus guru

### Kelas
- `GET /api/kelas` - List kelas
- `POST /api/kelas` - Tambah kelas
- `PUT /api/kelas/:id` - Update kelas
- `DELETE /api/kelas/:id` - Hapus kelas

### Absensi
- `GET /api/absensi` - List absensi
- `POST /api/absensi` - Tambah absensi
- `PUT /api/absensi/:id` - Update absensi
- `DELETE /api/absensi/:id` - Hapus absensi

### Nilai
- `GET /api/nilai` - List nilai
- `POST /api/nilai` - Tambah nilai
- `PUT /api/nilai/:id` - Update nilai
- `DELETE /api/nilai/:id` - Hapus nilai

### Keuangan
- `GET /api/keuangan` - List transaksi keuangan
- `GET /api/keuangan/siswa/:siswaId` - Transaksi per siswa
- `POST /api/keuangan` - Tambah transaksi
- `PUT /api/keuangan/:id` - Update/konfirmasi pembayaran

### Pengumuman
- `GET /api/pengumuman` - List pengumuman
- `POST /api/pengumuman` - Tambah pengumuman
- `PUT /api/pengumuman/:id` - Update pengumuman
- `DELETE /api/pengumuman/:id` - Hapus pengumuman

### PPDB
- `GET /api/ppdb` - List pendaftaran
- `POST /api/ppdb` - Daftar baru
- `PUT /api/ppdb/:id` - Update status pendaftaran

## 🔒 Autentikasi

Aplikasi menggunakan JWT (JSON Web Token) untuk autentikasi. Token harus dikirim melalui header:

```
Authorization: Bearer <token>
```

## 📝 License

MIT License

## 👨‍💻 Developer

Teman Sekolah © 2026

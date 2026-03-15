# 🖼️ Cara Menggunakan Image Components

## 📦 Komponen yang Tersedia

### 1. AppImage - Komponen Image Umum

Komponen image dengan lazy loading, skeleton loader, dan fallback.

```jsx
import { AppImage } from './components/common'

// Penggunaan dasar
<AppImage 
  src="/images/logos/logo-sekolah.png" 
  alt="Logo Sekolah"
  sx={{ width: 100, height: 100 }}
/>

// Dengan custom fallback
<AppImage 
  src="/path/to/image.jpg" 
  alt="Image"
  fallback="/images/avatars/default-avatar.png"
  sx={{ width: 200, height: 200, borderRadius: 2 }}
/>

// Tanpa lazy loading
<AppImage 
  src="/images/important.png" 
  alt="Important"
  lazy={false}
/>
```

### 2. StudentPhoto - Foto Siswa

Menampilkan foto siswa dari backend upload.

```jsx
import { StudentPhoto } from './components/common'

// Ukuran default (80x80)
<StudentPhoto nis="12345" alt="Foto Siswa" />

// Ukuran custom
<StudentPhoto nis="12345" size={120} alt="Foto Siswa" />

// Dengan custom styles
<StudentPhoto 
  nis="12345" 
  size={100}
  sx={{ 
    border: '3px solid', 
    borderColor: 'primary.main',
    boxShadow: 2,
  }}
/>
```

### 3. TeacherPhoto - Foto Guru

Menampilkan foto guru dari backend upload.

```jsx
import { TeacherPhoto } from './components/common'

// Ukuran default (80x80)
<TeacherPhoto nip="19850101" alt="Foto Guru" />

// Ukuran custom
<TeacherPhoto nip="19850101" size={100} />
```

### 4. SchoolLogo - Logo Sekolah

Menampilkan logo sekolah dari backend upload.

```jsx
import { SchoolLogo } from './components/common'

// Ukuran default (64x64)
<SchoolLogo schoolId={1} alt="Logo Sekolah" />

// Ukuran custom
<SchoolLogo schoolId={1} size={120} />

// Dengan objectFit contain (untuk logo)
<SchoolLogo 
  schoolId={1} 
  size={80}
  sx={{ objectFit: 'contain' }}
/>
```

### 5. Avatar - Avatar dengan Fallback Text

Menampilkan avatar dengan inisial jika tidak ada foto.

```jsx
import { Avatar } from './components/common'

// Dengan foto
<Avatar 
  src="/images/avatars/user.jpg" 
  alt="User Avatar"
  size={40}
/>

// Tanpa foto (tampilkan inisial)
<Avatar 
  alt="John Doe"
  fallbackText="JD"
  size={40}
/>

// Ukuran besar
<Avatar 
  src="/images/avatars/user.jpg" 
  fallbackText="JD"
  size={80}
/>
```

## 🔧 Menggunakan Asset Config

Import path dari config:

```jsx
import { IMAGES, ICONS, getUploadUrl } from './config/assets'

// Menggunakan path yang sudah didefinisikan
<img src={IMAGES.LOGO_SEKOLAH} alt="Logo" />
<img src={IMAGES.AVATARS.DEFAULT_AVATAR} alt="Default" />

// Menggunakan helper function
const studentPhotoUrl = getUploadUrl('students/12345/photo.jpg')
<img src={studentPhotoUrl} alt="Foto Siswa" />

// Helper functions lainnya
import { getStudentPhotoUrl, getTeacherPhotoUrl, getSchoolLogoUrl } from './config/assets'

const studentUrl = getStudentPhotoUrl('12345')
const teacherUrl = getTeacherPhotoUrl('19850101')
const schoolUrl = getSchoolLogoUrl(1)
```

## 📱 Contoh Penggunaan di Halaman

### Dashboard dengan Foto Siswa

```jsx
import { StudentPhoto } from './components/common'
import { getStudentPhotoUrl } from './config/assets'

function Dashboard() {
  const studentData = {
    nis: '12345',
    nama: 'Ahmad Rizky',
    kelas: 'X-A',
  }

  return (
    <Box>
      <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        {/* Menggunakan StudentPhoto component */}
        <StudentPhoto nis={studentData.nis} size={80} />
        
        <Box>
          <Typography variant="h6">{studentData.nama}</Typography>
          <Typography variant="body2" color="text.secondary">
            {studentData.kelas}
          </Typography>
        </Box>
      </Paper>
    </Box>
  )
}
```

### List Guru dengan Foto

```jsx
import { TeacherPhoto } from './components/common'

function GuruList() {
  const teachers = [
    { nip: '19850101', nama: 'Dra. Siti Aminah, M.Pd', mapel: 'Matematika' },
    { nip: '19850102', nama: 'Budi Santoso, S.Pd', mapel: 'Bahasa Indonesia' },
  ]

  return (
    <List>
      {teachers.map((guru) => (
        <ListItem key={guru.nip}>
          <ListItemAvatar>
            <TeacherPhoto nip={guru.nip} size={50} />
          </ListItemAvatar>
          <ListItemText 
            primary={guru.nama}
            secondary={guru.mapel}
          />
        </ListItem>
      ))}
    </List>
  )
}
```

### Header dengan Logo Sekolah

```jsx
import { SchoolLogo } from './components/common'
import { IMAGES } from './config/assets'

function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <SchoolLogo schoolId={1} size={40} sx={{ mr: 2 }} />
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Sistem Manajemen Sekolah
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
```

### Profile Card dengan Background

```jsx
import { AppImage } from './components/common'
import { IMAGES } from './config/assets'

function ProfileCard() {
  return (
    <Card>
      {/* Background Image */}
      <AppImage 
        src={IMAGES.BACKGROUNDS.HERO_BG}
        alt="Background"
        sx={{ width: '100%', height: 150 }}
      />
      
      <CardContent sx={{ mt: -8 }}>
        {/* Avatar */}
        <Avatar 
          src="/images/avatars/user.jpg"
          size={100}
          sx={{ 
            border: '4px solid white',
            boxShadow: 2,
          }}
        />
        
        <Typography variant="h6" sx={{ mt: 1 }}>
          Ahmad Rizky
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Siswa X-A
        </Typography>
      </CardContent>
    </Card>
  )
}
```

## 🎯 Best Practices

1. **Selalu gunakan alt text** untuk aksesibilitas
2. **Gunakan lazy loading** untuk image di bawah fold
3. **Optimasi ukuran file** sebelum upload
4. **Gunakan format yang tepat**:
   - PNG/SVG untuk logo dan icon
   - JPG untuk foto
   - WEBP untuk performa lebih baik
5. **Responsive images** dengan sx prop:
   ```jsx
   <AppImage 
     src="image.jpg"
     sx={{ 
       width: { xs: 100, sm: 150, md: 200 },
       height: { xs: 100, sm: 150, md: 200 }
     }}
   />
   ```

## 📁 Struktur Folder

```
frontend/
├── public/
│   ├── images/
│   │   ├── logos/
│   │   ├── illustrations/
│   │   ├── avatars/
│   │   └── backgrounds/
│   └── icons/
│       ├── app/
│       └── social/
├── src/
│   ├── config/
│   │   └── assets.js        # Konfigurasi paths
│   └── components/
│       └── common/
│           ├── AppImage.jsx  # Komponen image
│           └── index.js      # Export components
```

## 🔗 Backend Uploads

Untuk image yang diupload ke backend:

```
backend/
└── uploads/
    ├── students/      # Foto siswa
    ├── teachers/      # Foto guru
    ├── schools/       # Logo sekolah
    ├── documents/     # Dokumen
    └── others/        # Lainnya
```

Akses dari frontend:
```
http://localhost:5000/uploads/students/12345/photo.jpg
http://localhost:5000/uploads/teachers/19850101/photo.jpg
http://localhost:5000/uploads/schools/1/logo.png
```

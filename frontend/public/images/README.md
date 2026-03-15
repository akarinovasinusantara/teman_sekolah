# Asset Images & Icons

Struktur folder untuk menyimpan asset gambar dan icon di frontend.

## 📁 Struktur Folder

```
public/
├── images/
│   ├── logos/           # Logo sekolah, logo yayasan, dll
│   ├── illustrations/   # Ilustrasi, gambar dekoratif
│   ├── avatars/         # Foto profil default, avatar
│   └── backgrounds/     # Background images, hero images
└── icons/
    ├── app/             # Icon aplikasi, favicon, dll
    └── social/          # Icon social media
```

## 📸 Cara Menggunakan

### 1. Image dari Folder `public/images`

```jsx
// Di component React
<img src="/images/logos/logo-sekolah.png" alt="Logo Sekolah" />

// Atau dengan import
import logo from '../public/images/logos/logo-sekolah.png'
<img src={logo} alt="Logo Sekolah" />
```

### 2. Icon dari Folder `public/icons`

```jsx
<img src="/icons/app/favicon.ico" alt="Favicon" />
```

### 3. Menggunakan dengan MUI Icon

```jsx
import Icon from '@mui/material/Icon'

<Icon>
  <img src="/icons/app/icon-32x32.png" alt="Icon" />
</Icon>
```

## 🎯 Rekomendasi Ukuran

### Logos
- **Logo Sekolah**: 200x200px (PNG, SVG)
- **Logo Header**: 150x50px (PNG, SVG)

### Avatars
- **Profil Small**: 40x40px
- **Profil Medium**: 80x80px
- **Profil Large**: 150x150px

### Illustrations
- **Hero Image**: 800x400px
- **Empty State**: 300x300px

### Backgrounds
- **Hero Background**: 1920x600px
- **Pattern**: 400x400px (tileable)

### Icons
- **Favicon**: 16x16, 32x32, 48x48 (ICO, PNG)
- **App Icon**: 512x512px (PNG)
- **Social Icons**: 24x24, 32x32 (SVG, PNG)

## 📦 Format File yang Didukung

| Tipe | Format | Penggunaan |
|------|--------|------------|
| **Images** | PNG, JPG, JPEG, WEBP, SVG | Foto, ilustrasi, background |
| **Icons** | SVG, PNG, ICO | Icon aplikasi, favicon |
| **Logos** | SVG, PNG | Logo (SVG direkomendasikan) |

## 🔗 Akses dari Backend Uploads

Untuk image yang diupload ke backend (`backend/uploads/`), akses dari frontend:

```jsx
// URL backend image
const backendUrl = 'http://localhost:5000'
const imageUrl = `${backendUrl}/uploads/students/foto-siswa.jpg`

<img src={imageUrl} alt="Foto Siswa" />

// Atau dengan komponen
function BackendImage({ path, alt }) {
  return (
    <img 
      src={`http://localhost:5000${path}`} 
      alt={alt}
      style={{ maxWidth: '100%', height: 'auto' }}
    />
  )
}

// Penggunaan
<BackendImage path="/uploads/students/12345/foto.jpg" alt="Siswa" />
```

## 🎨 Contoh Penggunaan di Component

```jsx
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export default function Header() {
  return (
    <Box 
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
      }}
    >
      {/* Logo dari public folder */}
      <img 
        src="/images/logos/logo-sekolah.png" 
        alt="Logo"
        style={{ width: 48, height: 48 }}
      />
      
      {/* Background image dengan CSS */}
      <Box
        sx={{
          backgroundImage: 'url(/images/backgrounds/header-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: 200,
        }}
      />
      
      {/* Illustration */}
      <img 
        src="/images/illustrations/welcome.svg" 
        alt="Welcome"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </Box>
  )
}
```

## 📝 Tips

1. **Optimasi Image**: Kompres image sebelum upload untuk performa lebih baik
2. **Responsive Images**: Gunakan `srcset` untuk image responsive
3. **Lazy Loading**: Tambahkan `loading="lazy"` untuk image di bawah fold
4. **Alt Text**: Selalu tambahkan `alt` untuk aksesibilitas
5. **SVG untuk Icons**: Gunakan SVG untuk icon yang scalable

## 🔗 Referensi

- [MUI Icons](https://mui.com/material-ui/material-icons/)
- [Vite Static Assets](https://vitejs.dev/guide/assets.html)

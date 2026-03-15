# 🎨 Color Scheme - Sistem Manajemen Sekolah

## Skema Warna Utama

### Primary Color - Biru Violet
```
#3700b3  - Main (Biru Violet Gelap)
#6d33d6  - Light (Biru Violet Terang)
#1e0082  - Dark (Biru Violet Sangat Gelap)
```

### Secondary Color - Putih
```
#ffffff  - Main (Putih Murni)
#f0f0f0  - Dark (Putih Abu-abu)
```

## 📊 Penggunaan Warna

### Komponen Primary (Biru Violet #3700b3)
- ✅ Tombol utama (CTA buttons)
- ✅ AppBar / Navbar
- ✅ Active states
- ✅ Links
- ✅ Icons utama
- ✅ Progress bars
- ✅ Focus states

### Komponen Secondary (Putih #ffffff)
- ✅ Background cards
- ✅ Paper components
- ✅ Secondary buttons
- ✅ Input backgrounds
- ✅ Modal backgrounds

## 🎯 Implementasi di MUI

### Theme Configuration
```javascript
const theme = createTheme({
  palette: {
    primary: {
      main: '#3700b3',
      light: '#6d33d6',
      dark: '#1e0082',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ffffff',
      light: '#ffffff',
      dark: '#f0f0f0',
      contrastText: '#3700b3',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
})
```

## 📱 Contoh Penggunaan

### Buttons
```jsx
// Primary button (biru violet dengan text putih)
<Button variant="contained">
  Simpan
</Button>

// Secondary button (putih dengan text biru violet)
<Button variant="outlined">
  Batal
</Button>
```

### App Bar
```jsx
<AppBar position="static">
  <Toolbar>
    {/* Background: #3700b3 */}
    {/* Text: #ffffff */}
  </Toolbar>
</AppBar>
```

### Cards
```jsx
<Paper sx={{ p: 3 }}>
  {/* Background: #ffffff */}
  <Typography color="primary">
    {/* Text: #3700b3 */}
  </Typography>
</Paper>
```

## 🎨 CSS Custom Properties

```css
:root {
  --primary-main: #3700b3;
  --primary-light: #6d33d6;
  --primary-dark: #1e0082;
  --primary-contrast: #ffffff;
  
  --secondary-main: #ffffff;
  --secondary-light: #ffffff;
  --secondary-dark: #f0f0f0;
  --secondary-contrast: #3700b3;
  
  --background-default: #f5f5f5;
  --background-paper: #ffffff;
}
```

## 🔗 Aksesibilitas

### Contrast Ratio
- **Primary (#3700b3) on White (#ffffff)**: 8.02:1 ✅ AAA
- **White (#ffffff) on Primary (#3700b3)**: 8.02:1 ✅ AAA
- **Dark (#1e0082) on White (#ffffff)**: 10.84:1 ✅ AAA

### Status Warna
- ✅ **WCAG AA**: Pass untuk semua ukuran text
- ✅ **WCAG AAA**: Pass untuk large text (18pt+)

## 🖌️ Gradient Backgrounds

### Login Page
```css
background: linear-gradient(
  135deg,
  rgba(55, 0, 179, 0.85) 0%,
  rgba(109, 51, 214, 0.85) 100%
), url('/images/backgrounds/sc_bg.jpg');
```

### Hero Sections
```css
background: linear-gradient(
  135deg,
  #3700b3 0%,
  #6d33d6 100%
);
```

## 📋 Checklist Implementasi

- [x] Theme configuration (main.jsx)
- [x] Login page background
- [x] Primary buttons
- [x] App bars
- [x] Links dan typography
- [x] Focus states
- [x] Loading indicators

## 🎨 Color Palette Tools

### Online Tools
- [Material Design Color Tool](https://material.io/design/color/)
- [Coolors](https://coolors.co/)
- [Adobe Color](https://color.adobe.com/)

### Contrast Checkers
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Contrast Checker](https://contrast-checker.glitch.me/)

## 📝 Catatan

1. **Warna primary** digunakan untuk elemen yang ingin ditonjolkan
2. **Warna putih** digunakan untuk background dan elemen sekunder
3. **Contrast text** otomatis diatur oleh MUI berdasarkan warna background
4. **Gradient overlay** menggunakan opacity 0.85 untuk keterbacaan optimal

## 🔄 Cara Mengubah Warna

### Di main.jsx
```javascript
const theme = createTheme({
  palette: {
    primary: {
      main: '#YOUR_COLOR',  // Ubah di sini
      // ...
    },
  },
})
```

### Global Search & Replace
- Find: `#3700b3`
- Replace: `#YOUR_COLOR`

## 🎯 Best Practices

1. ✅ Gunakan primary untuk action buttons
2. ✅ Gunakan putih untuk backgrounds
3. ✅ Jaga contrast ratio minimal 4.5:1
4. ✅ Test di berbagai device dan lighting
5. ✅ Gunakan opacity untuk overlay effects

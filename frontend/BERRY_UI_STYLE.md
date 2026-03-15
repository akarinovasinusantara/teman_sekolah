# 🎨 Berry-Inspired UI Style Guide

Sistem Manajemen Sekolah - Modern UI Design System

## 🌟 Karakteristik Design

### 1. **Rounded Corners (Sudut Membulat)**
```
Buttons:      10px
Inputs:       10px
Cards:        16px
Paper:        16px
Avatars:      12px
Chips:        8px
Alerts:       12px
List Items:   10px
```

### 2. **Soft Shadows (Bayangan Lembut)**
```css
/* Elevation 1 */
box-shadow: 0px 4px 12px rgba(145, 158, 171, 0.16);

/* Elevation 10 */
box-shadow: 0px 16px 32px rgba(145, 158, 171, 0.24);

/* Button Hover */
box-shadow: 0px 8px 16px rgba(145, 158, 171, 0.32);

/* Drawer */
box-shadow: 4px 0px 16px rgba(145, 158, 171, 0.16);

/* AppBar */
box-shadow: 0px 2px 8px rgba(145, 158, 171, 0.12);
```

### 3. **Modern Typography**
- **Font Family**: Public Sans (Primary), Roboto (Fallback)
- **Font Weights**: 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)
- **Letter Spacing**: Negative untuk headings, positive untuk buttons

### 4. **Color Palette**

#### Primary Colors
```
#3700b3 - Main (Biru Violet)
#6d33d6 - Light
#1e0082 - Dark
```

#### Status Colors
```
Success: #00b578 (Green)
Warning: #ff9800 (Orange)
Error:   #f44336 (Red)
Info:    #2196f3 (Blue)
```

#### Neutral Colors
```
Grey 50:  #f9fafb
Grey 100: #f3f4f6
Grey 200: #e5e7eb
Grey 300: #d1d5db
Grey 400: #9ca3af
Grey 500: #6b7280
Grey 600: #4b5563
Grey 700: #374151
Grey 800: #1f2937
Grey 900: #111827
```

## 📦 Komponen Styling

### Buttons
```jsx
// Semua buttons tanpa ripple effect yang berlebihan
// Shadow yang lembut
// Text transform: none (bukan uppercase)
// Font weight: 600

<Button variant="contained">
  Simpan  // Bukan "SIMPAN"
</Button>
```

### Cards
```jsx
// Border radius 16px
// Shadow lembut
// Padding 24px

<Card sx={{ 
  borderRadius: '16px',
  boxShadow: '0px 4px 12px rgba(145, 158, 171, 0.16)',
  p: 3
}}>
  Content
</Card>
```

### TextFields
```jsx
// Border radius 10px
// Border color abu-abu muda
// Highlight primary color saat focus

<TextField 
  label="Input"
  sx={{ 
    '& .MuiOutlinedInput-root': {
      borderRadius: '10px',
    }
  }}
/>
```

### Navigation (Drawer/Sidebar)
```jsx
// Border kanan dihilangkan
// Shadow untuk depth
// List items dengan margin dan rounded

<ListItemButton
  sx={{
    borderRadius: '10px',
    margin: '4px 8px',
    '&.Mui-selected': {
      backgroundColor: 'rgba(55, 0, 179, 0.08)',
    }
  }}
>
  Menu Item
</ListItemButton>
```

### Chips/Tags
```jsx
// Border radius 8px
// Font weight 600

<Chip 
  label="Status"
  sx={{ 
    borderRadius: '8px',
    fontWeight: 600,
  }}
/>
```

### Alerts
```jsx
// Border radius 12px

<Alert 
  severity="success"
  sx={{ borderRadius: '12px' }}
>
  Success message
</Alert>
```

## 🎨 Gradient Styles

### Login Background
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

### Card Gradients (Optional)
```css
background: linear-gradient(
  135deg,
  rgba(55, 0, 179, 0.05) 0%,
  rgba(109, 51, 214, 0.05) 100%
);
```

## 📐 Spacing System

```
4px   - Extra small
8px   - Small
12px  - Medium small
16px  - Medium
20px  - Medium large
24px  - Large
32px  - Extra large
40px  - XXL
48px  - XXXL
```

## 🎯 Best Practices

### ✅ DO
- Gunakan shadow untuk depth
- Rounded corners untuk friendly look
- White space yang cukup
- Consistent spacing
- Font weight 600-700 untuk headings
- Subtle gradients

### ❌ DON'T
- Shadow yang terlalu keras
- Sudut tajam (kecuali diperlukan)
- Terlalu banyak warna
- Spacing tidak konsisten
- Text uppercase berlebihan

## 📱 Responsive Design

### Breakpoints
```
xs: 0px      (Mobile)
sm: 600px    (Tablet)
md: 900px    (Desktop)
lg: 1200px   (Large Desktop)
xl: 1536px   (Extra Large)
```

### Mobile First
```jsx
<Box
  sx={{
    p: { xs: 2, sm: 3, md: 4 },  // Padding responsif
    gap: { xs: 1, sm: 2 },       // Gap responsif
  }}
>
```

## 🎨 Custom Components

### Stat Card
```jsx
<Card sx={{ 
  p: 3, 
  borderRadius: '16px',
  boxShadow: '0px 4px 12px rgba(145, 158, 171, 0.16)',
  bgcolor: 'primary.main',
  color: 'primary.contrastText'
}}>
  <Typography variant="h3" fontWeight="700">
    150
  </Typography>
  <Typography variant="body2" sx={{ opacity: 0.8 }}>
    Total Students
  </Typography>
</Card>
```

### Gradient Card
```jsx
<Card sx={{
  background: 'linear-gradient(135deg, #3700b3 0%, #6d33d6 100%)',
  borderRadius: '16px',
  color: 'white',
  p: 3,
}}>
  Content
</Card>
```

### Glassmorphism Card
```jsx
<Paper sx={{
  bgcolor: 'rgba(255, 255, 255, 0.3)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  border: '1px solid rgba(255, 255, 255, 0.3)',
}}>
  Content
</Paper>
```

## 🔧 Implementation

### Theme Setup
```javascript
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  // ... konfigurasi seperti di main.jsx
})
```

### Usage in Components
```jsx
import { useTheme } from '@mui/material/styles'

function MyComponent() {
  const theme = useTheme()
  
  return (
    <Box sx={{ 
      color: theme.palette.primary.main,
      borderRadius: theme.shape.borderRadius,
    }}>
      Content
    </Box>
  )
}
```

## 📊 Before & After

### Before (Default MUI)
- Sharp corners (4px)
- Harsh shadows
- Uppercase buttons
- Generic look

### After (Berry-Inspired)
- Rounded corners (12-16px)
- Soft shadows
- Natural text case
- Modern, friendly appearance

## 🎨 Color Psychology

### Primary (Biru Violet #3700b3)
- Trust
- Professionalism
- Innovation
- Wisdom

### Success (Green #00b578)
- Growth
- Harmony
- Success
- Fresh

### Warning (Orange #ff9800)
- Caution
- Energy
- Enthusiasm
- Creativity

### Error (Red #f44336)
- Urgency
- Importance
- Action required

## 📖 Resources

### Fonts
- [Public Sans - Google Fonts](https://fonts.google.com/specimen/Public+Sans)

### Inspiration
- [Berry React Admin Template](https://mui.com/store/items/berry-react-material-admin-free/)
- [Material Design 3](https://m3.material.io/)

### Tools
- [MUI Theme Creator](https://mui.com/customization/theme-builder/)
- [Shadow Generator](https://shadows.brumm.af/)

## 🎯 Quick Start

1. **Theme sudah dikonfigurasi** di `main.jsx`
2. **Font Public Sans** otomatis diload
3. **Semua komponen** sudah menggunakan style baru
4. **Tinggal pakai** komponen MUI seperti biasa!

```jsx
// Semua ini sudah otomatis Berry-styled!
<Button variant="contained">Save</Button>
<Card>Content</Card>
<TextField label="Input" />
<Paper>Content</Paper>
```

---

**Version**: 1.0  
**Last Updated**: March 2026  
**Design System**: Berry-Inspired

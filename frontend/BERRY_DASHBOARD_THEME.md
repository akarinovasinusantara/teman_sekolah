# 🎨 Berry Dashboard UI Theme

Sistem Manajemen Sekolah - **Exact Berry Dashboard Style** (https://berrydashboard.com/free/)

## ✨ Karakteristik Utama

### 1. **Clean White Design**
- Background putih bersih untuk semua cards
- Shadow yang sangat lembut dan subtle
- Minimalis dan modern

### 2. **Rounded Corners**
```
Buttons:     10px
Inputs:      10px
Cards:       16px
Paper:       16px
Dialogs:     20px
Avatars:     12px
Chips:       8px
Alerts:      12px
Icons:       10px
```

### 3. **Soft Shadows (Elevation)**
```css
/* Card Default */
box-shadow: 0px 4px 12px rgba(145, 158, 171, 0.12);

/* Card Hover */
box-shadow: 0px 8px 16px rgba(145, 158, 171, 0.24);

/* Button Contained */
box-shadow: 0px 4px 8px rgba(145, 158, 171, 0.16);

/* Drawer */
box-shadow: 4px 0px 20px rgba(145, 158, 171, 0.12);

/* AppBar */
box-shadow: 0px 2px 8px rgba(145, 158, 171, 0.1);

/* Dialog */
box-shadow: 0px 20px 48px rgba(145, 158, 171, 0.24);
```

### 4. **Color Palette**

#### Primary - Purple/Violet
```
#3700b3 - Main
#5e35b1 - Lighter
#7c4dff - Light
#ede7f6 - Lightest (background accent)
#281885 - Dark
#1e0082 - Darker
```

#### Status Colors
```
Success: #00b578 (dengan lighter #e6f9f0)
Warning: #ff9800 (dengan lighter #fff8e1)
Error:   #f44336 (dengan lighter #ffebee)
Info:    #2196f3 (dengan lighter #e3f2fd)
```

#### Neutral Greys
```
50:  #f9fafb (Table headers)
100: #f3f4f6 (Hover states)
200: #e5e7eb (Borders)
300: #d1d5db
400: #9ca3af
500: #6b7280 (Secondary text)
600: #4b5563
700: #374151 (Primary text)
800: #1f2937
900: #111827 (Main text)
```

### 5. **Typography - Public Sans**

```javascript
Font Family: 'Public Sans', sans-serif

Weights:
- 300: Light
- 400: Regular
- 500: Medium
- 600: SemiBold (Buttons, Headings)
- 700: Bold (Headings)

Sizes:
h1: 2.5rem (40px)
h2: 2rem (32px)
h3: 1.75rem (28px)
h4: 1.5rem (24px)
h5: 1.25rem (20px)
h6: 1.125rem (18px)
body1: 0.9375rem (15px)
body2: 0.875rem (14px)
```

## 📦 Component Styling

### Buttons
```jsx
// Gradient primary button
background: linear-gradient(135deg, #3700b3 0%, #5e35b1 100%)

// Sizes
Small:  6px 16px,  font-size: 0.8125rem
Medium: 8px 20px,  font-size: 0.875rem
Large:  10px 24px, font-size: 0.9375rem

// Shadow
Default: 0px 4px 8px rgba(145, 158, 171, 0.16)
Hover:   0px 8px 16px rgba(145, 158, 171, 0.32)
```

### Cards
```jsx
<Card sx={{
  borderRadius: '16px',
  boxShadow: '0px 4px 12px rgba(145, 158, 171, 0.12)',
  overflow: 'hidden',
}}>
  <CardContent sx={{ p: 3 }}>
    Content
  </CardContent>
</Card>
```

### Navigation (Sidebar)
```jsx
// List items dengan margin dan rounded
<ListItemButton
  sx={{
    borderRadius: '10px',
    margin: '4px 12px',
    minHeight: '44px',
    '&.Mui-selected': {
      backgroundColor: 'rgba(55, 0, 179, 0.08)',
      color: '#3700b3',
    }
  }}
>
```

### TextFields
```jsx
// Border radius 10px
// Border 2px saat focus
<InputLabel sx={{ fontSize: '0.875rem' }} />
<OutlinedInput
  sx={{
    borderRadius: '10px',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#e5e7eb',
    },
    '&.Mui-focused': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#3700b3',
        borderWidth: '2px',
      },
    },
  }}
/>
```

### Tables
```jsx
// Table head dengan background abu-abu sangat muda
<MuiTableHead sx={{ backgroundColor: '#f9fafb' }} />

// Header cells
<MuiTableCell
  sx={{
    fontWeight: 700,
    fontSize: '0.8125rem',
    color: '#374151',
    backgroundColor: '#f9fafb',
  }}
/>
```

### Alerts
```jsx
// Background colors yang lembut
success: '#e6f9f0' dengan text '#00b578'
error:   '#ffebee' dengan text '#f44336'
warning: '#fff8e1' dengan text '#ff9800'
info:    '#e3f2fd' dengan text '#2196f3'
```

### Chips/Tags
```jsx
<Chip
  sx={{
    borderRadius: '8px',
    fontWeight: 600,
    fontSize: '0.8125rem',
  }}
/>
```

### Dialogs
```jsx
// Rounded corners besar
borderRadius: '20px'
boxShadow: '0px 20px 48px rgba(145, 158, 171, 0.24)'
```

### Avatars
```jsx
// Rounded squares (12px border radius)
<Avatar
  sx={{
    borderRadius: '12px',
    backgroundColor: '#3700b3',
    color: '#ffffff',
    fontWeight: 600,
  }}
/>
```

## 🎨 Background & Layout

### Page Background
```css
background-color: #f0f2f5;
```

### Card Backgrounds
```css
background-color: #ffffff;
```

### Gradient Backgrounds (Optional)
```css
/* Primary Gradient */
background: linear-gradient(135deg, #3700b3 0%, #5e35b1 100%);

/* Light Gradient */
background: linear-gradient(135deg, rgba(55, 0, 179, 0.05) 0%, rgba(94, 53, 177, 0.05) 100%);
```

## 📐 Spacing System

```
4px   - Extra small (0.5 spacing)
8px   - Small (1 spacing)
12px  - Medium small (1.5 spacing)
16px  - Medium (2 spacing)
20px  - Medium large (2.5 spacing)
24px  - Large (3 spacing)
32px  - Extra large (4 spacing)
40px  - XXL (5 spacing)
48px  - XXXL (6 spacing)
```

## 🎯 Best Practices

### ✅ DO (Lakukan)
- Gunakan shadow untuk depth yang subtle
- White space yang generous
- Rounded corners konsisten
- Typography hierarchy yang jelas
- Color palette yang konsisten
- Font weight 600-700 untuk emphasis

### ❌ DON'T (Jangan)
- Shadow yang terlalu keras
- Terlalu banyak warna mencolok
- Border radius tidak konsisten
- Text uppercase berlebihan
- Spacing terlalu sempit
- Contrast yang terlalu rendah

## 📱 Responsive Breakpoints

```
xs: 0px    - Mobile phones
sm: 600px  - Tablets
md: 900px  - Desktops
lg: 1200px - Large desktops
xl: 1536px - Extra large
```

## 🔧 Implementation

### Theme sudah dikonfigurasi di `main.jsx`:
- ✅ 25 level shadows
- ✅ Component style overrides
- ✅ Typography customization
- ✅ Color palette lengkap
- ✅ Google Fonts (Public Sans)
- ✅ Shape/border radius
- ✅ Spacing system

### Cara Pakai

```jsx
// Semua komponen MUI otomatis Berry-styled!

// Buttons
<Button variant="contained">Save</Button>
<Button variant="outlined">Cancel</Button>

// Cards
<Card>
  <CardContent>Content</CardContent>
</Card>

// Forms
<TextField label="Email" />

// Tables
<Table>
  <TableHead>
    <TableRow>
      <TableCell>Header</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow>
      <TableCell>Content</TableCell>
    </TableRow>
  </TableBody>
</Table>

// Navigation
<List>
  <ListItemButton>
    <ListItemIcon>
      <DashboardIcon />
    </ListItemIcon>
    <ListItemText primary="Dashboard" />
  </ListItemButton>
</List>
```

## 🎨 Color Usage Examples

### Primary Actions
```jsx
<Button variant="contained">
  Simpan  // Gradient purple
</Button>
```

### Success States
```jsx
<Alert severity="success">
  Berhasil disimpan!  // Green background
</Alert>
```

### Warning States
```jsx
<Alert severity="warning">
  Periksa kembali!  // Orange background
</Alert>
```

### Error States
```jsx
<Alert severity="error">
  Terjadi kesalahan!  // Red background
</Alert>
```

### Info States
```jsx
<Alert severity="info">
  Informasi penting  // Blue background
</Alert>
```

## 📊 Component Examples

### Stat Card
```jsx
<Card sx={{ p: 3 }}>
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <Box sx={{ flexGrow: 1 }}>
      <Typography color="text.secondary" variant="body2">
        Total Students
      </Typography>
      <Typography variant="h3" fontWeight="700">
        1,234
      </Typography>
    </Box>
    <Box
      sx={{
        width: 56,
        height: 56,
        borderRadius: '12px',
        bgcolor: 'primary.lighter',
        color: 'primary.main',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <PeopleIcon />
    </Box>
  </Box>
</Card>
```

### Gradient Card
```jsx
<Card
  sx={{
    background: 'linear-gradient(135deg, #3700b3 0%, #5e35b1 100%)',
    color: 'white',
    p: 3,
  }}
>
  <Typography variant="h4" fontWeight="700">
    Welcome Back!
  </Typography>
</Card>
```

### Table Card
```jsx
<Card>
  <CardHeader
    title="Recent Orders"
    subheader="Latest transactions"
  />
  <TableContainer>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Order ID</TableCell>
          <TableCell>Customer</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Amount</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {/* rows */}
      </TableBody>
    </Table>
  </TableContainer>
</Card>
```

## 🎯 Key Differences from Default MUI

| Aspect | Default MUI | Berry Dashboard |
|--------|-------------|-----------------|
| Border Radius | 4px | 12-16px |
| Shadows | Harsh | Soft, subtle |
| Buttons | Uppercase | Natural case |
| Font | Roboto | Public Sans |
| Colors | Bold | Muted, pastel |
| Spacing | Compact | Generous |
| Cards | Sharp | Rounded |

## 📖 Resources

### Official Berry Dashboard
- [Website](https://berrydashboard.com/free/)
- [MUI Store](https://mui.com/store/items/berry-react-material-admin-free/)

### Fonts
- [Public Sans - Google Fonts](https://fonts.google.com/specimen/Public+Sans)

### Tools
- [MUI Theme Builder](https://mui.com/customization/theme-builder/)
- [Shadow Generator](https://shadows.brumm.af/)
- [Color Palette Generator](https://coolors.co/)

## 🚀 Quick Start

1. **Theme sudah siap** di `main.jsx`
2. **Font Public Sans** otomatis diload
3. **Semua komponen** sudah styled
4. **Tinggal pakai** seperti biasa!

```jsx
// It's that simple!
<Card>
  <CardContent>
    <Typography>Berry Dashboard Style!</Typography>
  </CardContent>
</Card>
```

---

**Version**: 2.0 - Exact Berry Dashboard Match  
**Last Updated**: March 2026  
**Reference**: https://berrydashboard.com/free/  
**Theme**: Light Mode

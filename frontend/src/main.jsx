import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

/**
 * =============================================
 * MAIN ENTRY POINT - APLIKASI TEMAN SEKOLAH
 * =============================================
 * 
 * File: /frontend/src/main.jsx
 * 
 * Deskripsi:
 * Entry point utama aplikasi React frontend.
 * Menginisialisasi dan me-render aplikasi ke DOM.
 * 
 * Konfigurasi:
 * - Material-UI Theme (custom theme)
 * - Google Fonts (Public Sans)
 * - CSS Baseline (reset & normalize)
 * - React Strict Mode
 */

/**
 * =============================================
 * CUSTOM THEME - MATERIAL UI
 * =============================================
 * 
 * Tema kustom untuk aplikasi Teman Sekolah
 * dengan desain modern dan konsisten.
 * 
 * Warna Utama:
 * - Primary: #3700b3 (Ungu/Biru tua)
 * - Secondary: #ff9800 (Oranye)
 * - Success: #00b578 (Hijau)
 * - Error: #f44336 (Merah)
 * - Warning: #ff9800 (Oranye)
 * - Info: #2196f3 (Biru)
 * 
 * Font:
 * - Public Sans (Google Fonts)
 * - Fallback: Roboto, Helvetica, Arial
 */
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3700b3',
      lighter: '#5e35b1',
      light: '#7c4dff',
      lightest: '#ede7f6',
      dark: '#281885',
      darker: '#1e0082',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ff9800',
      light: '#ffb74d',
      dark: '#f57c00',
      contrastText: '#ffffff',
    },
    success: {
      main: '#00b578',
      light: '#33c68f',
      dark: '#008f5e',
      lighter: '#e6f9f0',
    },
    warning: {
      main: '#ff9800',
      light: '#ffb74d',
      dark: '#f57c00',
      lighter: '#fff8e1',
    },
    error: {
      main: '#f44336',
      light: '#e57373',
      dark: '#d32f2f',
      lighter: '#ffebee',
    },
    info: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2',
      lighter: '#e3f2fd',
    },
    grey: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
    background: {
      default: '#f0f2f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#111827',
      secondary: '#6b7280',
      disabled: '#9ca3af',
    },
  },
  typography: {
    fontFamily: '"Public Sans", "Roboto", "Helvetica", "Arial", sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
      letterSpacing: '-0.5px',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.25,
      letterSpacing: '-0.5px',
    },
    h3: {
      fontWeight: 700,
      fontSize: '1.75rem',
      lineHeight: 1.3,
      letterSpacing: '-0.3px',
    },
    h4: {
      fontWeight: 700,
      fontSize: '1.5rem',
      lineHeight: 1.35,
      letterSpacing: '-0.2px',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: 1.45,
    },
    subtitle1: {
      fontWeight: 600,
      fontSize: '1rem',
    },
    subtitle2: {
      fontWeight: 600,
      fontSize: '0.875rem',
    },
    body1: {
      fontSize: '0.9375rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
      letterSpacing: '0.3px',
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 500,
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
    },
  },
  shape: {
    borderRadius: 12,
    borderRadiusSm: 8,
    borderRadiusMd: 16,
    borderRadiusLg: 24,
  },
  // Custom shadows untuk elevation 1-24
  shadows: [
    'none',
    '0px 2px 4px rgba(145, 158, 171, 0.1)',
    '0px 4px 8px rgba(145, 158, 171, 0.12)',
    '0px 6px 12px rgba(145, 158, 171, 0.14)',
    '0px 8px 16px rgba(145, 158, 171, 0.16)',
    '0px 10px 20px rgba(145, 158, 171, 0.18)',
    '0px 12px 24px rgba(145, 158, 171, 0.2)',
    '0px 14px 28px rgba(145, 158, 171, 0.22)',
    '0px 16px 32px rgba(145, 158, 171, 0.24)',
    '0px 18px 36px rgba(145, 158, 171, 0.26)',
    '0px 20px 40px rgba(145, 158, 171, 0.28)',
    '0px 22px 44px rgba(145, 158, 171, 0.3)',
    '0px 24px 48px rgba(145, 158, 171, 0.32)',
    '0px 26px 52px rgba(145, 158, 171, 0.34)',
    '0px 28px 56px rgba(145, 158, 171, 0.36)',
    '0px 30px 60px rgba(145, 158, 171, 0.38)',
    '0px 32px 64px rgba(145, 158, 171, 0.4)',
    '0px 34px 68px rgba(145, 158, 171, 0.42)',
    '0px 36px 72px rgba(145, 158, 171, 0.44)',
    '0px 38px 76px rgba(145, 158, 171, 0.46)',
    '0px 40px 80px rgba(145, 158, 171, 0.48)',
    '0px 42px 84px rgba(145, 158, 171, 0.5)',
    '0px 44px 88px rgba(145, 158, 171, 0.52)',
    '0px 46px 92px rgba(145, 158, 171, 0.54)',
    '0px 48px 96px rgba(145, 158, 171, 0.56)',
  ],
  spacing: 8,
  // Custom styling untuk komponen Material-UI
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: false,
      },
      styleOverrides: {
        root: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 4px 8px rgba(145, 158, 171, 0.24)',
          },
        },
        contained: {
          boxShadow: '0px 4px 8px rgba(145, 158, 171, 0.16)',
          '&:hover': {
            boxShadow: '0px 8px 16px rgba(145, 158, 171, 0.32)',
          },
        },
        sizeSmall: {
          padding: '6px 16px',
          fontSize: '0.8125rem',
        },
        sizeMedium: {
          padding: '8px 20px',
          fontSize: '0.875rem',
        },
        sizeLarge: {
          padding: '10px 24px',
          fontSize: '0.9375rem',
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #3700b3 0%, #5e35b1 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #4B00D1 0%, #3700b3 100%)',
          },
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#ffffff',
        },
        elevation1: {
          boxShadow: '0px 4px 12px rgba(145, 158, 171, 0.12)',
        },
        elevation10: {
          boxShadow: '0px 16px 32px rgba(145, 158, 171, 0.2)',
        },
        rounded: {
          borderRadius: '16px',
        },
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0px 4px 12px rgba(145, 158, 171, 0.12)',
          overflow: 'hidden',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '10px',
            '&:hover': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#3700b3',
              },
            },
            '&.Mui-focused': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#3700b3',
                borderWidth: '2px',
              },
            },
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
          margin: '4px 12px',
          minHeight: '44px',
          '&.Mui-selected': {
            backgroundColor: 'rgba(55, 0, 179, 0.08)',
            color: '#3700b3',
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          backgroundColor: '#3700b3',
          color: '#ffffff',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          padding: '12px 16px',
        },
      },
    },
  },
})

// Import Google Font - Public Sans
const fontLink = document.createElement('link')
fontLink.href = 'https://fonts.googleapis.com/css2?family=Public+Sans:wght@300;400;500;600;700&display=swap'
fontLink.rel = 'stylesheet'
document.head.appendChild(fontLink)

/**
 * =============================================
 * RENDER APLIKASI
 * =============================================
 * 
 * Me-render komponen App ke dalam elemen #root
 * 
 * Wrapper:
 * - React.StrictMode: Mode development dengan warning tambahan
 * - StyledEngineProvider: Inject MUI styles first
 * - ThemeProvider: Menyediakan theme ke semua komponen
 * - CssBaseline: Reset & normalize CSS
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>,
)

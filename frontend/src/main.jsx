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
 * Role: Semua role
 */

/**
 * Custom Theme - Material UI
 * 
 * Tema kustom dengan warna primary ungu/biru
 * sesuai branding Teman Sekolah.
 */
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3700b3',
      light: '#7c4dff',
      dark: '#281885',
    },
    secondary: {
      main: '#ff9800',
    },
    success: {
      main: '#00b578',
    },
    error: {
      main: '#f44336',
    },
    warning: {
      main: '#ff9800',
    },
    info: {
      main: '#2196f3',
    },
    background: {
      default: '#f0f2f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Public Sans", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #3700b3 0%, #5e35b1 100%)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0px 4px 12px rgba(145, 158, 171, 0.12)',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          margin: '4px 12px',
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
          borderRadius: 12,
          backgroundColor: '#3700b3',
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
 * Render Aplikasi
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

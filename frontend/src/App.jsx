import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { AuthProvider } from './context/AuthContext'
import AppRoutes from './routes/AppRoutes'
import { appTheme } from './theme'

/**
 * =============================================
 * KOMPONEN UTAMA APLIKASI
 * =============================================
 * 
 * Komponen: App
 * File: /frontend/src/App.jsx
 * 
 * Deskripsi:
 * Root component aplikasi Teman Sekolah.
 * Mengelola routing utama melalui AppRoutes dan membungkus aplikasi dengan provider.
 */
function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App

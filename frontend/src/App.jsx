import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import AppRoutes from './routes/AppRoutes'

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
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App

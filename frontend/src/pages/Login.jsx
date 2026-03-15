import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../App'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import SchoolIcon from '@mui/icons-material/School'
import InputAdornment from '@mui/material/InputAdornment'
import PersonIcon from '@mui/icons-material/Person'
import LockIcon from '@mui/icons-material/Lock'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

/**
 * =============================================
 * HALAMAN LOGIN
 * =============================================
 * 
 * Komponen: Login
 * File: /frontend/src/pages/Login.jsx
 * 
 * Deskripsi:
 * Halaman login untuk masuk ke sistem Teman Sekolah.
 * 
 * Role: Semua role (super_admin, tu, guru, ortu, siswa)
 * Route: /login
 * 
 * Akun Demo:
 * - super_admin: yayasan_sejahtera / admin123
 * - tu: tu_admin / tu123
 * - guru: guru_budi / guru123
 * - ortu: ortu_ahmad / ortu123
 * - siswa: siswa_ahmad / siswa123
 */

// Data dummy untuk simulasi login
const dummyUsers = [
  { user_id: '001', username: 'yayasan_sejahtera', password: 'admin123', role: 'super_admin', nama_lengkap: 'Yayasan Sejahtera' },
  { user_id: '002', username: 'tu_admin', password: 'tu123', role: 'tu', nama_lengkap: 'Staf Tata Usaha' },
  { user_id: '003', username: 'guru_budi', password: 'guru123', role: 'guru', nama_lengkap: 'Budi Santoso, S.Pd' },
  { user_id: '004', username: 'ortu_ahmad', password: 'ortu123', role: 'ortu', nama_lengkap: 'Orang Tua Ahmad' },
  { user_id: '005', username: 'siswa_ahmad', password: 'siswa123', role: 'siswa', nama_lengkap: 'Ahmad Rizky' },
]

/**
 * Komponen Login
 */
export default function Login() {
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(900))
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    setTimeout(() => {
      const user = dummyUsers.find(
        (u) => u.username === username && u.password === password
      )

      if (user) {
        login({
          user_id: user.user_id,
          username: user.username,
          role: user.role,
          nama_lengkap: user.nama_lengkap,
        })

        // Redirect berdasarkan role
        switch (user.role) {
          case 'super_admin':
            navigate('/super-admin')
            break
          case 'tu':
            navigate('/tu')
            break
          case 'guru':
            navigate('/guru')
            break
          case 'ortu':
            navigate('/ortu')
            break
          case 'siswa':
            navigate('/siswa')
            break
          default:
            navigate('/login')
        }
      } else {
        setError('Username atau password salah')
      }
      setLoading(false)
    }, 500)
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        backgroundImage: `
          linear-gradient(135deg, rgba(55, 0, 179, 0.85) 0%, rgba(109, 51, 214, 0.85) 100%),
          url('/images/backgrounds/sc_bg.jpg')
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        py: { xs: 4, sm: 0 },
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={isMobile ? 0 : 10}
          sx={{
            p: { xs: 3, sm: 4, md: 5 },
            borderRadius: { xs: 0, sm: 2 },
            bgcolor: '#ffffff',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
            <SchoolIcon
              sx={{
                fontSize: { xs: 48, sm: 56, md: 64 },
                color: 'primary.main',
                mb: 2
              }}
            />
            <Typography
              variant="h4"
              component="h1"
              fontWeight="bold"
              gutterBottom
              sx={{
                fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
              }}
            >
              Teman Sekolah
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                textAlign: 'center',
              }}
            >
              Sistem Manajemen Sekolah Terpadu
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? 'Memproses...' : 'Login'}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}

/**
 * =============================================
 * DASHBOARD ORANG TUA
 * =============================================
 * 
 * Komponen: OrtuDashboard
 * File: /frontend/src/pages/ortu/Dashboard.jsx
 * 
 * Deskripsi:
 * Halaman dashboard utama untuk Orang Tua/Wali.
 * Menampilkan ringkasan informasi anak (keuangan, kehadiran, nilai).
 * 
 * Fitur:
 * - Informasi anak
 * - Tagihan terbaru
 * - Rekap kehadiran
 * - Nilai terbaru
 * - Quick access menu
 * 
 * Role: Orang Tua
 * Route: /ortu
 */

import { useContext } from 'react'
import { useAuth } from '../../../hooks/useAuth'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import PaymentIcon from '@mui/icons-material/Payment'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import AssessmentIcon from '@mui/icons-material/Assessment'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

/**
 * Komponen Dashboard Orang Tua
 * 
 * @component
 * @returns {JSX.Element} Halaman dashboard orang tua
 */
export default function OrtuDashboard() {
  const { user } = useAuth()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(900))

  return (
    <Box sx={{ width: '100%', maxWidth: '100%', overflow: 'hidden' }}>
      {/* Header */}
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Dashboard Orang Tua
      </Typography>
      
      <Typography variant="body1" color="text.secondary" gutterBottom sx={{ mb: 4 }}>
        Selamat datang, {user?.nama_lengkap}
      </Typography>

      {/* Informasi Anak */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Informasi Anak
        </Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="body2" color="text.secondary">
              Nama Siswa
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              Ahmad Rizky
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="body2" color="text.secondary">
              Kelas
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              X-A
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="body2" color="text.secondary">
              NIS
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              12345
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="body2" color="text.secondary">
              Wali Kelas
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              Budi Santoso, S.Pd
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Menu Quick Access */}
      <Grid container spacing={2}>
        {/* Tagihan */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <PaymentIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Tagihan
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Lihat dan bayar tagihan SPP
              </Typography>
              <Button variant="contained" fullWidth href="/ortu/pembayaran">
                Lihat Tagihan
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Kehadiran */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <CheckCircleIcon sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Kehadiran
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Monitoring kehadiran siswa
              </Typography>
              <Button variant="outlined" fullWidth href="/ortu/kehadiran">
                Lihat Kehadiran
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Nilai */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <AssessmentIcon sx={{ fontSize: 48, color: 'warning.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Nilai
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Lihat nilai dan rapor
              </Typography>
              <Button variant="outlined" fullWidth href="/ortu/hasil-belajar">
                Lihat Nilai
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

/**
 * =============================================
 * LAPORAN KEUANGAN - SUPER ADMIN
 * =============================================
 * 
 * Komponen: LaporanKeuangan
 * File: /frontend/src/pages/super-admin/LaporanKeuangan.jsx
 * 
 * Deskripsi:
 * Halaman untuk melihat laporan keuangan total dari semua sekolah.
 * Menampilkan ringkasan pemasukan, pengeluaran, dan saldo bersih.
 * 
 * Fitur:
 * - Kartu statistik keuangan (Pemasukan, Pengeluaran, Saldo)
 * - Tabel pemasukan terbaru
 * - Tabel tagihan belum dibayar (tunggakan)
 * - Status pembayaran dengan warna kondisional
 * 
 * Role: Super Admin only
 * Route: /super-admin/keuangan
 */

import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

/**
 * Komponen Laporan Keuangan
 * 
 * @component
 * @returns {JSX.Element} Halaman laporan keuangan
 */
export default function LaporanKeuangan() {
  // Hook untuk responsive design
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(900))

  return (
    <Box>
      {/* Judul halaman */}
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        sx={{ fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' } }}
      >
        Laporan Keuangan
      </Typography>

      {/* Container 3 Kartu Statistik Keuangan */}
      <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: 3 }}>
        {/* Kartu 1: Total Pemasukan */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Typography
                color="text.secondary"
                variant="body2"
                sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
              >
                Total Pemasukan Bulan Ini
              </Typography>
              <Typography
                variant="h4"
                color="success.main"
                fontWeight="bold"
                sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' } }}
              >
                Rp 450.000.000
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Kartu 2: Total Pengeluaran */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Typography
                color="text.secondary"
                variant="body2"
                sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
              >
                Total Pengeluaran Bulan Ini
              </Typography>
              <Typography
                variant="h4"
                color="error.main"
                fontWeight="bold"
                sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' } }}
              >
                Rp 125.000.000
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Kartu 3: Saldo Bersih */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Typography
                color="text.secondary"
                variant="body2"
                sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
              >
                Saldo Bersih
              </Typography>
              <Typography
                variant="h4"
                color="primary.main"
                fontWeight="bold"
                sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' } }}
              >
                Rp 325.000.000
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabel Pemasukan Terbaru */}
      <Paper sx={{ mb: 3 }}>
        <Typography
          variant="h6"
          sx={{
            p: { xs: 2, sm: 3 },
            borderBottom: 1,
            borderColor: 'divider',
            fontSize: { xs: '1rem', sm: '1.125rem' },
          }}
        >
          Pemasukan Terbaru
        </Typography>
        
        <TableContainer>
          <Table>
            {/* Header kolom */}
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}>Tanggal</TableCell>
                <TableCell sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}>Sekolah</TableCell>
                <TableCell sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}>Keterangan</TableCell>
                <TableCell align="right" sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}>Jumlah</TableCell>
              </TableRow>
            </TableHead>
            
            {/* Data pemasukan */}
            <TableBody>
              {[
                { tanggal: '15 Mar 2026', sekolah: 'SMA Negeri 1 Jakarta', keterangan: 'Pembayaran SPP Maret', jumlah: 'Rp 75.000.000' },
                { tanggal: '14 Mar 2026', sekolah: 'SMP Harapan Bangsa', keterangan: 'Pembayaran SPP Maret', jumlah: 'Rp 50.000.000' },
                { tanggal: '14 Mar 2026', sekolah: 'SMK Merdeka', keterangan: 'Pembayaran SPP Maret', jumlah: 'Rp 65.000.000' },
                { tanggal: '13 Mar 2026', sekolah: 'SD Tunas Muda', keterangan: 'Biaya Pendaftaran', jumlah: 'Rp 25.000.000' },
              ].map((item, index) => (
                <TableRow key={index} hover>
                  <TableCell sx={{ fontSize: '0.875rem' }}>{item.tanggal}</TableCell>
                  <TableCell sx={{ fontSize: '0.875rem' }}>{item.sekolah}</TableCell>
                  <TableCell sx={{ fontSize: '0.875rem' }}>{item.keterangan}</TableCell>
                  <TableCell 
                    align="right" 
                    sx={{ 
                      color: 'success.main', 
                      fontWeight: 'bold', 
                      fontSize: '0.875rem' 
                    }}
                  >
                    {item.jumlah}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Tabel Tagihan Belum Dibayar (Tunggakan) */}
      <Paper>
        <Typography
          variant="h6"
          sx={{
            p: { xs: 2, sm: 3 },
            borderBottom: 1,
            borderColor: 'divider',
            fontSize: { xs: '1rem', sm: '1.125rem' },
          }}
        >
          Tagihan Belum Dibayar (Tunggakan)
        </Typography>
        
        <TableContainer>
          <Table>
            {/* Header kolom */}
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}>Sekolah</TableCell>
                <TableCell sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}>Bulan</TableCell>
                <TableCell sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}>Jatuh Tempo</TableCell>
                <TableCell align="right" sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}>Jumlah</TableCell>
                <TableCell sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}>Status</TableCell>
              </TableRow>
            </TableHead>
            
            {/* Data tunggakan */}
            <TableBody>
              {[
                { sekolah: 'SD Ceria', bulan: 'Maret 2026', tempo: '10 Mar 2026', jumlah: 'Rp 30.000.000', status: 'Belum Bayar' },
                { sekolah: 'MI Al-Hidayah', bulan: 'Maret 2026', tempo: '12 Mar 2026', jumlah: 'Rp 20.000.000', status: 'Belum Bayar' },
              ].map((item, index) => (
                <TableRow key={index} hover>
                  <TableCell sx={{ fontSize: '0.875rem' }}>{item.sekolah}</TableCell>
                  <TableCell sx={{ fontSize: '0.875rem' }}>{item.bulan}</TableCell>
                  <TableCell 
                    sx={{ 
                      color: 'error.main', 
                      fontSize: '0.875rem' 
                    }}
                  >
                    {item.tempo}
                  </TableCell>
                  <TableCell align="right" sx={{ fontSize: '0.875rem' }}>{item.jumlah}</TableCell>
                  <TableCell>
                    {/* Badge status dengan warna error */}
                    <Box
                      component="span"
                      sx={{
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 1,
                        bgcolor: 'error.light',
                        color: 'error.dark',
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                      }}
                    >
                      {item.status}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  )
}

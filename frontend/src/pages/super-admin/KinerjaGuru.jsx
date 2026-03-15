/**
 * =============================================
 * KINERJA GURU - SUPER ADMIN
 * =============================================
 * 
 * Komponen: KinerjaGuru
 * File: /frontend/src/pages/super-admin/KinerjaGuru.jsx
 * 
 * Deskripsi:
 * Halaman untuk memantau kinerja guru dalam mengisi jurnal mengajar.
 * Super Admin dapat melihat statistik dan ranking kinerja guru.
 * 
 * Fitur:
 * - Statistik guru (Total, Rata-rata, Terlambat, Tidak Input)
 * - Ranking kinerja guru bulanan
 * - Progress bar jurnal terisi
 * - Rating bintang untuk setiap guru
 * - Indikator ketepatan waktu dengan warna
 * 
 * Role: Super Admin only
 * Route: /super-admin/kinerja
 */

import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Rating from '@mui/material/Rating'
import LinearProgress from '@mui/material/LinearProgress'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

/**
 * Komponen Kinerja Guru
 * 
 * @component
 * @returns {JSX.Element} Halaman monitoring kinerja guru
 */
export default function KinerjaGuru() {
  // Hook untuk responsive design
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(900))

  return (
    // Container utama
    <Box>
      {/* Judul halaman */}
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        sx={{ fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' } }}
      >
        Kinerja Guru
      </Typography>

      {/* Deskripsi halaman */}
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          mb: 3,
          fontSize: { xs: '0.875rem', sm: '1rem' }
        }}
      >
        Monitoring kinerja guru dalam mengisi jurnal dan aktivitas mengajar
      </Typography>

      {/* Container Statistik - 4 Kartu */}
      <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: 3 }}>
        {/* Kartu 1: Total Guru Aktif */}
        <Grid size={{ xs: 6, md: 3 }}>
          <Paper sx={{ p: { xs: 1.5, sm: 2 }, textAlign: 'center' }}>
            <Typography
              variant="h3"
              color="primary.main"
              fontWeight="bold"
              sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' } }}
            >
              156
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: { xs: '0.65rem', sm: '0.75rem' } }}
            >
              Total Guru Aktif
            </Typography>
          </Paper>
        </Grid>

        {/* Kartu 2: Rata-rata Pengisian Jurnal */}
        <Grid size={{ xs: 6, md: 3 }}>
          <Paper sx={{ p: { xs: 1.5, sm: 2 }, textAlign: 'center' }}>
            <Typography
              variant="h3"
              color="success.main"
              fontWeight="bold"
              sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' } }}
            >
              89%
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: { xs: '0.65rem', sm: '0.75rem' } }}
            >
              Rata-rata Pengisian Jurnal
            </Typography>
          </Paper>
        </Grid>

        {/* Kartu 3: Guru Terlambat Input */}
        <Grid size={{ xs: 6, md: 3 }}>
          <Paper sx={{ p: { xs: 1.5, sm: 2 }, textAlign: 'center' }}>
            <Typography
              variant="h3"
              color="warning.main"
              fontWeight="bold"
              sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' } }}
            >
              12
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: { xs: '0.65rem', sm: '0.75rem' } }}
            >
              Guru Terlambat Input
            </Typography>
          </Paper>
        </Grid>

        {/* Kartu 4: Guru Tidak Input Jurnal */}
        <Grid size={{ xs: 6, md: 3 }}>
          <Paper sx={{ p: { xs: 1.5, sm: 2 }, textAlign: 'center' }}>
            <Typography
              variant="h3"
              color="error.main"
              fontWeight="bold"
              sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' } }}
            >
              5
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: { xs: '0.65rem', sm: '0.75rem' } }}
            >
              Guru Tidak Input Jurnal
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Tabel Ranking Kinerja Guru */}
      <Paper>
        {/* Header tabel */}
        <Typography
          variant="h6"
          sx={{
            p: { xs: 2, sm: 3 },
            borderBottom: 1,
            borderColor: 'divider',
            fontSize: { xs: '1rem', sm: '1.125rem' },
          }}
        >
          Ranking Kinerja Guru Bulan Ini
        </Typography>

        {/* Container tabel */}
        <TableContainer>
          <Table>
            {/* Header kolom tabel */}
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}>Peringkat</TableCell>
                <TableCell sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}>Nama Guru</TableCell>
                <TableCell sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}>Sekolah</TableCell>
                <TableCell align="center" sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}>Jurnal Terisi</TableCell>
                <TableCell align="center" sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}>Ketepatan Waktu</TableCell>
                <TableCell align="center" sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}>Rating</TableCell>
              </TableRow>
            </TableHead>

            {/* Body tabel dengan data guru */}
            <TableBody>
              {[
                { nama: 'Dra. Siti Aminah, M.Pd', sekolah: 'SMA Negeri 1 Jakarta', jurnal: 24, tepat: '95%', rating: 5 },
                { nama: 'Budi Santoso, S.Pd', sekolah: 'SMP Harapan Bangsa', jurnal: 23, tepat: '92%', rating: 4.5 },
                { nama: 'Rina Wati, S.Pd', sekolah: 'SMK Merdeka', jurnal: 22, tepat: '88%', rating: 4 },
                { nama: 'Ahmad Fauzi, S.Pd', sekolah: 'SMA Negeri 1 Jakarta', jurnal: 20, tepat: '85%', rating: 4 },
                { nama: 'Dewi Lestari, S.Pd', sekolah: 'SD Tunas Muda', jurnal: 18, tepat: '80%', rating: 3.5 },
              ].map((guru, index) => (
                <TableRow key={index} hover>
                  {/* Kolom Peringkat dengan badge berwarna untuk top 3 */}
                  <TableCell>
                    <Box
                      sx={{
                        width: { xs: 28, sm: 32 },
                        height: { xs: 28, sm: 32 },
                        borderRadius: '50%',
                        bgcolor: index === 0 ? 'warning.main' : index === 1 ? 'grey.400' : index === 2 ? 'brown.400' : 'transparent',
                        color: index < 3 ? 'white' : 'text.primary',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                      }}
                    >
                      {index + 1}
                    </Box>
                  </TableCell>

                  {/* Kolom Nama Guru */}
                  <TableCell sx={{ fontSize: '0.875rem' }}>{guru.nama}</TableCell>

                  {/* Kolom Sekolah */}
                  <TableCell sx={{ fontSize: '0.875rem' }}>{guru.sekolah}</TableCell>

                  {/* Kolom Jurnal Terisi dengan progress bar */}
                  <TableCell align="center">
                    <LinearProgress
                      variant="determinate"
                      value={(guru.jurnal / 24) * 100}
                      sx={{ width: '100%', height: 8, borderRadius: 1, mb: 0.5 }}
                    />
                    <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>
                      {guru.jurnal}/24
                    </Typography>
                  </TableCell>

                  {/* Kolom Ketepatan Waktu dengan warna kondisional */}
                  <TableCell align="center">
                    <Box
                      component="span"
                      sx={{
                        color: parseInt(guru.tepat) >= 90 ? 'success.main' : parseInt(guru.tepat) >= 80 ? 'warning.main' : 'error.main',
                        fontWeight: 'bold',
                        fontSize: '0.875rem',
                      }}
                    >
                      {guru.tepat}
                    </Box>
                  </TableCell>

                  {/* Kolom Rating dengan komponen star rating */}
                  <TableCell align="center">
                    <Rating 
                      value={guru.rating} 
                      precision={0.5} 
                      readOnly 
                      size="small" 
                    />
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

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

export default function KinerjaGuru() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(900))

  return (
    <Box>
      <Typography 
        variant="h4" 
        fontWeight="bold" 
        gutterBottom
        sx={{ fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' } }}
      >
        Kinerja Guru
      </Typography>
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

      <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: 3 }}>
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
          Ranking Kinerja Guru Bulan Ini
        </Typography>
        <TableContainer>
          <Table>
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
            <TableBody>
              {[
                { nama: 'Dra. Siti Aminah, M.Pd', sekolah: 'SMA Negeri 1 Jakarta', jurnal: 24, tepat: '95%', rating: 5 },
                { nama: 'Budi Santoso, S.Pd', sekolah: 'SMP Harapan Bangsa', jurnal: 23, tepat: '92%', rating: 4.5 },
                { nama: 'Rina Wati, S.Pd', sekolah: 'SMK Merdeka', jurnal: 22, tepat: '88%', rating: 4 },
                { nama: 'Ahmad Fauzi, S.Pd', sekolah: 'SMA Negeri 1 Jakarta', jurnal: 20, tepat: '85%', rating: 4 },
                { nama: 'Dewi Lestari, S.Pd', sekolah: 'SD Tunas Muda', jurnal: 18, tepat: '80%', rating: 3.5 },
              ].map((guru, index) => (
                <TableRow key={index} hover>
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
                  <TableCell sx={{ fontSize: '0.875rem' }}>{guru.nama}</TableCell>
                  <TableCell sx={{ fontSize: '0.875rem' }}>{guru.sekolah}</TableCell>
                  <TableCell align="center">
                    <LinearProgress
                      variant="determinate"
                      value={(guru.jurnal / 24) * 100}
                      sx={{ width: '100%', height: 8, borderRadius: 1, mb: 0.5 }}
                    />
                    <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>{guru.jurnal}/24</Typography>
                  </TableCell>
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
                  <TableCell align="center">
                    <Rating value={guru.rating} precision={0.5} readOnly size="small" />
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

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
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'

export default function LaporanKeuangan() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(900))

  return (
    <Box sx={{ width: '100%', maxWidth: '100%', overflow: 'hidden', pb: 4 }}>
      {/* Premium Dark Slate Header */}
      <Box sx={{
        p: { xs: 3, md: 4 },
        mb: 4,
        borderRadius: 3,
        background: 'linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)',
        color: 'white',
        boxShadow: '0 10px 30px -10px rgba(21, 101, 192, 0.4)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Box sx={{ position: 'relative', zIndex: 2 }}>
          <Typography variant="h4" fontWeight="800" sx={{ mb: 1, fontSize: { xs: '1.75rem', md: '2.125rem' } }}>
            Laporan Keuangan Konsolidasi
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.8, fontWeight: 500 }}>
            Visualisasi agregat omset, pengeluaran, dan saldo bersih seluruh cabang
          </Typography>
        </Box>
        <AccountBalanceIcon sx={{ 
          position: 'absolute', 
          right: -10, 
          top: -30, 
          fontSize: 220, 
          opacity: 0.05,
          transform: 'rotate(5deg)'
        }} />
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider', borderTop: '4px solid #10B981' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography color="text.secondary" variant="body2" fontWeight="700" gutterBottom>Total Pemasukan Bulan Ini</Typography>
              <Typography variant="h4" color="#10B981" fontWeight="800">Rp 450.000.000</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider', borderTop: '4px solid #EF4444' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography color="text.secondary" variant="body2" fontWeight="700" gutterBottom>Total Pengeluaran Operasional</Typography>
              <Typography variant="h4" color="#EF4444" fontWeight="800">Rp 125.000.000</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider', borderTop: '4px solid #3B82F6' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography color="text.secondary" variant="body2" fontWeight="700" gutterBottom>Estimasi Saldo Bersih Bank</Typography>
              <Typography variant="h4" color="#3B82F6" fontWeight="800">Rp 325.000.000</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Grid for Tables: Pemasukan & Tunggakan */}
      <Grid container spacing={4}>
        <Grid item xs={12} lg={6}>
           <Paper elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider', overflow: 'hidden', height: '100%' }}>
            <Box sx={{ p: 2.5, borderBottom: '1px solid', borderColor: 'divider', bgcolor: '#f8fafc' }}>
               <Typography variant="h6" fontWeight="800" color="#0F172A">Log Transaksi Pemasukan Terbaru</Typography>
            </Box>
            
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Waktu Transaksi</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Lembaga Pengirim</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Deskripsi Mutasi</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 700, color: '#475569' }}>Kredit</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[
                    { tanggal: '15 Mar 2026', sekolah: 'SMA Negeri 1 Jakarta', keterangan: 'Pembayaran SPP Kolektif', jumlah: '+ Rp 75 Jt' },
                    { tanggal: '14 Mar 2026', sekolah: 'SMP Harapan Bangsa', keterangan: 'Pembayaran SPP Kolektif', jumlah: '+ Rp 50 Jt' },
                    { tanggal: '14 Mar 2026', sekolah: 'SMK Merdeka', keterangan: 'Pembayaran SPP Kolektif', jumlah: '+ Rp 65 Jt' },
                    { tanggal: '13 Mar 2026', sekolah: 'SD Tunas Muda', keterangan: 'Setup Pendaftaran Baru', jumlah: '+ Rp 25 Jt' },
                  ].map((item, index) => (
                    <TableRow key={index} hover sx={{ '&:last-child td': { border: 0 } }}>
                      <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }}>{item.tanggal}</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>{item.sekolah}</TableCell>
                      <TableCell sx={{ color: 'text.secondary' }}>{item.keterangan}</TableCell>
                      <TableCell align="right" sx={{ color: '#10B981', fontWeight: '800' }}>{item.jumlah}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={6}>
           <Paper elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider', overflow: 'hidden', height: '100%' }}>
            <Box sx={{ p: 2.5, borderBottom: '1px solid', borderColor: 'divider', bgcolor: '#f8fafc' }}>
               <Typography variant="h6" fontWeight="800" color="#0F172A">Rekap Tunggakan Cabang (Outstanding)</Typography>
            </Box>
            
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Sekolah Debit</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Periode Tagih</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Batas Tempo</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 700, color: '#475569' }}>Sisa Debit</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 700, color: '#475569' }}>Warning</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[
                    { sekolah: 'SD Ceria', bulan: 'Maret 2026', tempo: '10 Mar 2026', jumlah: 'Rp 30 Jt', status: 'Warning 1' },
                    { sekolah: 'MI Al-Hidayah', bulan: 'Maret 2026', tempo: '12 Mar 2026', jumlah: 'Rp 20 Jt', status: 'Warning 2' },
                  ].map((item, index) => (
                    <TableRow key={index} hover sx={{ '&:last-child td': { border: 0 } }}>
                      <TableCell sx={{ fontWeight: 700 }}>{item.sekolah}</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>{item.bulan}</TableCell>
                      <TableCell sx={{ color: '#EF4444', fontWeight: 700 }}>{item.tempo}</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 800 }}>{item.jumlah}</TableCell>
                      <TableCell align="center">
                         <Box sx={{ 
                          display: 'inline-flex', px: 1.5, py: 0.5, borderRadius: '50px',
                          bgcolor: 'error.50', color: 'error.700', border: '1px solid', borderColor: 'error.200',
                          fontWeight: 'bold', fontSize: '0.7rem'
                        }}>
                          {item.status}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

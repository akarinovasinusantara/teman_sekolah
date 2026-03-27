import { useState } from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import ReceiptIcon from '@mui/icons-material/Receipt'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import QrCodeIcon from '@mui/icons-material/QrCode'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import CloseIcon from '@mui/icons-material/Close'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

const tagihanData = [
  { id: 'SPP001', nis: '12345', nama: 'Ahmad Rizky', kelas: 'X-A', bulan: 'Maret 2026', jumlah: 'Rp 500.000', status: 'Belum Bayar' },
  { id: 'SPP002', nis: '12346', nama: 'Siti Nurhaliza', kelas: 'X-B', bulan: 'Maret 2026', jumlah: 'Rp 500.000', status: 'Lunas' },
  { id: 'SPP003', nis: '12347', nama: 'Budi Pratama', kelas: 'XI-A', bulan: 'Maret 2026', jumlah: 'Rp 500.000', status: 'Belum Bayar' },
  { id: 'SPP004', nis: '12348', nama: 'Dewi Lestari', kelas: 'XI-B', bulan: 'Maret 2026', jumlah: 'Rp 500.000', status: 'Lunas' },
  { id: 'SPP005', nis: '12349', nama: 'Fatimah Azzahra', kelas: 'XII-A', bulan: 'Maret 2026', jumlah: 'Rp 500.000', status: 'Belum Bayar' },
]

export default function KeuanganSPP() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(900))
  const [open, setOpen] = useState(false)
  const [selectedTagihan, setSelectedTagihan] = useState(null)

  return (
    <Box sx={{ width: '100%', maxWidth: '100%', overflow: 'hidden', pb: 4 }}>
      {/* Premium Header */}
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
            Keuangan & Penagihan SPP
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9, fontWeight: 500 }}>
            Kelola transaksi masuk dan status pembayaran tunggakan peserta didik
          </Typography>
        </Box>
        <AccountBalanceWalletIcon sx={{ 
          position: 'absolute', 
          right: -10, 
          top: -30, 
          fontSize: 220, 
          opacity: 0.1,
          transform: 'rotate(-5deg)'
        }} />
      </Box>

      {/* Modern Stat Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider', p: 1 }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary" fontWeight="700" gutterBottom>Total Tagihan Bulan Ini</Typography>
              <Typography variant="h4" fontWeight="800" color="primary.main">Rp 250 Juta</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider', p: 1 }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary" fontWeight="700" gutterBottom>Sudah Terbayar / Lunas</Typography>
              <Typography variant="h4" fontWeight="800" color="success.main">Rp 175 Juta</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider', p: 1 }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary" fontWeight="700" gutterBottom>Outstanding / Belum Bayar</Typography>
              <Typography variant="h4" fontWeight="800" color="error.main">Rp 75 Juta</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider', overflow: 'hidden' }}>
        {/* Toolbar */}
        <Box sx={{ p: { xs: 2.5, md: 3 }, borderBottom: '1px solid', borderColor: 'divider', bgcolor: '#f8fafc', display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField size="small" placeholder="Cari NIS / Nama Siswa..." sx={{ width: { xs: '100%', sm: 300 }, '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: 'white' } }} />
          <TextField size="small" select SelectProps={{ native: true }} sx={{ minWidth: 150, '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: 'white' } }}>
            <option value="">Semua Kelas</option>
            <option value="X-A">X-A</option>
            <option value="X-B">X-B</option>
          </TextField>
          <TextField size="small" select SelectProps={{ native: true }} sx={{ minWidth: 150, '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: 'white' } }}>
            <option value="">Semua Status</option>
            <option value="Lunas">Lunas</option>
            <option value="Belum Bayar">Belum Bayar</option>
          </TextField>
          <Button variant="contained" startIcon={<SearchIcon />} sx={{ borderRadius: 2, fontWeight: 600, px: 3 }}>
            Cari Data
          </Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'transparent' }}>
                <TableCell width="50" sx={{ fontWeight: 700, color: 'text.secondary', borderBottom: '2px solid', borderColor: 'grey.200' }}>No</TableCell>
                <TableCell sx={{ fontWeight: 700, color: 'text.secondary', borderBottom: '2px solid', borderColor: 'grey.200' }}>NIS</TableCell>
                <TableCell sx={{ fontWeight: 700, color: 'text.secondary', borderBottom: '2px solid', borderColor: 'grey.200' }}>Nama Pihak</TableCell>
                <TableCell sx={{ fontWeight: 700, color: 'text.secondary', borderBottom: '2px solid', borderColor: 'grey.200' }}>Kelas</TableCell>
                <TableCell sx={{ fontWeight: 700, color: 'text.secondary', borderBottom: '2px solid', borderColor: 'grey.200' }}>Periode / Bulan</TableCell>
                <TableCell sx={{ fontWeight: 700, color: 'text.secondary', borderBottom: '2px solid', borderColor: 'grey.200' }}>Nominal</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700, color: 'text.secondary', borderBottom: '2px solid', borderColor: 'grey.200' }}>Status Mutasi</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700, color: 'text.secondary', borderBottom: '2px solid', borderColor: 'grey.200' }}>Opsi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tagihanData.map((row, index) => (
                <TableRow key={row.id} hover sx={{ '&:last-child td': { border: 0 }, transition: 'background-color 0.2s' }}>
                  <TableCell sx={{ fontWeight: 600 }}>{index + 1}</TableCell>
                  <TableCell sx={{ color: 'text.secondary', fontWeight: 500 }}>{row.nis}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{row.nama}</TableCell>
                  <TableCell><Box sx={{ bgcolor: 'grey.100', px: 1, py: 0.5, borderRadius: 1, display: 'inline-block', fontSize: '0.75rem', fontWeight: 'bold' }}>{row.kelas}</Box></TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>{row.bulan}</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: 'text.primary' }}>{row.jumlah}</TableCell>
                  <TableCell align="center">
                    <Box sx={{ 
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        px: 2, py: 0.5, borderRadius: '50px',
                        bgcolor: row.status === 'Lunas' ? 'success.50' : 'error.50',
                        color: row.status === 'Lunas' ? 'success.700' : 'error.700',
                        border: '1px solid',
                        borderColor: row.status === 'Lunas' ? 'success.200' : 'error.200',
                        fontWeight: 'bold', fontSize: '0.75rem', minWidth: 90
                      }}>
                        {row.status}
                      </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                      <IconButton size="small" color="primary" sx={{ bgcolor: 'primary.50' }} onClick={() => { setSelectedTagihan(row); setOpen(true) }}>
                        <ReceiptIcon fontSize="small" />
                      </IconButton>
                      {row.status === 'Belum Bayar' && (
                        <IconButton size="small" color="success" sx={{ bgcolor: 'success.50' }}>
                          <QrCodeIcon fontSize="small" />
                        </IconButton>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Payment Modal */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle sx={{ fontWeight: '800', borderBottom: '1px solid', borderColor: 'divider', pb: 2, pt: 3, px: 4 }}>
          Detail Pembayaran & Invoice
          <IconButton onClick={() => setOpen(false)} sx={{ position: 'absolute', right: 16, top: 16 }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed', borderColor: 'grey.300', pb: 1 }}>
              <Typography variant="body2" color="text.secondary" fontWeight="600">ID Invoice</Typography>
              <Typography variant="body2" fontWeight="800">{selectedTagihan?.id}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed', borderColor: 'grey.300', pb: 1 }}>
              <Typography variant="body2" color="text.secondary" fontWeight="600">Siswa Tertagih</Typography>
              <Typography variant="body2" fontWeight="800" color="primary.main">{selectedTagihan?.nama}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed', borderColor: 'grey.300', pb: 1 }}>
              <Typography variant="body2" color="text.secondary" fontWeight="600">Rombel / Kelas</Typography>
              <Typography variant="body2" fontWeight="800">{selectedTagihan?.kelas}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed', borderColor: 'grey.300', pb: 1 }}>
              <Typography variant="body2" color="text.secondary" fontWeight="600">Periode</Typography>
              <Typography variant="body2" fontWeight="800">{selectedTagihan?.bulan}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', bgcolor: '#f8fafc', p: 2, borderRadius: 2, mt: 1 }}>
              <Typography variant="subtitle1" fontWeight="800">Total Nominal</Typography>
              <Typography variant="h5" fontWeight="800" color="error.main">{selectedTagihan?.jumlah}</Typography>
            </Box>

            {selectedTagihan?.status === 'Belum Bayar' && (
              <Box sx={{ mt: 2, p: 3, bgcolor: '#F1F9EE', borderRadius: 2, border: '1px solid', borderColor: '#A5D6A7', textAlign: 'center' }}>
                <QrCodeIcon sx={{ fontSize: 120, mb: 1, color: '#2E7D32' }} />
                <Typography variant="body2" fontWeight="700" color="#1B5E20">Scan QRIS Untuk Melunaskan Invoice</Typography>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, px: 4, bgcolor: '#f8fafc', borderTop: '1px solid', borderColor: 'divider' }}>
          <Button onClick={() => setOpen(false)} sx={{ fontWeight: 600 }}>Tutup</Button>
          {selectedTagihan?.status === 'Belum Bayar' ? (
            <Button variant="contained" color="success" sx={{ fontWeight: 600, px: 3, borderRadius: 2 }}>Tandai Sudah Dibayar</Button>
          ) : (
            <Button variant="outlined" startIcon={<ReceiptIcon />} sx={{ fontWeight: 600, px: 3, borderRadius: 2 }}>Cetak Bukti Pembayaran</Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  )
}

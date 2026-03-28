import { useState, useEffect } from 'react'
import { useAuth } from '../../../hooks/useAuth'
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
import CustomDialog from '../../../components/common/CustomDialog'
import QrCodeIcon from '@mui/icons-material/QrCode'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import CloseIcon from '@mui/icons-material/Close'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

export default function KeuanganSPP() {
  const { user } = useAuth()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(900))
  
  const [open, setOpen] = useState(false)
  const [selectedTagihan, setSelectedTagihan] = useState(null)
  const [transactions, setTransactions] = useState([])
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const getHeaders = () => {
    const savedUser = JSON.parse(localStorage.getItem('user'))
    return {
      'Content-Type': 'application/json',
      ...(savedUser?.token ? { Authorization: `Bearer ${savedUser.token}` } : {})
    }
  }

  const fetchData = async () => {
    try {
      setLoading(true)
      const [transRes, summaryRes] = await Promise.all([
        fetch('http://localhost:5000/api/keuangan', { headers: getHeaders() }),
        fetch('http://localhost:5000/api/keuangan/summary/total', { headers: getHeaders() })
      ])

      const transData = await transRes.json()
      const summaryData = await summaryRes.json()

      if (transData.success) setTransactions(transData.data)
      if (summaryData.success) setSummary(summaryData.data)
    } catch (err) {
      setError('Gagal memuat data keuangan')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleConfirmPayment = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/keuangan/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({ status: 'Lunas' })
      })
      const data = await res.json()
      if (data.success) {
        alert('Pembayaran berhasil dikonfirmasi')
        setOpen(false)
        fetchData()
      } else {
        alert(data.message || 'Gagal memproses pembayaran')
      }
    } catch (err) {
      alert('Kesalahan jaringan saat memproses pembayaran')
    }
  }

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val || 0)
  }

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
              <Typography variant="body2" color="text.secondary" fontWeight="700" gutterBottom>Total Tagihan</Typography>
              <Typography variant="h4" fontWeight="800" color="primary.main">{loading ? '...' : formatCurrency(summary?.total)}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider', p: 1 }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary" fontWeight="700" gutterBottom>Sudah Terbayar / Lunas</Typography>
              <Typography variant="h4" fontWeight="800" color="success.main">{loading ? '...' : formatCurrency(summary?.lunas)}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider', p: 1 }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary" fontWeight="700" gutterBottom>Outstanding / Belum Bayar</Typography>
              <Typography variant="h4" fontWeight="800" color="error.main">{loading ? '...' : formatCurrency(summary?.belum_bayar)}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider', overflow: 'hidden', position: 'relative' }}>
        {loading && (
          <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, bgcolor: 'rgba(255,255,255,0.7)', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h6" fontWeight="bold">Memuat Data...</Typography>
          </Box>
        )}
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
            <option value="Belum_Bayar">Belum Bayar</option>
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
              {transactions.map((row, index) => (
                <TableRow key={row.id} hover sx={{ '&:last-child td': { border: 0 }, transition: 'background-color 0.2s' }}>
                  <TableCell sx={{ fontWeight: 600 }}>{index + 1}</TableCell>
                  <TableCell sx={{ color: 'text.secondary', fontWeight: 500 }}>{row.siswa?.nis}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{row.siswa?.nama_lengkap}</TableCell>
                  <TableCell><Box sx={{ bgcolor: 'grey.100', px: 1, py: 0.5, borderRadius: 1, display: 'inline-block', fontSize: '0.75rem', fontWeight: 'bold' }}>-</Box></TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>{row.bulan} {row.tahun}</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: 'text.primary' }}>{formatCurrency(row.jumlah)}</TableCell>
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
                        {row.status.replace('_', ' ')}
                      </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                      <IconButton size="small" color="primary" sx={{ bgcolor: 'primary.50' }} onClick={() => { setSelectedTagihan(row); setOpen(true) }}>
                        <ReceiptIcon fontSize="small" />
                      </IconButton>
                      {row.status === 'Belum_Bayar' && (
                        <IconButton size="small" color="success" sx={{ bgcolor: 'success.50' }} onClick={() => handleConfirmPayment(row.id)}>
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
      <CustomDialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        title="Detail Pembayaran & Invoice"
        actions={
          <>
            <Button onClick={() => setOpen(false)} sx={{ fontWeight: 600 }}>Tutup</Button>
            {selectedTagihan?.status === 'Belum Bayar' ? (
              <Button variant="contained" color="success" sx={{ fontWeight: 600, px: 3, borderRadius: 2 }}>Tandai Sudah Dibayar</Button>
            ) : (
              <Button variant="outlined" startIcon={<ReceiptIcon />} sx={{ fontWeight: 600, px: 3, borderRadius: 2 }}>Cetak Bukti Pembayaran</Button>
            )}
          </>
        }
      >
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
      </CustomDialog>
    </Box>
  )
}

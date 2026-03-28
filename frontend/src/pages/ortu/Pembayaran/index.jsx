import { useState } from 'react'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import CustomDialog from '../../../components/common/CustomDialog'
import QrCodeIcon from '@mui/icons-material/QrCode'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import Alert from '@mui/material/Alert'
import PaymentIcon from '@mui/icons-material/Payment'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'

const tagihanData = [
  { id: 'SPP001', bulan: 'Maret 2026', jenis: 'SPP', jumlah: 'Rp 500.000', jatuhTempo: '10 Mar 2026', status: 'Belum Bayar' },
  { id: 'SPP002', bulan: 'Februari 2026', jenis: 'SPP', jumlah: 'Rp 500.000', jatuhTempo: '10 Feb 2026', status: 'Lunas' },
  { id: 'SPP003', bulan: 'Januari 2026', jenis: 'SPP', jumlah: 'Rp 500.000', jatuhTempo: '10 Jan 2026', status: 'Lunas' },
  { id: 'BK001', bulan: 'Juli 2025', jenis: 'Buku & Kegiatan', jumlah: 'Rp 750.000', jatuhTempo: '15 Jul 2025', status: 'Lunas' },
]

const StatCard = ({ title, value, subtitle, icon, color }) => (
  <Card sx={{
    borderRadius: 3,
    border: '1px solid',
    borderColor: 'divider',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    overflow: 'hidden',
    position: 'relative',
    height: '100%',
    '&:hover': {
      transform: 'translateY(-8px)',
      boxShadow: `0 14px 28px -10px ${color}60`
    }
  }}>
    <Box sx={{
      position: 'absolute', right: -20, bottom: -20,
      width: 100, height: 100, borderRadius: '50%',
      backgroundColor: color, opacity: 0.05, filter: 'blur(20px)', zIndex: 0
    }} />

    <CardContent sx={{ p: 3, position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600, maxWidth: '75%' }}>
          {title}
        </Typography>
        <Box sx={{ 
          width: 48, height: 48, borderRadius: 3, 
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: `${color}15`, color: color, flexShrink: 0
        }}>
          {icon}
        </Box>
      </Box>
      <Typography variant="h3" fontWeight="800" sx={{ color: 'text.primary', mb: 0.5 }}>
        {value}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mt: 'auto' }}>
        {subtitle}
      </Typography>
    </CardContent>
  </Card>
)

export default function Pembayaran() {
  const [open, setOpen] = useState(false)
  const [selectedTagihan, setSelectedTagihan] = useState(null)
  const [paid, setPaid] = useState(false)

  const handleBayar = () => {
    setPaid(true)
    setTimeout(() => {
      setPaid(false)
      setOpen(false)
    }, 2000)
  }

  const belumDibayar = tagihanData.filter(t => t.status === 'Belum Bayar');
  const lunas = tagihanData.filter(t => t.status === 'Lunas');

  return (
    <Box sx={{ width: '100%', maxWidth: '100%', overflow: 'hidden', pb: 4 }}>
      {/* Graduate/Premium Header */}
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
            Pembayaran SPP & Tagihan
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9, fontWeight: 500 }}>
            Detail tagihan dan status pembayaran Ahmad Rizky - <Box component="span" sx={{ fontWeight: 700 }}>Kelas X-A</Box>
          </Typography>
        </Box>
        {/* Background Decorative Icon */}
        <PaymentIcon sx={{ 
          position: 'absolute', 
          right: -10, 
          top: -20, 
          fontSize: 200, 
          opacity: 0.1,
          transform: 'rotate(-10deg)'
        }} />
      </Box>

      {paid && (
        <Alert severity="success" sx={{ mb: 4, borderRadius: 2, fontWeight: 500 }}>
          Pembayaran berhasil! Bukti pembayaran akan dikirim ke email.
        </Alert>
      )}

      {/* Dynamic Stat Cards */}
      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <StatCard 
            title="Total Tagihan Belum Dibayar" 
            value="Rp 500.000" 
            subtitle="Jatuh tempo terdekat: 10 Maret 2026" 
            icon={<WarningAmberIcon fontSize="medium" />} 
            color="#d32f2f" 
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <StatCard 
            title="Tagihan Lunas Bulan Ini" 
            value={lunas.length.toString()} 
            subtitle="Anda telah menyelesaikan pembayaran untuk bulan ini" 
            icon={<CheckCircleIcon fontSize="medium" />} 
            color="#2e7d32" 
          />
        </Grid>
      </Grid>

      {/* Main Table Area */}
      <Paper elevation={0} sx={{ 
        borderRadius: 3, 
        border: '1px solid',
        borderColor: 'divider',
        overflow: 'hidden',
      }}>
        <TableContainer sx={{ p: { xs: 0, md: 1 } }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'transparent' }}>
                <TableCell sx={{ fontWeight: 700, color: 'text.secondary', borderBottom: '2px solid', borderColor: 'grey.200' }}>Bulan</TableCell>
                <TableCell sx={{ fontWeight: 700, color: 'text.secondary', borderBottom: '2px solid', borderColor: 'grey.200' }}>Jenis Tagihan</TableCell>
                <TableCell sx={{ fontWeight: 800, color: 'text.primary', borderBottom: '2px solid', borderColor: 'grey.200' }}>Jumlah</TableCell>
                <TableCell sx={{ fontWeight: 700, color: 'text.secondary', borderBottom: '2px solid', borderColor: 'grey.200' }}>Jatuh Tempo</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700, color: 'text.secondary', borderBottom: '2px solid', borderColor: 'grey.200' }}>Status</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700, color: 'text.secondary', borderBottom: '2px solid', borderColor: 'grey.200', pr: 3 }}>Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tagihanData.map((row) => (
                <TableRow 
                  key={row.id}
                  hover
                  sx={{ '&:last-child td': { border: 0 }, transition: 'background-color 0.2s' }}
                >
                  <TableCell sx={{ fontWeight: 600 }}>{row.bulan}</TableCell>
                  <TableCell>{row.jenis}</TableCell>
                  <TableCell sx={{ fontWeight: 800, color: 'primary.main', fontSize: '1.05rem' }}>{row.jumlah}</TableCell>
                  <TableCell sx={{ color: row.status === 'Lunas' ? 'text.secondary' : 'error.main', fontWeight: 500 }}>
                    {row.jatuhTempo}
                  </TableCell>
                  <TableCell align="center">
                    <Box component="span" sx={{ 
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      px: 2, py: 0.5, borderRadius: '50px',
                      bgcolor: row.status === 'Lunas' ? 'success.50' : 'error.50', 
                      color: row.status === 'Lunas' ? 'success.700' : 'error.700', 
                      fontSize: '0.85rem', fontWeight: 800,
                      border: '1px solid',
                      borderColor: row.status === 'Lunas' ? 'success.200' : 'error.200', 
                    }}>
                      {row.status}
                    </Box>
                  </TableCell>
                  <TableCell align="right" sx={{ pr: 3 }}>
                    {row.status === 'Belum Bayar' ? (
                      <Button
                        size="small"
                        variant="contained"
                        startIcon={<QrCodeIcon />}
                        onClick={() => { setSelectedTagihan(row); setOpen(true) }}
                        sx={{ borderRadius: 2, fontWeight: 600, textTransform: 'none', px: 2, py: 0.5 }}
                      >
                        Bayar
                      </Button>
                    ) : (
                      <Button
                        size="small"
                        variant="outlined"
                        color="success"
                        startIcon={<CheckCircleIcon />}
                        disabled
                        sx={{ borderRadius: 2, fontWeight: 600, textTransform: 'none', px: 2, py: 0.5, borderColor: 'success.200', '&.Mui-disabled': { borderColor: 'success.200', color: 'success.500', bgcolor: 'success.50' } }}
                      >
                        Lunas
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Payment Dialog */}
      <CustomDialog 
        open={open} 
        onClose={() => setOpen(false)} 
        maxWidth="sm" 
        title={`Pembayaran - ${selectedTagihan?.bulan}`}
        actions={
          <>
            <Button onClick={() => setOpen(false)} sx={{ fontWeight: 600 }}>Batal</Button>
            <Button variant="contained" color="primary" onClick={handleBayar} sx={{ borderRadius: 2, fontWeight: 600, px: 3 }}>
              Saya Sudah Bayar
            </Button>
          </>
        }
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Box>
            <Typography variant="body2" color="text.secondary">Jenis Tagihan</Typography>
            <Typography variant="h6" fontWeight="700">{selectedTagihan?.jenis}</Typography>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="body2" color="text.secondary">Jumlah Tagihan</Typography>
            <Typography variant="h4" color="primary.main" fontWeight="800">{selectedTagihan?.jumlah}</Typography>
          </Box>
        </Box>
        
        <Box sx={{ p: 4, bgcolor: 'grey.50', borderRadius: 3, textAlign: 'center', my: 2, border: '1px dashed', borderColor: 'grey.300' }}>
          <QrCodeIcon sx={{ fontSize: 180, color: 'text.primary', mb: 1 }} />
          <Typography variant="body1" fontWeight="700" sx={{ mt: 1 }}>
            Scan QRIS untuk pembayaran
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
            Support: GoPay, OVO, Dana, ShopeePay, Mobile Banking
          </Typography>
        </Box>

        <Alert severity="info" sx={{ borderRadius: 2, '& .MuiAlert-message': { fontWeight: 500 } }}>
          Setelah melakukan pembayaran, sistem akan otomatis memverifikasi. Bukti pembayaran akan dikirim ke email terdaftar.
        </Alert>
      </CustomDialog>
    </Box>
  )
}

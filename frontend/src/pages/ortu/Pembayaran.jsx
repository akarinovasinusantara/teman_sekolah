import { useState } from 'react'
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
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import QrCodeIcon from '@mui/icons-material/QrCode'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import Alert from '@mui/material/Alert'

const tagihanData = [
  { id: 'SPP001', bulan: 'Maret 2026', jenis: 'SPP', jumlah: 'Rp 500.000', jatuhTempo: '10 Mar 2026', status: 'Belum Bayar' },
  { id: 'SPP002', bulan: 'Februari 2026', jenis: 'SPP', jumlah: 'Rp 500.000', jatuhTempo: '10 Feb 2026', status: 'Lunas' },
  { id: 'SPP003', bulan: 'Januari 2026', jenis: 'SPP', jumlah: 'Rp 500.000', jatuhTempo: '10 Jan 2026', status: 'Lunas' },
  { id: 'BK001', bulan: 'Juli 2025', jenis: 'Buku & Kegiatan', jumlah: 'Rp 750.000', jatuhTempo: '15 Jul 2025', status: 'Lunas' },
]

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

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Pembayaran SPP & Tagihan
      </Typography>

      {paid && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Pembayaran berhasil! Bukti pembayaran akan dikirim ke email.
        </Alert>
      )}

      <Paper sx={{ mb: 3 }}>
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Total Tagihan Belum Dibayar
          </Typography>
          <Typography variant="h2" color="error.main" fontWeight="bold">
            Rp 500.000
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Jatuh tempo: 10 Maret 2026
          </Typography>
        </Box>
      </Paper>

      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Bulan</TableCell>
                <TableCell>Jenis Tagihan</TableCell>
                <TableCell>Jumlah</TableCell>
                <TableCell>Jatuh Tempo</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tagihanData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.bulan}</TableCell>
                  <TableCell>{row.jenis}</TableCell>
                  <TableCell>{row.jumlah}</TableCell>
                  <TableCell sx={{ color: row.status === 'Lunas' ? 'text.secondary' : 'error.main' }}>
                    {row.jatuhTempo}
                  </TableCell>
                  <TableCell>
                    <Box component="span" sx={{ 
                      px: 1.5, py: 0.5, borderRadius: 1, 
                      bgcolor: row.status === 'Lunas' ? 'success.light' : 'error.light', 
                      color: row.status === 'Lunas' ? 'success.dark' : 'error.dark', 
                      fontSize: '0.75rem', fontWeight: 'bold' 
                    }}>
                      {row.status}
                    </Box>
                  </TableCell>
                  <TableCell>
                    {row.status === 'Belum Bayar' ? (
                      <Button
                        size="small"
                        variant="contained"
                        startIcon={<QrCodeIcon />}
                        onClick={() => { setSelectedTagihan(row); setOpen(true) }}
                      >
                        Bayar
                      </Button>
                    ) : (
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<CheckCircleIcon />}
                        disabled
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

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Pembayaran - {selectedTagihan?.bulan}</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">Jenis Tagihan</Typography>
              <Typography variant="h6">{selectedTagihan?.jenis}</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">Jumlah</Typography>
              <Typography variant="h4" color="primary.main" fontWeight="bold">{selectedTagihan?.jumlah}</Typography>
            </Box>
            
            <Box sx={{ p: 3, bgcolor: 'grey.100', borderRadius: 2, textAlign: 'center', my: 2 }}>
              <QrCodeIcon sx={{ fontSize: 150 }} />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Scan QRIS untuk pembayaran
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Support: GoPay, OVO, Dana, ShopeePay, Mobile Banking
              </Typography>
            </Box>

            <Alert severity="info" variant="outlined">
              Setelah melakukan pembayaran, sistem akan otomatis memverifikasi. 
              Bukti pembayaran akan dikirim ke email terdaftar.
            </Alert>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Batal</Button>
          <Button variant="contained" color="success" onClick={handleBayar}>
            Saya Sudah Bayar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

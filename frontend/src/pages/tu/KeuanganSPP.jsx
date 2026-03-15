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
    <Box>
      <Typography 
        variant="h4" 
        fontWeight="bold" 
        gutterBottom
        sx={{ fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' } }}
      >
        Keuangan - Pembayaran SPP
      </Typography>

      <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Paper sx={{ p: { xs: 2, sm: 3 }, textAlign: 'center' }}>
            <Typography 
              variant="h6" 
              color="text.secondary"
              sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
            >
              Total Tagihan Bulan Ini
            </Typography>
            <Typography 
              variant="h3" 
              color="primary.main" 
              fontWeight="bold"
              sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' } }}
            >
              Rp 250.000.000
            </Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Paper sx={{ p: { xs: 2, sm: 3 }, textAlign: 'center' }}>
            <Typography 
              variant="h6" 
              color="text.secondary"
              sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
            >
              Sudah Dibayar
            </Typography>
            <Typography 
              variant="h3" 
              color="success.main" 
              fontWeight="bold"
              sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' } }}
            >
              Rp 175.000.000
            </Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Paper sx={{ p: { xs: 2, sm: 3 }, textAlign: 'center' }}>
            <Typography 
              variant="h6" 
              color="text.secondary"
              sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
            >
              Belum Dibayar
            </Typography>
            <Typography 
              variant="h3" 
              color="error.main" 
              fontWeight="bold"
              sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' } }}
            >
              Rp 75.000.000
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Paper sx={{ mb: 3 }}>
        <Box 
          sx={{ 
            p: { xs: 2, sm: 2 }, 
            display: 'flex', 
            gap: 2, 
            flexWrap: 'wrap',
            flexDirection: { xs: 'column', sm: 'row' },
          }}
        >
          <TextField 
            size="small" 
            placeholder="Cari NIS / Nama Siswa" 
            sx={{ width: { xs: '100%', sm: 250 } }} 
          />
          <TextField 
            size="small" 
            select 
            SelectProps={{ native: true }} 
            defaultValue=""
            sx={{ width: { xs: '100%', sm: 'auto' }, minWidth: { sm: 150 } }}
          >
            <option value="">Semua Kelas</option>
            <option value="X-A">X-A</option>
            <option value="X-B">X-B</option>
            <option value="XI-A">XI-A</option>
            <option value="XI-B">XI-B</option>
            <option value="XII-A">XII-A</option>
          </TextField>
          <TextField 
            size="small" 
            select 
            SelectProps={{ native: true }} 
            defaultValue=""
            sx={{ width: { xs: '100%', sm: 'auto' }, minWidth: { sm: 150 } }}
          >
            <option value="">Semua Status</option>
            <option value="Lunas">Lunas</option>
            <option value="Belum Bayar">Belum Bayar</option>
          </TextField>
          <Button 
            variant="contained" 
            startIcon={<SearchIcon />}
            fullWidth={isMobile}
          >
            Cari
          </Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}>No</TableCell>
                <TableCell sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}>NIS</TableCell>
                <TableCell sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}>Nama</TableCell>
                <TableCell sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}>Kelas</TableCell>
                <TableCell sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}>Bulan</TableCell>
                <TableCell sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}>Jumlah</TableCell>
                <TableCell sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}>Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tagihanData.map((row, index) => (
                <TableRow key={row.id} hover>
                  <TableCell sx={{ fontSize: '0.875rem' }}>{index + 1}</TableCell>
                  <TableCell sx={{ fontSize: '0.875rem' }}>{row.nis}</TableCell>
                  <TableCell sx={{ fontSize: '0.875rem' }}>{row.nama}</TableCell>
                  <TableCell sx={{ fontSize: '0.875rem' }}>{row.kelas}</TableCell>
                  <TableCell sx={{ fontSize: '0.875rem' }}>{row.bulan}</TableCell>
                  <TableCell sx={{ fontSize: '0.875rem' }}>{row.jumlah}</TableCell>
                  <TableCell>
                    <Box 
                      component="span" 
                      sx={{ 
                        px: 1.5, 
                        py: 0.5, 
                        borderRadius: 1, 
                        bgcolor: row.status === 'Lunas' ? 'success.light' : 'error.light', 
                        color: row.status === 'Lunas' ? 'success.dark' : 'error.dark', 
                        fontSize: '0.75rem', 
                        fontWeight: 'bold',
                      }}
                    >
                      {row.status}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      <IconButton 
                        size="small" 
                        color="primary" 
                        onClick={() => { setSelectedTagihan(row); setOpen(true) }}
                      >
                        <ReceiptIcon />
                      </IconButton>
                      {row.status === 'Belum Bayar' && (
                        <IconButton size="small" color="success">
                          <QrCodeIcon />
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

      <Dialog 
        open={open} 
        onClose={() => setOpen(false)} 
        maxWidth="sm" 
        fullWidth
        fullScreen={isMobile}
      >
        <DialogTitle
          sx={{
            fontSize: isMobile ? '1.25rem' : '1.5rem',
            fontWeight: 'bold',
            pr: 6,
          }}
        >
          Konfirmasi Pembayaran
        </DialogTitle>
        <IconButton
          onClick={() => setOpen(false)}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'text.secondary',
          }}
        >
          <ReceiptIcon />
        </IconButton>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
            >
              Siswa
            </Typography>
            <Typography 
              variant="h6"
              sx={{ fontSize: { xs: '1.125rem', sm: '1.25rem' } }}
            >
              {selectedTagihan?.nama}
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ mt: 1, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
            >
              Kelas
            </Typography>
            <Typography 
              variant="h6"
              sx={{ fontSize: { xs: '1.125rem', sm: '1.25rem' } }}
            >
              {selectedTagihan?.kelas}
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ mt: 1, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
            >
              Tagihan Bulan
            </Typography>
            <Typography 
              variant="h6"
              sx={{ fontSize: { xs: '1.125rem', sm: '1.25rem' } }}
            >
              {selectedTagihan?.bulan}
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ mt: 1, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
            >
              Jumlah
            </Typography>
            <Typography 
              variant="h4" 
              color="primary.main" 
              fontWeight="bold"
              sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}
            >
              {selectedTagihan?.jumlah}
            </Typography>

            <Box 
              sx={{ 
                mt: 3, 
                p: 2, 
                bgcolor: 'grey.100', 
                borderRadius: 1, 
                textAlign: 'center',
              }}
            >
              <QrCodeIcon sx={{ fontSize: { xs: 80, sm: 120 } }} />
              <Typography 
                variant="caption" 
                sx={{ fontSize: { xs: '0.65rem', sm: '0.75rem' } }}
              >
                Scan QRIS untuk pembayaran
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            p: isMobile ? 2 : 3,
            flexDirection: isMobile ? 'column-reverse' : 'row',
            gap: 1,
            '& .MuiButton-root': {
              minWidth: isMobile ? '100%' : 'auto',
            },
          }}
        >
          <Button onClick={() => setOpen(false)}>Tutup</Button>
          <Button variant="contained" color="success">Konfirmasi Pembayaran</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

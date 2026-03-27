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
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import CloseIcon from '@mui/icons-material/Close'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DomainIcon from '@mui/icons-material/Domain'

const dummySekolah = [
  { id: 1, nama: 'SMA Negeri 1 Jakarta', npsn: '10101010', alamat: 'Jakarta Pusat', status: 'Aktif' },
  { id: 2, nama: 'SMP Harapan Bangsa', npsn: '20202020', alamat: 'Jakarta Selatan', status: 'Aktif' },
  { id: 3, nama: 'SMK Merdeka', npsn: '30303030', alamat: 'Jakarta Barat', status: 'Aktif' },
  { id: 4, nama: 'SD Tunas Muda', npsn: '40404040', alamat: 'Jakarta Timur', status: 'Non-Aktif' },
]

export default function ManajemenSekolah() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(900))
  const [open, setOpen] = useState(false)
  const [sekolah, setSekolah] = useState(dummySekolah)

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
        overflow: 'hidden',
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', sm: 'center' },
        gap: 3
      }}>
        <Box sx={{ position: 'relative', zIndex: 2 }}>
          <Typography variant="h4" fontWeight="800" sx={{ mb: 1, fontSize: { xs: '1.75rem', md: '2.125rem' } }}>
            Manajemen Institusi Sekolah
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.8, fontWeight: 500 }}>
            Master data cabang sekolah dalam naungan sistem pusat
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />} 
          onClick={() => setOpen(true)}
          sx={{ 
            backgroundColor: '#ffffff !important', 
            color: '#1565C0 !important', 
            fontWeight: '800',
            borderRadius: 2,
            px: 3,
            '&:hover': { 
              backgroundColor: '#f1f5f9 !important',
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 16px rgba(0,0,0,0.1)'
            },
            transition: 'all 0.2s',
            zIndex: 2,
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            whiteSpace: 'nowrap'
          }}
        >
          Integrasi Sekolah Baru
        </Button>
        <DomainIcon sx={{ 
          position: 'absolute', 
          right: -10, 
          top: -30, 
          fontSize: 220, 
          opacity: 0.05,
          transform: 'rotate(-5deg)'
        }} />
      </Box>

      {!isMobile ? (
        <Paper elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider', overflow: 'hidden' }}>
           <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f8fafc' }}>
                  <TableCell width="50" sx={{ fontWeight: 700, color: '#475569', borderBottom: '2px solid', borderColor: 'grey.200' }}>No</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: '#475569', borderBottom: '2px solid', borderColor: 'grey.200' }}>Nama Instansi Sekolah</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: '#475569', borderBottom: '2px solid', borderColor: 'grey.200' }}>Nomor NPSN</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: '#475569', borderBottom: '2px solid', borderColor: 'grey.200' }}>Alamat Operasional</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700, color: '#475569', borderBottom: '2px solid', borderColor: 'grey.200' }}>Status Aktif</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700, color: '#475569', borderBottom: '2px solid', borderColor: 'grey.200' }}>Manajemen</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sekolah.map((row, index) => (
                  <TableRow key={row.id} hover sx={{ '&:last-child td': { border: 0 }, transition: 'background-color 0.2s' }}>
                    <TableCell sx={{ fontWeight: 600 }}>{index + 1}</TableCell>
                    <TableCell sx={{ fontWeight: 800, color: '#0F172A' }}>{row.nama}</TableCell>
                    <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }}>{row.npsn}</TableCell>
                    <TableCell sx={{ color: 'text.secondary', fontWeight: 500 }}>{row.alamat}</TableCell>
                    <TableCell align="center">
                      <Box sx={{ 
                          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                          px: 2, py: 0.5, borderRadius: '50px',
                          bgcolor: row.status === 'Aktif' ? 'success.50' : 'error.50',
                          color: row.status === 'Aktif' ? 'success.700' : 'error.700',
                          border: '1px solid',
                          borderColor: row.status === 'Aktif' ? 'success.200' : 'error.200',
                          fontWeight: 'bold', fontSize: '0.75rem', minWidth: 90
                        }}>
                        {row.status}
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                        <IconButton size="small" color="info" sx={{ bgcolor: 'info.50' }}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" color="error" sx={{ bgcolor: 'error.50' }}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {sekolah.map((row) => (
            <Card key={row.id} elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
              <CardContent sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Typography variant="subtitle1" fontWeight="800" sx={{ pr: 2, color: '#0F172A' }}>{row.nama}</Typography>
                  <Box sx={{ 
                      display: 'inline-flex', px: 1, py: 0.25, borderRadius: '50px',
                      bgcolor: row.status === 'Aktif' ? 'success.50' : 'error.50',
                      color: row.status === 'Aktif' ? 'success.700' : 'error.700',
                      border: '1px solid', borderColor: row.status === 'Aktif' ? 'success.200' : 'error.200',
                      fontWeight: 'bold', fontSize: '0.65rem', whiteSpace: 'nowrap'
                    }}>
                    {row.status}
                  </Box>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5, fontWeight: 600 }}>NPSN: {row.npsn}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>{row.alamat}</Typography>
                <Divider sx={{ mb: 1.5 }} />
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                  <Button size="small" variant="outlined" startIcon={<EditIcon />} sx={{ borderRadius: 2 }}>Edit</Button>
                  <Button size="small" variant="contained" color="error" sx={{ borderRadius: 2, minWidth:0, px:2 }}><DeleteIcon fontSize="small" /></Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {/* Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth fullScreen={isMobile} PaperProps={{ sx: { borderRadius: isMobile ? 0 : 3 } }}>
        <DialogTitle sx={{ fontWeight: '800', borderBottom: '1px solid', borderColor: 'divider', pb: 2, pt: 3, px: 4, bgcolor: '#0F172A', color: 'white' }}>
          Integrasi Data Sekolah Baru
          <IconButton onClick={() => setOpen(false)} sx={{ position: 'absolute', right: 16, top: 16, color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 1 }}>
            <TextField fullWidth label="Nama Instansi Sekolah Resmi" required sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
            <TextField fullWidth label="Nomor Pokok Sekolah Nasional (NPSN)" required sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
            <TextField fullWidth label="Alamat Operasional/Jalan" multiline rows={3} required sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
            <TextField fullWidth select SelectProps={{ native: true }} label="Status Database" required sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}>
              <option value="Aktif">Sekolah Aktif (Termonitor)</option>
              <option value="Non-Aktif">Non-Aktif/Suspended</option>
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1, px: 4, bgcolor: '#f8fafc', borderTop: '1px solid', borderColor: 'divider' }}>
          <Button onClick={() => setOpen(false)} sx={{ fontWeight: 600, color: '#475569' }}>Batalkan</Button>
          <Button variant="contained" sx={{ fontWeight: 600, px: 3, borderRadius: 2, bgcolor: '#0F172A', '&:hover': { bgcolor: '#1E293B' } }}>
            Simpan Konfigurasi
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

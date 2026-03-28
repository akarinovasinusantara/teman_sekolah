import { useState } from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CustomDialog from '../../../components/common/CustomDialog'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import PrintIcon from '@mui/icons-material/Print'
import DescriptionIcon from '@mui/icons-material/Description'
import SchoolIcon from '@mui/icons-material/School'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import CloseIcon from '@mui/icons-material/Close'

const suratTemplates = [
  { id: 1, nama: 'Surat Keterangan Aktif', icon: <SchoolIcon fontSize="large" />, desc: 'Dokumen legalitas siswa aktif', color: '#1565C0', bg: '#E3F2FD' },
  { id: 2, nama: 'Surat Panggilan Ortu', icon: <DescriptionIcon fontSize="large" />, desc: 'Undangan resmi untuk wali murid', color: '#E65100', bg: '#FFF3E0' },
  { id: 3, nama: 'Surat Izin Kegiatan', icon: <DescriptionIcon fontSize="large" />, desc: 'Pengantar izin acara sekolah', color: '#2E7D32', bg: '#E8F5E9' },
  { id: 4, nama: 'Surat Keterangan Lulus', icon: <SchoolIcon fontSize="large" />, desc: 'SKL resmi lulusan sekolah', color: '#6A1B9A', bg: '#F3E5F5' },
  { id: 5, nama: 'Transkrip Nilai', icon: <DescriptionIcon fontSize="large" />, desc: 'Rekapitulasi nilai akhir', color: '#0288D1', bg: '#E1F5FE' },
  { id: 6, nama: 'Surat Pindah Sekolah', icon: <SchoolIcon fontSize="large" />, desc: 'Dokumen mutasi akademik', color: '#C62828', bg: '#FFEBEE' },
]

export default function SuratMenyurat() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(900))
  const [open, setOpen] = useState(false)
  const [selectedSurat, setSelectedSurat] = useState(null)

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
            Administrasi Surat Menyurat
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9, fontWeight: 500 }}>
            Automasi pembuatan dan pencetakan dokumen legal sekolah
          </Typography>
        </Box>
        <MailOutlineIcon sx={{ 
          position: 'absolute', 
          right: -10, 
          top: -30, 
          fontSize: 220, 
          opacity: 0.1,
          transform: 'rotate(15deg)'
        }} />
      </Box>

      <Grid container spacing={3}>
        {suratTemplates.map((surat) => (
          <Grid item xs={12} sm={6} md={4} key={surat.id}>
            <Card 
              elevation={0} 
              sx={{ 
                height: '100%', 
                borderRadius: 3, 
                border: '1px solid', 
                borderColor: 'divider',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: '0 12px 24px rgba(0,0,0,0.08)',
                  borderColor: surat.color
                }
              }}
            >
              <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      width: 60, height: 60, borderRadius: 2, display: 'flex',
                      alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      bgcolor: surat.bg, color: surat.color,
                      boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'
                    }}
                  >
                    {surat.icon}
                  </Box>
                  <Box>
                    <Typography variant="h6" fontWeight="800" sx={{ lineHeight: 1.2, mb: 0.5 }}>
                      {surat.nama}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" fontWeight="500">
                      {surat.desc}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ mt: 'auto', pt: 2 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<PrintIcon />}
                    sx={{ 
                      borderRadius: 2, py: 1, fontWeight: 'bold', 
                      bgcolor: surat.color, 
                      color: 'white',
                      boxShadow: 'none',
                      '&:hover': { bgcolor: surat.color, filter: 'brightness(0.9)', boxShadow: `0 4px 12px ${surat.color}40` }
                    }}
                    onClick={() => { setSelectedSurat(surat); setOpen(true) }}
                  >
                    Generate Surat
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog Cetak */}
      <CustomDialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="md"
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <DescriptionIcon color="primary" /> {selectedSurat?.nama}
          </Box>
        }
        actions={
          <>
            <Button onClick={() => setOpen(false)} sx={{ fontWeight: 600 }}>Batalkan</Button>
            <Button variant="contained" startIcon={<PrintIcon />} sx={{ fontWeight: 600, px: 3, borderRadius: 2 }}>
              Cetak Dokumen PDF
            </Button>
          </>
        }
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
             <TextField fullWidth label="Nomor Referensi Surat" placeholder="Contoh: 001/SK/III/2026" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
             <TextField fullWidth label="Tanggal Diterbitkan" type="date" InputLabelProps={{ shrink: true }} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
          </Box>
          <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
            <TextField fullWidth label="Nama Lengkap Siswa" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
            <TextField fullWidth label="NIS / NISN" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
          </Box>
           <TextField fullWidth label="Kelas & Jurusan" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
          <TextField fullWidth label="Deskripsi Keperluan Singkat" multiline rows={3} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
        </Box>
      </CustomDialog>
    </Box>
  )
}

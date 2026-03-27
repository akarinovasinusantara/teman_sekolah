import { useState } from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import PrintIcon from '@mui/icons-material/Print'
import DescriptionIcon from '@mui/icons-material/Description'
import SchoolIcon from '@mui/icons-material/School'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

const suratTemplates = [
  { id: 1, nama: 'Surat Keterangan Siswa', icon: <SchoolIcon />, desc: 'Surat keterangan aktif sebagai siswa' },
  { id: 2, nama: 'Surat Panggilan Orang Tua', icon: <DescriptionIcon />, desc: 'Surat panggilan untuk orang tua wali' },
  { id: 3, nama: 'Surat Izin Kegiatan', icon: <DescriptionIcon />, desc: 'Surat izin untuk kegiatan sekolah' },
  { id: 4, nama: 'Surat Keterangan Lulus', icon: <SchoolIcon />, desc: 'Surat keterangan lulus / SKL' },
  { id: 5, nama: 'Transkrip Nilai', icon: <DescriptionIcon />, desc: 'Transkrip nilai siswa' },
  { id: 6, nama: 'Surat Pindah Sekolah', icon: <SchoolIcon />, desc: 'Surat keterangan pindah sekolah' },
]

export default function SuratMenyurat() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(900))
  const [open, setOpen] = useState(false)
  const [selectedSurat, setSelectedSurat] = useState(null)

  return (
    <Box>
      <Typography 
        variant="h4" 
        fontWeight="bold" 
        gutterBottom
        sx={{ fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' } }}
      >
        Surat Menyurat
      </Typography>
      <Typography 
        variant="body2" 
        color="text.secondary" 
        sx={{ 
          mb: 3,
          fontSize: { xs: '0.875rem', sm: '1rem' }
        }}
      >
        Pilih template surat dan cetak surat administratif
      </Typography>

      <Grid container spacing={{ xs: 2, md: 3 }}>
        {suratTemplates.map((surat) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={surat.id}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Box
                    sx={{
                      width: { xs: 48, sm: 56 },
                      height: { xs: 48, sm: 56 },
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: 'primary.light',
                      color: 'primary.main',
                      flexShrink: 0,
                    }}
                  >
                    {surat.icon}
                  </Box>
                  <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                    <Typography 
                      variant="h6" 
                      gutterBottom
                      sx={{ 
                        fontSize: { xs: '1rem', sm: '1.125rem' },
                        wordBreak: 'break-word',
                      }}
                    >
                      {surat.nama}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      gutterBottom
                      sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                    >
                      {surat.desc}
                    </Typography>
                  </Box>
                </Box>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<PrintIcon />}
                  sx={{ mt: 2 }}
                  onClick={() => { setSelectedSurat(surat); setOpen(true) }}
                >
                  Cetak Surat
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog 
        open={open} 
        onClose={() => setOpen(false)} 
        maxWidth="md" 
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
          Cetak {selectedSurat?.nama}
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
          <DescriptionIcon />
        </IconButton>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField 
              fullWidth 
              label="Nomor Surat" 
              placeholder="Contoh: 001/SK/III/2026"
              sx={{ '& .MuiInputBase-input': { fontSize: isMobile ? '1rem' : '0.875rem' } }}
            />
            <TextField 
              fullWidth 
              label="Nama Siswa" 
              placeholder="Masukkan nama siswa"
              sx={{ '& .MuiInputBase-input': { fontSize: isMobile ? '1rem' : '0.875rem' } }}
            />
            <TextField 
              fullWidth 
              label="NIS/NISN" 
              placeholder="Masukkan NIS/NISN"
              sx={{ '& .MuiInputBase-input': { fontSize: isMobile ? '1rem' : '0.875rem' } }}
            />
            <TextField 
              fullWidth 
              label="Kelas" 
              placeholder="Masukkan kelas"
              sx={{ '& .MuiInputBase-input': { fontSize: isMobile ? '1rem' : '0.875rem' } }}
            />
            <TextField 
              fullWidth 
              label="Keperluan" 
              multiline 
              rows={isMobile ? 4 : 3} 
              placeholder="Keperluan surat"
              sx={{ '& .MuiInputBase-input': { fontSize: isMobile ? '1rem' : '0.875rem' } }}
            />
            <TextField 
              fullWidth 
              label="Tanggal Surat" 
              type="date" 
              InputLabelProps={{ shrink: true }}
              sx={{ '& .MuiInputBase-input': { fontSize: isMobile ? '1rem' : '0.875rem' } }}
            />
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
          <Button onClick={() => setOpen(false)}>Batal</Button>
          <Button variant="contained" startIcon={<PrintIcon />}>
            Cetak / Download PDF
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

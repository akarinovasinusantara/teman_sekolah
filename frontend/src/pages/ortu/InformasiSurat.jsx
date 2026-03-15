import { useState } from 'react'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'
import DownloadIcon from '@mui/icons-material/Download'
import VisibilityIcon from '@mui/icons-material/Visibility'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import DescriptionIcon from '@mui/icons-material/Description'
import EventIcon from '@mui/icons-material/Event'
import WarningIcon from '@mui/icons-material/Warning'

const suratData = [
  { 
    id: 1, 
    judul: 'Surat Edaran - Libur Hari Raya', 
    isi: 'Diberitahukan kepada seluruh siswa dan orang tua wali bahwa sekolah akan meliburkan kegiatan belajar mengajar pada tanggal 29 Maret - 5 April 2026 dalam rangka libur Hari Raya. Kegiatan pembelajaran akan dimulai kembali pada tanggal 7 April 2026.', 
    tanggal: '10 Mar 2026', 
    kategori: 'Pengumuman',
    prioritas: 'Normal',
    lampiran: 'SE_Libur_Hari_Raya.pdf'
  },
  { 
    id: 2, 
    judul: 'Undangan - Rapat Orang Tua Wali', 
    isi: 'Kami mengundang Bapak/Ibu orang tua wali untuk hadir dalam rapat orang tua wali yang akan dilaksanakan pada:\n\nHari/Tanggal: Sabtu, 22 Maret 2026\nWaktu: 08.00 - 12.00 WIB\nTempat: Aula SMA Negeri 1 Jakarta\n\nAgenda: Pembahasan hasil belajar semester ganjil dan program sekolah.', 
    tanggal: '08 Mar 2026', 
    kategori: 'Undangan',
    prioritas: 'Penting',
    lampiran: 'Undangan_Rapat_Ortu.pdf'
  },
  { 
    id: 3, 
    judul: 'Peringatan - Pembayaran SPP', 
    isi: 'Diberitahukan kepada seluruh orang tua wali siswa bahwa pembayaran SPP bulan Maret 2026 sudah dapat dilakukan. Batas pembayaran adalah tanggal 10 Maret 2026. Pembayaran dapat dilakukan melalui QRIS atau Virtual Account yang tersedia di menu Pembayaran.', 
    tanggal: '01 Mar 2026', 
    kategori: 'Keuangan',
    prioritas: 'Penting',
    lampiran: null
  },
  { 
    id: 4, 
    judul: 'Pengumuman - Jadwal Ujian Tengah Semester', 
    isi: 'Ujian Tengah Semester (UTS) Ganjil akan dilaksanakan pada:\n\nTanggal: 20 - 25 Maret 2026\nWaktu: Sesuai jadwal masing-masing kelas\n\nDimohon kepada siswa untuk mempersiapkan diri dengan baik.', 
    tanggal: '25 Feb 2026', 
    kategori: 'Akademik',
    prioritas: 'Normal',
    lampiran: 'Jadwal_UTS_Ganjil.pdf'
  },
]

const getIconByKategori = (kategori) => {
  switch (kategori) {
    case 'Pengumuman':
      return <DescriptionIcon />
    case 'Undangan':
      return <EventIcon />
    case 'Keuangan':
      return <WarningIcon />
    default:
      return <DescriptionIcon />
  }
}

const getPrioritasColor = (prioritas) => {
  return prioritas === 'Penting' ? 'error' : 'default'
}

export default function InformasiSurat() {
  const [open, setOpen] = useState(false)
  const [selectedSurat, setSelectedSurat] = useState(null)

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Informasi & Surat Edaran
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Surat edaran dan pengumuman dari sekolah
      </Typography>

      <Paper>
        <List>
          {suratData.map((surat, index) => (
            <ListItem
              key={surat.id}
              alignItems="flex-start"
              sx={{
                borderBottom: index < suratData.length - 1 ? '1px solid' : 'none',
                borderColor: 'divider',
                py: 2,
              }}
              secondaryAction={
                <Box>
                  <IconButton edge="end" size="small" onClick={() => { setSelectedSurat(surat); setOpen(true) }}>
                    <VisibilityIcon />
                  </IconButton>
                  {surat.lampiran && (
                    <IconButton edge="end" size="small">
                      <DownloadIcon />
                    </IconButton>
                  )}
                </Box>
              }
            >
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <Box sx={{ color: 'primary.main' }}>
                      {getIconByKategori(surat.kategori)}
                    </Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {surat.judul}
                    </Typography>
                    <Chip 
                      label={surat.kategori} 
                      size="small" 
                      variant="outlined"
                      color={surat.kategori === 'Keuangan' ? 'warning' : 'primary'}
                    />
                    {surat.prioritas === 'Penting' && (
                      <Chip label="Penting" size="small" color="error" />
                    )}
                  </Box>
                }
                secondary={
                  <>
                    <Typography variant="body2" sx={{ mt: 1, whiteSpace: 'pre-line' }}>
                      {surat.isi.substring(0, 150)}...
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}>
                      <AccessTimeIcon fontSize="small" color="action" />
                      <Typography variant="caption" color="text.secondary">
                        {surat.tanggal}
                      </Typography>
                    </Box>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>{selectedSurat?.judul}</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <Chip label={selectedSurat?.kategori} variant="outlined" />
              <Chip label={selectedSurat?.prioritas} color={selectedSurat?.prioritas === 'Penting' ? 'error' : 'default'} />
            </Box>
            
            <Paper sx={{ p: 3, bgcolor: 'grey.50', mb: 2 }}>
              <Typography variant="body1" sx={{ whiteSpace: 'pre-line', lineHeight: 1.8 }}>
                {selectedSurat?.isi}
              </Typography>
            </Paper>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AccessTimeIcon fontSize="small" color="action" />
              <Typography variant="caption" color="text.secondary">
                Diterbitkan: {selectedSurat?.tanggal}
              </Typography>
            </Box>

            {selectedSurat?.lampiran && (
              <Box sx={{ mt: 2, p: 2, bgcolor: 'primary.lighter', borderRadius: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
                <DescriptionIcon color="primary" />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="body2" fontWeight="bold">
                    {selectedSurat.lampiran}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Lampiran dokumen
                  </Typography>
                </Box>
                <Button variant="outlined" size="small" startIcon={<DownloadIcon />}>
                  Download
                </Button>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Tutup</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

import { useState } from 'react'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import IconButton from '@mui/material/IconButton'
import DownloadIcon from '@mui/icons-material/Download'
import VisibilityIcon from '@mui/icons-material/Visibility'
import CustomDialog from '../../../components/common/CustomDialog'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import DescriptionIcon from '@mui/icons-material/Description'
import EventIcon from '@mui/icons-material/Event'
import WarningIcon from '@mui/icons-material/Warning'
import EmailIcon from '@mui/icons-material/Email'

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

const getBagdeAndIcon = (kategori, prioritas) => {
  let icon = <DescriptionIcon />
  let color = 'primary'
  
  if (kategori === 'Undangan') {
    icon = <EventIcon />
    color = 'info'
  } else if (kategori === 'Keuangan') {
    icon = <WarningIcon />
    color = 'warning'
  } else if (kategori === 'Akademik') {
    icon = <DescriptionIcon />
    color = 'secondary'
  }

  if (prioritas === 'Penting') color = 'error'

  return { icon, color }
}

export default function InformasiSurat() {
  const [open, setOpen] = useState(false)
  const [selectedSurat, setSelectedSurat] = useState(null)

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
            Informasi & Surat Edaran
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9, fontWeight: 500 }}>
            Kumpulan pengumuman, undangan, dan surat resmi sekolah
          </Typography>
        </Box>
        {/* Background Decorative Icon */}
        <EmailIcon sx={{ 
          position: 'absolute', 
          right: -10, 
          top: -30, 
          fontSize: 220, 
          opacity: 0.1,
          transform: 'rotate(15deg)'
        }} />
      </Box>

      {/* Modern Card List */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {suratData.map((surat) => {
          const { icon, color } = getBagdeAndIcon(surat.kategori, surat.prioritas)
          
          return (
            <Card
              key={surat.id}
              elevation={0}
              sx={{
                p: { xs: 2.5, md: 3 },
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: { xs: 'flex-start', md: 'center' },
                justifyContent: 'space-between',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 24px rgba(0,0,0,0.06)',
                  borderColor: `${color}.main`
                }
              }}
            >
              <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start', flexGrow: 1, mb: { xs: 2, md: 0 } }}>
                <Box sx={{ 
                  width: 56, height: 56, borderRadius: 2, 
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  bgcolor: `${color}.lighter`, color: `${color}.main`, flexShrink: 0,
                  boxShadow: `0 4px 12px rgba(0,0,0,0.02)`
                }}>
                  {icon}
                </Box>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', mb: 0.5 }}>
                    <Typography variant="h6" fontWeight="800" sx={{ color: 'text.primary', lineHeight: 1.2 }}>
                      {surat.judul}
                    </Typography>
                    {surat.prioritas === 'Penting' && (
                      <Chip label="Penting" size="small" color="error" sx={{ fontWeight: 'bold', height: 22 }} />
                    )}
                  </Box>
                  
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {surat.isi}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                    <Chip 
                      label={surat.kategori} 
                      size="small" 
                      variant="outlined"
                      color={color}
                      sx={{ fontWeight: 'bold', borderWidth: 2 }}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
                      <AccessTimeIcon fontSize="small" />
                      <Typography variant="caption" fontWeight="600">
                        {surat.tanggal}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 1, ml: { md: 2 }, width: { xs: '100%', md: 'auto' }, justifyContent: 'flex-end' }}>
                <Button 
                  variant="outlined" 
                  color="primary" 
                  startIcon={<VisibilityIcon />}
                  onClick={() => { setSelectedSurat(surat); setOpen(true) }}
                  sx={{ borderRadius: 2, fontWeight: 600, textTransform: 'none' }}
                >
                  Baca
                </Button>
                {surat.lampiran && (
                  <Button 
                    variant="contained" 
                    color="primary"
                    sx={{ borderRadius: 2, minWidth: 48, px: 0 }}
                  >
                    <DownloadIcon fontSize="small" />
                  </Button>
                )}
              </Box>
            </Card>
          )
        })}
      </Box>

      {/* Surat Detail Dialog */}
      <CustomDialog 
        open={open} 
        onClose={() => setOpen(false)} 
        maxWidth="md" 
        title={selectedSurat?.judul}
        actions={
          <Button onClick={() => setOpen(false)} sx={{ fontWeight: 600 }}>Tutup</Button>
        }
      >
        <Box sx={{ display: 'flex', gap: 1.5, mb: 3 }}>
          <Chip label={selectedSurat?.kategori} variant="outlined" color="primary" sx={{ fontWeight: 'bold', borderWidth: 2 }} />
          {selectedSurat?.prioritas === 'Penting' && (
            <Chip label="Penting" color="error" sx={{ fontWeight: 'bold' }} />
          )}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ml: 'auto', color: 'text.secondary', bgcolor: 'grey.100', px: 1.5, borderRadius: 2 }}>
            <AccessTimeIcon sx={{ fontSize: 16 }} />
            <Typography variant="caption" fontWeight="700">
              {selectedSurat?.tanggal}
            </Typography>
          </Box>
        </Box>
        
        <Paper elevation={0} sx={{ p: 4, bgcolor: '#f8fafc', borderRadius: 3, border: '1px solid', borderColor: 'grey.200', mb: 3 }}>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-line', lineHeight: 1.8, color: 'text.primary', fontWeight: 500 }}>
            {selectedSurat?.isi}
          </Typography>
        </Paper>

        {selectedSurat?.lampiran && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle2" fontWeight="700" color="text.secondary" gutterBottom>
              Lampiran Dokumen
            </Typography>
            <Card elevation={0} sx={{ p: 2, bgcolor: 'primary.50', borderRadius: 2, display: 'flex', alignItems: 'center', gap: 2, border: '1px solid', borderColor: 'primary.200' }}>
              <Box sx={{ p: 1, bgcolor: 'primary.main', borderRadius: 1.5, color: 'white', display: 'flex' }}>
                <DescriptionIcon />
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="body2" fontWeight="800" color="primary.900">
                  {selectedSurat.lampiran}
                </Typography>
                <Typography variant="caption" color="primary.700" fontWeight="500">
                  PDF Document (1.2 MB)
                </Typography>
              </Box>
              <Button variant="contained" size="small" startIcon={<DownloadIcon />} sx={{ borderRadius: 2, fontWeight: 600, px: 2, py: 1, boxShadow: 'none' }}>
                Download
              </Button>
            </Card>
          </Box>
        )}
      </CustomDialog>
    </Box>
  )
}

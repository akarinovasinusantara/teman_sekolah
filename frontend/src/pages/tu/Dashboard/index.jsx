import { useState, useEffect } from 'react'
import { useAuth } from '../../../hooks/useAuth'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import Skeleton from '@mui/material/Skeleton'
import SchoolIcon from '@mui/icons-material/School'
import PeopleIcon from '@mui/icons-material/People'
import ClassIcon from '@mui/icons-material/Class'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import BarChartIcon from '@mui/icons-material/BarChart'
import PieChartIcon from '@mui/icons-material/PieChart'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import {
  BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, Cell
} from 'recharts'

// ─── Warna per status PPDB ───────────────────────────────────────────────────
const PPDB_COLORS = {
  Baru:     '#3B82F6',
  Proses:   '#F59E0B',
  Diterima: '#10B981',
  Ditolak:  '#EF4444',
}

// ─── Custom Tooltip – Keuangan ────────────────────────────────────────────────
const KeuanganTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  const fmt = (v) => `Rp ${(v / 1_000_000).toFixed(1)}Jt`
  return (
    <Box sx={{
      bgcolor: 'background.paper',
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: 2,
      p: 1.5,
      boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
    }}>
      <Typography variant="caption" fontWeight={700} color="text.secondary">{label}</Typography>
      {payload.map((p) => (
        <Box key={p.dataKey} sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: p.color }} />
          <Typography variant="caption" fontWeight={600}>{p.name}: {fmt(p.value)}</Typography>
        </Box>
      ))}
    </Box>
  )
}

// ─── Custom Tooltip – PPDB ───────────────────────────────────────────────────
const PPDBTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <Box sx={{
      bgcolor: 'background.paper',
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: 2,
      p: 1.5,
      boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
    }}>
      <Typography variant="caption" fontWeight={700} color="text.secondary">{label}</Typography>
      {payload.map((p) => (
        <Box key={p.dataKey} sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: p.color || p.fill }} />
          <Typography variant="caption" fontWeight={600}>{p.name}: {p.value} pendaftar</Typography>
        </Box>
      ))}
    </Box>
  )
}

// ─── Empty state ─────────────────────────────────────────────────────────────
const EmptyChart = ({ message }) => (
  <Box sx={{
    flexGrow: 1, display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    bgcolor: '#f8fafc', borderRadius: 2, mt: 2,
    border: '1px dashed', borderColor: 'grey.300', gap: 1, py: 4
  }}>
    <TrendingUpIcon sx={{ fontSize: 40, color: 'grey.300' }} />
    <Typography variant="body2" color="text.disabled" fontWeight={500}>
      {message}
    </Typography>
  </Box>
)

// ─── Stat Cards ──────────────────────────────────────────────────────────────
const statsCards = [
  { title: 'Total Siswa Aktif',  value: '850',        icon: <PeopleIcon fontSize="large" />,         color: '#1565C0', bg: '#E3F2FD' },
  { title: 'Tenaga Pengajar',    value: '52',          icon: <SchoolIcon fontSize="large" />,          color: '#2E7D32', bg: '#E8F5E9' },
  { title: 'Total Rombel',       value: '24',          icon: <ClassIcon fontSize="large" />,           color: '#6A1B9A', bg: '#F3E5F5' },
  { title: 'Pemasukan SPP',      value: 'Rp 125Jt',   icon: <AccountBalanceIcon fontSize="large" />,  color: '#E65100', bg: '#FFF3E0' },
]

// ─── Main Component ──────────────────────────────────────────────────────────
export default function TU_Dashboard() {
  const { user } = useAuth()

  const userProfile = user?.user || user; // Handle both {token, user} and just user object
  const userName = userProfile?.nama_lengkap || 'User';

  const [ppdbStats, setPpdbStats]         = useState(null)
  const [keuanganStats, setKeuanganStats] = useState(null)
  const [loading, setLoading]             = useState(true)
  const [error, setError]                 = useState(null)

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'))
    const token = savedUser?.token

    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }

    const fetchAll = async () => {
      try {
        setLoading(true)
        const [ppdbRes, keuanganRes] = await Promise.all([
          fetch('http://localhost:5000/api/ppdb/stats', { headers }),
          fetch('http://localhost:5000/api/keuangan/stats/monthly', { headers })
        ])

        if (ppdbRes.status === 401 || keuanganRes.status === 401) {
          throw new Error('Sesi kedaluwarsa, silakan login kembali.')
        }

        if (ppdbRes.ok) {
          const data = await ppdbRes.json()
          if (data.success) setPpdbStats(data.data)
        }

        if (keuanganRes.ok) {
          const data = await keuanganRes.json()
          if (data.success) setKeuanganStats(data.data)
        }
      } catch (err) {
        setError(err.message || 'Gagal memuat data grafik')
        console.error('Fetch stats error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchAll()
  }, [])

  // ─── Helper: label currency Y-axis ───────────────────────────────────────
  const formatJuta = (v) => v >= 1_000_000 ? `${(v / 1_000_000).toFixed(0)}Jt` : v

  return (
    <Box sx={{ width: '100%', maxWidth: '100%', overflow: 'hidden', pb: 4 }}>

      {/* Welcome Banner */}
      <Box sx={{
        background: 'linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)',
        borderRadius: 3,
        p: { xs: 3, md: 4 },
        mb: 4,
        color: 'white',
        boxShadow: '0 8px 32px rgba(21, 101, 192, 0.2)',
        display: 'flex',
        alignItems: 'center',
        gap: 3,
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Box sx={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', gap: 3 }}>
          <Avatar sx={{
            width: { xs: 64, md: 80 },
            height: { xs: 64, md: 80 },
            bgcolor: 'white',
            color: '#E65100',
            fontSize: { xs: '2rem', md: '2.5rem' },
            fontWeight: 'bold',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            {userName.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="h4" fontWeight="800" gutterBottom sx={{ fontSize: { xs: '1.75rem', md: '2.125rem' } }}>
              Halo, {userName}! 👋
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9, fontWeight: 500 }}>
              Pusat kendali administrasi dan operasional sekolah.
            </Typography>
          </Box>
        </Box>
        <AccountBalanceIcon sx={{
          position: 'absolute',
          right: -10,
          top: -20,
          fontSize: 200,
          opacity: 0.1,
          transform: 'rotate(-10deg)'
        }} />
      </Box>

      {/* Kartu Statistik */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statsCards.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                alignItems: 'center',
                p: { xs: 2.5, md: 3 },
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 24px rgba(0,0,0,0.06)',
                  borderColor: stat.color
                }
              }}
            >
              <Avatar sx={{ bgcolor: stat.bg, color: stat.color, width: 64, height: 64, mr: 2.5 }}>
                {stat.icon}
              </Avatar>
              <Box>
                <Typography variant="h4" fontWeight="800" sx={{ color: 'text.primary', lineHeight: 1.2 }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary" fontWeight="600" sx={{ mt: 0.5 }}>
                  {stat.title}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Grafik */}
      <Grid container spacing={4}>

        {/* ── Statistik PPDB ──────────────────────────────────────────────── */}
        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{
            p: 3,
            height: 360,
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="h6" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <BarChartIcon color="primary" /> Statistik PPDB
              </Typography>
              {ppdbStats && (
                <Typography variant="caption" color="text.secondary" fontWeight={600}>
                  Total: {ppdbStats.total} pendaftar
                </Typography>
              )}
            </Box>

            {loading ? (
              <Skeleton variant="rectangular" sx={{ flexGrow: 1, borderRadius: 2, mt: 1 }} />
            ) : error || !ppdbStats ? (
              <EmptyChart message={error || 'Belum ada data PPDB'} />
            ) : (
              <Box sx={{ flexGrow: 1, mt: 1 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={ppdbStats.byStatus}
                    margin={{ top: 4, right: 8, left: -16, bottom: 0 }}
                    barCategoryGap="40%"
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                    <XAxis
                      dataKey="status"
                      tick={{ fontSize: 12, fontWeight: 600 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                      allowDecimals={false}
                    />
                    <Tooltip content={<PPDBTooltip />} cursor={{ fill: 'rgba(0,0,0,0.03)' }} />
                    <Bar dataKey="jumlah" name="Jumlah" radius={[6, 6, 0, 0]}>
                      {ppdbStats.byStatus.map((entry) => (
                        <Cell key={entry.status} fill={PPDB_COLORS[entry.status] || '#94a3b8'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            )}

            {/* Legend warna status */}
            {ppdbStats && !loading && (
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 1.5 }}>
                {ppdbStats.byStatus.map(({ status, jumlah }) => (
                  <Box key={status} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: PPDB_COLORS[status] }} />
                    <Typography variant="caption" fontWeight={600} color="text.secondary">
                      {status} ({jumlah})
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Paper>
        </Grid>

        {/* ── Realisasi Keuangan SPP ──────────────────────────────────────── */}
        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{
            p: 3,
            height: 360,
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="h6" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PieChartIcon color="warning" /> Realisasi Keuangan SPP
              </Typography>
              <Typography variant="caption" color="text.secondary" fontWeight={600}>
                12 bulan terakhir
              </Typography>
            </Box>

            {loading ? (
              <Skeleton variant="rectangular" sx={{ flexGrow: 1, borderRadius: 2, mt: 1 }} />
            ) : error || !keuanganStats ? (
              <EmptyChart message={error || 'Belum ada data keuangan SPP'} />
            ) : (
              <Box sx={{ flexGrow: 1, mt: 1 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={keuanganStats}
                    margin={{ top: 4, right: 8, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="gradLunas" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0.02} />
                      </linearGradient>
                      <linearGradient id="gradBelum" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#EF4444" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#EF4444" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                    <XAxis
                      dataKey="label"
                      tick={{ fontSize: 10, fontWeight: 600 }}
                      axisLine={false}
                      tickLine={false}
                      interval={'preserveStartEnd'}
                    />
                    <YAxis
                      tickFormatter={formatJuta}
                      tick={{ fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                      width={46}
                    />
                    <Tooltip content={<KeuanganTooltip />} />
                    <Legend
                      iconType="circle"
                      iconSize={8}
                      wrapperStyle={{ fontSize: 12, fontWeight: 600, paddingTop: 4 }}
                    />
                    <Area
                      type="monotone"
                      dataKey="lunas"
                      name="Lunas"
                      stroke="#10B981"
                      strokeWidth={2}
                      fill="url(#gradLunas)"
                      dot={{ r: 3, fill: '#10B981' }}
                      activeDot={{ r: 5 }}
                    />
                    <Area
                      type="monotone"
                      dataKey="belum_bayar"
                      name="Belum Bayar"
                      stroke="#EF4444"
                      strokeWidth={2}
                      fill="url(#gradBelum)"
                      dot={{ r: 3, fill: '#EF4444' }}
                      activeDot={{ r: 5 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            )}
          </Paper>
        </Grid>

      </Grid>
    </Box>
  )
}

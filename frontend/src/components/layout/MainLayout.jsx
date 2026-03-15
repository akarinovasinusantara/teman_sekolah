import { useState, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../../App'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

// Icons
import DashboardIcon from '@mui/icons-material/Dashboard'
import SchoolIcon from '@mui/icons-material/School'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import PeopleIcon from '@mui/icons-material/People'
import AssessmentIcon from '@mui/icons-material/Assessment'
import EventIcon from '@mui/icons-material/Event'
import DescriptionIcon from '@mui/icons-material/Description'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import GradeIcon from '@mui/icons-material/Grade'
import AnnouncementIcon from '@mui/icons-material/Announcement'
import PaymentIcon from '@mui/icons-material/Payment'
import VisibilityIcon from '@mui/icons-material/Visibility'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import MailIcon from '@mui/icons-material/Mail'
import LogoutIcon from '@mui/icons-material/Logout'

/**
 * =============================================
 * MAIN LAYOUT COMPONENT
 * =============================================
 * 
 * Komponen: MainLayout
 * File: /frontend/src/components/layout/MainLayout.jsx
 * 
 * Deskripsi:
 * Layout utama aplikasi yang digunakan di semua halaman.
 * Menyediakan navigasi sidebar dan top bar yang responsif.
 * 
 * Fitur:
 * - Sidebar navigation dengan menu berdasarkan role
 * - Top bar dengan user profile & logout
 * - Responsive design (mobile drawer & desktop sidebar)
 * - Active menu highlighting
 * - User info display
 * 
 * Struktur Layout:
 * 
 * ┌─────────────────────────────────────┐
 * │           TOP BAR (AppBar)          │
 * │  [Menu]  Sistem Manajemen Sekolah   │
 * │                            [Avatar] │
 * ├──────────┬──────────────────────────┤
 * │          │                          │
 * │  SIDEBAR │    MAIN CONTENT          │
 * │  - Menu  │    (children props)      │
 * │  - Menu  │                          │
 * │  - Menu  │                          │
 * │          │                          │
 * └──────────┴──────────────────────────┘
 */

// Responsive breakpoints
const MOBILE_BREAKPOINT = 900
const drawerWidth = 260

/**
 * Konfigurasi menu berdasarkan role user
 * 
 * Setiap role memiliki menu yang berbeda sesuai dengan
 * hak akses dan fungsionalitas yang tersedia.
 * 
 * Format:
 * - text: Nama menu yang ditampilkan
 * - icon: Icon Material-UI
 * - path: Route path untuk navigasi
 */
const menuByRole = {
  /**
   * SUPER ADMIN - Yayasan/Pengembang
   * Akses: Full access ke semua fitur
   */
  super_admin: [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/super-admin' },
    { text: 'Manajemen Sekolah', icon: <SchoolIcon />, path: '/super-admin/sekolah' },
    { text: 'Laporan Keuangan', icon: <AccountBalanceIcon />, path: '/super-admin/keuangan' },
    { text: 'Kinerja Guru', icon: <AssessmentIcon />, path: '/super-admin/kinerja' },
  ],
  /**
   * TU - Staf Tata Usaha
   * Akses: Administrasi sekolah, PPDB, Keuangan
   */
  tu: [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/tu' },
    { text: 'PPDB', icon: <SchoolIcon />, path: '/tu/ppdb' },
    { text: 'Keuangan SPP', icon: <PaymentIcon />, path: '/tu/keuangan' },
    { text: 'Jadwal Pelajaran', icon: <EventIcon />, path: '/tu/jadwal' },
    { text: 'Surat Menyurat', icon: <DescriptionIcon />, path: '/tu/surat' },
  ],
  /**
   * GURU - Pengajar
   * Akses: Absensi, Nilai, Rapor, Pengumuman
   */
  guru: [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/guru' },
    { text: 'Absensi Siswa', icon: <CheckCircleIcon />, path: '/guru/absensi' },
    { text: 'Input Nilai', icon: <GradeIcon />, path: '/guru/nilai' },
    { text: 'E-Rapor', icon: <MenuBookIcon />, path: '/guru/rapor' },
    { text: 'Pengumuman Kelas', icon: <AnnouncementIcon />, path: '/guru/pengumuman' },
  ],
  /**
   * ORANG TUA - Monitoring anak
   * Akses: Pembayaran, Kehadiran, Nilai, Informasi
   */
  ortu: [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/ortu' },
    { text: 'Pembayaran', icon: <PaymentIcon />, path: '/ortu/pembayaran' },
    { text: 'Monitoring Kehadiran', icon: <VisibilityIcon />, path: '/ortu/kehadiran' },
    { text: 'Hasil Belajar', icon: <AssessmentIcon />, path: '/ortu/hasil-belajar' },
    { text: 'Informasi & Surat', icon: <MailIcon />, path: '/ortu/informasi' },
  ],
  /**
   * SISWA - Informasi pribadi
   * Akses: Pembayaran, Kehadiran, Nilai, Informasi
   */
  siswa: [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/siswa' },
    { text: 'Pembayaran', icon: <PaymentIcon />, path: '/siswa/pembayaran' },
    { text: 'Monitoring Kehadiran', icon: <VisibilityIcon />, path: '/siswa/kehadiran' },
    { text: 'Hasil Belajar', icon: <AssessmentIcon />, path: '/siswa/hasil-belajar' },
    { text: 'Informasi & Surat', icon: <MailIcon />, path: '/siswa/informasi' },
  ],
}

/**
 * Komponen MainLayout
 * 
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Konten halaman yang akan ditampilkan
 * @returns {JSX.Element} Layout utama aplikasi
 */
export default function MainLayout({ children }) {
  // Ambil data user dan fungsi logout dari AuthContext
  const { user, logout } = useContext(AuthContext)
  
  // Hooks untuk navigasi dan routing
  const navigate = useNavigate()
  const location = useLocation()
  
  // Hooks untuk responsive design
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(MOBILE_BREAKPOINT))
  
  // State management
  const [mobileOpen, setMobileOpen] = useState(false)     // State untuk mobile drawer
  const [anchorEl, setAnchorEl] = useState(null)          // State untuk user menu

  /**
   * Handle toggle mobile drawer
   */
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  /**
   * Handle buka user menu
   */
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  /**
   * Handle tutup user menu
   */
  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  /**
   * Handle logout
   * Logout dan redirect ke halaman login
   */
  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  // Get menu items berdasarkan role user dengan fallback
  const menuItems = menuByRole[user?.role] || menuByRole['super_admin'] || []

  /**
   * Get label role user
   * 
   * @returns {string} Label role yang diformat
   */
  const getRoleLabel = () => {
    if (!user?.role) return 'User'
    const roleLabels = {
      super_admin: 'Super Admin',
      tu: 'Tata Usaha',
      guru: 'Guru',
      ortu: 'Orang Tua',
      siswa: 'Siswa',
    }
    return roleLabels[user.role] || 'User'
  }

  // Render drawer content (sidebar)
  const drawer = (
    <Box>
      {/* Logo & Role Info */}
      <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', py: 3 }}>
        <SchoolIcon sx={{ fontSize: 48, color: 'primary.main' }} />
        <Typography variant="h6" sx={{ mt: 1, fontWeight: 'bold' }}>
          Teman Sekolah
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, fontWeight: 500 }}>
          {getRoleLabel()}
        </Typography>
      </Toolbar>
      <Divider />
      
      {/* Menu List */}
      <List>
        {menuItems.map((item) => {
          // Exact match untuk selected state
          const isSelected = location.pathname === item.path

          return (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                onClick={() => navigate(item.path)}
                selected={isSelected}
                sx={{
                  borderRadius: '10px',
                  margin: '4px 12px',
                  minHeight: '44px',
                  // Default state - biru muda
                  backgroundColor: isSelected ? 'rgba(55, 0, 179, 0.08)' : 'transparent',
                  color: '#3700b3',
                  '& .MuiListItemIcon-root': {
                    color: isSelected ? '#3700b3' : '#6b7280',
                  },
                  // Hover state - putih
                  '&:hover': {
                    backgroundColor: '#ffffff',
                    '& .MuiListItemIcon-root': {
                      color: '#3700b3',
                    },
                  },
                  // Selected state
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(55, 0, 179, 0.08)',
                    color: '#3700b3',
                    '& .MuiListItemIcon-root': {
                      color: '#3700b3',
                    },
                    '&:hover': {
                      backgroundColor: '#ffffff',
                    },
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </Box>
  )

  // Render layout utama
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      {/* TOP BAR (AppBar) */}
      <AppBar
        position="fixed"
        sx={{
          width: { xs: '100%', sm: `calc(100% - ${drawerWidth}px)` },
          ml: { xs: 0, sm: `${drawerWidth}px` },
          bgcolor: 'white',
          color: 'text.primary',
          boxShadow: 1,
        }}
      >
        <Toolbar sx={{ minHeight: { xs: 56, sm: 64 } }}>
          {/* Mobile menu button */}
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              display: { xs: 'flex', sm: 'none' },
              color: 'text.primary'
            }}
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          
          {/* Title */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              fontSize: { xs: '1rem', sm: '1.25rem' }
            }}
          >
            Sistem Manajemen Sekolah
          </Typography>
          
          {/* User profile & menu */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
            <Typography
              variant="body2"
              sx={{
                display: { xs: 'none', sm: 'block' },
                fontSize: { xs: '0.75rem', sm: '0.875rem' }
              }}
            >
              {user?.username}
            </Typography>
            <IconButton onClick={handleMenuOpen} size="small">
              <Avatar
                sx={{
                  width: { xs: 28, sm: 32 },
                  height: { xs: 28, sm: 32 },
                  bgcolor: 'primary.main'
                }}
              >
                {user?.username?.charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>
          </Box>
          
          {/* User menu dropdown */}
          <Menu
            anchorEl={anchorEl,
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              sx: { minWidth: '150px' }
            }}
          >
            <MenuItem onClick={handleLogout}>
              <ListItemIcon><LogoutIcon fontSize="small" /></ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      
      {/* SIDEBAR NAVIGATION */}
      <Box
        component="nav"
        sx={{ width: { xs: drawerWidth, sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="navigation menu"
      >
        {/* Mobile drawer (temporary) */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          PaperProps={{
            sx: {
              width: drawerWidth,
            }
          }}
        >
          {drawer}
        </Drawer>
        
        {/* Desktop drawer (permanent) */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      
      {/* MAIN CONTENT */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3, md: 4 },
          width: { xs: '100%', sm: `calc(100% - ${drawerWidth}px)` },
          mt: { xs: 7, sm: 8 },
          minHeight: 'calc(100vh - 64px)',
          maxWidth: '100%',
          overflowX: 'hidden',
          boxSizing: 'border-box',
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

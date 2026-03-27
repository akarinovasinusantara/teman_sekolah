import { useState, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
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
import Tooltip from '@mui/material/Tooltip'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

// ALL Icons
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

// Responsive breakpoints
const MOBILE_BREAKPOINT = 900
const drawerWidth = 260
const collapsedWidth = 88

const menuByRole = {
  super_admin: [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/super-admin' },
    { text: 'Manajemen Sekolah', icon: <SchoolIcon />, path: '/super-admin/sekolah' },
    { text: 'Laporan Keuangan', icon: <AccountBalanceIcon />, path: '/super-admin/keuangan' },
    { text: 'Kinerja Guru', icon: <AssessmentIcon />, path: '/super-admin/kinerja' },
  ],
  tu: [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/tu' },
    { text: 'PPDB', icon: <SchoolIcon />, path: '/tu/ppdb' },
    { text: 'Keuangan SPP', icon: <PaymentIcon />, path: '/tu/keuangan' },
    { text: 'Jadwal Pelajaran', icon: <EventIcon />, path: '/tu/jadwal' },
    { text: 'Surat Menyurat', icon: <DescriptionIcon />, path: '/tu/surat' },
  ],
  guru: [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/guru' },
    { text: 'Absensi Siswa', icon: <CheckCircleIcon />, path: '/guru/absensi' },
    { text: 'Input Nilai', icon: <GradeIcon />, path: '/guru/nilai' },
    { text: 'E-Rapor', icon: <MenuBookIcon />, path: '/guru/rapor' },
    { text: 'Pengumuman Kelas', icon: <AnnouncementIcon />, path: '/guru/pengumuman' },
  ],
  ortu: [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/ortu' },
    { text: 'Pembayaran', icon: <PaymentIcon />, path: '/ortu/pembayaran' },
    { text: 'Monitoring Kehadiran', icon: <VisibilityIcon />, path: '/ortu/kehadiran' },
    { text: 'Hasil Belajar', icon: <AssessmentIcon />, path: '/ortu/hasil-belajar' },
    { text: 'Informasi & Surat', icon: <MailIcon />, path: '/ortu/informasi' },
  ],
  siswa: [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/siswa' },
    { text: 'Pembayaran', icon: <PaymentIcon />, path: '/siswa/pembayaran' },
    { text: 'Monitoring Kehadiran', icon: <VisibilityIcon />, path: '/siswa/kehadiran' },
    { text: 'Hasil Belajar', icon: <AssessmentIcon />, path: '/siswa/hasil-belajar' },
    { text: 'Informasi & Surat', icon: <MailIcon />, path: '/siswa/informasi' },
  ],
}

export default function MainLayout({ children }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(MOBILE_BREAKPOINT))

  const [mobileOpen, setMobileOpen] = useState(false)
  const [desktopOpen, setDesktopOpen] = useState(true)
  const [anchorEl, setAnchorEl] = useState(null)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleDesktopToggle = () => {
    setDesktopOpen(!desktopOpen)
  }

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const menuItems = menuByRole[user?.role] || menuByRole['super_admin'] || []

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

  const currentWidth = desktopOpen ? drawerWidth : collapsedWidth

  const drawer = (
    <Box sx={{ overflowX: 'hidden' }}>
      <Toolbar sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        flexDirection: 'column', 
        py: 3,
        transition: theme.transitions.create('all')
      }}>
        <SchoolIcon sx={{ fontSize: desktopOpen ? 48 : 36, color: 'primary.main', transition: theme.transitions.create('font-size') }} />
        <Box sx={{ 
          height: desktopOpen ? 'auto' : 0, 
          opacity: desktopOpen ? 1 : 0, 
          overflow: 'hidden', 
          transition: theme.transitions.create(['height', 'opacity']),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <Typography variant="h6" sx={{ mt: 1, fontWeight: 'bold', whiteSpace: 'nowrap' }}>
            Teman Sekolah
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, fontWeight: 500, whiteSpace: 'nowrap' }}>
            {getRoleLabel()}
          </Typography>
        </Box>
      </Toolbar>
      <Divider />
      
      <List sx={{ px: desktopOpen ? 1 : 0.5 }}>
        {menuItems.map((item) => {
          const isSelected = location.pathname === item.path

          return (
            <Tooltip title={!desktopOpen ? item.text : ''} placement="right" key={item.text}>
              <ListItem disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  onClick={() => navigate(item.path)}
                  selected={isSelected}
                  sx={{
                    borderRadius: '10px',
                    margin: desktopOpen ? '4px 8px' : '4px auto',
                    minHeight: '44px',
                    padding: desktopOpen ? '8px 16px' : '8px 16px',
                    justifyContent: desktopOpen ? 'flex-start' : 'center',
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'all 0.2s',
                    backgroundColor: isSelected ? 'rgba(55, 0, 179, 0.08)' : 'transparent',
                    color: isSelected ? '#3700b3' : '#4b5563',
                    '& .MuiListItemIcon-root': {
                      color: isSelected ? '#3700b3' : '#6b7280',
                      minWidth: '40px',
                      mr: desktopOpen ? 1 : 'auto',
                      justifyContent: 'center',
                    },
                    '&:hover': {
                      backgroundColor: isSelected ? 'rgba(55, 0, 179, 0.12)' : 'rgba(0, 0, 0, 0.04)',
                      color: '#3700b3',
                      '& .MuiListItemIcon-root': { color: '#3700b3' },
                    },
                    '&.Mui-selected': {
                      backgroundColor: 'rgba(55, 0, 179, 0.08)',
                      color: '#3700b3',
                      '&.Mui-focusVisible': { backgroundColor: 'rgba(55, 0, 179, 0.12)' },
                      '&:hover': { backgroundColor: 'rgba(55, 0, 179, 0.12)' },
                    },
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText 
                    primary={item.text} 
                    primaryTypographyProps={{
                      fontSize: '0.95rem',
                      fontWeight: isSelected ? 600 : 500,
                      lineHeight: 1.2,
                      whiteSpace: 'nowrap'
                    }}
                    sx={{ 
                      my: 0, 
                      opacity: desktopOpen ? 1 : 0, 
                      width: desktopOpen ? 'auto' : 0,
                      display: desktopOpen ? 'block' : 'none',
                      transition: theme.transitions.create(['opacity', 'width'])
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </Tooltip>
          )
        })}
      </List>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      <AppBar
        position="fixed"
        sx={{
          width: { xs: '100%', sm: `calc(100% - ${currentWidth}px)` },
          ml: { xs: 0, sm: `${currentWidth}px` },
          bgcolor: 'white',
          color: 'text.primary',
          boxShadow: 1,
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Toolbar sx={{ minHeight: { xs: 56, sm: 64 } }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { xs: 'flex', sm: 'none' }, color: 'text.primary' }}
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>

          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDesktopToggle}
            sx={{ mr: 2, display: { xs: 'none', sm: 'flex' }, color: 'text.primary' }}
            aria-label="toggle drawer"
          >
            <MenuIcon />
          </IconButton>
          
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, fontSize: { xs: '1rem', sm: '1.25rem' } }}
          >
            Sistem Manajemen Sekolah
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
            <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' }, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
              {user?.username}
            </Typography>
            <IconButton onClick={handleMenuOpen} size="small">
              <Avatar sx={{ width: { xs: 28, sm: 32 }, height: { xs: 28, sm: 32 }, bgcolor: 'primary.main' }}>
                {user?.username?.charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>
          </Box>
          
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose} PaperProps={{ sx: { minWidth: '150px' } }}>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon><LogoutIcon fontSize="small" /></ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      
      <Box
        component="nav"
        sx={{ 
          width: { xs: drawerWidth, sm: currentWidth }, 
          flexShrink: { sm: 0 },
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
        aria-label="navigation menu"
      >
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        
        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: currentWidth, 
              overflowX: 'hidden',
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3, md: 4 },
          width: { xs: '100%', sm: `calc(100% - ${currentWidth}px)` },
          mt: { xs: 7, sm: 8 },
          minHeight: 'calc(100vh - 64px)',
          maxWidth: '100%',
          overflowX: 'hidden',
          boxSizing: 'border-box',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

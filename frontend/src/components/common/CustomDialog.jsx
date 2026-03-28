import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

/**
 * =============================================
 * CUSTOM DIALOG / POPUP COMPONENT
 * =============================================
 * 
 * Menggabungkan Dialog, Header (Title + Close Button), Content, dan Actions
 * agar UI Pop-up di setiap halaman menjadi seragam, pendek, dan sangat rapi.
 */
export default function CustomDialog({
  open,
  onClose,
  title,
  children,
  actions,
  maxWidth = 'sm',
  forceFullScreen = false
}) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  // Jika forceFullScreen true, atau sedang di layar mobile, dialog akan full screen
  const isFullScreen = forceFullScreen || isMobile

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth={maxWidth} 
      fullWidth 
      fullScreen={isFullScreen} 
      PaperProps={{ sx: { borderRadius: isFullScreen ? 0 : 3 } }}
    >
      {title && (
        <DialogTitle sx={{ fontWeight: '800', borderBottom: '1px solid', borderColor: 'divider', pb: 2, pt: 3, px: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {title}
          {onClose && (
            <IconButton onClick={onClose} sx={{ color: 'text.secondary', p: 0.5 }}>
              <CloseIcon />
            </IconButton>
          )}
        </DialogTitle>
      )}
      
      <DialogContent sx={{ p: { xs: 3, md: 4 }, mt: title ? 1 : 0 }}>
        {children}
      </DialogContent>
      
      {actions && (
        <DialogActions sx={{ p: 3, pt: 2, px: 4, bgcolor: '#f8fafc', borderTop: '1px solid', borderColor: 'divider' }}>
          {actions}
        </DialogActions>
      )}
    </Dialog>
  )
}

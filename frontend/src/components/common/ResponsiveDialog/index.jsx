import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

/**
 * ResponsiveDialog
 * 
 * A dialog that adapts to screen size:
 * - Mobile (< 900px): Full screen dialog
 * - Desktop (> 900px): Standard modal dialog with max width
 */
export function ResponsiveDialog({
  open,
  onClose,
  title,
  children,
  actions,
  maxWidth = 'sm',
  fullScreen: propFullScreen = false,
  PaperProps = {},
  sx = {},
}) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(900))
  const fullScreen = propFullScreen || isMobile

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      maxWidth={isMobile ? false : maxWidth}
      fullWidth
      PaperProps={{
        sx: {
          minHeight: isMobile ? '100%' : 'auto',
          height: isMobile ? '100%' : 'auto',
          borderRadius: isMobile ? 0 : 2,
          ...PaperProps.sx,
        },
        ...PaperProps,
      }}
      sx={{
        '& .MuiDialog-paper': {
          maxHeight: isMobile ? '100%' : 'calc(100% - 48px)',
        },
        ...sx,
      }}
    >
      {title && (
        <DialogTitle
          sx={{
            pr: 8,
            py: isMobile ? 2 : 3,
            fontSize: isMobile ? '1.25rem' : '1.5rem',
          }}
        >
          {title}
        </DialogTitle>
      )}
      {(onClose || title) && (
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'text.secondary',
            zIndex: 1,
          }}
          size={isMobile ? 'medium' : 'small'}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      )}
      <DialogContent
        dividers={isMobile}
        sx={{
          p: isMobile ? 2 : 3,
          pt: title || onClose ? (isMobile ? 1 : 2) : (isMobile ? 2 : 3),
        }}
      >
        {children}
      </DialogContent>
      {actions && (
        <DialogActions
          sx={{
            p: isMobile ? 2 : 3,
            flexDirection: isMobile ? 'column-reverse' : 'row',
            gap: isMobile ? 1 : 1,
            '& .MuiButton-root': {
              minWidth: isMobile ? '100%' : 'auto',
            },
          }}
        >
          {actions}
        </DialogActions>
      )}
    </Dialog>
  )
}

/**
 * ResponsiveDialog with form-specific enhancements
 */
export function ResponsiveFormDialog({
  open,
  onClose,
  title,
  subtitle,
  children,
  actions,
  maxWidth = 'md',
}) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(900))

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={isMobile}
      maxWidth={isMobile ? false : maxWidth}
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: isMobile ? 0 : 2,
        },
      }}
    >
      <Box
        sx={{
          p: isMobile ? 2 : 3,
          pb: isMobile ? 1 : 2,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Typography 
          variant="h5" 
          fontWeight="bold"
          sx={{ 
            fontSize: isMobile ? '1.25rem' : '1.5rem',
            pr: 6,
          }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ 
              mt: 0.5,
              fontSize: isMobile ? '0.875rem' : '0.75rem',
            }}
          >
            {subtitle}
          </Typography>
        )}
      </Box>
      
      <DialogContent
        dividers={isMobile}
        sx={{
          p: isMobile ? 2 : 3,
        }}
      >
        {children}
      </DialogContent>

      {actions && (
        <DialogActions
          sx={{
            p: isMobile ? 2 : 3,
            flexDirection: isMobile ? 'column-reverse' : 'row',
            gap: 1,
            '& .MuiButton-root': {
              minWidth: isMobile ? '100%' : 'auto',
              py: isMobile ? 1.5 : 1,
            },
          }}
        >
          {actions}
        </DialogActions>
      )}
    </Dialog>
  )
}

/**
 * ResponsiveDialog for displaying details
 */
export function ResponsiveDetailDialog({
  open,
  onClose,
  title,
  items = [],
  actions,
}) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(900))

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={isMobile}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: isMobile ? 0 : 2,
        },
      }}
    >
      <DialogTitle
        sx={{
          fontSize: isMobile ? '1.25rem' : '1.5rem',
          fontWeight: 'bold',
          pr: 6,
        }}
      >
        {title}
      </DialogTitle>
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: 'text.secondary',
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent sx={{ pt: 1 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: isMobile ? 2 : 2.5,
            py: 1,
          }}
        >
          {items.map((item, index) => (
            <Box
              key={item.label || index}
              sx={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                gap: isMobile ? 0.5 : 0,
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight="500"
                sx={{
                  width: isMobile ? '100%' : { xs: '100%', sm: '150px' },
                  flexShrink: 0,
                  fontSize: isMobile ? '0.875rem' : '0.75rem',
                }}
              >
                {item.label}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  flexGrow: 1,
                  fontSize: isMobile ? '0.9375rem' : '0.875rem',
                  ...(item.valueComponent ? {} : { wordBreak: 'break-word' }),
                }}
              >
                {item.valueComponent || item.value || '-'}
              </Typography>
            </Box>
          ))}
        </Box>
      </DialogContent>
      {actions && (
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
          {actions}
        </DialogActions>
      )}
    </Dialog>
  )
}

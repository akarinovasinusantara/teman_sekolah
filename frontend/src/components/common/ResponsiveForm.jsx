import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormHelperText from '@mui/material/FormHelperText'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

/**
 * ResponsiveFormContainer
 * 
 * A container for forms that adjusts layout based on screen size
 * - Mobile (< 900px): Single column, full-width fields
 * - Desktop (> 900px): Multi-column layout with specified max width
 */
export function ResponsiveFormContainer({ 
  children, 
  maxWidth = 'md', 
  spacing = 2,
  sx = {},
}) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(900))

  return (
    <Box
      sx={{
        maxWidth: isMobile ? '100%' : maxWidth === 'sm' ? 600 : maxWidth === 'md' ? 800 : maxWidth === 'lg' ? 1000 : 1200,
        margin: '0 auto',
        ...sx,
      }}
    >
      <Grid container spacing={isMobile ? 2 : spacing}>
        {children}
      </Grid>
    </Box>
  )
}

/**
 * ResponsiveTextField
 * 
 * A TextField that adapts to screen size
 */
export function ResponsiveTextField({
  label,
  name,
  value,
  onChange,
  required = false,
  error = false,
  helperText = '',
  multiline = false,
  rows = 3,
  type = 'text',
  fullWidth = true,
  size: propSize = 'medium',
  InputProps,
  inputProps,
  sx = {},
  ...other
}) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(900))

  return (
    <Grid size={{ xs: 12, sm: fullWidth ? 12 : 6 }}>
      <TextField
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        error={error}
        helperText={helperText}
        multiline={multiline}
        rows={multiline ? (isMobile ? 4 : rows) : undefined}
        type={type}
        fullWidth
        size={isMobile ? 'medium' : propSize}
        InputProps={InputProps}
        inputProps={{
          ...inputProps,
          style: {
            fontSize: isMobile ? '1rem' : '0.875rem',
            ...inputProps?.style,
          },
        }}
        sx={{
          '& .MuiFormHelperText-root': {
            fontSize: '0.75rem',
          },
          ...sx,
        }}
        {...other}
      />
    </Grid>
  )
}

/**
 * ResponsiveSelect
 * 
 * A Select field that adapts to screen size
 */
export function ResponsiveSelect({
  label,
  name,
  value,
  onChange,
  options = [],
  required = false,
  error = false,
  helperText = '',
  fullWidth = true,
  native = false,
  sx = {},
  ...other
}) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(900))

  return (
    <Grid size={{ xs: 12, sm: fullWidth ? 12 : 6 }}>
      <FormControl 
        fullWidth 
        error={error}
        required={required}
        size={isMobile ? 'medium' : 'medium'}
        sx={sx}
      >
        <InputLabel>{label}</InputLabel>
        <Select
          label={label}
          name={name}
          value={value}
          onChange={onChange}
          native={native}
          MenuProps={{
            PaperProps: {
              sx: {
                maxHeight: isMobile ? 250 : 300,
              },
            },
          }}
          sx={{
            fontSize: isMobile ? '1rem' : '0.875rem',
            '& .MuiSelect-select': {
              py: isMobile ? 1.5 : 1,
            },
            ...sx,
          }}
          {...other}
        >
          {native ? (
            options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))
          ) : (
            options.map((opt) => (
              <MenuItem 
                key={opt.value} 
                value={opt.value}
                sx={{ 
                  fontSize: isMobile ? '1rem' : '0.875rem',
                  py: isMobile ? 1.5 : 1,
                }}
              >
                {opt.label}
              </MenuItem>
            ))
          )}
        </Select>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </Grid>
  )
}

/**
 * ResponsiveFormActions
 * 
 * Action buttons container that stacks on mobile and rows on desktop
 */
export function ResponsiveFormActions({ 
  children, 
  justifyContent = 'flex-end',
  gap = 1,
  sx = {},
}) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(900))

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isMobile ? 'column-reverse' : 'row',
        gap: { xs: 1, sm: gap },
        justifyContent: isMobile ? 'stretch' : justifyContent,
        mt: 3,
        ...sx,
      }}
    >
      {children}
    </Box>
  )
}

/**
 * ResponsiveButtonGroup
 * 
 * Button group that adapts to screen size
 */
export function ResponsiveButtonGroup({ 
  children, 
  fullWidth: full = false,
  gap = 1,
  sx = {},
}) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(900))

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: { xs: gap, sm: gap },
        width: full || isMobile ? '100%' : 'auto',
        ...sx,
      }}
    >
      {children}
    </Box>
  )
}

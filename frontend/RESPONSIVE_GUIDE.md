# Responsive Design Guide - Sistem Manajemen Sekolah

## Overview

This guide explains the responsive design implementation for the school management system, with breakpoints at **900px**:
- **Phone (< 900px)**: Mobile-optimized layouts
- **Desktop (> 900px)**: Full-featured desktop layouts

## Breakpoint System

We use Material-UI's breakpoint system with a custom 900px threshold:

```javascript
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

const theme = useTheme()
const isMobile = useMediaQuery(theme.breakpoints.down(900))
```

## Key Components

### 1. Navigation (MainLayout)

**Desktop:**
- Permanent sidebar drawer (260px width)
- Full username display
- Larger avatar (32px)

**Mobile:**
- Temporary hamburger menu drawer
- Hidden username (space-saving)
- Smaller avatar (28px)
- Reduced toolbar height (56px vs 64px)

### 2. Data Tables

Two approaches for responsive tables:

#### Approach A: Conditional Rendering (Recommended for simple tables)

```javascript
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'

const isMobile = useMediaQuery(theme.breakpoints.down(900))

return (
  <>
    {!isMobile ? (
      // Desktop: Table View
      <TableContainer component={Paper}>
        <Table>
          <TableHead>...</TableHead>
          <TableBody>...</TableBody>
        </Table>
      </TableContainer>
    ) : (
      // Mobile: Card View
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {data.map((item) => (
          <Card key={item.id} sx={{ boxShadow: 2 }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold">
                {item.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.details}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    )}
  </>
)
```

#### Approach B: Reusable ResponsiveTable Component

```javascript
import ResponsiveTable from '../components/common/ResponsiveTable'

<ResponsiveTable
  columns={[
    { key: 'nama', label: 'Nama' },
    { key: 'status', label: 'Status' },
  ]}
  data={data}
  mobileTitleKey="nama"
  actions={(row) => (
    <>
      <IconButton size="small"><EditIcon /></IconButton>
      <IconButton size="small"><DeleteIcon /></IconButton>
    </>
  )}
/>
```

### 3. Forms

#### Responsive Form Layout

```javascript
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'

<Paper sx={{ p: { xs: 2, sm: 3 }, mb: 3 }}>
  <Grid container spacing={2}>
    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
      <TextField label="Field 1" fullWidth />
    </Grid>
    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
      <TextField label="Field 2" fullWidth />
    </Grid>
    <Grid size={{ xs: 12, sm: 12, md: 4 }}>
      <TextField label="Field 3" fullWidth />
    </Grid>
  </Grid>
</Paper>
```

#### Responsive Form Actions

```javascript
<Box
  sx={{
    display: 'flex',
    flexDirection: { xs: 'column-reverse', sm: 'row' },
    gap: { xs: 1, sm: 2 },
    '& .MuiButton-root': {
      minWidth: { xs: '100%', sm: 'auto' },
    },
  }}
>
  <Button onClick={handleCancel}>Batal</Button>
  <Button variant="contained" onClick={handleSave}>Simpan</Button>
</Box>
```

### 4. Dialogs

```javascript
import Dialog from '@mui/material/Dialog'
import useMediaQuery from '@mui/material/useMediaQuery'

const isMobile = useMediaQuery(theme.breakpoints.down(900))

<Dialog
  open={open}
  onClose={handleClose}
  maxWidth="sm"
  fullWidth
  fullScreen={isMobile}  // Full screen on mobile
>
  <DialogTitle sx={{ pr: 6 }}>Title</DialogTitle>
  <IconButton
    onClick={handleClose}
    sx={{
      position: 'absolute',
      right: 8,
      top: 8,
    }}
  >
    <CloseIcon />
  </IconButton>
  <DialogContent>
    {/* Content */}
  </DialogContent>
  <DialogActions
    sx={{
      flexDirection: { xs: 'column-reverse', sm: 'row' },
      '& .MuiButton-root': {
        minWidth: { xs: '100%', sm: 'auto' },
      },
    }}
  >
    <Button>Batal</Button>
    <Button variant="contained">Simpan</Button>
  </DialogActions>
</Dialog>
```

Or use the reusable component:

```javascript
import { ResponsiveDialog } from '../components/common/ResponsiveDialog'

<ResponsiveDialog
  open={open}
  onClose={handleClose}
  title="Dialog Title"
  actions={
    <>
      <Button>Batal</Button>
      <Button variant="contained">Simpan</Button>
    </>
  }
>
  {/* Content */}
</ResponsiveDialog>
```

### 5. Typography

Responsive font sizes using MUI's sx prop:

```javascript
<Typography
  variant="h4"
  sx={{
    fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
  }}
>
  Title
</Typography>

<Typography
  variant="body1"
  sx={{
    fontSize: { xs: '0.875rem', sm: '1rem' },
  }}
>
  Body text
</Typography>
```

### 6. Spacing & Layout

```javascript
<Box
  sx={{
    p: { xs: 2, sm: 3, md: 4 },  // Padding
    m: { xs: 1, sm: 2 },          // Margin
    gap: { xs: 1, sm: 2, md: 3 }, // Gap between flex/grid items
  }}
>
  Content
</Box>
```

## Common Patterns

### Page Header with Action Buttons

```javascript
<Box
  sx={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 3,
    flexDirection: { xs: 'column', sm: 'row' },
    gap: { xs: 2, sm: 0 },
  }}
>
  <Typography variant="h4" fontWeight="bold">
    Page Title
  </Typography>
  <Button
    variant="contained"
    startIcon={<AddIcon />}
    fullWidth={isMobile}
  >
    Add Item
  </Button>
</Box>
```

### Filter/Search Bar

```javascript
<Paper sx={{ p: { xs: 2, sm: 3 }, mb: 3 }}>
  <Grid container spacing={2}>
    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
      <TextField label="Filter 1" fullWidth />
    </Grid>
    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
      <TextField label="Filter 2" fullWidth />
    </Grid>
    <Grid size={{ xs: 12, sm: 12, md: 4 }}>
      <Button variant="contained" fullWidth>
        Search
      </Button>
    </Grid>
  </Grid>
</Paper>
```

### Stats Cards

```javascript
<Grid container spacing={{ xs: 2, md: 3 }}>
  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
    <Paper sx={{ p: 2, textAlign: 'center' }}>
      <Typography variant="h3" color="primary" fontWeight="bold">
        150
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Total Students
      </Typography>
    </Paper>
  </Grid>
  {/* More cards... */}
</Grid>
```

## Best Practices

1. **Mobile-First Thinking**: Design for mobile first, then enhance for desktop
2. **Touch-Friendly**: Ensure buttons and interactive elements are at least 44x44px on mobile
3. **Readable Text**: Minimum font size of 14px (0.875rem) for body text
4. **Adequate Spacing**: Use generous padding on mobile (minimum 16px)
5. **Stack Vertically**: On mobile, stack elements vertically instead of horizontally
6. **Full-Width Buttons**: Make action buttons full-width on mobile for easier tapping
7. **Simplify Tables**: Convert tables to cards on mobile for better readability
8. **Full-Screen Dialogs**: Use full-screen dialogs on mobile for better UX

## MUI Breakpoint Values (Default)

```
xs: 0px      (extra small - phones)
sm: 600px    (small - tablets)
md: 900px    (medium - small laptops)
lg: 1200px   (large - desktops)
xl: 1536px   (extra large - large screens)
```

## Testing Responsive Design

1. **Chrome DevTools**: Use device toolbar (Ctrl+Shift+M) to test different screen sizes
2. **Real Devices**: Test on actual phones and tablets
3. **Resize Browser**: Manually resize browser window to check breakpoints

## Example: Complete Responsive Page

```javascript
import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

export default function ExamplePage() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(900))
  const [data, setData] = useState([])

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 2, sm: 0 },
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}
        >
          Page Title
        </Typography>
        <Button
          variant="contained"
          fullWidth={isMobile}
        >
          Add Item
        </Button>
      </Box>

      {/* Filters */}
      <Paper sx={{ p: { xs: 2, sm: 3 }, mb: 3 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField label="Search" fullWidth />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField select label="Filter" fullWidth>
              <option value="all">All</option>
              <option value="active">Active</option>
            </TextField>
          </Grid>
        </Grid>
      </Paper>

      {/* Data Display */}
      {!isMobile ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{/* rows */}</TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {data.map((item) => (
            <Card key={item.id}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold">
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.status}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  )
}
```

## Files Reference

- `/src/utils/responsive.js` - Utility functions and constants
- `/src/components/common/ResponsiveTable.jsx` - Reusable responsive table
- `/src/components/common/ResponsiveForm.jsx` - Responsive form components
- `/src/components/common/ResponsiveDialog.jsx` - Responsive dialog components
- `/src/components/layout/MainLayout.jsx` - Responsive navigation layout

## Next Steps

To apply responsive design to other pages:

1. Import `useMediaQuery` and `useTheme`
2. Determine `isMobile` based on 900px breakpoint
3. Use responsive sx props for spacing, typography, and layout
4. Convert tables to card layouts for mobile
5. Make dialogs full-screen on mobile
6. Stack form fields vertically on mobile
7. Test on various screen sizes

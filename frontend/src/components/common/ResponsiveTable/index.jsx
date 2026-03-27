import { useState } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Collapse from '@mui/material/Collapse'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'

/**
 * ResponsiveTable Component
 * 
 * Automatically switches between table view (desktop) and card view (mobile)
 * 
 * @param {Array} columns - Column definitions with fields: key, label, align, render (optional)
 * @param {Array} data - Array of data objects
 * @param {Function} renderMobileCard - Custom render function for mobile card view (optional)
 * @param {string} mobileTitleKey - Key to use for mobile card title
 * @param {string} mobileSubtitleKey - Key to use for mobile card subtitle (optional)
 */
export default function ResponsiveTable({
  columns = [],
  data = [],
  renderMobileCard,
  mobileTitleKey = 'id',
  mobileSubtitleKey,
  actions,
}) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(900))
  const [expandedRow, setExpandedRow] = useState(null)

  if (isMobile) {
    // Mobile Card View
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {data.map((row, index) => (
          <Card 
            key={row[mobileTitleKey] || index}
            sx={{ 
              boxShadow: 2,
              '&:hover': { boxShadow: 4 }
            }}
          >
            {renderMobileCard ? (
              renderMobileCard(row, index)
            ) : (
              <CardContent sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="h6" fontWeight="bold">
                    {String(row[mobileTitleKey])}
                  </Typography>
                  {mobileSubtitleKey && row[mobileSubtitleKey] && (
                    <Typography variant="caption" color="text.secondary">
                      {row[mobileSubtitleKey]}
                    </Typography>
                  )}
                </Box>
                <Divider sx={{ mb: 2 }} />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {columns.map((col) => (
                    <Box 
                      key={col.key}
                      sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Typography variant="body2" color="text.secondary" fontWeight="500">
                        {col.label}
                      </Typography>
                      <Typography variant="body2" sx={{ textAlign: 'right', flex: 1, ml: 2 }}>
                        {col.render ? col.render(row) : String(row[col.key] || '-')}
                      </Typography>
                    </Box>
                  ))}
                </Box>
                {actions && (
                  <Box sx={{ display: 'flex', gap: 1, mt: 2, justifyContent: 'flex-end' }}>
                    {actions(row, index)}
                  </Box>
                )}
              </CardContent>
            )}
          </Card>
        ))}
      </Box>
    )
  }

  // Desktop Table View
  return (
    <TableContainer component={Paper}>
      <Table size="medium">
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell
                key={col.key}
                align={col.align || 'left'}
                sx={{ 
                  fontWeight: 'bold',
                  fontSize: '0.875rem',
                }}
              >
                {col.label}
              </TableCell>
            ))}
            {actions && (
              <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>
                Aksi
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow 
              key={row[mobileTitleKey] || index}
              hover
              sx={{ 
                '&:hover': { bgcolor: 'grey.50' },
              }}
            >
              {columns.map((col) => (
                <TableCell 
                  key={col.key}
                  align={col.align || 'left'}
                  sx={{ fontSize: '0.875rem' }}
                >
                  {col.render ? col.render(row) : String(row[col.key] || '-')}
                </TableCell>
              ))}
              {actions && (
                <TableCell align="right">
                  <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'flex-end' }}>
                    {actions(row, index)}
                  </Box>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

/**
 * ResponsiveTableWithExpand Component
 * 
 * Table with expandable rows for mobile view
 */
export function ResponsiveTableWithExpand({
  columns = [],
  data = [],
  renderExpandableContent,
  mobileTitleKey = 'id',
  actions,
}) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(900))
  const [expandedRow, setExpandedRow] = useState(null)

  const handleExpand = (row) => {
    setExpandedRow(expandedRow === row ? null : row)
  }

  if (isMobile) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {data.map((row, index) => (
          <Paper 
            key={row[mobileTitleKey] || index}
            sx={{ 
              overflow: 'hidden',
              transition: 'box-shadow 0.3s',
              '&:hover': { boxShadow: 3 }
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                p: 2,
                cursor: 'pointer',
              }}
              onClick={() => handleExpand(row)}
            >
              <IconButton size="small" sx={{ mr: 1 }}>
                {expandedRow === row ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {String(row[mobileTitleKey])}
                </Typography>
                {columns.slice(0, 2).map((col) => (
                  <Typography key={col.key} variant="body2" color="text.secondary">
                    {col.label}: {col.render ? col.render(row) : String(row[col.key] || '-')}
                  </Typography>
                ))}
              </Box>
              {actions && (
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                  {actions(row, index, true)}
                </Box>
              )}
            </Box>
            <Collapse in={expandedRow === row}>
              <Divider />
              <Box sx={{ p: 2, bgcolor: 'grey.50' }}>
                {renderExpandableContent && renderExpandableContent(row)}
              </Box>
            </Collapse>
          </Paper>
        ))}
      </Box>
    )
  }

  // Desktop Table View
  return (
    <TableContainer component={Paper}>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: 50 }}></TableCell>
            {columns.map((col) => (
              <TableCell
                key={col.key}
                align={col.align || 'left'}
                sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}
              >
                {col.label}
              </TableCell>
            ))}
            {actions && (
              <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>
                Aksi
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={row[mobileTitleKey] || index}>
              <TableCell>
                <IconButton size="small" onClick={() => handleExpand(row)}>
                  {expandedRow === row ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              </TableCell>
              {columns.map((col) => (
                <TableCell 
                  key={col.key}
                  align={col.align || 'left'}
                  sx={{ fontSize: '0.875rem' }}
                >
                  {col.render ? col.render(row) : String(row[col.key] || '-')}
                </TableCell>
              ))}
              {actions && (
                <TableCell align="right">
                  <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'flex-end' }}>
                    {actions(row, index)}
                  </Box>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

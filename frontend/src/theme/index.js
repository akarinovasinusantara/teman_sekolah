import { createTheme } from '@mui/material/styles';

/**
 * =============================================
 * GLOBAL TEMAN SEKOLAH THEME
 * =============================================
 * Mengontrol konsistensi warna, tipografi, dan komponen
 * di seluruh aplikasi agar persis seperti standar "Siswa Blue".
 */
export const appTheme = createTheme({
  palette: {
    primary: {
      main: '#1565C0', // Siswa Blue
      light: '#1E88E5',
      dark: '#0D47A1',
      contrastText: '#ffffff',
    },
    // Biarkan secondary, error, warning menggunakan default elegan MUI
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    button: {
      textTransform: 'none', // Menghilangkan huruf kapital otomatis
      fontWeight: 700,
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        // Gaya dasar (Root) untuk semua button
        root: {
          borderRadius: '8px',
          padding: '8px 24px',
          transition: 'all 0.2s ease-in-out',
        },
        
        // Gaya khusus untuk PRIMARY BUTTON (variant="contained")
        contained: {
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
          },
          '&:active': {
            transform: 'translateY(0)',
          }
        },
        
        // Gaya khusus untuk SECONDARY BUTTON (variant="outlined")
        outlined: {
          padding: '7px 23px', // Penyesuaian karena border 1px
          borderWidth: '1.5px',
          '&:hover': {
            borderWidth: '1.5px',
            backgroundColor: 'rgba(21, 101, 192, 0.08)',
          }
        },
        
        // Gaya khusus untuk TERTIARY BUTTON (variant="text")
        text: {
          color: '#475569', // Slate 600 default
          '&:hover': {
            backgroundColor: '#F1F5F9', // Slate 100
            color: '#0F172A',
          }
        },

        // Mengatur prop default agar varian minimal memiliki warna standar
        colorInherit: {
          color: 'inherit',
        }
      }
    }
  }
});

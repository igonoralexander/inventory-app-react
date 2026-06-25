
import { createTheme } from '@mui/material/styles';

 const theme = createTheme({
  palette: {
    primary: {
      main: '#2563EB', // Blue for primary actions
    },
    secondary: {
      main: '#4B5563', // A neutral gray for secondary actions
    },
    success: {
        main: '#10B981', // Green for success states
    },
    warning: {
        main: '#F59E0B', // Orange for warnings
    },
    error: {
        main: '#EF4444', // Red for errors and destructive actions
    },
    background: {
      default: '#F3F4F6', // A very subtle gray for the page background
      paper: '#FFFFFF',
    },
    text: {
        primary: '#1E293B',
        secondary: '#64748B',
    }
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    h4: { fontWeight: 700, color: '#1E293B' },
    h5: { fontWeight: 600, color: '#1E293B' },
    h6: { fontWeight: 600, color: '#1E293B' },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#F3F4F6',
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 600,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          }
        }
      }
    },
    MuiPaper: {
        styleOverrides: {
            root: {
                boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.05), 0px 1px 2px rgba(0, 0, 0, 0.1)',
            }
        }
    },
    MuiTableHead: {
        styleOverrides: {
            root: {
                backgroundColor: '#F9FAFB',
            }
        }
    },
    MuiTableCell: {
        styleOverrides: {
            head: {
                fontWeight: 'bold',
                color: '#4B5563',
            }
        }
    },
  },
});

export default theme;

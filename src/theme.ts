import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      mode: 'light',
      background: {
        default: '#F9FAFB',
        paper: '#FFFFFF',
      },
      primary: {
        main: '#6366F1',
      },
      text: {
        primary: '#1F2937',
        secondary: '#6B7280',
      },
    },
    typography: {
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
      h4: {
        fontWeight: 700,
      },
      h5: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 700, 
      }
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none',
            fontWeight: 600,
          },
        },
      },
       MuiPaper: {
        styleOverrides: {
            root: {
                border: '1px solid #E5E7EB',
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
            }
        }
       },
       MuiAppBar: {
        styleOverrides: {
            root: {
                boxShadow: 'none',
                borderBottom: '1px solid #E5E7EB'
            }
        }
       }
    },
  });

  export default theme;

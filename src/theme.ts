import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2563EB',
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
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            display: 'none',
          },
          '&, & * ': {
            scrollbarWidth: 'none',
            'ms-overflow-style': 'none',
          },
        },
      },
    },
  },
});

export default theme;

import { createTheme } from '@mui/material/styles';

const baseTheme = {
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: '2.5rem', fontWeight: 500 },
    h2: { fontSize: '2rem', fontWeight: 500 },
    h3: { fontSize: '1.75rem', fontWeight: 500 },
    h4: { fontSize: '1.5rem', fontWeight: 500 },
    h5: { fontSize: '1.25rem', fontWeight: 500 },
    h6: { fontSize: '1rem', fontWeight: 500 },
    body1: { fontSize: '1rem' },
    body2: { fontSize: '0.875rem' }
  },
  shape: {
    borderRadius: 4
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '4px'
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
        }
      }
    }
  }
};

export const lightTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: 'light',
    primary: {
      main: '#2E7D32',
      light: '#4CAF50',
      dark: '#1B5E20',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#1976D2',
      light: '#42A5F5',
      dark: '#1565C0',
      contrastText: '#FFFFFF'
    },
    error: {
      main: '#D32F2F',
      light: '#EF5350',
      dark: '#C62828'
    },
    warning: {
      main: '#ED6C02',
      light: '#FF9800',
      dark: '#E65100'
    },
    info: {
      main: '#0288D1',
      light: '#03A9F4',
      dark: '#01579B'
    },
    success: {
      main: '#2E7D32',
      light: '#4CAF50',
      dark: '#1B5E20'
    },
    background: {
      default: '#F5F5F5',
      paper: '#FFFFFF'
    },
    text: {
      primary: '#212121',
      secondary: '#757575'
    }
  }
});

export const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: 'dark',
    primary: {
      main: '#4CAF50',
      light: '#81C784',
      dark: '#388E3C',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#42A5F5',
      light: '#90CAF9',
      dark: '#1976D2',
      contrastText: '#FFFFFF'
    },
    error: {
      main: '#EF5350',
      light: '#E57373',
      dark: '#D32F2F'
    },
    warning: {
      main: '#FF9800',
      light: '#FFB74D',
      dark: '#F57C00'
    },
    info: {
      main: '#03A9F4',
      light: '#4FC3F7',
      dark: '#0288D1'
    },
    success: {
      main: '#4CAF50',
      light: '#81C784',
      dark: '#388E3C'
    },
    background: {
      default: '#121212',
      paper: '#1E1E1E'
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0B0'
    }
  }
});

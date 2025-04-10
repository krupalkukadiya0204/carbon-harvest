import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Basic theme for styled-components
const styledTheme = {
  colors: {
    primary: '#007bff',
    background: '#ffffff',
    text: '#000000',
  },
};

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ChakraProvider>
        <CSSReset />
        <ThemeProvider>
          <StyledThemeProvider theme={styledTheme}>
            <LanguageProvider>
              <App />
            </LanguageProvider>
          </StyledThemeProvider>
        </ThemeProvider>
      </ChakraProvider>
    </AuthProvider>
  </React.StrictMode>
);
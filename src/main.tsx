import { ThemeProvider } from '@emotion/react';
import { GlobalStyles } from './shared/styles/GlobalStyles';
import { theme } from './shared/styles/theme';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <App />
    </ThemeProvider>
  </StrictMode>,
);

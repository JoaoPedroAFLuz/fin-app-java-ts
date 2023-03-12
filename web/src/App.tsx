import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { Router } from './Router';

import GlobalStyles from './assets/styles/globalStyles';
import { defaultTheme } from './assets/styles/themes/default';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />

        <Router />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;

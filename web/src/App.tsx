import { ThemeProvider } from 'styled-components';

import GlobalStyles from './assets/styles/globalStyles';
import { defaultTheme } from './assets/styles/themes/default';

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <h1>Hello World!</h1>
    </ThemeProvider>
  );
}

export default App;

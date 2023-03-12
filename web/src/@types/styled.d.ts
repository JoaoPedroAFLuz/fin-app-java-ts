import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: string;
      primary: {
        dark: string;
        main: string;
        light: string;
      };
      success: {
        main: string;
      };
      danger: {
        main: string;
      };
      gray: {
        [100]: string;
        [200]: string;
      };
    };
  }
}

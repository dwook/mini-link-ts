import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    size: {
      mobile: number;
      tablet: number;
      desktop: number;
    }

    media: {
      mobile: string;
      tablet: string;
      desktop: string;
    }

    colors: {
      red: string;
      orange: string;
      blue: string;
      green: string;
      yellow: string;
      black: string;
      darkgray: string;
      gray: string;
      lightgray: string;
      primary: string;
    };
  }
}

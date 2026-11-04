import '@emotion/react';
import { colors } from './colors';

export const theme = {
  colors,
};

declare module '@emotion/react' {
  export interface Theme {
    colors: typeof theme.colors;
  }
}

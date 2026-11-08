import { colors } from './colors';
import { Global, css, type Theme } from '@emotion/react';

const globalStyles = (theme: Theme) => css`
  :root {
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 87.5%;
    --page-max-width: 96rem;
    --page-content-width: 90rem;
    --page-gutter: clamp(1rem, 3.5vw, 2.5rem);
    --section-gap: clamp(1.25rem, 2.5vw, 2.5rem);
    color: ${colors.label.strong};
    background: ${theme.colors.background.normal};
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  }
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    min-width: 0;
  }
  button,
  a,
  input,
  select {
    -webkit-tap-highlight-color: transparent;
  }
  button,
  select {
    font: inherit;
  }
  button {
    color: inherit;
    border: 0;
    cursor: pointer;
    background: none;
    padding: 0;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  button:focus-visible,
  a:focus-visible {
    outline: 2px solid ${theme.colors.primary.strong};
    outline-offset: 0.3125rem;
  }
  button:hover {
    filter: brightness(1.12);
  }
  img {
    display: block;
    flex-shrink: 0;
  }
  h1,
  h2,
  h3,
  p {
    margin: 0;
  }
  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 2rem;
    letter-spacing: -0.4px;
  }
  ul,
  ol {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  @media (max-width: 700px) {
    :root {
      font-size: 100%;
    }
    h2 {
      font-size: 1.1875rem;
      line-height: 1.75rem;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      scroll-behavior: auto !important;
      transition: none !important;
    }
  }
`;

export function GlobalStyles() {
  return <Global styles={globalStyles} />;
}

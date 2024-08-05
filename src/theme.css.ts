import { createGlobalTheme } from '@vanilla-extract/css';

export const vars = createGlobalTheme(':root', {
  colors: {
    primary: '#1a73e8',
    background: '#f0f0f0',
    white: '#fff',
    border: '#dadce0',
    text: {
      primary: '#000',
      secondary: '#bdc1c6',
    },
  },
  space: {
    small: '8px',
    medium: '12px',
    large: '20px',
    xlarge: '24px',
  },
  fontSizes: {
    small: '0.8rem',
    medium: '1rem',
    large: '2rem',
  },
  radii: {
    small: '4px',
    medium: '8px',
  },
  sizes: {
    maxWidth: '640px',
  },
});

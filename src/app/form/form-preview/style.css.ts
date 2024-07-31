import { style, globalStyle } from '@vanilla-extract/css';

export const container = style({
  maxWidth: '640px',
  margin: '0 auto',
  padding: '20px',
});

export const title = style({
  fontSize: '2rem',
  fontWeight: 'bold',
  marginBottom: '20px',
});

export const questionContainer = style({
  backgroundColor: '#fff',
  borderRadius: '8px',
  marginBottom: '12px',
  padding: '24px',
});

export const questionTitle = style({
  fontSize: '1rem',
  fontWeight: 'bold',
  marginBottom: '12px',
});

export const textInput = style({
  width: '100%',
  padding: '8px',
  fontSize: '0.8rem',
  border: '1px solid #dadce0',
  borderRadius: '4px',
  ':focus': {
    outline: 'none',
    border: '2px solid #1a73e8',
  },
});

export const textarea = style({
  width: '100%',
  minHeight: '100px',
  padding: '8px',
  fontSize: '14px',
  border: '1px solid #dadce0',
  borderRadius: '4px',
  resize: 'vertical',
  transition: 'border 0.3s',
  ':focus': {
    outline: 'none',
    border: '2px solid #1a73e8',
  },
});

export const radioContainer = style({
  display: 'flex',
  flexDirection: 'column',
});

export const radioLabel = style({
  display: 'flex',
  marginBottom: '8px',
});

export const navigationContainer = style({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '20px',
});

export const navigationButton = style({
  backgroundColor: '#fff',
  color: '#1a73e8',
  border: '1px solid #dadce0',
  padding: '10px 24px',
  fontSize: '14px',
  fontWeight: 'bold',
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
  ':hover': {
    backgroundColor: '#f6f9fe',
  },
  ':disabled': {
    color: '#bdc1c6',
    cursor: 'not-allowed',
  },
});

globalStyle('body', {
  backgroundColor: '#f0f0f0',
  margin: 0,
  padding: 0,
});

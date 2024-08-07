import { style, globalStyle } from '@vanilla-extract/css';
import { vars } from '../../../theme.css';

export const container = style({
  maxWidth: vars.sizes.maxWidth,
  margin: '0 auto',
  padding: vars.space.large,
});

export const title = style({
  fontSize: vars.fontSizes.large,
  fontWeight: 'bold',
  marginBottom: vars.space.large,
});

export const questionContainer = style({
  backgroundColor: vars.colors.white,
  borderRadius: vars.radii.medium,
  marginBottom: vars.space.medium,
  padding: vars.space.xlarge,
});

export const questionTitle = style({
  fontSize: vars.fontSizes.medium,
  fontWeight: 'bold',
  marginBottom: vars.space.medium,
});

const inputStyles = {
  width: '100%',
  padding: vars.space.small,
  fontSize: vars.fontSizes.small,
  border: `1px solid ${vars.colors.border}`,
  borderRadius: vars.radii.small,
  ':focus': {
    outline: 'none',
    border: `2px solid ${vars.colors.primary}`,
  },
};

export const textInput = style(inputStyles);

export const textarea = style({
  ...inputStyles,
  minHeight: '100px',
  resize: 'vertical',
  transition: 'border 0.3s',
});

export const radioContainer = style({
  display: 'flex',
  flexDirection: 'column',
});

export const radioLabel = style({
  display: 'flex',
  marginBottom: vars.space.small,
});

export const requiredStar = style({
  color: vars.colors.error,
  marginLeft: vars.space.small,
});

export const errorText = style({
  color: vars.colors.error,
  fontSize: '14px',
  marginTop: vars.space.small,
});

export const invalidInput = style({
  borderColor: vars.colors.error,
});

export const navigationContainer = style({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: vars.space.large,
});

export const navigationButton = style({
  backgroundColor: vars.colors.white,
  color: vars.colors.primary,
  border: `1px solid ${vars.colors.border}`,
  padding: `${vars.space.small} ${vars.space.xlarge}`,
  fontSize: vars.fontSizes.small,
  fontWeight: 'bold',
  borderRadius: vars.radii.small,
  cursor: 'pointer',
  transition: 'background-color 0.3s',
  ':hover': {
    backgroundColor: '#f6f9fe',
  },
  ':disabled': {
    color: vars.colors.text.secondary,
    cursor: 'not-allowed',
  },
});

globalStyle('body', {
  backgroundColor: vars.colors.background,
  margin: 0,
  padding: 0,
});

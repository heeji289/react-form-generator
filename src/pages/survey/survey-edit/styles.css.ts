import { style } from '@vanilla-extract/css';
import { vars } from '../../../theme.css';

export const container = style({
  maxWidth: vars.sizes.maxWidth,
  margin: '0 auto',
  padding: vars.space.large,
});

export const title = style({
  fontSize: vars.fontSizes.large,
  marginBottom: vars.space.large,
});

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.large,
});

export const inputGroup = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.small,
});

export const label = style({
  fontSize: vars.fontSizes.medium,
  fontWeight: 'bold',
});

export const input = style({
  padding: vars.space.medium,
  borderRadius: vars.radii.small,
  border: `1px solid ${vars.colors.border}`,
  fontSize: vars.fontSizes.medium,
});

export const questionContainer = style({
  border: `1px solid ${vars.colors.border}`,
  borderRadius: vars.radii.medium,
  padding: vars.space.large,
  marginBottom: vars.space.large,
});

export const button = style({
  padding: `${vars.space.medium} ${vars.space.large}`,
  backgroundColor: vars.colors.primary,
  color: vars.colors.white,
  border: 'none',
  borderRadius: vars.radii.small,
  fontSize: vars.fontSizes.medium,
  cursor: 'pointer',
  ':hover': {
    opacity: 0.9,
  },
});

export const questionTypeSelect = style({
  marginTop: vars.space.medium,
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.medium,
});

export const select = style({
  padding: vars.space.medium,
  borderRadius: vars.radii.small,
  border: `1px solid ${vars.colors.border}`,
  fontSize: vars.fontSizes.medium,
});

export const checkbox = style({
  marginRight: vars.space.small,
});

export const optionsContainer = style({
  marginTop: vars.space.medium,
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.small,
});

export const optionInput = style({
  flex: 1,
  marginRight: vars.space.small,
});

export const removeButton = style({
  padding: vars.space.small,
  backgroundColor: vars.colors.error,
  color: vars.colors.white,
  border: 'none',
  borderRadius: vars.radii.small,
  cursor: 'pointer',
  ':hover': {
    opacity: 0.9,
  },
});

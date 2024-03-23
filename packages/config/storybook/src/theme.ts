import { blueDark, grayDark } from '@radix-ui/colors';
import { create } from '@storybook/theming/create';

export default create({
  base: 'dark',
  fontBase: 'var(--font-geist-sans)',
  fontCode: 'var(--font-geist-mono)',
  appContentBg: grayDark.gray1,
  appBg: grayDark.gray1,
  barBg: grayDark.gray1,
  inputBg: grayDark.gray3,
  buttonBg: grayDark.gray3,
  booleanBg: grayDark.gray3,
  appBorderColor: grayDark.gray2,
  appBorderRadius: 6,
  inputBorderRadius: 6,
  inputBorder: grayDark.gray6,
  buttonBorder: grayDark.gray6,
  textColor: grayDark.gray11,
  colorSecondary: blueDark.blue9,
  colorPrimary: blueDark.blue9,
  barTextColor: grayDark.gray11,
  barHoverColor: blueDark.blue9,
  barSelectedColor: blueDark.blue9,
  inputTextColor: grayDark.gray11,
  textMutedColor: grayDark.gray10,
  textInverseColor: grayDark.gray1,
});

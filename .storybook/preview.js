import { NativeBaseProvider } from 'native-base';
import { theme } from '../src/styles/theme';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

const withThemeProvider = (Story, context) => {
  return (
    <NativeBaseProvider theme={theme}>
      <Story {...context} />
    </NativeBaseProvider>
  );
};
export const decorators = [withThemeProvider];

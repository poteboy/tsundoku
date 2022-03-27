import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppRoot } from '@src/root';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeBaseProvider } from 'native-base';
import { theme } from '@src/styles/theme';
import { SENTRY_DSN } from '@env';
import { Container } from '@src/util';
import { firebase } from '@src/constants';
import * as Sentry from 'sentry-expo';

Sentry.init({
  dsn: SENTRY_DSN,
  tracesSampleRate: 1.0,
  enableInExpoDevelopment: true,
  debug: !!__DEV__,
});
console.disableYellowBox = true;
export default function App() {
  return (
    <SafeAreaProvider>
      <NativeBaseProvider theme={theme}>
        <Container>
          <NavigationContainer>
            <AppRoot />
          </NavigationContainer>
        </Container>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
}

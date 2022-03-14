import React, { FC } from 'react';
import { NativeBaseProvider } from 'native-base';
import { theme } from '@src/styles';
import {
  render,
  RenderOptions,
  RenderAPI,
} from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { shallow } from 'enzyme';

const TestSafeAreaProvider: FC = ({ children }) => {
  return (
    <SafeAreaProvider
      initialMetrics={{
        frame: { x: 0, y: 0, width: 0, height: 0 },
        insets: { top: 0, left: 0, right: 0, bottom: 0 },
      }}
    >
      {children}
    </SafeAreaProvider>
  );
};

const ProviderWrapper: FC = ({ children }) => {
  const inset = {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
  };
  return (
    <TestSafeAreaProvider>
      <NativeBaseProvider theme={theme} initialWindowMetrics={inset}>
        {children}
      </NativeBaseProvider>
    </TestSafeAreaProvider>
  );
};

const originalRender = (
  component: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
  options?: RenderOptions,
): RenderAPI => {
  return render(component, { wrapper: ProviderWrapper, ...options });
};

const originalShallow = (ui: any) =>
  shallow(<ProviderWrapper>{ui}</ProviderWrapper>);

export { originalRender as render };
export { originalShallow as shallow };

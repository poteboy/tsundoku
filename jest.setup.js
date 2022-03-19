/* eslint-disable no-undef */
import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('@sentry/react-native', () => ({ init: () => jest.fn() }));
jest.mock('sentry-expo', () => ({ init: () => jest.fn() }));
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

configure({ adapter: new Adapter() });

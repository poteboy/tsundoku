/* eslint-disable no-undef */
import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

jest.mock('@sentry/react-native', () => ({ init: () => jest.fn() }));
jest.mock('sentry-expo', () => ({ init: () => jest.fn() }));

configure({ adapter: new Adapter() });

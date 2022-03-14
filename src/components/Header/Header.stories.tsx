import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Header } from '..';

export default {
  title: 'Component/Header',
  component: Header,
  parameters: { layout: 'fullscreen' },
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = args => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'テスト',
};

export const Back = Template.bind({});
Back.args = {
  title: 'テスト',
  onBack: () => {},
};

export const Close = Template.bind({});
Close.args = {
  title: 'テスト',
  onClose: () => {},
};
//expo/vector-icons/dist/Ioniconsがエラーになる

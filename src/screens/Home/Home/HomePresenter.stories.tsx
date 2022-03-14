import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { HomePresenter } from './HomePresenter';

export default {
  title: 'HomePresenter',
  component: HomePresenter,
  parameters: { layout: 'fullscreen' },
} as ComponentMeta<typeof HomePresenter>;

const Template: ComponentStory<typeof HomePresenter> = args => (
  <HomePresenter {...args} />
);

export const Default = Template.bind({});
Default.args = {};

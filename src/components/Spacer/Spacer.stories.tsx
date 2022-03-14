import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Spacer } from '..';

export default {
  title: 'Component/Spacer',
  component: Spacer,
  parameters: { layout: 'fullscreen' },
} as ComponentMeta<typeof Spacer>;

const Template: ComponentStory<typeof Spacer> = args => <Spacer {...args} />;

export const Vertical = Template.bind({});
Vertical.args = {
  size: 4,
};
export const Horizontal = Template.bind({});
Horizontal.args = {
  horizontal: true,
  size: 4,
};

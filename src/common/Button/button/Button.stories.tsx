import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Story, Meta} from '@storybook/react/types-6-0';
import Button, {OwnPropTypes} from "./Button";
import {action} from "@storybook/addon-actions";


export default {
    title: 'Example/Button',
    component: Button,
    /*argTypes: {
      backgroundColor: { control: 'color' },
    },*/
} as Meta;

const Template: Story<OwnPropTypes> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    type: 'primary',
    btnName: 'Button',
};

export const Danger = Template.bind({});
Danger.args = {
    type: 'danger',
    disable: false,
    btnName: 'Button',
};

export const Default = Template.bind({});
Default.args = {
    type: 'default',
    disable: false,
    btnName: 'Button',
    onClick: action('click on button')
};

export const Size = Template.bind({});
Size.args = {
    type: 'danger',
    small: false,
    btnName: 'Button',
};

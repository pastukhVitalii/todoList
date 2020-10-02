import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Story, Meta} from '@storybook/react/types-6-0';
import Input, {OwnPropTypes} from "./Input";
import {action} from "@storybook/addon-actions";


export default {
    title: 'Example/Input',
    component: Input,
    /*argTypes: {
      backgroundColor: { control: 'color' },
    },*/
} as Meta;

const Template: Story<OwnPropTypes> = (args) => <Input {...args} />;

export const Error = Template.bind({});
Error.args = {
    error: true,
    placeholder: 'write something',
    onChange: action('change'),
};

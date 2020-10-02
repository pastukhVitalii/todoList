import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Story, Meta} from '@storybook/react/types-6-0';
import {action} from "@storybook/addon-actions";
import AddNewItemForm, {OwnPropsType} from "./AddNewItemForm";


export default {
    title: 'Example/addNewItem',
    component: AddNewItemForm,
    /*argTypes: {
        btnName: 'ddd',
    },*/
} as Meta;

const Template: Story<OwnPropsType> = (args) => <AddNewItemForm {...args} />;

export const AddItem = Template.bind({});
AddItem.args = {
    btnName: 'btn',
    placeholder: 'write something',
    addItem: action('add item'),
};


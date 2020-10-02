import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Story, Meta} from '@storybook/react/types-6-0';
import {action} from "@storybook/addon-actions";
import TodoListFooter, {OwnPropsType} from "./TodoListFooter";


export default {
    title: 'Example/TodolistFooter',
    component: TodoListFooter,
    /*argTypes: {
        btnName: 'ddd',
    },*/
} as Meta;

const Template: Story<OwnPropsType> = (args) => <TodoListFooter {...args} />;

export const BtnFilter = Template.bind({});
BtnFilter.args = {
    filterValue: 'Active',
    changeFilter: action('change filter'),
};


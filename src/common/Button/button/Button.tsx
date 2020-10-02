import React from 'react';
import './Button.css';

export type OwnPropTypes = {
    btnName: string
    type: 'default' | 'primary' | 'danger' | string
    disable?: boolean
    small?: boolean
    active? : string
    onClick: () => void
}
const Button = (props: OwnPropTypes) => {
    let small = props.small? 'small': '';
    return (
        <button className={`button + ${props.type} + ${small}`} onClick={ (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => props.onClick()} disabled={props.disable}> {props.btnName}</button>
    )
}

export default Button;

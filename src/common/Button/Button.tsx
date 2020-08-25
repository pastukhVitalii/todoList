import React from 'react';
import './Button.css';

type OwnPropTypes = {
    btnName: string
    type: string
    disable?: boolean
    small?: boolean
    active? : string
    onClick: () => void
}
const Button = (props: OwnPropTypes) => {
    let small = props.small? 'small': '';
    return (
        <button className={`button + ${props.type} + ${small}`} onClick={props.onClick}> {props.btnName}</button>
    )
}

export default Button;

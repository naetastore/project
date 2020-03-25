import React from 'react';
import './MyButton.css';

const MyButton = (props) => {
    return (
        <button onClick={props.ngClick} className={props.type}>{props.label}</button>
    );
}

MyButton.defaultProps = {
    type: 'my-button',
    label: 'no label',
    ngClick: null
}

export default MyButton;
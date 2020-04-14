import React from 'react';
import './Input.css';

function Input(props) {
    return (
        <div className={`input ${props.className}`}>
            <input autoComplete={props.autoComplete} id={props.id} placeholder={props.placeholder} type={props.type} value={props.value} onChange={props.ngChange} />
        </div>
    );
}

export default Input;
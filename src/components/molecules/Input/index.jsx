import React, { useState } from 'react';
import './index.css';
import icon from '../../../assets/img/icon/search-icon.svg';

function Input(props) {
    const [value, setValue] = useState('');

    const changeValue = e => {
        setValue(e.target.value);
    }

    const checkKey = key => {
        if (key.keyCode === 13 && value.length) {
            props.onClick(value);
        }
    }

    return (
        <div className={`input-wrapper ${props.className}`}>
            <input
                className="keyword"
                type="text"
                placeholder={props.placeholder}
                autoFocus={true}
                autoComplete="off"
                onKeyUp={checkKey}
                defaultValue={props.defaultValue}
                onChange={changeValue}
            />
            <button className="btn search" onClick={() => value.length ? props.onClick(value) : false}>
                <img src={icon} alt="search-icon" className="search-icon" />
            </button>
        </div>
    );
}

export default Input;
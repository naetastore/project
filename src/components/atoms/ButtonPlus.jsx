import React from 'react';
import './ButtonCounter.css';
import Plus from '../../assets/img/icon/plus.svg';

const ButtonPlus = props => {
    return (
        <button className="btn plus" onClick={props.ngClick}>
            <img src={Plus} alt="pi" className="plus-icon" />
        </button>
    );
}

export default ButtonPlus;
import React from 'react';
import './ButtonCounter.css';
import Minus from '../../assets/img/icon/minus.svg';

const ButtonMinus = props => {
    return (
        <button className="btn minus" onClick={props.ngClick}>
            <img src={Minus} alt="pi" className="minus-icon" />
        </button>
    );
}

export default ButtonMinus;
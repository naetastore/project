import React from 'react';
import './Counter.css';
import ButtonPlus from '../../components/atoms/ButtonPlus';
import ButtonMinus from '../../components/atoms/ButtonMinus';

const Counter = props => {
    return (
        <div className="counter">
            <ButtonMinus ngClick={props.ngClick_Minus} />
            <input type="number" value={props.count} className="count" readOnly />
            <ButtonPlus ngClick={props.ngClick_Plus} />
        </div>
    );
}

export default Counter;
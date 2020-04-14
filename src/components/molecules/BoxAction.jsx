import React from 'react';
import './BoxAction.css';
import MoveTo from '../../assets/img/icon/move-to-light.svg';

const BoxAction = props => {
    return (
        <div
            onClick={props.ngClick}
            className="box-wrapper"
        >
            <div className="box-title">
                {props.title}
            </div>
            <button className="btn goto">
                <img src={MoveTo} alt="mt" className="move-to-icon" />
            </button>
        </div>
    );
}

export default BoxAction;
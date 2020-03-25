import React from 'react';
import './Box.css';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';

const Box = props => {
    return (
        <NavLink
            to={props.href}
            className="box"
            activeclass="active"
            onClick={props.ngClick}
        >
            <div className="box-title">
                {props.title}
            </div>
        </NavLink>
    );
}

export default Box;
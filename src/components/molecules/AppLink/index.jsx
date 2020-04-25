import React from 'react';
import './index.css';
import { NavLink } from 'react-router-dom';

const AppLink = props => {
    return (
        <NavLink to={props.to} className="app">
            <img src={props.icon} alt="app-icon" className="app-icon" />
            <span>{props.label}</span>
        </NavLink>
    );
}

export default AppLink;
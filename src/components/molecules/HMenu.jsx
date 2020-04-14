import React from 'react';
import './HMenu.css';
import { NavLink } from 'react-router-dom';

const HMenu = (props) => {
    return (
        <div className="h_">
            {props.data.map(m =>
                <NavLink
                    key={m.id}
                    to={`${props.href}/${m.id}`}
                    className="box"
                    activeclass="active"
                    onClick={props.ngClick}
                >
                    <div className="box-title">
                        {m.name}
                    </div>
                </NavLink>
            )}
        </div>
    )
}

export default HMenu;
import React from 'react';
import './index.css';
import { NavLink } from 'react-router-dom';

function CategoryMenu(props) {
    return (
        <div className="h_ make-it-horizontal">
            {props.data.map((g, i) =>
                <NavLink key={i} className="category-menu" classactive="active" to={`${props.to}/${g.id}`}>
                    <div className="name">{g.name}</div>
                </NavLink>
            )}
        </div>
    );
}

CategoryMenu.defaultProps = {
    data: []
};

export default CategoryMenu;
import React from 'react';
import './index.css';
import { NavLink } from 'react-router-dom';
import ScrollContainer from 'react-indiana-drag-scroll';

function CategoryMenu(props) {
    return (
        <ScrollContainer className="scroll-container" horizontal={true}>
            <div className="h_">
                {props.data.map((g, i) =>
                    <NavLink key={i} className="category-menu" classactive="active" to={`${props.to}/${g.id}`}>
                        <div className="name">{g.name}</div>
                    </NavLink>
                )}
            </div>
        </ScrollContainer>
    );
}

CategoryMenu.defaultProps = {
    data: []
};

export default CategoryMenu;
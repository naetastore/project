import React, { Fragment } from 'react';
import './index.css';

function SubCategory(props) {
    return (
        <Fragment>
            <div className={`ch ${props.className}`}>
                <div className="sub-category">
                    <div className="name">{props.data.name}</div>
                    <div className="desc">{props.data.description}</div>
                </div>
                <div className="ch-f"></div>
            </div>
            <button
                type="button"
                className="direct"
                onClick={() => props.onClick(props.data.id)}
            >Lihat Semua</button>
        </Fragment>
    );
}

SubCategory.defaultProps = {
    data: {}
};

export default SubCategory;
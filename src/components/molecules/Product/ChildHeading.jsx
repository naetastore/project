import React from 'react';
import './ChildHeading.css';

const ChildHeading = (props) => {
    return (
        <div className="ch">
            <div className="child-heading">
                <div className="sbh-title">{props.title}</div>
                <div className="sbh-desc">{props.desc}</div>
            </div>
            <div className="ch-f"></div>
        </div>
    );
}

ChildHeading.defaultProps = {
    title: 'No Title',
    desc: 'No description'
}

export default ChildHeading;
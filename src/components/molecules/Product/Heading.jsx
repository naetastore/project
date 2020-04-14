import React from 'react';
import './Heading.css';

const Heading = (props) => {
    return (
        <div className="heading">
            <div className="title">{props.title}</div>
            <div className="desc">{props.desc}</div>
        </div>
    );
}

Heading.defaultProps = {
    title: '',
    desc: ''
}

export default Heading;
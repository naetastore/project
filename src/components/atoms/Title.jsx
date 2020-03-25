import React from 'react';
import './Title.css';

const Title = props => {
    return (
        <div className="title">
            <span className="first">
                {props.title}
            </span>
            <span className="end">
                {props.titlend}
            </span>
        </div>
    );
}

export default Title;
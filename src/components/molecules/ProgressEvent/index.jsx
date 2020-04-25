import React from 'react';
import './index.css';

function ProgressEvent(props) {
    return (
        <div className="progress-event">
            <div className="loaded" style={{ width: `${props.percent}%` }}></div>
        </div>
    );
}

export default ProgressEvent;
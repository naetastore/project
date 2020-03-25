import React from 'react';
import './Progress.css';

const Progress = props => {
    return (
        <div className="progress-event">
            <div style={{ width: `${props.percentase}%` }} className={`loader`}></div>
        </div>
    );
}

Progress.defaultProps = { percentase: 0 }

export default Progress;
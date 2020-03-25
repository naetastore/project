import React from 'react';
import './HRF.css';

export const HRF = (props) => {
    return (
        <div className="_8qtb _43mg">
            {/* Style nya punya facebook!! \(^D^)/ */}
            <span className="_43mh">{props.label}</span>
        </div>
    );
}

HRF.defaultProps = {
    label: 'no label'
}
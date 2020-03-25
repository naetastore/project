import React from 'react';
import './Widget.css';

const Widget = props => {
    return (
        <div className={"widget bgcolor-" + props.background}>
            <div className="widget-counter">{props.count}</div>
            <div className="widget-label">{props.label}</div>
        </div>
    );
}

Widget.defaultProps = {
    count: 0,
    label: 'label here'
}

export default Widget;
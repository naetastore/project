import React from 'react';
import './Loader.scss';

const Loader = (props) => {
    return (
        <div className="loading">
            <svg viewBox="25 25 50 50">
                <circle cx="50" cy="50" r="20"></circle>
            </svg>
        </div>
    );
}

Loader.defaultProps = {
    type: "loader"
}

export default Loader;
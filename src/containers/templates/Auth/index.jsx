import React from 'react';

function Auth(props) {
    return (
        <div className="d-grid">
            <div>{props.header}</div>
            {props.container}
        </div>
    );
}

export default Auth;
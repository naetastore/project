import React from 'react';

function Single(props) {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    {props.container}
                </div>
            </div>
        </div>
    );
}

export default Single;
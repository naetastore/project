import React, { Fragment } from 'react';

function Book(props) {
    return (
        <Fragment>
            {props.header}
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        {props.container}
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Book;
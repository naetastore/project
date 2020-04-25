import React, { Fragment } from 'react';

function Search(props) {
    return (
        <Fragment>
            {props.header}
            <div className="container mt-3">
                <div className="row">
                    <div className="col-12">
                        {props.container}
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Search;
import React, { Fragment } from 'react';
import './index.css';

const Home = props => {
    return (
        <Fragment>
            <header>
                {props.header}
            </header>
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

export default Home;
import React from 'react';
import { connect } from 'react-redux';

import {
    Route,
    Redirect,
} from "react-router-dom";

function PrivateRoute({ children, ...rest }) {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                rest.isAuthenticated ? (
                    children
                )
                    :
                    (
                        <Redirect
                            to={{
                                pathname: "/auth",
                                state: { from: location }
                            }}
                        />
                    )
            }
        />
    );
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.isAuthenticated
    }
}

export default connect(mapStateToProps)(PrivateRoute);
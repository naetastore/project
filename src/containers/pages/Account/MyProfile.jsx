import React from 'react';
import { connect } from 'react-redux';
import { Session } from '../../../config/Session';

class MyProfile extends React.Component {

    componentDidMount() {
        const session = Session.get();
        if (!session) {
            this.props.history.push('/auth?account/myprofile');
            return;
        } else {
            this.setSession(session);
        }
    }

    setSession = userdata => {
        this.props.setAuthenticated(true);
        if (this.props.inSession) {
            return;
        }
        this.props.setSession(userdata);
    }

    render() {
        return (
            <div className="account-body">
                <div className="alert">
                    <h4>Akan Hadir!</h4>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => ({
    inSession: state.inSession,
    isAuthenticated: state.isAuthenticated
});

const reduxDispatch = dispatch => ({
    setSession: userdata => dispatch({ type: "SET_SESSION", userdata }),
    setAuthenticated: value => dispatch({ type: 'IS_AUTHENTICATED', value })
});

export default connect(mapStateToProps, reduxDispatch)(MyProfile);
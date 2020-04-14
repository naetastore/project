import React from 'react';
import LNotif from './LNotif';
import API from '../../../services';
import { connect } from 'react-redux';
import { Session } from '../../../config/Session';

class Notification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notification: [],
            error: ''
        }
    }

    async componentDidMount() {
        const path = window.location.pathname;
        const session = Session.get();
        if (!session) {
            this.props.history.push(`/auth?${path}`);
            return;
        } else {
            await this.setSession(session);
        }
        this.getData();
    }

    componentWillUnmount() {
        const controller = new AbortController();
        controller.abort();
    }

    setSession = userdata => {
        this.props.setAuthenticated(true);
        if (this.props.inSession) {
            return;
        }
        this.props.setSession(userdata);
    }

    getData = async () => {
        const { username, password } = this.props.inSession;
        const data = await this.requestToAPI('notification', { username, password });
        if (!data) return;
        this.setState({ notification: data.notification });
    }

    requestToAPI = async (path, params) => {
        try {
            const response = await API.GET(path, params);
            return response.data;
        } catch (err) {
            console.error(err);
            this.setError(err.message);
        }
    }

    ngDelete = async id => {
        const { username, password } = this.props.inSession;
        this.requestToAPI('denotif', { id, username, password });

        const notification = this.state.notification.filter(notif => notif.id !== id);
        if (notification.length < 1) {
            this.setError('not found.');
        }
        this.setState({ notification });
    }

    setError = error => {
        error = <div className="alert"><h4>{error}</h4></div>;
        this.setState({ error });
    }

    render() {
        return (
            <div className="account-body margin-bottom-80">
                {this.state.error}
                <LNotif
                    data={this.state.notification}
                    ngDelete={this.ngDelete} />
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

export default connect(mapStateToProps, reduxDispatch)(Notification);
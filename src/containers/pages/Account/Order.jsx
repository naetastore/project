import React, { Component } from 'react';
import { connect } from 'react-redux';
import API from '../../../services';
import LOrder from './LOrder';
import { Session } from '../../../config/Session';

class Order extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isloading: true,
            order: [],
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

    async getData() {
        this.setState({ isloading: true });
        const { username, password } = this.props.inSession;

        try {
            const response = await API.GET('order', { username, password });
            const order = response.data.order;
            const uiConfig = response.data.uiconfig;
            this.setState({ order, uiConfig });
        } catch (err) {
            console.error(err);
            this.setError(err.message);
        }

        this.setState({ isloading: false });
    }

    setError = error => {
        error = <div className="alert"><h4>{error}</h4></div>;
        this.setState({ error });
    }

    moveToSingle = id => {
        this.props.history.push(`/single/${id}`);
    }

    updateState = order => {
        this.setState({ order });
        if (order.length < 1) {
            this.setError('no data to display');
        }
    }

    render() {
        return (
            <div className="account-body">
                {this.state.error}
                <LOrder
                    data={this.state.order}
                    inSession={this.props.inSession}
                    moveToSingle={this.moveToSingle}
                    updateStateFunc={this.updateState}
                    uiConfig={this.state.uiConfig}
                />
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
})

export default connect(mapStateToProps, reduxDispatch)(Order);
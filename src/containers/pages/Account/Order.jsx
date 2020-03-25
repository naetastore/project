import React, { Component } from 'react';
import { connect } from 'react-redux';
import API from '../../../services';
import LOrder from './LOrder';

class Order extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isloading: true,
            order: [],
            error: ''
        }
    }

    componentDidMount() {
        if (!this.props.isAuthenticated) {
            this.props.history.push('/auth?account/order');
            return;
        }
        this.getData();
    }

    async getData() {
        this.setState({ isloading: true });
        const { username, password } = this.props.inSession;

        try {
            const response = await API.GET('order', { username, password });
            const order = response.data.order;
            this.setState({ order });
        } catch (err) {
            console.error(err.response);
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
            this.setError('not found.');
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
                    updateState={this.updateState}
                />
            </div>
        );
    }

}

const mapStateToProps = state => ({
    inSession: state.inSession,
    isAuthenticated: state.isAuthenticated
});

export default connect(mapStateToProps)(Order);
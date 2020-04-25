import React, { Fragment } from 'react';
import Form from '../../organism/Forms/Billing';
import ProgressEvent from '../../../components/molecules/ProgressEvent';
import API from '../../../services';
import { connect } from 'react-redux';
import session from '../../../config/session';

class Billing extends React.Component {

    state = {
        isLoading: false
    };

    componentDidMount() {
        if (this.props.addedItems.length < 1) {
            setTimeout(() => this.props.history.push('/'), 1000);
        }
    }

    updateUser = async data => {
        this.setState({ isLoading: true });
        try {
            data['username'] = session.get('username');
            data['password'] = session.get('password');
            data['update'] = 1;

            const response = await API.POST('users', data);
            const userData = response.data;

            this.props.setUserData(userData);

            this.setState({ isLoading: false });

            this.props.whenZeroQty();
            this.props.history.push('/ordersummary');
            return;
        } catch (err) {
            this.setState({ isLoading: false });

            console.error(err);
            const errorMessage = err.response.data.message;

            alert(errorMessage);
        }
    }

    render() {
        return (
            <Fragment>
                <ProgressEvent percent="66" />
                <div className="page-title">Billing</div>
                <div className="container mt-4">
                    <div className="row">
                        <div className="col-12">
                            <Form
                                data={this.props.userData}
                                isLoading={this.state.isLoading}
                                onSubmit={this.updateUser} />
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    addedItems: state.addedItems,
    userData: state.userData
});

const reduxDispatch = dispatch => ({
    whenZeroQty: () => dispatch({ type: 'WHEN_ZERO' }),
    setUserData: data => dispatch({ type: 'SET_USERDATA', data })
});

export default connect(mapStateToProps, reduxDispatch)(Billing);
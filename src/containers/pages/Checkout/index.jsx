import React, { Fragment } from 'react';
import './Checkout.css';
import { connect } from 'react-redux';
import API from '../../../services';
import Wrapper from '../../organism/Wrapper';
import Progress from '../../../components/molecules/Progress';
import Alert from '../../organism/Alert';
import FormBilling from './FormBilling';

class Checkout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            formUser: {},
            alert: null,
            error: ''
        }
    }

    componentDidMount() {
        const length = this.props.addedItems.length;
        if (length < 1) {
            this.setAlert('Error', 'Something went wrong!');
            return;
        }
        this.init();
        this.updateState();
    }

    componentWillUnmount() {
        return;
    }

    init = () => {
        const { username, password } = this.props.inSession;
        this.setState({
            username,
            password,
            name: '',
            phonenumber: '',
            address: ''
        });
    }

    updateState = async () => {
        try {
            const { username, password } = this.props.inSession;
            let user = await API.GET('user', { username, password });
            user = user.data.user;

            const formUser = {
                username, password,
                name: user.name,
                address: user.address,
                phonenumber: user.phone
            }
            this.setState({ formUser });
        } catch (err) {
            console.error(err);
        }
    }

    ngChange = e => {
        let formUser = { ...this.state.formUser }
        formUser[e.target.id] = e.target.value;
        this.setState({ formUser });
    }

    userValidity = () => {
        if (isNaN(this.state.formUser.phonenumber)) {
            alert('Harus merupakan bilangan!');
            return;
        }

        this.updateUser();
        this.props.whenYourZero();
    }

    updateUser = async () => {
        this.setState({ isLoading: true });
        try {
            let response = await API.POST('upuser', this.state.formUser);

            response = response.data.user;
            const userdata = { ...this.props.inSession };
            userdata['name'] = response.name;
            userdata['address'] = response.address;
            userdata['phone'] = response.phone;
            this.props.updateSession(userdata);

            this.setState({ isLoading: false });

            this.props.history.push('/makepayment');
            return;
        } catch (err) {
            console.error(err);
            this.setState({ error: err.message });
            this.setState({ isLoading: false });
        }
    }

    setAlert(title, message) {
        const alert = { title, message }
        this.setState({ alert });
    }

    render() {
        return (
            this.state.alert ? <Alert title={this.state.alert.title} message={this.state.alert.message} /> :
                <Fragment>
                    <div className="cart-progress">
                        <Progress percentase="66" />
                    </div>
                    <Wrapper className="margin-bottom-80" container={
                        <FormBilling
                            title="Billing"
                            userValidity={this.userValidity}
                            errorMessage={this.state.error}
                            objectValue={this.state.formUser}
                            ngChange={this.ngChange}
                            isLoading={this.state.isLoading}
                        />
                    } />
                </Fragment>

        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.isAuthenticated,
    inSession: state.inSession,
    addedItems: state.addedItems
});

const dispatch = dispatch => ({
    updateSession: userdata => dispatch({ type: "UPDATE_SESSION", userdata }),
    whenYourZero: () => dispatch({ type: 'WHEN_YOUR_ZERO' })
});

export default connect(mapStateToProps, dispatch)(Checkout);
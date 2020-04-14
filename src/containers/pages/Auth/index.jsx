import React from 'react';
import './Auth.css';
import API from '../../../services';
import { connect } from 'react-redux';
import FormUser from '../../organism/FormUser';
import { Session } from '../../../config/Session';

class Auth extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            formUser: {},
            error: '',
            btnOff: false
        }
    }

    componentDidMount() {
        const session = Session.get();
        if (session) {
            this.setSession(session);
            this.redirect();
            return;
        }
        this.init();
    }

    componentWillUnmount() {
        const controller = new AbortController();
        controller.abort();
    }

    init = () => {
        this.setState({ formUser: { username: '', password: '' }, btnOff: true });
    }

    setSession = userdata => {
        this.props.setAuthenticated(true);
        this.props.setSession(userdata);
    }

    handleChange = async event => {
        let formUser = { ...this.state.formUser }
        formUser[event.target.id] = event.target.value;
        await this.setState({ formUser });
        if (formUser.username.length > 0 && formUser.password.length > 0) {
            this.setState({ btnOff: false });
        } else {
            this.setState({ btnOff: true });
        }
    }

    userValidity = async () => {
        this.setState({ isLoading: true });
        try {
            const response = await API.GET('user', { ...this.state.formUser });
            if (response.data.status === true) {
                let userdata = response.data.user;
                userdata['password'] = this.state.formUser.password;
                this.props.setSession(userdata);
                await Session.set(userdata);

                this.redirect();
                return;
            }
        } catch (err) {
            await this.setState({ error: err.message });
            if (this.state.error) {
                setTimeout(() => this.setState({ error: '' }), 3000);
            }
        };
        this.setState({ isLoading: false });
    }

    redirect = () => {
        const { location, history } = this.props;
        let search = location.search;
        if (!search) {
            history.push('/account/myprofile');
            return;
        }
        search = search.replace('?', '');
        history.push(search);
    }

    render() {
        return (
            <FormUser disabled={this.state.btnOff} title="Log In" error={this.state.error} ngSubmit={this.userValidity} ngChange={this.handleChange} labelSubmit="Lanjutkan" isLoading={this.state.isLoading}
                guide="Masukan detail login Anda untuk mengakses akun Anda."
            />
        );
    }

}

const mapStateToProps = state => ({
    isAuthenticated: state.isAuthenticated
});

const reduxDispatch = dispatch => ({
    setAuthenticated: value => dispatch({ type: 'IS_AUTHENTICATED', value }),
    setSession: userdata => dispatch({ type: 'SET_SESSION', userdata })
});

export default connect(mapStateToProps, reduxDispatch)(Auth);
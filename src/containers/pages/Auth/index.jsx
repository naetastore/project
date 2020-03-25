import React from 'react';
import './Auth.css';
import API from '../../../services';
import { connect } from 'react-redux';
import FormUser from '../../organism/FormUser';
import { NavLink } from 'react-router-dom';

class Auth extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            formUser: { 'username': '', 'password': '' },
            error: ''
        }
    }

    async componentDidMount() {
        if (this.props.isAuthenticated) {
            this.redirect();
            return;
        }
        const session = window.sessionStorage;
        const username = session.getItem('naetastore_name');
        if (username) {
            const password = session.getItem('naetastore_pass');
            const roleId = session.getItem('naetastore_role');
            const formUser = { username, password, roleId }
            await this.setState({ formUser });
            this.setSession();
            this.redirect();
        }
    }

    handleChange = event => {
        let formUser = { ...this.state.formUser }
        formUser[event.target.id] = event.target.value;
        this.setState({ formUser });
    }

    userValidity = async () => {
        this.setState({ isLoading: true });
        try {
            const response = await API.GET('user', { ...this.state.formUser });
            if (response.data.user === true) {
                const formUser = { ...this.state.formUser }
                formUser['roleId'] = response.data.data.roleId;
                formUser['avatar'] = response.data.data.avatar;
                this.setState({ formUser });

                this.setSession();
                this.redirect();
                return;
            }
        } catch (err) {
            this.setState({ error: err.message });
        };
        this.setState({ isLoading: false });
    }

    setSession = () => {
        this.props.setAuthenticated(true);
        this.props.setSession(this.state.formUser);
    }

    redirect = () => {
        const { location, history } = this.props;
        let search = location.search;
        if (!search) {
            if (this.state.formUser.roleId > 1) {
                history.push('/account/myprofile');
            } else {
                history.push('/account/admin');
            }
            return;
        }
        search = search.replace('?', '');
        history.push(search);
    }

    render() {
        return (
            <FormUser title="Masuk" error={this.state.error} ngSubmit={this.userValidity} ngChange={this.handleChange} labelSubmit="Lanjutkan" isLoading={this.state.isLoading} footer={
                <div className="footer">
                    <p className="question">Belum punya Akun?</p>
                    <NavLink to={`/signup${this.props.location.search ? this.props.location.search : ''}`} className="signup">Sign Up</NavLink>
                </div>
            } />
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
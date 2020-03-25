import React from 'react';
import './Signup.css';
import FormUser from '../../organism/FormUser';
import API from '../../../services';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class Signup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            formUser: {
                username: '',
                password: ''
            },
            error: '',
            success: ''
        }
    }

    handleChange = event => {
        let formUser = { ...this.state.formUser }
        formUser[event.target.id] = event.target.value;
        this.setState({ formUser });
    }

    postUser = async () => {
        if (this.state.formUser.username.split(' ').length > 1) {
            alert('Nama pengguna tidak boleh ada spasi');
            return;
        }

        this.setState({ isLoading: true });
        try {
            const { setSession, redirect } = this;
            const response = await API.POST('user', { ...this.state.formUser });
            if (response.data.status === true) {
                this.setState({ success: response.data.message, isLoading: false });
                setSession();
                setTimeout(() => { redirect(); }, 1400);
                return;
            }
        } catch (err) {
            this.setState({ error: err.message });
        }
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
            history.push('/account/myprofile');
            return;
        }
        search = search.replace('?', '');
        history.push(search);
    }

    render() {
        return (
            <FormUser title="Daftar Akun" error={this.state.error} success={this.state.success} ngSubmit={this.postUser} ngChange={this.handleChange} labelSubmit="Buat Akun Saya" isLoading={this.state.isLoading} passPlaceholder="5 karakter atau lebih" footer={
                <div className="footer">
                    <p className="question">Sudah punya Akun?</p>
                    <NavLink className="signin" to={`/auth${this.props.location.search ? this.props.location.search : ''}`}>Log In</NavLink>
                </div>
            } />
        );
    }

}

const reduxDispatch = dispatch => ({
    setAuthenticated: value => dispatch({ type: 'IS_AUTHENTICATED', value }),
    setSession: userdata => dispatch({ type: 'SET_SESSION', userdata })
});

export default connect(null, reduxDispatch)(Signup);
import React from 'react';
import './Signup.css';
import API from '../../../services';
import { connect } from 'react-redux';
import { Session } from '../../../config/Session';
import Avatar from '../../../assets/img/avatar/default.svg';
import Input from '../../../components/atoms/Input';
import Wrapper from '../../organism/Wrapper';
import AsyncButton from '../../../components/molecules/AsyncButton';
import { NavLink } from 'react-router-dom';

class Signup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            formUser: {},
            error: '',
            success: '',
            input: {},
            value: '',
            page: {},
            btnOff: false
        }
    }

    componentDidMount() {
        const session = Session.get();
        if (session) {
            this.setSession(session);
            this.redirect(session.role);
            return;
        }
        this.init();
    }

    componentWillUnmount() {
        return;
    }

    init = () => {
        this.setState({
            formUser: {
                username: '',
                password: ''
            },
            input: {
                type: 'text',
                id: 'username',
                placeholder: 'Nama pengguna'
            },
            page: {
                title: 'Akun Baru',
                guide: 'Mulai dengan memasukkan nama pengguna Anda di bawah ini.'
            },
            btnOff: true
        });
    }

    setSession = userdata => {
        this.props.setAuthenticated(true);
        this.props.setSession(userdata);
    }

    handleChange = async event => {
        let formUser = { ...this.state.formUser }
        formUser[event.target.id] = event.target.value;
        await this.setState({ formUser, value: event.target.value });
        if (this.state.value.length > 0) {
            this.setState({ btnOff: false });
        } else {
            this.setState({ btnOff: true });
        }
    }

    postUser = async () => {
        if (this.state.formUser.username.split(' ').length > 1) {
            alert('Nama pengguna tidak boleh ada spasi');
            return;
        }

        this.setState({ isLoading: true });
        try {
            const response = await API.POST('user', { ...this.state.formUser });
            if (response.data.status === true) {
                this.setState({ success: response.data.message, isLoading: false });

                const formUser = this.state.formUser;
                let userdata = response.data.user;
                userdata['password'] = formUser.password;
                userdata['avatar'] = Avatar;

                this.setSession(userdata);
                await Session.set(userdata);

                setTimeout(() => { this.redirect(); }, 1400);
                return;
            }
        } catch (err) {
            console.log(err);
            await this.setState({ error: err.message });
            if (this.state.error) {
                setTimeout(() => this.setState({ error: '' }), 3000);
            }
        }
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

    saveChange = async () => {
        if (this.state.value.length < 1) return;
        if (this.state.formUser.username.split(' ').length > 1) {
            alert('Jangan menggunakan spasi');
            return;
        }

        this.setState({ isLoading: true });
        try {
            const response = await API.POST('user', { ...this.state.formUser });

            if (response.data && response.data.user !== undefined) {
                this.setState({ success: response.data.message, isLoading: false });

                const formUser = this.state.formUser;
                let userdata = response.data.user;
                userdata['password'] = formUser.password;
                userdata['avatar'] = Avatar;

                this.setSession(userdata);
                await Session.set(userdata);

                setTimeout(() => { this.redirect(); }, 4000);
                return;
            }

            if (response.data.status === true) {
                this.setState({ isLoading: false, value: '' });

                const formUser = this.state.formUser;
                if (formUser.username.length > 0 && formUser.password < 1) {
                    this.setState({
                        page: {
                            title: 'Buat Kata Sandi',
                            guide: 'Kata sandi Anda harus memiliki setidaknya satu simbol & 5 karakter atau lebih.'
                        },
                        input: {
                            type: 'password',
                            id: 'password',
                            placeholder: 'Kata sandi'
                        }
                    });
                }
            }
        } catch (err) {
            this.setState({ isLoading: false });
            await this.setState({ error: err.message });
            if (this.state.error) {
                setTimeout(() => this.setState({ error: '' }), 4000);
            }
        }
    }

    render() {
        return (
            <Wrapper container={
                <div className="form-signup">
                    {
                        this.state.error
                            ? <div className="alert alert-fixed-top alert-danger">{this.state.error}</div>
                            : <></>
                    }
                    {
                        this.state.success
                            ? <div className="alert alert-fixed-top alert-success">{this.state.success}</div>
                            : <></>
                    }
                    <div className="form-title">{this.state.page.title}</div>
                    <div className="form-guide">{this.state.page.guide}</div>
                    <Input
                        autoComplete="off"
                        value={this.state.value}
                        className={`input-register-signup ${this.state.input.id}`}
                        id={this.state.input.id}
                        ngChange={this.handleChange}
                        type={this.state.input.type}
                        placeholder={this.state.input.placeholder}
                    />
                    <div className="footer">
                        <div className="question">Sudah punya akun?</div>
                        <NavLink to="/auth" className="signin">Sign In</NavLink>
                    </div>
                    <AsyncButton disabled={this.state.btnOff} isLoading={this.state.isLoading} label="Lanjutkan" ngClick={this.saveChange} />
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
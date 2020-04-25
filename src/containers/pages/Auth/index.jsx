import React, { Fragment } from 'react';
import Template from '../../templates/Auth';
import Form from '../../organism/Forms/Auth';
import API from '../../../services';
import { connect } from 'react-redux';
import session from '../../../config/session';
import { NavLink } from 'react-router-dom';

class Auth extends React.Component {

    state = {
        isLoading: false,
        visible: false
    };

    componentDidMount = async () => {
        const s = session.get;
        if (s('username') !== null) {
            this.auth({ username: s('username'), password: s('password') });
        } else {
            this.setState({ visible: true });
        }
    }

    auth = async data => {
        this.setState({ isLoading: true });
        try {
            const response = await API.GET('users', data);

            let userData = response.data;
            userData['password'] = data.password;

            this.setUser(userData);
            this.redirect();

            return;
        } catch (err) {
            console.error(err);
            const errorMessage = err.response.data.message;

            alert(errorMessage);

            this.setState({ isLoading: false });
        }
    }

    setUser = data => {
        this.props.setUserData(data);
        session.set(data);
    }

    redirect = () => {
        let search = this.props.location.search;
        if (!search) {
            this.props.history.push('/account/myprofile');
        } else {
            search = search.replace('?', '');
            this.props.history.push(search);
        }
    }

    render() {
        if (!this.state.visible) {
            return (<p className="middle-scr">sedang memuat...</p>);
        }
        const s = this.props.location.search;
        return (
            <Template
                header={
                    <Fragment>
                        <div className="form-title">Log In</div>
                        <div className="form-guide">
                            Masukan info detail login untuk mengakses akun Anda.
                        </div>
                    </Fragment>
                }

                container={
                    <Form
                        onSubmit={this.auth}
                        isLoading={this.state.isLoading}
                        footer={
                            <NavLink to={!s ? "/signup" : "/signup" + s}>Daftar Akun</NavLink>
                        }
                    />
                }
            />
        );
    }
}

const mapStateToProps = state => ({
    userData: state.userData
});

const reduxDispatch = dispatch => ({
    setUserData: data => dispatch({ type: 'SET_USERDATA', data })
});

export default connect(mapStateToProps, reduxDispatch)(Auth);
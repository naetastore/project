import React, { Fragment } from 'react';
import Template from '../../templates/Auth';
import pageProps from './pageProps.json';
import Form from '../../organism/Forms/SignUp';
import API from '../../../services';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import session from '../../../config/session';

class SignUp extends React.Component {

    state = {
        pageProps: pageProps.find(p => p.step === "1"),
        isLoading: false
    };

    register = async data => {
        this.setState({ isLoading: true });
        try {
            const response = await API.POST('users', data);
            this.setState({ isLoading: false });

            if (response.status === 201) {
                const message = response.data.message;
                alert(message);

                let userData = response.data.user;
                userData['password'] = data.password;

                this.setUser(userData);
                this.redirect();

                return;
            }

            this.setState({
                pageProps: pageProps.find(p => p.step === "2"),
            });
        } catch (err) {
            console.log(err);
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
        return (
            <Template
                header={
                    <Fragment>
                        <div className="form-title">
                            {this.state.pageProps.page.title}
                        </div>
                        <div className="form-guide">
                            {this.state.pageProps.page.guide}
                        </div>
                    </Fragment>
                }

                container={
                    <Form
                        onSubmit={this.register}
                        inputProps={this.state.pageProps.input}
                        isLoading={this.state.isLoading}
                        footer={
                            <Fragment>
                                <div className="question">Sudah punya akun?</div>
                                <NavLink to="/auth">Sign In</NavLink>
                            </Fragment>
                        }
                    />
                }
            />
        );
    }
}

const reduxDispatch = dispatch => ({
    setUserData: data => dispatch({ type: 'SET_USERDATA', data })
});

export default connect(null, reduxDispatch)(SignUp);
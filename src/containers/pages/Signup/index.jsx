import React, { Fragment } from 'react';
import Template from '../../templates/Auth';
import pageProps from './pageProps.json';
import Form from '../../organism/Forms/SignUp';
import API from '../../../services';
import { NavLink } from 'react-router-dom';
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
                alert('Registrasi berhasil, Silahkan melakukan login terlebih dahulu.');
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

    render() {
        const { title, guide } = this.state.pageProps.page;
        const { pageProps } = this.state;
        const s = this.props.location.search;
        return (
            <Template
                header={
                    <Fragment>
                        <div className="form-title">{title}</div>
                        <div className="form-guide">{guide}</div>
                    </Fragment>
                }

                container={
                    <Form
                        onSubmit={this.register}
                        inputProps={pageProps.input}
                        isLoading={this.state.isLoading}
                        footer={
                            <Fragment>
                                <div className="question">Sudah punya akun?</div>
                                <NavLink to={!s ? "/auth" : "/auth" + s}>Sign In</NavLink>
                            </Fragment>
                        }
                    />
                }
            />
        );
    }
}

export default SignUp;
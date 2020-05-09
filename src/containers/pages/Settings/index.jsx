import React, { Fragment } from 'react';
import './index.css';
import moveicon from '../../../assets/img/icon/move-to-icon.svg';
import avataricon from '../../../assets/img/icon/account-light-icon.svg';
import keyicon from '../../../assets/img/icon/key-icon.svg';
import phoneicon from '../../../assets/img/icon/phone-icon.svg';
import { connect } from 'react-redux';
import API from '../../../services';
import session from '../../../config/session';
import inputProps from './data.json';

class Settings extends React.Component {

    state = {
        show: false,
        details: {},
        inputValue: '',
        errorMessage: ''
    };

    componentDidMount() {
        if (this.props.userData.username === undefined) {
            this.getDataToAPI();
        }
    }

    getDataToAPI = async () => {
        try {
            const s = {
                username: session.get('username'),
                password: session.get('password')
            };
            const response = await API.GET('users', s);
            this.props.setUserData(response.data);
        } catch (err) {
            console.error(err);
        }
    }

    show = id => {
        this.setState({
            details: inputProps.find(p => p.id === id),
            show: true
        });
    }

    logout = () => {
        session.unset();
        this.props.setUserData({});
        this.props.history.push('/auth');
    }

    saveChange = async () => {
        if (this.state.inputValue.length < 1) {
            this.setState({
                details: {},
                inputValue: '',
                errorMessage: '',
                show: false
            });
            return;
        }

        try {
            const s = {
                username: session.get('username'),
                password: session.get('password'),
                update: 1,
                [this.state.details.id]: this.state.inputValue
            };
            const response = await API.POST('users', s);
            const newData = response.data;

            if (this.state.details.id === "repassword") {
                let onSession = session.get();
                onSession['password'] = this.state.inputValue;
                session.set(onSession);
            }

            this.props.setUserData(newData);

            this.setState({
                details: {},
                inputValue: '',
                errorMessage: '',
                show: false
            });
        } catch (err) {
            console.error(err);
            const errorMessage = err.response.data.message;
            this.setState({ errorMessage });
        }
    }

    changeValue = e => {
        this.setState({ inputValue: e.target.value });
    }

    render() {
        const user = this.props.userData;
        const { details, show } = this.state;
        return (
            <div className="account-body">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="settings">
                                {show ?
                                    <div className="details">
                                        <div className="name">{details.field}</div>
                                        <input
                                            onChange={this.changeValue}
                                            autoFocus={true}
                                            autoComplete="off"
                                            id={details.id}
                                            type={details.type}
                                            className="form-control"
                                            placeholder={details.placeholder}
                                        />
                                        <div className="text-danger">{this.state.errorMessage}</div>
                                        <div className="action">
                                            <span onClick={this.saveChange} className="go-back">Kembali</span>
                                        </div>
                                    </div>
                                    :
                                    <Fragment>
                                        <div className="list-group" onClick={() => this.show('name')}>
                                            <div className="img">
                                                <img src={avataricon} alt="icon" className="icon" />
                                            </div>
                                            <div className="details">
                                                <div className="name">Nama</div>
                                                <div className="desc">{user.name ? user.name : 'Atur namamu di sini'}</div>
                                            </div>
                                            <div className="action">
                                                <img src={moveicon} alt="icon" className="icon" />
                                            </div>
                                        </div>
                                        <div className="list-group" onClick={() => this.show('repassword')}>
                                            <div className="img">
                                                <img src={keyicon} alt="icon" className="icon" />
                                            </div>
                                            <div className="details">
                                                <div className="name">Kata Sandi</div>
                                                <div className="desc">Perbarui kata sandi</div>
                                            </div>
                                            <div className="action">
                                                <img src={moveicon} alt="icon" className="icon" />
                                            </div>
                                        </div>
                                        <div className="list-group" onClick={() => this.show('phonenumber')}>
                                            <div className="img">
                                                <img src={phoneicon} alt="icon" className="icon" />
                                            </div>
                                            <div className="details">
                                                <div className="name">Phone</div>
                                                <div className="desc">{user.phonenumber ? user.phonenumber : 'Tambahkan nomor baru'}</div>
                                            </div>
                                            <div className="action">
                                                <img src={moveicon} alt="icon" className="icon" />
                                            </div>
                                        </div>

                                    </Fragment>
                                }
                            </div>

                            {!show ?
                                <div className="text-center mt-4">
                                    <button type="button" className="direct mt-4" onClick={this.logout}>KELUAR</button>
                                </div> : <></>}

                            <hr className="end" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    userData: state.userData
});

const reduxDispatch = dispatch => ({
    setUserData: data => dispatch({ type: 'SET_USERDATA', data })
});

export default connect(mapStateToProps, reduxDispatch)(Settings);
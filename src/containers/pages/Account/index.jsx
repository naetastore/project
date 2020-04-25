import React from 'react';
import './index.css';
import session from '../../../config/session';
import { connect } from 'react-redux';
import API from '../../../services';
import Img from '../../../components/molecules/Avatar';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { REST } from '../../../config/REST';

class Account extends React.Component {

    componentDidMount() {
        const s = session.get;
        if (s('username') === null) {
            this.props.history.push('/auth?account/myprofile');
            return
        }
        if (this.props.userData.username === undefined) {
            this.auth({ username: s('username'), password: s('password') });
        }
    }

    componentWillUnmount() {
        const controller = new AbortController();
        controller.abort();
    }

    changePhoto = e => {
        const img = e.target.files[0];

        const fd = new FormData();
        fd.append(REST.server.apikey.name, REST.server.apikey.key);
        fd.append('username', session.get('username'));
        fd.append('password', session.get('password'));
        fd.append('image', img);
        fd.append('avatar', 1);
        fd.append('update', 1);

        axios.post(`${REST.server.url}api/users`, fd).then(res => {
            res.data['password'] = session.get('password');
            this.setUser(res.data);
        });
    }

    auth = async data => {
        try {
            const response = await API.GET('users', data);

            let userData = response.data;
            userData['password'] = data.password;

            this.setUser(userData);

            return;
        } catch (err) {
            const errorMessage = err.response.data.message;
            console.log(errorMessage);
        }
    }

    setUser = data => {
        this.props.setUserData(data);
        session.set(data);
    }

    render() {
        const userInfo = this.props.userData;
        return (
            <div className="header-account">
                <div className="account">
                    <Img src={userInfo.avatar} onClick={() => this.fileInput.click()} className="avatar" />
                    <input
                        style={{ display: "none" }}
                        ref={fileInput => this.fileInput = fileInput}
                        onChange={this.changePhoto}
                        type="file"
                        name="avatar"
                        id="avatar" />
                    <div className="user-info mt-2">
                        <div className="name">{userInfo.name ? userInfo.name : userInfo.username}</div>
                    </div>
                </div>
                <div className="tabs un-text-d_">
                    <NavLink classactive="active" to="/account/myprofile">Akun</NavLink>
                    <NavLink classactive="active" to="/account/order">Order</NavLink>
                    <NavLink classactive="active" to="/account/notification">Notifikasi</NavLink>
                    <NavLink classactive="active" to="/account/settings">Setelan</NavLink>
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

export default connect(mapStateToProps, reduxDispatch)(Account);
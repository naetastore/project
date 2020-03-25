import React, { Fragment } from 'react';
import { REST } from '../../../config/REST';
import { NavLink } from 'react-router-dom';
import './Account.css';
import { connect } from 'react-redux';
import API from '../../../services';
import Axios from 'axios';
import Progress from '../../../components/molecules/Progress';

class Account extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            avatar: null,
            inputFile: null,
            progress: 0,
            isloading: false
        }
    }

    async componentDidMount() {
        if (!this.props.isAuthenticated) {
            return;
        }
        await this.setState({
            name: this.props.inSession.username,
            avatar: `${REST.server.url}assets/img/avatar/default_avatar.svg`
        });
        this.getUserData();
    }

    getUserData = async () => {
        try {
            const { username, password } = this.props.inSession;

            let response = await API.GET('user', { username, password });
            response = response.data.data;

            this.setState({ avatar: `${REST.server.url}assets/img/avatar/${response.avatar}` });
            this.updateSession(response);
            this.updateState(response);
        } catch (err) {
            console.error(err);
        }
    }

    updateSession = newdata => {
        let userdata = { ...this.props.inSession }
        userdata['name'] = newdata.name;
        userdata['roleId'] = newdata.roleId;
        userdata['phone'] = newdata.primaryPhone;
        userdata['created'] = newdata.dateCreated;
        userdata['avatar'] = `${REST.server.url}assets/img/avatar/${newdata.avatar}`;

        this.props.updateSession(userdata);

        const { username, password } = this.props.inSession;
        const session = window.sessionStorage;
        if (!session.getItem('naetastore_name')) {
            session.setItem('naetastore_name', username);
            session.setItem('naetastore_pass', password);
            session.setItem('naetastore_role', userdata.roleId);
            session.setItem('naetastore_avatar', userdata.avatar);
        }
    }

    updateState = () => {
        this.setState({ name: this.props.inSession.name });
    }

    setLoading = isloading => {
        this.setState({ isloading });
    }

    ngChangeImage = async e => {
        const img = e.target.files[0];

        let type = img.type.split('/');
        if (type[1] !== 'jpeg' && type[1] !== 'jpg' && type[1] !== 'png') {
            alert('Harus merupakan gambar');
            return;
        }

        this.setState({ inputFile: img });
        const newImg = await this.updateAvatar(img);
        this.updateUI(newImg);
    }

    updateAvatar = img => {
        const { username, password } = this.props.inSession;

        const fd = new FormData();
        fd.append('image', img, img.name)
        fd.append('apikey', 'andinaeta4328');
        fd.append('username', username);
        fd.append('password', password);

        this.setLoading(true);
        return new Promise((resolve, reject) => {
            Axios.post(`${REST.server.url}api/avatar`, fd, {
                onUploadProgress: progressEvent => {
                    let loaded = Math.round(progressEvent.loaded / progressEvent.total * 100);
                    this.setState({ progress: loaded });
                }
            })
                .then(res => {
                    this.setLoading(false);
                    resolve(res.data.avatar);
                })
                .catch(err => {
                    this.setLoading(false);
                    reject(err.response);
                    console.log(err.response);
                    // console.error(err.response.data);
                });
        });
    }

    updateUI = newdata => {
        const img = this.state.inputFile;
        const reader = new FileReader();

        reader.onload = () => {
            this.setState({ avatar: reader.result });
            let userdata = { ...this.props.inSession }
            userdata['avatar'] = reader.result;
            this.props.updateSession(userdata);
            window.sessionStorage.setItem('naetastore_avatar', newdata.path);
        }
        reader.readAsDataURL(img);
        this.setLoading(false);
    }

    render() {
        return (
            <Fragment>
                {this.state.isloading ? <Progress percentase={this.state.progress} /> : <></>}
                <div className="account-header">
                    <div className="account">
                        <div className="avatar">
                            <input
                                style={{ display: "none" }}
                                type="file"
                                name="image"
                                id="image"
                                ref={fileinput => this.fileinput = fileinput}
                                onChange={this.ngChangeImage}
                            />
                            <img
                                onClick={() => this.fileinput.click()}
                                alt="avatar" src={this.state.avatar} className="avatar" />
                            <div className="av-desc">
                                <div className="name">
                                    {this.state.name}
                                </div>
                                <div>{this.props.inSession.phone}</div>
                                <div>{this.props.inSession.created}</div>
                            </div>
                        </div>
                    </div>
                    <div className="tabs">
                        {
                            this.props.inSession.roleId > 1
                                ?
                                <Fragment>
                                    <NavLink
                                        to='/account/myprofile'
                                        classactive="active"
                                    >
                                        <div className="tab-menu">Akun</div>
                                    </NavLink>
                                    <NavLink
                                        to='/account/order'
                                    >
                                        <div className="tab-menu">Order</div>
                                    </NavLink>
                                    <NavLink
                                        to='/account/notification'
                                    >
                                        <div className="tab-menu">Notifikasi</div>
                                    </NavLink>
                                    <NavLink
                                        to='/account/help'
                                    >
                                        <div className="tab-menu">Bantuan</div>
                                    </NavLink>
                                </Fragment>
                                :
                                <Fragment>
                                    <NavLink
                                        to='/account/admin'
                                        classactive="active"
                                    >
                                        <div className="tab-menu">Statistik</div>
                                    </NavLink>
                                    <NavLink
                                        to='/account/order'
                                    >
                                        <div className="tab-menu">Order</div>
                                    </NavLink>
                                    <NavLink
                                        to='/account/notification'
                                    >
                                        <div className="tab-menu">Notifikasi</div>
                                    </NavLink>
                                    <NavLink
                                        to='/account/settings'
                                    >
                                        <div className="tab-menu">Setelan</div>
                                    </NavLink>
                                </Fragment>
                        }
                    </div>
                </div>
            </Fragment>
        );
    }

}

const mapStateToProps = state => ({
    inSession: state.inSession,
    isAuthenticated: state.isAuthenticated
});

const dispatch = dispatch => ({
    updateSession: userdata => dispatch({ type: 'UPDATE_SESSION', userdata })
});

export default connect(mapStateToProps, dispatch)(Account);
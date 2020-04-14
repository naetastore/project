import React, { Fragment } from 'react';
import { REST } from '../../../config/REST';
import { NavLink } from 'react-router-dom';
import './Account.css';
import { connect } from 'react-redux';
import Axios from 'axios';
import Progress from '../../../components/molecules/Progress';
import Default from '../../../assets/img/avatar/default.svg';
import { Session } from '../../../config/Session';
import API from '../../../services';
import { store } from '../../../config/redux/store';

class Account extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phone: '',
            avatar: null,
            inputFile: null,
            progress: 0,
            isloading: false
        }
    }

    async componentDidMount() {
        const session = Session.get();
        if (!session) {
            this.props.history.push('/auth?myprofile');
            return;
        } else {
            await this.setSession(session);
        }

        this.init();
        this.updateState();

        const c = new AbortController();
        if (!c.signal.aborted) {
            store.subscribe(() => {
                let inSession = store.getState().inSession;
                let { name, phone } = inSession;
                if (name !== undefined && name !== this.state.name) {
                    this.setState({ name });
                }
                if (phone !== this.state.phone) {
                    this.setState({ phone });
                }
            });
        }
    }

    componentWillUnmount() {
        const controller = new AbortController();
        controller.abort();
    }

    setSession = userdata => {
        this.props.setAuthenticated(true);
        this.props.setSession(userdata);
    }

    init = async () => {
        await this.setState({ avatar: Default });
    }

    updateState = async () => {
        let session = Session.get();

        let inSession = this.props.inSession;
        let { avatar, username, name } = inSession;

        if (name === undefined) {
            let response = await API.GET('user', { username: session.username, password: session.password });
            response = response.data.user;
            response['password'] = session.password;

            const newUserData = response;
            this.props.setSession(newUserData);
            inSession = this.props.inSession;
        }

        if (inSession.name !== undefined) {
            this.setState({ name: inSession.name });
        } else {
            this.setState({ name: username });
        }

        this.setState({ phone: inSession.phone });

        if (inSession.avatar !== undefined) {
            this.setState({ avatar });
        }
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

        try {
            const newImg = await this.updateAvatar(img);
            window.sessionStorage.setItem('naetastore_avatar', newImg.path);
            this.updateUI(newImg);
        } catch (err) {
            console.error(err);
        }
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
                });
        });
    }

    updateUI = () => {
        const img = this.state.inputFile;
        const reader = new FileReader();

        reader.onload = () => {
            this.setState({ avatar: reader.result });

            let userdata = { ...this.props.inSession }
            userdata['avatar'] = reader.result;

            this.props.setSession(userdata);
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
                                alt="avatar" src={this.state.avatar} className="avatar"
                            />
                            <div className="av-desc">
                                <div className="name">
                                    {this.state.name}
                                </div>
                                <div>{this.state.phone}</div>
                                <div>{this.props.inSession.created}</div>
                            </div>
                        </div>
                    </div>
                    <div className="tabs">
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
                                to='/account/settings'
                            >
                                <div className="tab-menu">Setelan</div>
                            </NavLink>
                        </Fragment>
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
    setSession: userdata => dispatch({ type: "SET_SESSION", userdata }),
    setAuthenticated: value => dispatch({ type: 'IS_AUTHENTICATED', value })
})

export default connect(mapStateToProps, dispatch)(Account);
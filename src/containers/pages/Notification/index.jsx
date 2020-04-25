import React from 'react';
import './index.css';
import icon from '../../../assets/img/icon/move-to-icon.svg';
import API from '../../../services/index';
import session from '../../../config/session';
import image from '../../../assets/img/notification-image-undraw.svg';

class Notification extends React.Component {

    state = {
        data: [],
        show: false,
        details: {},
        errCode: 0
    };

    componentDidMount() {
        this.getDataToAPI();
    }

    getDataToAPI = async () => {
        try {
            const s = {
                username: session.get('username'),
                password: session.get('password'),
            };
            const response = await API.GET('users/notifications', s);

            this.setState({ data: response.data });
        } catch (err) {
            console.error(err);

            this.setState({ errCode: err.response.status });
        }
    }

    show = async id => {
        let details = this.state.data.find(n => n.id === id);

        if (Number(details.readed) === 1) {
            this.setState({ details, show: true });
            return;
        }

        try {
            const s = {
                username: session.get('username'),
                password: session.get('password'),
                id,
                update: 1
            };
            await API.POST('users/notifications', s);

            details['readed'] = 1;
            this.setState({ details, show: true });
        } catch (err) {
            console.error(err);
        }
    }

    delete = async id => {
        try {
            const s = {
                username: session.get('username'),
                password: session.get('password'),
                id,
                delete: 1
            };
            await API.GET('users/notifications', s);

            let newData = this.state.data.filter(n => n.id !== id);
            if (!newData) newData = [];

            this.setState({ data: newData, details: {}, show: false });
        } catch (err) {
            console.error(err);
        }
    }

    render() {
        if (this.state.errCode === 404) return (
            <div className="d-grid">
                <div>
                    <img src={image} alt="icon" width="150" className="mb-2" />
                    <h4>Notifikasi</h4>
                    <div className="body">
                        Tetap mendapatkan
                    </div>
                </div>
                <div></div>
            </div>
        );
        const details = this.state.details;
        return (
            <div className="account-body">
                <div className="notifications">
                    {this.state.show
                        ?
                        <div className="details">
                            <div className="subject">{details.subject}</div>
                            <div className="message">{details.message}</div>
                            <div className="time">{details.created}</div>
                            <div className="action">
                                <span className="delete" onClick={() => this.delete(details.id)}>Hapus</span>
                                <span className="go-back" onClick={() => this.setState({
                                    details: {},
                                    show: false
                                })}>Kembali</span>
                            </div>
                        </div>
                        :
                        this.state.data.map((n, i) =>
                            <div className={`list-group readed-${n.readed}`} key={i} onClick={() => this.show(n.id)}>
                                <div className="details">
                                    <div className="desc" style={{ color: "#5468FF" }}>
                                        {n.subject}
                                    </div>
                                    <div className="time">{n.created}</div>
                                </div>
                                <div className="action">
                                    <img src={icon} alt="icon" className="icon" />
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        );
    }
}

export default Notification;
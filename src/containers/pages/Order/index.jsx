import React, { Fragment } from 'react';
import './index.css';
import icon from '../../../assets/img/icon/move-to-icon.svg';
import API from '../../../services';
import session from '../../../config/session';
import Summary from '../../organism/OrderSummary';
import Button from '../../../components/molecules/Button';

class Order extends React.Component {

    state = {
        data: [],
        show: false,
        details: {},
        userAccess: {},
        errCode: 0
    };

    componentDidMount() {
        this.getDataToAPI();
    }

    getDataToAPI = async () => {
        try {
            const s = {
                username: session.get('username'),
                password: session.get('password')
            };
            const response = await API.GET('orders', s);

            this.setState({ data: response.data });
        } catch (err) {
            console.error(err);

            this.setState({ errCode: err.response.status });
        }
    }

    show = async entry => {
        try {
            const s = {
                username: session.get('username'),
                password: session.get('password'),
                entry
            };
            const response = await API.GET('orders', s);
            const data = response.data;

            const details = {
                consumer: data.order.consumer,
                summary: data.order.summary
            };
            this.setState({ details, userAccess: data.useraccess, show: true });

        } catch (err) {
            console.error(err);
        }
    }

    cancel = async () => {
        if (!window.confirm('Apakah kamu yakin ingin membatalkan pesanan ini?')) {
            return;
        }

        const entry = this.state.details.summary.product[0].entry;
        const response = await this.request();

        if (response.status === 200) {
            let order = this.state.data.find(o => o.entry === entry);
            order['description'] = 'Dibatalkan';

            this.setState({ details: {}, userAccess: {}, show: false });
        }
    }

    delete = async () => {
        if (!window.confirm('Apakah kamu yakin ingin menghapus pesanan ini?')) {
            return;
        }

        const entry = this.state.details.summary.product[0].entry;
        const response = await this.request();

        if (response.status === 200) {

            let newData = this.state.data.filter(o => o.entry !== entry);
            if (!newData) newData = [];

            this.setState({ data: newData, details: {}, userAccess: {}, show: false });
        }
    }

    confirm = async () => {
        if (!window.confirm('Mengkonfirmasi asumsinya telah dibayar, lanjutkan?')) {
            return;
        }

        try {
            const entry = this.state.details.summary.product[0].entry;

            const s = {
                username: session.get('username'),
                password: session.get('password'),
                entry,
                update: 1
            };
            await API.POST('orders', s);

            let order = this.state.data.find(o => o.entry === entry);
            order['description'] = 'Dikonfirmasi';
            order['readed'] = 1;

            this.setState({ details: {}, userAccess: {}, show: false });
        } catch (err) {
            console.error(err);
        }
    }

    request = async () => {
        try {
            const entry = this.state.details.summary.product[0].entry;

            const s = {
                username: session.get('username'),
                password: session.get('password'),
                entry,
                delete: 1
            };
            const response = await API.GET('orders', s);

            return response;
        } catch (err) {
            console.error(err);
            console.log(err.response);
        }
    }

    render() {
        if (this.state.errCode === 404) return (
            <div className="d-grid">
                <div>
                    <h4>Tidak Ada Order!</h4>
                    <div className="body mb-4">
                        Belum ada pesanan saat ini.
                    </div>
                    <Button
                        className="mx-auto"
                        onClick={() => this.props.history.push('/product')}
                    >Buat</Button>
                </div>
                <div></div>
            </div>
        );
        const access = this.state.userAccess;
        return (
            <div className="account-body">
                <div className="orders">
                    {this.state.show ? (
                        <Fragment>
                            <div className="order-confirm">
                                {access.hasDelete
                                    ?
                                    <Fragment>
                                        <div className="question">Hapus Order ini?</div>
                                        <div className="delete" onClick={this.delete}>Hapus</div>
                                    </Fragment>
                                    : <></>
                                }
                                {access.hasCancel
                                    ?
                                    <Fragment>
                                        <div className="question">Cancel Order ini?</div>
                                        <div className="delete" onClick={this.cancel}>Cancel</div>
                                    </Fragment>
                                    : <></>
                                }
                                {access.hasConfirm
                                    ?
                                    <Fragment>
                                        <div className="question">Konfirmasi Order ini?</div>
                                        <div className="delete" onClick={this.confirm}>Konfirmasi</div>
                                    </Fragment>
                                    : <></>
                                }
                                <div
                                    className="go-back"
                                    onClick={() => this.setState({
                                        details: {},
                                        userAccess: {},
                                        show: false
                                    })}
                                >
                                    Kembali
                                </div>
                            </div>
                            <Summary data={this.state.details} />
                        </Fragment>
                    ) : ( this.state.data.map((o, i) =>
                            <div onClick={() => this.show(o.entry)} className={`list-group readed-${o.readed}`} key={i}>
                                <div className="details">
                                    <div className="desc" style={{ color: o.textcolor }}>{o.description}</div>
                                    <div className="time">{o.created}</div>
                                </div>
                                <div className="action">
                                    <img src={icon} alt="icon" className="icon" />
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>
        );
    }
}

export default Order;
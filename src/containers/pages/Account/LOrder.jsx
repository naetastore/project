import React, { Fragment, useState } from 'react';
import './LOrder.css';
import MoveTo from '../../../assets/img/icon/move-to.svg';
import API from '../../../services';
import OrderSummary from '../../organism/OrderSummary';
import { Col, Row, Container } from 'react-bootstrap';
import Avatar from '../../../components/molecules/Avatar';

function LOrder(props) {
    const [showDetails, setShowDetails] = useState(false);
    const [orders, setOrders] = useState([]);
    const [orderDetail, setOrderDetail] = useState({});
    const [consumer, setConsumer] = useState({});
    const [userAccess, setUserAccess] = useState({});

    const show = async entry => {
        try {
            const { username, password } = props.inSession;
            const response = await API.GET('order', { entry, username, password });
            setUserAccess(response.data.useraccess);
            setConsumer(response.data.order.consumer);
            setOrders(response.data.order.summary.product);
            setOrderDetail(response.data.order.summary.detail);
            setShowDetails(true);
        } catch (err) {
            console.error(err);
        }
    }

    const orderConfirm = async () => {
        if (!window.confirm('Mengkonfirmasi asumsinya telah dibayar, lanjutkan?')) {
            return;
        };
        try {
            const { username, password } = props.inSession;
            const consumername = consumer.username;

            await API.POST('uporder', { username, password, consumername });

            let data = props.data.find(o => o.user_id === consumer.id);
            data['description'] = 'Telah dikonfirmasi';
            data['readed'] = 1;

            setShowDetails(false);
        } catch (err) {
            console.error(err);
        }
    }

    const orderDelete = async () => {
        if (!window.confirm('Apakah kamu yakin kamu ingin menghapus pesanan ini?')) {
            return;
        }
        try {
            const { username, password } = props.inSession;
            const consumername = consumer.username;
            const entry = orders[0]['entry'];

            await API.GET('deorder', { username, password, consumername, entry });
            const latest = props.data.filter(o => o.entry !== entry);
            props.updateStateFunc(latest);
            setShowDetails(false);
        } catch (err) {
            console.error(err);
        }
    }

    const orderCancel = async () => {
        if (!window.confirm('Apakah kamu yakin kamu ingin membatalkan pesanan ini?')) {
            return;
        }
        try {
            const { username, password } = props.inSession;
            const consumername = consumer.username;
            const entry = orders[0]['entry'];

            await API.GET('deorder', { username, password, consumername, entry });
            let order = props.data.find(o => o.entry === entry);
            order['description'] = 'Dibatalkan';
            setShowDetails(false);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        showDetails ?
            <Fragment>
                <div className="order-confirm">
                    {
                        userAccess.hasConfirm
                            ?
                            <Fragment>
                                <div className="question">Konfirmasi Order ini?</div>
                                <div className="confirm paid" onClick={orderConfirm}
                                >Konfirmasi</div>
                            </Fragment>
                            : <></>
                    }
                    {
                        userAccess.hasDelete
                            ?
                            <Fragment>
                                <div className="question">Hapus Order ini?</div>
                                <div className="confirm delete" onClick={orderDelete}
                                >Hapus</div>
                            </Fragment>
                            : <></>
                    }
                    {
                        userAccess.hasCancel
                            ?
                            <Fragment>
                                <div className="question">Cancel Order ini?</div>
                                <div className="confirm delete" onClick={orderCancel}
                                >Cancel</div>
                            </Fragment>
                            : <></>
                    }
                    <div
                        className="go-back"
                        onClick={() => setShowDetails(false)}
                    >Kembali</div>
                </div>
                <OrderSummary
                    onSession={consumer}
                    addedItems={orders}
                    subTotal={orderDetail.subtotal}
                    totalOrder={orderDetail.total}
                    shipping={orderDetail.shipping}
                    idName="product_id"
                    ngClickProduct={props.moveToSingle}
                />
            </Fragment>

            :

            props.data.map((d, i) =>
                <div
                    onClick={() => show(d.entry)}
                    className={`notif-list-group hoverable readed-${d.readed}`}
                    key={i}
                >
                    <Container>
                        <Row>
                            {props.uiConfig.hasAvatar ? <Col xs={3} className="my-auto">
                                <Avatar src={d.avatar} alt="avatar" className="avatar rounded-circle" />
                            </Col>
                                : <></>}
                            <Col>
                                <div className="notif-details">
                                    {props.uiConfig.hasName ?
                                        <div className="notif-subject">{d.username}</div>
                                        : <></>}
                                    <div style={{ color: d.textcolor }} className="notif-desc">{d.description}</div>
                                    <div className="notif-time">{d.created}</div>
                                </div>
                            </Col>
                            <Col xs={1} className="my-auto">
                                <div className="notif-action">
                                    <img src={MoveTo} alt="mi" className="icon" />
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            )
    );
}

export default LOrder;
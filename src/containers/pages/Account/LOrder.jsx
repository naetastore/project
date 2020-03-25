import React, { Fragment, useState } from 'react';
import './LOrder.css';
import MoveTo from '../../../assets/img/icon/move-to.svg';
import API from '../../../services';
import OrderSummary from '../../organism/OrderSummary';
import { Col, Row, Container } from 'react-bootstrap';

function LOrder(props) {
    const [showDetails, setShowDetails] = useState(false);
    const [orders, setOrders] = useState([]);

    const [totalOrder, setTotalOrder] = useState(0);
    const [consumerDetails, setConsumerDetails] = useState({});

    const show = async entry => {
        try {
            const { username, password } = props.inSession;
            const response = await API.GET('order', { entry, username, password });
            setConsumerDetails(response.data.user);
            setOrders(response.data.order);

            setShowDetails(true);

            let total = 0;
            response.data.order.map(d => total += (Number(d.price) * Number(d.qty)));
            setTotalOrder(total);
        } catch (err) {
            console.error(err);
        }
    }

    const orderConfirm = async () => {
        if (!window.confirm('Apakah kamu yakin kamu ingin mengkonfirmasi pesanan ini?')) {
            return;
        };
        try {
            const { username, password } = props.inSession;
            const consumername = consumerDetails.username;

            await API.POST('uporder', { username, password, consumername });

            let data = props.data.find(o => o.user_id === consumerDetails.id);
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
        };
        try {
            const { username, password } = props.inSession;
            const consumername = consumerDetails.username;
            const entry = orders[0]['entry'];

            await API.GET('deorder', { username, password, consumername, entry });
            const latest = props.data.filter(o => o.entry !== entry);
            props.updateState(latest);
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
                        consumerDetails.hasConfirm
                            ?
                            <Fragment>
                                <div className="question">Konfirmasi Order ini?</div>
                                <div className="confirm" onClick={orderConfirm}
                                >Konfirmasi</div>
                            </Fragment>
                            : <></>
                    }
                    {
                        consumerDetails.hasDelete
                            ?
                            <Fragment>
                                <div className="question">Hapus Order ini?</div>
                                <div className="confirm" onClick={orderDelete}
                                >Hapus</div>
                            </Fragment>
                            : <></>
                    }
                    <div
                        className="go-back"
                        onClick={() => setShowDetails(false)}
                    >Kembali</div>
                </div>
                <OrderSummary
                    onSession={consumerDetails}
                    addedItems={orders}
                    totalOrder={totalOrder}
                    shipping="0"
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
                            {d.has_avatar ? <Col xs={3} className="my-auto">
                                <img alt="avatar" src={d.avatar} className="avatar rounded-circle" /> </Col>
                                : <></>}
                            <Col>
                                <div className="notif-details">
                                    <div className="notif-subject">{d.username}</div>
                                    <div className="notif-time">{d.description}</div>
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
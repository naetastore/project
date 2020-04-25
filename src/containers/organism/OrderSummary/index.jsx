import React from 'react';
import './index.css';
import { NavLink } from 'react-router-dom';

function OrderSummary(props) {
    const consumer = props.data.consumer;

    const products = props.data.summary.product;
    const totalItem = products.length;

    const details = props.data.summary.detail;

    const subTotal = details.subtotal;
    const shipping = details.shipping;
    const total = details.total;

    return (
        <div className="order-summary">
            <div className="consumer-name pb-0">{consumer.name}</div>
            <div className="body">
                <div>{consumer.address}</div>
                <div>
                    <a href={`tel://${consumer.phone}`}>{consumer.phone}</a>
                </div>
            </div>
            <div className="body">
                <div className="mb-2 flex">
                    <span>Total Item </span>
                    <span>{totalItem}</span>
                    <span>{subTotal}</span>
                </div>
                <div className="mb-2">
                    {products.map((p, i) =>
                        <div key={i}>
                            <NavLink to={`/single/${p.product_id}`}>{p.name}</NavLink>
                            <span className="counter">{p.qty}</span>
                            <div className="price">{p.price}</div>
                        </div>
                    )}
                </div>
                <div className="mb-2">
                    <div className="flex">
                        <span>Pengiriman </span>
                        <span>{shipping}</span>
                    </div>
                </div>
                <div className="mb-2 flex">
                    <span>Total Pesanan </span>
                    <span>{total}</span>
                </div>
            </div>
        </div>
    );
}

OrderSummary.defaultProps = {
    data: {
        consumer: {
            name: '',
            address: '',
            phone: ''
        },
        summary: {
            product: [
                {
                    id: 0,
                    name: '',
                    price: 0,
                    qty: 0
                }
            ],
            detail: {
                subtotal: 0,
                shipping: 0,
                total: 0
            }
        }
    }
};

export default OrderSummary;
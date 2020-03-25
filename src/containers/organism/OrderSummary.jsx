import React from 'react';

function OrderSummary(props) {
    return (
        <div className="card">
            <div className="card-title">{props.onSession.name}</div>
            <div className="card-body">
                <div>{props.onSession.address}</div>
                <div>{props.onSession.phonenumber}</div>
            </div>

            <hr />

            <div className="card-body">
                <div className="order-summary flex">
                    <span>Order: </span>
                    <span>{props.addedItems.length} item</span>
                </div>

                {/* ngRepeat Item */}
                {props.addedItems.map((a, i) =>
                    <div key={i} className="order-summary">
                        <div onClick={() => props.ngClickProduct(a[props.idName])}>{a.name} <span className="counter">{a.qty}</span></div>
                        <div className="order-price">Rp. {a.price}</div>
                    </div>
                )}
                {/* End ngRepeat Item */}

                <div className="order-summary">
                    <div className="flex">
                        <span>Subtotal: </span>
                        <span>Rp. {props.totalOrder}</span>
                    </div>
                    <div className="flex">
                        <span>Pengiriman: </span>
                        <span>Rp. {props.shipping}</span>
                    </div>
                </div>

                <div className="order-summary flex">
                    <span>Total order: </span>
                    <span>Rp. {props.totalOrder}</span>
                </div>
            </div>
        </div>
    );
}

export default OrderSummary;
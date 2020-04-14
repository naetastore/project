import React from 'react';

function OrderSummary(props) {
    let curs = ''; if (props.addedItems.length) curs = props.addedItems[0].curs;
    return (
        <div className="card">
            <div className="card-title pb-0">{props.onSession.name}</div>
            <div className="card-body">
                <div>{props.onSession.address}</div>
                <div><a href={`tel://${props.onSession.phone}`}>{props.onSession.phone}</a></div>
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
                        <div className="order-price">{a.curs} {a.price}</div>
                    </div>
                )}
                {/* End ngRepeat Item */}

                <div className="order-summary">
                    <div className="flex">
                        <span>Subtotal: </span>
                        <span>{curs} {props.subTotal}</span>
                    </div>
                    <div className="flex">
                        <span>Pengiriman: </span>
                        <span>{curs} {props.shipping}</span>
                    </div>
                </div>

                <div className="order-summary flex">
                    <span>Total order: </span>
                    <span>{curs} {props.totalOrder}</span>
                </div>
            </div>
        </div>
    );
}

export default OrderSummary;
import React from 'react';
import './ProductItem.css';

const ProductItem = (props) => {
    return (
        <div className={props.type}>
            <div className="img">
                <img src={props.imgUrl} alt="product" className="product-image" onClick={props.ngClick} />
            </div>
            <div className="body">
                <div className="product-title" onClick={props.ngClick}>{props.name}</div>
                <div className="product-desc">{props.desc}</div>
                <div className="product-price">{props.curs} {props.price}</div>
            </div>
        </div>
    );
}

ProductItem.defaultProps = {
    type: 'product-item',
    imgUrl: '',
    name: '',
    desc: '',
    price: '00.00',
    ngClick: null
}

export default ProductItem;
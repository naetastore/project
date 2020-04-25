import React, { useState, useEffect } from 'react';
import './index.css';
import Img from '../../atoms/Img';

function Product(props) {

    const [data, setData] = useState(props.data);

    useEffect(() => {
        checkData();
    });

    const checkData = () => {
        if (props.data.name === undefined) {
            setData(Product.defaultProps.data);
        } else {
            setData(props.data);
        }
    }

    return (
        <div className={props.className}>
            <div className="img">
                <Img src={data.image} alt="product" onClick={() => props.onClick(data.id)} />
            </div>
            <div className="body">
                <div className="title" onClick={() => props.onClick(data.id)}>{data.name}</div>
                <div className="desc">{data.description}</div>
                <div className="price">{data.curs} {data.price}</div>
            </div>
        </div>
    );
}

Product.defaultProps = {
    className: "product-item-min",
    data: {
        name: 'Naeta Store',
        description: 'E-Commerce mobile application built with by Andi.',
        curs: 'Copyright',
        price: '© 2020'
    },
    onClick: () => false
};

export default Product;
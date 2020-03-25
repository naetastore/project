import React, { Fragment } from 'react';
import './Suggested.css';
import ProductItem from '../../components/molecules/ProductItem';

const Suggested = (props) => {
    return (
        <Fragment>
            <div className="suggested">
                <div className="make-it-horizontal items">
                    {props.data.map((v, i) =>
                        <ProductItem
                            type="product-item-min"
                            key={i}
                            ngClick={() => props.ngClick(v.id)}
                            imgUrl={props.imgloc + v.image}
                            name={v.name}
                            desc={v.description}
                            price={v.price}
                        />
                    )}
                </div>
            </div>
        </Fragment>
    );
}

Suggested.defaultProps = {
    title: '',
    data: []
}

export default Suggested;
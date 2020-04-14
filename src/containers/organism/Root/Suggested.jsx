import React, { Fragment } from 'react';
import './Suggested.css';
import ProductItem from '../../../components/molecules/ProductItem';

const Suggested = (props) => {
    return (
        <Fragment>
            <div className="suggested">
                <div className="make-it-horizontal suggested-items">
                    {props.data.map((v, i) =>
                        <ProductItem
                            type="product-item-min"
                            key={i}
                            ngClick={() => props.ngClick(v.id)}
                            imgUrl={v.image}
                            name={v.name}
                            desc={v.description}
                            price={v.price}
                            curs={v.curs}
                        />
                    )}
                </div>
            </div>
        </Fragment>
    );
}

Suggested.defaultProps = {
    data: []
}

export default Suggested;
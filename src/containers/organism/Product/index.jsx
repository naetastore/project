import React from 'react';
import './index.css';
import ProductMinimal from '../../../components/molecules/Product';

function Product(props) {
    return (
        <div className="products make-it-horizontal">
            {props.data.map((p, i) =>
                <ProductMinimal data={p} key={i} onClick={props.onClick} />
            )}
        </div>
    );
}

Product.defaultProps = {
    data: []
};

export default Product;
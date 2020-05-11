import React from 'react';
import './index.css';
import ProductMinimal from '../../../components/molecules/Product';
import ScrollContainer from 'react-indiana-drag-scroll';

function Product(props) {
    return (
    	<ScrollContainer className="scroll-container" horizontal={true}>
	        <div className="products">
	            {props.data.map((p, i) =>
	                <ProductMinimal data={p} key={i} onClick={props.onClick} />
	            )}
	        </div>
        </ScrollContainer>
    );
}

Product.defaultProps = {
    data: []
};

export default Product;
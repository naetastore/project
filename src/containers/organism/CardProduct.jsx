import React, { Fragment } from 'react';
import ProductItem from '../../components/molecules/ProductItem';
import ProductFooter from '../../components/molecules/ProductFooter';

const CardProduct = (props) => {
    return (
        <div className="margin-bottom-80">
            {props.data.map((d) =>
                d.category_id === props.categoryId
                    ? <div className="product" key={d.id}>
                        <ProductItem
                            imgUrl={d.image}
                            name={d.name}
                            desc={d.description}
                            price={d.price}
                            curs={d.curs}
                        />
                        <ProductFooter
                            ngClick={() => props.ngClick(d)}
                        />
                    </div>
                    : <Fragment key={d.id}></Fragment>
            )}
        </div>
    );
}

CardProduct.defaultProps = {
    data: []
}

export default CardProduct;
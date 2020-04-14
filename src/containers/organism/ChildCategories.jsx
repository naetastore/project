import React, { Fragment } from 'react';
import ChildHeading from '../../components/molecules/Product/ChildHeading';
import ProductItem from '../../components/molecules/ProductItem';

function ChildCategories(props) {
    return (
        // ngRepeat Category
        props.categories.map(c =>
            <Fragment key={c.id}>
                {c.global_id === props.globalId
                    ?
                    <Fragment>
                        <ChildHeading
                            title={c.name}
                            desc={c.description}
                        />
                        <button type="button" className="direct" onClick={() => props.ngClickCategory(c.id, c.name)}>Lihat Semua</button>
                        <div className="make-it-rounder make-it-horizontal my-3 products">
                            {/* ngRepeat Product */}
                            {props.products.map(p =>
                                p.category_id === c.id ?
                                    <ProductItem
                                        type="product-item-min"
                                        key={p.id}
                                        ngClick={() => props.ngClickProduct(p.id)}
                                        imgUrl={p.image}
                                        name={p.name}
                                        desc={p.description}
                                        price={p.price}
                                        curs={p.curs} />
                                    : <Fragment key={p.id}></Fragment>
                            )}
                            {/* End ngRepeat Product */}
                        </div>
                    </Fragment>
                    : <></>
                }
            </Fragment>
            // End ngRepeat Category
        )
    );
}

ChildCategories.defaultProps = {
    categories: [],
    products: []
}

export default ChildCategories;
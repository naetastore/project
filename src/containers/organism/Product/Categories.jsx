import React, { Fragment } from 'react';
import Heading from '../../../components/molecules/Product/Heading';
import ChildHeading from '../../../components/molecules/Product/ChildHeading';
import ProductItem from '../../../components/molecules/ProductItem';

const Categories = props => {
    return (
        <div className="categories">
            {/* ngRepeat Global Category */}
            {props.globals.map(g =>
                <div className="category" key={g.id}>
                    <Heading title={g.name} desc={g.description} />

                    {/* ngRepeat Categories WHERE global_id => id Global Category*/}
                    {props.categories.map(c =>
                        c.global_id === g.id
                            ?
                            <Fragment key={c.id}>
                                <ChildHeading title={c.name} desc={c.description} />
                                <button type="button" className="direct" onClick={() => props.ngClickCatalog(c.id, c.name)}>Lihat Semua</button>
                                <div className="make-it-rounder make-it-horizontal my-3 products">

                                    {/* ngRepeat Products WHERE category_id => id Category*/}
                                    {props.products.map((p, i) =>
                                        p.category_id === c.id
                                            ?
                                            <Fragment key={i}>
                                                <ProductItem
                                                    type="product-item-min"
                                                    key={p.id}
                                                    ngClick={() => props.ngClickProduct(p.id)}
                                                    imgUrl={p.image}
                                                    name={p.name}
                                                    price={p.price}
                                                />
                                            </Fragment>
                                            : <Fragment key={i}></Fragment>
                                    )}
                                    {/* End ngRepeat Products */}

                                </div>
                            </Fragment>
                            : <Fragment key={c.id}></Fragment>
                    )}
                    {/* End ngRepeat Categories */}

                </div>
            )}
            {/* End ngRepeat Global Category */}
        </div>
    );
}

Categories.defaultProps = {
    title: '',
    globals: [],
    categories: [],
    products: []
}

export default Categories;
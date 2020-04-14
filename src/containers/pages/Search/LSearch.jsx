import React, { Fragment } from 'react';
import './LSearch.css';
import BoxAction from '../../../components/molecules/BoxAction';

const LSearch = props => {
    return (
        <div className="l-search">
            {props.data.map((s, i) =>
                <Fragment key={i}>
                    <>
                        <div className="search">
                            <div className="img my-auto">
                                <img
                                    src={s.image}
                                    alt={s.name}
                                    className="search-img"
                                    onClick={() => props.moveToSingle(s.id)}
                                />
                            </div>
                            <div className="body">
                                <div className="search-desc">
                                    {s.description}
                                </div>
                                <div className="search-title">
                                    {s.name}
                                </div>
                                <div className="search-price">
                                    Rp. {s.price}
                                </div>
                            </div>
                        </div>
                        <BoxAction
                            title="Tambah ke Troli"
                            label="+"
                            ngClick={() => props.addToCart(s)}
                        />
                    </>
                </Fragment>
            )}
        </div>
    );
}

export default LSearch;
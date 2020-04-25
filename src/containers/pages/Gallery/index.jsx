import React, { Fragment, useEffect, useState } from 'react';
import './index.css';
import API from '../../../services';
import InfiniteScroll from 'react-infinite-scroller';
import Figure from 'react-bootstrap/Figure'
import Input from '../../../components/molecules/Input';

let page = 0;

function Gallery(props) {

    const [items, setItems] = useState([]);
    const [initialized, setInitialized] = useState(false);
    const [hasMore, setHasMore] = useState(false);

    const [searchMode, setSearchMode] = useState(false);
    const [errMessage, setErr] = useState('');

    useEffect(() => {
        if (!initialized) {
            getNewProduct();
        }
    });

    const getNewProduct = async () => {
        if (searchMode) {
            setHasMore(false);
        } else {
            page++;
            const response = await API.GET('product', { 'limit': page });
            if (response.data.product.length > items.length) {
                setItems(response.data.product);
                setHasMore(true);
            } else {
                setHasMore(false);
            }
        }

        setInitialized(true);
    }

    const search = async keyword => {
        try {
            const response = await API.GET('product/search', { 'q': keyword });
            setSearchMode(true);
            setItems(response.data.search);
            if (response.data.search.length) setErr('');
        } catch (err) {
            console.error(err);
            const errorMessage = err.response.data.message;
            setErr(errorMessage);
        }
    }

    return (
        <Fragment>
            <Input placeholder="Kata kunci..." onClick={search} className="mt-4" />
            {errMessage
                ? <div className="alert alert-danger mt-3">{errMessage}</div>
                : <></>}
            <div className="text-center mt-4 mb-80">
                <InfiniteScroll
                    pageStart={page}
                    loadMore={getNewProduct}
                    hasMore={hasMore}
                    threshold={60}
                >
                    {items.map((p, i) =>
                        <Figure key={i}>
                            <Figure.Image
                                width={window.innerWidth / 3.5}
                                src={p.image}
                                onClick={() => props.history.push(`/single/${p.id}`)}
                            />
                        </Figure>
                    )}
                </InfiniteScroll>
            </div>
        </Fragment>
    );
}

export default Gallery;
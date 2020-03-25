import React, { useState, useEffect } from 'react';
import './Gallery.css';
import API from '../../../services';
import InfiniteScroll from 'react-infinite-scroller';
import Figure from 'react-bootstrap/Figure'
import { REST } from '../../../config/REST';
import InputKeyword from '../../../components/molecules/InputKeyword';
let page = 0;

function Galery(props) {
    const [items, setItems] = useState([]);
    const [initialized, setInitialized] = useState(false);
    const [hasMore, setHasMore] = useState(false);

    const [searchMode, setSearchMode] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [errMessage, setErr] = useState('');

    const getNewProduct = async () => {
        if (searchMode) {
            setHasMore(false);
            const response = await API.GET('search', { 'q': keyword });
            setItems(response.data.search);
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

    useEffect(() => {
        if (!initialized) {
            getNewProduct();
        }
    });

    const directToProduct = id => {
        props.history.push('/single/' + id)
    }

    const changeKeyword = e => {
        setKeyword(e.target.value);
    }

    const search = async () => {
        try {
            setErr('');
            const response = await API.GET('search', { 'q': keyword });
            setItems(response.data.search);
            setSearchMode(true);
        } catch (err) {
            setErr(err.message);
        }
    }

    return (
        <>
            <div className="gallery">
                <InputKeyword
                    placeholder="Kata kunci..."
                    ngChange={changeKeyword}
                    ngClick={search}
                />
                {
                    errMessage
                        ? <div className="alert alert-danger">{errMessage}</div>
                        : <></>
                }

                <InfiniteScroll
                    pageStart={page}
                    loadMore={getNewProduct}
                    hasMore={hasMore}
                    threshold={100}
                >
                    {items.map((i, index) =>
                        <Figure key={index}>
                            <Figure.Image
                                width={window.innerWidth / 3.5}
                                src={REST.server.url + 'assets/img/product/' + i.image}
                                onClick={() => directToProduct(i.id)}
                            />
                        </Figure>
                    )}
                </InfiniteScroll>
            </div>
        </>
    );
}

export default Galery;
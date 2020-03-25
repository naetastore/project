import React from 'react';
import { useState, useEffect } from 'react';
import './HomePage.css';
import InfiniteScroll from 'react-infinite-scroller';
import Figure from 'react-bootstrap/Figure'
import { getPhotos } from './requests';
let page = 0;
function HomePage() {
    const [items, setItems] = useState([]);
    const [initialized, setInitialized] = useState(false);
    const [totalHits, setTotalHits] = useState(0);
    const getNewPhotos = async () => {
        page++;
        const response = await getPhotos(page);
        setItems(items.concat(response.data.hits));
        setTotalHits(response.data.totalHits);
        setInitialized(true);
    }
    useEffect(() => {
        if (!initialized) {
            getNewPhotos();
        }
    });
    return (
        <div className="HomePage">
            <InfiniteScroll
                pageStart={page}
                loadMore={getNewPhotos}
                hasMore={totalHits > items.length}
                threshold={100}
            >
                {items.map((i, index) =>
                    <Figure key={index}>
                        <Figure.Image
                            width={window.innerWidth / 3.5}
                            src={i.previewURL}
                        />
                    </Figure>
                )}
            </InfiniteScroll>
        </div>
    );
}
export default HomePage;
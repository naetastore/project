import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

const Banner = (props) => {
    return (
        <Carousel nextIcon={false} prevIcon={false} className={props.className}>
            {props.data.map((v) =>
                <Carousel.Item key={v.id}>
                    <img
                        className="d-block w-100"
                        src={props.other.urlImg + v.image}
                        alt={v.image} />
                    {/* <Carousel.Caption>
                        <h3>{v.name}</h3>
                        <p>{v.description}</p>
                    </Carousel.Caption> */}
                </Carousel.Item>
            )}
        </Carousel>
    );
}

Banner.defaultProps = { data: [], other: [], className: '' }

export default Banner;
import React from 'react';
import './index.css';
import Img from '../../../components/atoms/Img';
import ScrollContainer from 'react-indiana-drag-scroll';


function Style(props) {
    return (
        <ScrollContainer className="scroll-container" horizontal={true}>
            <div className="options">
                {props.data.map((s, i) =>
                    <div className="option" key={i}>
                        <div className="img">
                            <Img src={s.image} alt="Style" onClick={() => props.onClick(s.id)} />
                        </div>
                        <div className="body">
                            <div className="desc" onClick={() => props.onClick(s.id)}>{s.description}</div>
                            <div className="title" onClick={() => props.onClick(s.id)}>{s.name}</div>
                            <div className="price">{s.curs} {s.start_price} — {s.high_price}</div>
                        </div>
                    </div>
                )}
            </div>
        </ScrollContainer>
    );
}

Style.defaultProps = {
    data: []
};

export default Style;
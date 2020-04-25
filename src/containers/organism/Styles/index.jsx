import React from 'react';
import './index.css';
import Img from '../../../components/atoms/Img';


function Style(props) {
    return (
        <div className="options make-it-horizontal">
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
    );
}

Style.defaultProps = {
    data: []
};

export default Style;
import React, { Fragment } from 'react';
import './Options.css';

const Options = props => {
    return (
        <div className="opt-wrapper">
            {props.data.map(c =>
                <Fragment key={c.id}>
                    <div className="options">
                        <div className="img">
                            <img
                                src={props.imgloc + c.image}
                                onClick={() => props.ngClick(c)}
                                alt={c.name} className="option-img"
                            />
                        </div>
                        <div className="body">
                            <div
                                className="option-desc"
                                onClick={() => props.ngClick(c)}
                            >
                                {c.description}
                            </div>
                            <div className="option-title">
                                {c.name}
                            </div>
                            <div className="option-price">
                                Rp. {c.start_price + ' — ' + c.high_price}
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </div>
    );
}

export default Options;
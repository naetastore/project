import React, { Fragment } from 'react';
import './Options.css';

const Options = props => {
    return (
        <div className="options">
            {props.data.map(c =>
                <Fragment key={c.id}>
                    <div className="option">
                        <div className="img">
                            <img
                                src={c.image}
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
                                {`${c.curs} ${c.start_price} — ${c.high_price}`}
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </div>
    );
}

Options.defaultProps = {
    data: []
}

export default Options;
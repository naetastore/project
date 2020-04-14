import React from 'react';
import './AsyncButton.css';
import Spinner from 'react-bootstrap/Spinner';
import rightArrow from '../../assets/img/icon/right-arrow.svg';

const AsyncButton = (props) => {
    return (
        <button
            type={props.type}
            className="btn primary"
            disabled={props.isLoading | props.disabled}
            onClick={props.ngClick}
        >
            <div className="box-title">
                {props.isLoading
                    ?
                    <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />
                    :
                    props.label
                }
            </div>
            <div className="btn goto">
                <img src={props.icon} alt="ai" className="icon" />
            </div>
        </button>
    );
}

AsyncButton.defaultProps = {
    isLoading: false,
    label: "no label",
    type: "submit",
    icon: rightArrow
}

export default AsyncButton;
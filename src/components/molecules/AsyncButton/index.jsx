import React from 'react';
import icon from '../../../assets/img/icon/right-arrow-icon.svg';
import Spinner from 'react-bootstrap/Spinner';

function AsyncButton(props) {
    return (
        <button
            disabled={props.disabled | props.isLoading}
            type={props.type}
            className={props.className ? 'btn primary ' + props.className : 'btn primary'}
            onClick={props.onClick}
        >
            <div className="label">
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
                    props.children
                }
            </div>
            <div className="btn">
                <img src={icon} alt="icon" className="icon" />
            </div>
        </button>
    );
}

AsyncButton.defaultProps = {
    type: "submit",
    disabled: true
};

export default AsyncButton;
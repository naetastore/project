import React from 'react';
import icon from '../../../assets/img/icon/plus-cyan-icon.svg'

function Button(props) {
    return (
        <button
            type={props.type}
            className={props.className ? 'btn primary ' + props.className : 'btn primary'}
            onClick={props.onClick}
        >
            {props.children ? <div className="label mr-4">{props.children}</div> : <></>}
            <div className="btn ml-0">
                <img src={icon} alt="icon" className="icon" />
            </div>
        </button>
    );
}

Button.defaultProps = {
    type: "button"
}

export default Button;
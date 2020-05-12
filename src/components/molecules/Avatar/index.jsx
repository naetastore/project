import React, { useState, useEffect } from 'react';
import Default from '../../../assets/img/icon/account-menu-icon.svg';

function Avatar(props) {

    const [src, setSrc] = useState(Default);

    const checkSrc = () => {
        if (props.src !== undefined) {
            setSrc(props.src);
        } else {
            setSrc(Default);
        }
    }

    useEffect(() => {
        checkSrc();
    });

    return (
        <img style={props.style} src={src} onClick={props.onClick} alt="avatar" className={props.className} />
    );
}

export default Avatar;
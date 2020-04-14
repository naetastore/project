import React, { useState, useEffect } from 'react';
import Default from '../../assets/img/avatar/default.svg';

function Avatar(props) {
    const [src, setSrc] = useState(null);
    const [initialized, setInitialized] = useState(false);

    const checkAvatar = () => {
        if (props.src !== null && props.src !== undefined) {
            setSrc(props.src);
        } else {
            setSrc(Default);
        }
        setInitialized(true);
    }

    useEffect(() => {
        if (!initialized) {
            checkAvatar();
        }
    });

    return (
        <img onClick={props.onClick} src={src} alt={props.alt} className={props.className} />
    );
}

export default Avatar;
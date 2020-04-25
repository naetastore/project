import React, { useState } from 'react';
import Default from '../../../assets/img/dummy-image.svg';

function Img(props) {

    const [src] = useState(Default);
    // const [src, setSrc] = useState(Default);

    // const checkSrc = () => {
    //     if (props.src !== undefined) {
    //         setTimeout(() => setSrc(props.src), 1000);
    //     }
    // }

    // useEffect(() => {
    //     checkSrc();
    // });

    return (
        <img src={src}
            alt={props.alt}
            className={props.className}
            onClick={props.onClick} />
    );
}

export default Img;
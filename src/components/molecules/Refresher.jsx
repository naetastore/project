import React, { useState, useEffect } from 'react';
import './Refresher.css';
import Refresh from '../../assets/img/icon/refresh.svg';

const Refresher = props => {
    const [animating, setAnimate] = useState();

    useEffect(() => {
        animate();
    });

    const animate = () => {
        setAnimate(props.animate);
    }

    return (
        <div className="refresh-page">
            <img onClick={props.loadFunc} src={Refresh} alt="ri" className={`refresh-icon ${animating}`} />
            {
                animating
                    ? <div className="child">{props.child}</div>
                    : <></>
            }
        </div>
    );
}

export default Refresher;
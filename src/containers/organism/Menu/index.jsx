import React, { useEffect, useState } from 'react';
import './index.css';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import homeIcon from '../../../assets/img/icon/home-menu-icon.svg';
import productIcon from '../../../assets/img/icon/product-menu-icon.svg';
import searchIcon from '../../../assets/img/icon/search-menu-icon.svg';
import Img from '../../../components/molecules/Avatar';
import store from '../../../config/redux/store';
import session from '../../../config/session';

const Menu = () => {

    const [initialized, setInitialized] = useState(false);
    const [avatar, setAvatar] = useState(undefined);

    useEffect(() => {
        if (!initialized) {
            checkAvatar();
        }
    });

    const checkAvatar = () => {
        const avt = session.get('avatar');
        if (avt && avt !== "undefined") {
            store.dispatch({ type: 'SET_USERDATA', data: { avatar: avt } });
        }
        store.subscribe(() => {
            setAvatar(store.getState().userData.avatar);
        });
        setInitialized(true);
    }

    return (
        <Navbar className="main-menu un-text-d_">
            <NavLink to="/" exact className="nav-link" classactive="active">
                <img src={homeIcon} alt="menu-icon" className="menu-icon" />
            </NavLink>
            <NavLink to="/product" exact className="nav-link" classactive="active">
                <img src={productIcon} alt="menu-icon" className="menu-icon" />
            </NavLink>
            <NavLink to="/search" exact className="nav-link" classactive="active">
                <img src={searchIcon} alt="menu-icon" className="menu-icon" />
            </NavLink>
            <NavLink to="/account/myprofile" exact className="nav-link nav-account" classactive="active">
                <Img src={avatar} alt="menu-icon" className="menu-icon menu-account" />
            </NavLink>
        </Navbar>
    );
}

export default Menu;
import React, { useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import './Menu.css';
import { NavLink } from 'react-router-dom';
import Home from '../../assets/img/icon/home.svg';
import Product from '../../assets/img/icon/product.svg';
import Search from '../../assets/img/icon/search.svg';
// import Account from '../../assets/img/icon/account.svg';
import { REST } from '../../config/REST';
import { store } from '../../config/redux/store';

const Menu = () => {
    const [avatar, setAvatar] = useState('');
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        if (!initialized) {
            checkAvatar();
        }
    })

    const checkAvatar = () => {
        setAvatar(`${REST.server.url}assets/img/avatar/default_avatar.svg`);
        const localAvatar = window.sessionStorage.getItem('naetastore_avatar');
        if (localAvatar) {
            setAvatar(localAvatar);
        }
        store.subscribe(() => {
            if (store.getState().inSession.avatar !== undefined) {
                setAvatar(store.getState().inSession.avatar);
            }
        });
        setInitialized(true);
    }

    return (
        <Navbar className="main-menu">
            <NavLink
                className="nav-link"
                to="/"
                exact
                classactive="active"
            >
                <img src={Home} alt="hi" className="menu-icon" />

            </NavLink>
            <NavLink
                className="nav-link"
                to="/product"
                classactive="active"
            >
                <img src={Product} alt="hi" className="menu-icon" />

            </NavLink>
            <NavLink
                className="nav-link"
                to="/search"
                classactive="active"
            >
                <img src={Search} alt="hi" className="menu-icon" />

            </NavLink>
            <NavLink
                className="nav-link"
                to="/account/myprofile"
                classactive="active"
            >
                <img src={avatar} alt="hi" className="menu-icon avatar" />

            </NavLink>
        </Navbar>
    );
}

export default Menu;
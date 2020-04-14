import React, { useState, useEffect, Fragment } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import './Menu.css';
import { NavLink } from 'react-router-dom';
import Home from '../../assets/img/icon/home.svg';
import Product from '../../assets/img/icon/product.svg';
import Search from '../../assets/img/icon/search.svg';
import { store } from '../../config/redux/store';
import Avatar from '../../assets/img/avatar/default.svg';
import More from '../../assets/img/icon/more.svg';
import { isObject } from 'formik';
import { Session } from '../../config/Session';

const Menu = () => {
    const [avatar, setAvatar] = useState(null);
    const [initialized, setInitialized] = useState(false);
    const [display, setDisplay] = useState('none');
    const [isLogedIn, setIsLogedIn] = useState(false);

    useEffect(() => {
        if (!initialized) {
            init();
        }
    });

    const init = () => {
        setAvatar(Avatar);
        checkSession();
        store.subscribe(() => {
            let state = store.getState();
            let img = state.inSession.avatar;
            if (img) {
                setAvatar(img);
            }
            if (state.isAuthenticated) {
                setIsLogedIn(true);
            }
        });
    }

    const showContext = () => {
        if (display === 'none') {
            setDisplay('');
            return;
        }
        setDisplay('none');
    }

    const checkSession = async () => {
        const userdata = Session.get();
        if (isObject(userdata) && userdata.username !== undefined) {
            setIsLogedIn(true);
            if (userdata.avatar) {
                setAvatar(userdata.avatar);
            } else {
                setAvatar(Avatar);
            }
        }

        setInitialized(true);
    }

    const setUnLogedIn = async () => {
        Session.destroy();
        setIsLogedIn(false);
        setAvatar(Avatar);
        window.location.href = '/auth';
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
                className="nav-link nav-account"
                to="/account/myprofile"
                classactive="active"
            >
                <img src={avatar} alt="hi" className="menu-icon avatar" />

            </NavLink>
            <div className="nav-link">
                <div className="context-view" style={{ display }}>
                    <div className="menu-top"></div>
                    {isLogedIn
                        ?
                        <Fragment>
                            <NavLink
                                className="menu"
                                to="/account/myprofile"
                                onClick={showContext}
                            >
                                My Profile
                        </NavLink>
                            <NavLink
                                className="menu"
                                to="/notification"
                                onClick={showContext}
                            >
                                Notification
                        </NavLink>
                        </Fragment>
                        :
                        <>
                            <NavLink
                                className="menu"
                                to="/auth"
                                onClick={showContext}
                            >
                                Login
                        </NavLink>
                            <NavLink
                                className="menu"
                                to="/signup"
                                onClick={showContext}
                            >
                                Sign Up
                        </NavLink>
                        </>
                    }
                    <hr />

                    <NavLink
                        className="menu"
                        to="/about"
                        onClick={showContext}
                    >
                        About
                    </NavLink>
                    {
                        isLogedIn
                            ?
                            <div
                                className="menu"
                                onClick={() => { showContext(); setUnLogedIn() }}
                            >
                                Logout
                        </div>
                            : <></>
                    }
                    <div className="menu-bottom"></div>
                </div>
                <img onClick={showContext} src={More} alt="hi" className="nav-more menu-icon" />
            </div>
        </Navbar>
    );
}

export default Menu;
import React, { Fragment } from 'react';

import { BrowserRouter, Route, HashRouter } from 'react-router-dom';
import Menu from '../containers/organism/Menu';
import NavCheckout from '../containers/organism/NavCheckout';
import Home from '../containers/pages/Home';
import Book from '../containers/pages/Book';
import Single from '../containers/pages/Single';
import Catalog from '../containers/pages/Catalog';
import Product from '../containers/pages/Product';
import Search from '../containers/pages/Search';
import Auth from '../containers/pages/Auth';
import SignUp from '../containers/pages/SignUp';
import Account from '../containers/pages/Account';
import MyProfile from '../containers/pages/MyProfile';
import Order from '../containers/pages/Order';
import Notification from '../containers/pages/Notification';
import Settings from '../containers/pages/Settings';
import ShoppingCart from '../containers/pages/ShoppingCart';
import Billing from '../containers/pages/Billing';
import OrderSummary from '../containers/pages/OrderSummary';
import Gallery from '../containers/pages/Gallery';

function Navbar(props) {
    return(
        <Fragment>
            <NavCheckout {...props} />
            <Menu />
        </Fragment>
    );
}

function Routes(props) {
    return (
        <BrowserRouter>
            <HashRouter>
                <Route path="/" component={Navbar} />
                <Route path="/" exact component={Home} />
                <Route path="/book/:gid" component={Book} />
                <Route path="/single/:id" component={Single} />
                <Route path="/catalog/:cid" component={Catalog} />
                <Route path="/product" component={Product} />
                <Route path="/search" component={Search} />
                <Route path="/auth" component={Auth} />
                <Route path="/signup" component={SignUp} />
                <Route path="/account" component={Account} />
                <Route path="/account/myprofile" component={MyProfile} />
                <Route path="/account/order" component={Order} />
                <Route path="/account/notification" component={Notification} />
                <Route path="/account/settings" component={Settings} />
                <Route path="/shoppingcart" component={ShoppingCart} />
                <Route path="/billing" component={Billing} />
                <Route path="/ordersummary" component={OrderSummary} />
                <Route path="/gallery" component={Gallery} />
            </HashRouter>

        </BrowserRouter>
    );
}


export default Routes;
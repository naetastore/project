import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Menu from '../components/molecules/Menu';
import Product from '../containers/pages/Product';
import Account from '../containers/pages/Account';
import MyProfile from '../containers/pages/Account/MyProfile';
import Order from '../containers/pages/Account/Order';
import Notification from '../containers/pages/Account/Notification';
import Help from '../containers/pages/Account/Help';
import Settings from '../containers/pages/Account/Settings';
import Catalog from '../containers/pages/Catalog';
import Root from '../containers/pages/Root';
import Signup from '../containers/pages/Signup';
import Auth from '../containers/pages/Auth';
import Book from '../containers/pages/Book';
import NavB from '../components/molecules/NavB';
import Cart from '../containers/pages/Cart';
import Checkout from '../containers/pages/Checkout';
import MakePayment from '../containers/pages/Checkout/MakePayment';
import Search from '../containers/pages/Search';
import Single from '../containers/pages/Single';
import Admin from '../containers/pages/Admin';
// import FeedbackForm from '../containers/organism/FeedbackForm';
import Gallery from '../containers/pages/Gallery';

function Routes() {
    return (
        <BrowserRouter>
            <Menu />
            <NavB />
            <Route path="/" exact component={Root} />
            <Route path="/auth" component={Auth} />
            <Route path="/signup" component={Signup} />
            <Route path="/product" exact component={Product} />
            <Route path="/account" component={Account} />
            <Route path="/account/myprofile" component={MyProfile} />
            <Route path="/account/order" component={Order} />
            <Route path="/account/notification" component={Notification} />
            <Route path="/account/help" component={Help} />
            <Route path="/account/settings" component={Settings} />
            <Route path="/book/:id" component={Book} />
            <Route path="/catalog/:id" component={Catalog} />
            <Route path="/shoppingcart" component={Cart} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/makepayment" component={MakePayment} />
            <Route path="/search" component={Search} />
            <Route path="/single/:id" component={Single} />
            <Route path="/account/admin" component={Admin} />
            <Route path="/gallery" exact component={Gallery} />
        </BrowserRouter>
    );
}

export default Routes;
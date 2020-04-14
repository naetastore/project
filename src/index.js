import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './config/Routes';

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/global.css';
import * as serviceWorker from './serviceWorker';
import { store } from './config/redux/store';
import { Provider } from 'react-redux';

import API from './services';

function Getuserinformation() {
    // if (window.location.hostname === "localhost") {
    //     return false;
    // }
    let a = window.navigator;
    let geoLocation = a.geolocation.getCurrentPosition(res => res);

    // diganti ke string karna ada error ketika API.POST
    if (geoLocation === undefined) geoLocation = "unknown";

    const client = {
        'userAgent': a.userAgent,
        'geoLocation': geoLocation
    }
    API.POST('client', client);

    return true;
}

ReactDOM.render(<Provider store={store}><Getuserinformation /><Routes /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()

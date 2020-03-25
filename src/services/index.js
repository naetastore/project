import axios from 'axios';
import { REST } from '../config/REST';
import qs from 'qs';

const GET = (path, params) => {
    const options = {
        url: REST.server.url + 'api/' + path + '?' + REST.server.apikey.name + '=' + REST.server.apikey.key,
        method: 'GET',
        params: params
    }

    return new Promise((resolve, reject) => {
        axios(options)
            .then(res => resolve(res))
            .catch(err => {
                if (err.response.data.status === false) {
                    reject(err.response.data);
                }
            });
    });
}

const POST = (path, data) => {
    data = { ...data, [REST.server.apikey.name]: REST.server.apikey.key }
    data = qs.stringify(data);

    const options = {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: data,
        url: REST.server.url + 'api/' + path
    };

    return new Promise((resolve, reject) => {
        axios(options)
            .then(res => resolve(res))
            .catch(err => {
                reject(err.response.data);
            });
    });
}

const PUT = (path, data) => {
    data = { ...data, [REST.server.apikey.name]: REST.server.apikey.key }
    data = qs.stringify(data);

    /* return new Promise((resolve, reject) => {

        const requestOptions = {
            method: 'PUT',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            body: data,
            redirect: 'follow'
        };

        fetch(REST.server.url + 'api/' + path, requestOptions)
            .then(res => res.text())
            .then(res => resolve(res))
            .catch(err => reject(err));
    }) */

    const options = {
        method: 'PUT',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: data,
        url: REST.server.url + 'api/' + path
    };

    return new Promise((resolve, reject) => {
        axios(options)
            .then(res => resolve(res))
            .catch(err => {
                console.log(err)
                if (err.response.data.status === false) {
                    reject(err.response.data);
                }
            });
    });
}

const API = {
    GET,
    POST,
    PUT
}

export default API;
import { REST } from '../config/REST';
import axios from 'axios';
import qs from 'qs';

const GET = (path, params) => {
    return new Promise((resolve, reject) => {
        axios.get(REST.server.url + 'api/' + path + '?' + REST.server.apikey.name + '=' + REST.server.apikey.key, {
            params
        }).then(res => resolve(res)).catch(err => reject(err));
    });
}

const POST = (path, data) => {
    data = { ...data, [REST.server.apikey.name]: REST.server.apikey.key }
    data = qs.stringify(data);

    return new Promise((resolve, reject) => {
        axios({
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: data,
            url: REST.server.url + 'api/' + path
        }).then(res => resolve(res)).catch(err => reject(err));
    });
}

const API = {
    GET,
    POST
};

export default API;
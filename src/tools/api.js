/**
 * Created by hekk on 2017/5/28.
 */
import 'babel-polyfill';


// To add to window
if (!window.Promise) {
    window.Promise = Promise;
}

import 'whatwg-fetch';
import store from '../store';
import {devUrl, testUrl, productionUrl, nodeTestApi, nodeProductionApi} from './config';
let serverUrl = testUrl;
let nodeUrl = nodeTestApi;
if (process.env.kingold == 'test') {
    serverUrl = testUrl;
}
if (process.env.kingold == 'production') {
    serverUrl = productionUrl;
    nodeUrl = nodeProductionApi;
}
let $query = (data) => {
    let str = [];
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            if (typeof data[key] != 'object') {
                str.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
            } else {
                str.push(encodeURIComponent(key) + '=' + encodeURIComponent(JSON.stringify(data[key])));
            }
        }
    }
    return str.join('&');
};
let get = (path, data = {}) => {
    data.callSystemID = '1003';
    let t = new Date().getTime();
    let url = '';
    let credentials = 'include';
    if (/http/.test(path)) {
        url = `${path}?t=${t}&${$query(data)}`;
        credentials='same-origin';
    } else {
        url = `${serverUrl + path}?t=${t}&${$query(data)}`
    }

    return fetch(url, {
        method: 'get',
        credentials,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(response => {
        if (response.status == 200) {
            return response.json()
        }
        if (response.status == 503) {
            return {};
        }
        return {};
    }).then(data => {
        return data;
    }).catch(err => {
        console.error('error,--->', err);
    });
};
let getNode = (path, data = {}) => {
    let url = `${nodeUrl + path}`
    return get(url, data);
};
import  {logout} from './operation';
let post = (path, data = {}) => {
    data.callSystemID = '1003';
    let t = new Date().getTime();
    let url = '';
    let credentials = 'include';
    if (/http/.test(path)) {
        url = `${path}?t=${t}`;
        credentials='same-origin';
    } else {
        url = `${serverUrl + path}`;
    }
    return fetch(url, {
        method: 'post',
        credentials,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: $query(data)
    }).then(response => {
        if (response.status == 200) {
            return response.json()
        }
        if (response.status == 503) {
            return {};
        }

        return {};
    }).then(data => {
        if (data.code == 401) {
            store.dispatch('getAccountBaofoo');
            store.dispatch('getBankInfo');
            store.dispatch('getUserInfo');
            logout();
        }
        return data;
    }).catch(err => {
        console.error('error,--->', err);
    });
};
let postNode = (path, data = {}) => {
    let url = `${nodeUrl + path}`;
    return post(url, data);
};
const $api = {
    get,
    post,
    getNode,
    postNode,
    serverUrl
};
export default $api;

/**
 * Created by hekk on 2017/5/28.
 */
import 'babel-polyfill';
import axios from 'axios';
import config from './config';
let serverUrl = config.apiUrl;
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
    data.callSystemID = '1005';
    data.t = new Date().getTime();
    let url = '';
    if (/http/.test(path)) {
        url = `${path}`;

    } else {
        url = `${serverUrl + path}`
    }
    return axios({
        url,
        method: 'get',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        params: data,
        withCredentials: true
    }).then(response => {
        if (response.status == 200) {
            return response.data;
        }
    }).catch(err => {
        console.log('err--->')
    })

};

import  {logout} from './operation';
let post = (path, data = {}) => {
    data.callSystemID = '1005';
    let url = '';
    if (/http/.test(path)) {
        url = `${path}`;
    } else {
        url = `${serverUrl + path}`;
    }

    return axios({
        url,
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        params: {
            t: new Date().getTime()
        },
        withCredentials: true,
        data: $query(data)
    }).then(response => {
        if (response.status == 200) {
            return response.data;
        } else {
            return {};
        }
    }).then(data => {
        if (data.code == 401) {
            logout();
        }
        return data;
    }).catch(err => {
        console.log('err--->')
    })

};

const $api = {
    get,
    post,
    serverUrl
};
export default $api;

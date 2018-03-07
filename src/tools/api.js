/**
 * Created by hekk on 2017/5/28.
 */
import 'babel-polyfill';
import axios from 'axios';
import config from './config';
let serverUrl = config.apiUrl;
let query = data => {
    let str = [];
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            if (typeof data[key] != 'object') {
                str.push(encodeURIComponent(key) + '=' + encodeURIComponent((data[key])));
            } else {
                str.push(encodeURIComponent(key) + '=' + encodeURIComponent((JSON.stringify(data[key]))));
            }
        }
    }
    return str.join('&');
};

let get = (path, data = {}) => {
    data.t = new Date().getTime();
    let url = `${serverUrl + path}`;
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
        if (response.status == 503) {
            return {};
        }
        return {};
    }).then(data => {
        console.log(url);
        console.log(data);
        return data;

    }).catch(err => {
        console.error('error,--->', err);
    });
};

let post = (path, data = {}) => {
    let url = `${serverUrl + path}`;
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
        data: query(data)
    }).then(response => {
        if (response.status == 200) {
            return response.data
        }
        if (response.status == 503) {
            return {};
        }
        return {};
    }).then(data => {
        if (data.code == 401) {
            //退出登陆
        }
        console.log(url);
        console.log(data);
        return data;
    }).catch(err => {
        console.error('error,--->', err);
    });
};
const $api = {
    get,
    post,
    serverUrl
};
export default $api;

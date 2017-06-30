/**
 * Created by hekk on 2017/5/28.
 */
//设置页面标题
export let setTitle = (title) => {
    setTimeout(function () {
        //利用iframe的onload事件刷新页面
        document.title = title || '金疙瘩';
        var iframe = document.createElement('iframe');
        iframe.style.visibility = 'hidden';
        iframe.style.width = '1px';
        iframe.style.height = '1px';
        iframe.onload = function () {
            setTimeout(function () {
                document.body.removeChild(iframe);
            }, 0);
        };
        document.body.appendChild(iframe);
    }, 0);
};


import md5 from 'md5';
import {devUrl,testUrl, productionUrl, baofooTestUrl, baofooCallUrlProduct, baofooProductUrl,baofooCallUrlTest} from './config';
let baofooRecharge = baofooTestUrl;
let baofooCallUrl = baofooCallUrlTest;
let serverUrl = testUrl;
let signMode = '~|~n725d5gsb7mlyzzw';
let merchant_id = '100000675';
let terminal_id = '100000701';
let RequestUrlBaofoo = devUrl;
if (process.env.kingold == 'test') {
    serverUrl = testUrl;
    RequestUrlBaofoo = testUrl;
}
if (process.env.kingold == 'production') {
    serverUrl = productionUrl;
    RequestUrlBaofoo = baofooCallUrl;
    baofooCallUrl = baofooCallUrlProduct;
    signMode = '~|~h6mrqmwkkcvmpdq5';
    baofooRecharge = baofooProductUrl;
    merchant_id = '1177929';
    terminal_id = '35265';
}

// baofoo 充值
export let submitRecharge = (params) => {
    let {userId, orderBillCode, amount, additionalInfo, returnUrl} = params;
    let backUrl = window.sessionStorage.getItem('backUrl');
    let backUrlParams = window.sessionStorage.getItem('backUrlParams');
    let pageUrl = `${baofooCallUrl}/baofoo/h5/notification/recharge?backUrl=${backUrl}`;
    let form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', baofooRecharge + 'cerPayRecharge.do');
    form.setAttribute('name', 'baofoo');
    let input = document.createElement('input');
    input.setAttribute('name', 'merchant_id');
    input.setAttribute('type', 'hidden');
    input.value = merchant_id;
    form.appendChild(input);

    input = document.createElement('input');
    input.setAttribute('name', 'terminal_id');
    input.setAttribute('type', 'hidden');
    input.value = terminal_id;
    form.appendChild(input);
    let xml = '<?xml version="1.0" encoding="UTF-8"?><custody_req><merchant_id>'+merchant_id+'</merchant_id><user_id>' +
        userId + '</user_id><order_id>' + orderBillCode + '</order_id><amount>' + amount +
        '</amount><fee>0</fee><fee_taken_on>1</fee_taken_on><additional_info>' + additionalInfo +
        '</additional_info><page_url>' + pageUrl + '</page_url><return_url>' + returnUrl + '</return_url></custody_req>';
    input = document.createElement('input');
    input.setAttribute('name', 'requestParams');
    input.setAttribute('type', 'hidden');
    input.value = xml;
    form.appendChild(input);
    input = document.createElement('input');
    input.setAttribute('name', 'sign');
    input.setAttribute('type', 'hidden');
    input.value = md5(xml + signMode);
    form.appendChild(input);
    document.body.appendChild(form);
    form.submit();

};
// 
export let submitAuthorization = (pUserId) => {
    let form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', baofooRecharge+'inAccredit.do');
    //form.setAttribute('name', 'baofoo');
    let input = document.createElement('input');
    input.setAttribute('name', 'merchant_id');
    input.setAttribute('type', 'hidden');
    input.value = merchant_id;
    form.appendChild(input);

    input = document.createElement('input');
    input.setAttribute('name', 'terminal_id');
    input.setAttribute('type', 'hidden');
    input.value = terminal_id;
    form.appendChild(input);
    
    input = document.createElement('input');
    input.setAttribute('name', 'user_id');
    input.setAttribute('type', 'hidden');
    input.value = pUserId;
    form.appendChild(input);

    input = document.createElement('input');
    input.setAttribute('name', 'service_url');
    input.setAttribute('type', 'hidden');
    input.value = RequestUrlBaofoo + 'baofoo/notification/auth';
    form.appendChild(input);

    input = document.createElement('input');
    input.setAttribute('name', 'page_url');
    input.setAttribute('type', 'hidden');
    input.value = RequestUrlBaofoo + 'baofoo/h5/notification/auth';
    form.appendChild(input);

    document.body.appendChild(form);
    form.submit();

};

// 输入框校验,提现和充值
export let currencyInputValidate = (input) => {
    if (!input) {
        return '';
    }
    let t = input.toString();
    if (t[0] == '0' || t[0] == '.') {
        return '';
    }
    if (isNaN(input)) {
        return ''
    }
    return t.replace(/\.\d{3,}/, (match) => {
        return match.substring(0, 3);
    })
};
export let logout = () => {
    window.sessionStorage.setItem('logoutUrl', encodeURIComponent(window.location.href));
    window.location.replace('/login');
};
let $operation = {
    setTitle
}
export default $operation;


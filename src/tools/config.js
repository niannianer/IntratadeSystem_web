/**
 * Created by DELL on 2017/6/5.
 */
let protocol = window.location.protocol;
export const telNumber = '400-640-3606';
let apiUrl = 'http://10.10.10.69:6640';
let baofooActionUrl = 'https://paytest.baofoo.com/baofoo-custody/custody/';
let baofooCallUrl = `${protocol}//issuer-pc-test.zj-hf.cn`;
let merchant_id = '100000675';
let terminal_id = '100000701';
/* test config*/
if (process.env.kingold == 'test') {
    apiUrl = `${protocol}//issuer-pc-test.zj-hf.cn`;
    baofooActionUrl = 'https://paytest.baofoo.com/baofoo-custody/custody/';
    baofooCallUrl = `${protocol}//issuer-pc-test.zj-hf.cn`;
}
/* prod config*/
if (process.env.kingold == 'stage') {
    apiUrl = `${protocol}//issuer-pc-test.zj-hf.cn`;
    baofooActionUrl = 'https://pm.baofoo.com/custody/';
    baofooCallUrl = `${protocol}//pre-callme.zj-hf.cn`;
    merchant_id = '1177929';
    terminal_id = '35265';
}
/* prod config*/
if (process.env.kingold == 'production') {
    apiUrl = `${protocol}//issuer-pc-test.zj-hf.cn`;
    baofooActionUrl = 'https://pm.baofoo.com/custody/';
    baofooCallUrl = `${protocol}//callme.zj-hf.cn`;
    merchant_id = '1177929';
    terminal_id = '35265';
}
export default {
    apiUrl,
    baofooActionUrl,
    baofooCallUrl,
    merchant_id,
    terminal_id
}

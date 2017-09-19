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
let encrypt = false;
/* test config*/
if (process.env.kingold == 'test') {
    apiUrl = `${protocol}//issuer-pc-test.zj-hf.cn`;
    baofooActionUrl = 'https://paytest.baofoo.com/baofoo-custody/custody/';
    baofooCallUrl = `${protocol}//issuer-pc-test.zj-hf.cn`;
}
/* prod config*/
if (process.env.kingold == 'stage') {
    apiUrl = `${protocol}//issuer-pc-prod.zj-hf.cn`;
    baofooActionUrl = 'https://pm.baofoo.com/custody/';
    baofooCallUrl = `${protocol}//pre-callme.zj-hf.cn`;
    merchant_id = '1172380';
    terminal_id = '34865';

}
/* prod config*/
if (process.env.kingold == 'production') {
    apiUrl = `${protocol}//issuer-pc-prod.zj-hf.cn`;
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
/*
 * kingold key & IV
 * */
/* key 和 iv 密文*/
export const encryptKey = '6318cceeee91c45a7647faf7089623b32ac8e6bcb85b35dbaa5a5b1ef5baa2d12e7aa5c224012fadd7fd02866fd95626';
export const encryptIV = '00df13f4e31ded1854bbd9d23985f95e5f50e6e91711900221f8ab3be6bc6a35';
export let doEncrypt = encrypt;

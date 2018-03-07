/**
 * Created by DELL on 2017/6/5.
 */
let protocol = window.location.protocol;
let apiUrl = 'http://10.10.10.69:6640';
/* test config*/
if (process.env.kingold == 'test') {
    apiUrl = `${protocol}//issuer-pc-test.zj-hf.cn`;
}
/* stage config*/
if (process.env.kingold == 'stage') {
    apiUrl = `${protocol}//issuer-pc-prod.zj-hf.cn`;
}
/* prod config*/
if (process.env.kingold == 'production') {
    apiUrl = `${protocol}//issuer-pc-prod.zj-hf.cn`;
}
export default {
    apiUrl
}


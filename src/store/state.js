/**
 * Created by hekk on 2017/5/23.
 */
'use strict'
const state = {
   /*user info*/
    userId:'',
    issuerEmail:'',
    issuerName:'',
    legalPersonName:'',
    legalPersonIdCardNo:'',
    legalPersonMobile:'',
    userLoginName:'',
    userType:'',
    userUuid:'',
    enterpriseName:'',

    /*baofoo info*/
    accountTotalAssets:0.00, //总资产
    accountFreezeAmount:0.00,//冻结金额，
    accountCashAmount:0.00,// 可用余额

    /*user bank  */

    bankUserCardNo:'',//银行卡
    bankUserPhone:'',//绑卡手机
    bankUserIDCardNo:'',
    bankUserName:'',
    baofooCardId:'',

    /*bank info*/
    bank_name:'',
    single_limit:'',
    bank_full_name:'',
    perday_limit:'',
    bank_code:'',
    single_limit_value:'',
    bank_no:''

};
export default state;

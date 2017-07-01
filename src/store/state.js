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

    /*baofoo info*/
    accountTotalAssets:0.00, //总资产
    accountFreezeAmount:0.00,//冻结金额，
    accountCashAmount:0.00,// 可用余额

    /*bank info */

    bankUserCardNo:'',//银行卡
    bankUserPhone:'',//绑卡手机
    bank_code:'',
    bank_name:'',
    bank_full_name:'',
    bank_no:'',
    perday_limit:'',
    single_limit:'',
    single_limit_value:''
};
export default state;

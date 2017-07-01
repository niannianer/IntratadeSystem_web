/**
 * Created by hekk on 2017/5/23.
 */
'use strict'
const state = {
    userVerifyStatus: 0, //认证状态
    userVerifyStatusDesc:'',
    userUuid:'',// uid
    userId:'',
    investorRiskScore:0,
    investorGender:'', //gender
    investorIdCardNo:'',// ID card
    investorMobile:'',// mobile
    investorRealName:'',// realname,
    isEligibleInvestor:0,
    investorRiskType:0,
    investorRiskLevel:0, //
    investorRiskLevelDesc:'',
    investorType:'',
    investorTypeDesc:'',
    investorGenderDesc:'',
    /*baofoo info*/
    accountTotalAssets:0.00, //总资产
    accountFreezeAmount:0.00,//冻结金额，
    accountCashAmount:0.00,// 可用余额

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

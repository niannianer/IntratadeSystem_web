/**
 * Created by hekk on 2017/5/23.
 */
'use strict';
import _ from 'lodash/core';
const mutations = {};
mutations.changeName = (state, name = '') => {
    state.username = name;
};
mutations.increment = (state, num = 1) => {
    state.count += num;
};

// 资产信息
mutations.setAccountBaofoo = (state, data) => {
    if (data.accountTotalAssets) {
        state.accountTotalAssets = data.accountTotalAssets;
        state.accountTotalInterests = data.accountTotalInterests;
        state.accountCashAmount = data.accountCashAmount;
    }
};
// 绑卡信息
mutations.setBankUser = (state, data) => {
    if (data && data.bankUserCardNo) {
        state.bankUserCardNo = data.bankUserCardNo;
        state.bankUserPhone = data.bankUserPhone;
    }
};

// 银行卡限额信息
mutations.setBankInfo = (state, data) => {
    if (data && data.bank_code) {
        _.forEach(state, (value, key) => {
            if (data.hasOwnProperty(key)) {
                state[key] = data[key];
            }
        });
        /*state.bank_code = data.bank_code;
         state.bank_no = data.bank_no;
         state.bank_name = data.bank_name;
         state.bank_full_name = data.bank_full_name;
         state.perday_limit = data.perday_limit;
         state.single_limit = data.single_limit;
         state.single_limit_value = data.single_limit_value;*/
    }
};
// 个人信息
mutations.setUserInfo = (state, data) => {
    if (data.userUuid) {
        _.forEach(state, (value, key) => {
            if (data.hasOwnProperty(key)) {
                state[key] = data[key];
            }
        });

    }

};
mutations.setEligibleInvestor = (state, data) => {
    state.isEligibleInvestor = data.isEligibleInvestor;
};
export default  mutations;

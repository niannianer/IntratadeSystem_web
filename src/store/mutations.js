/**
 * Created by hekk on 2017/5/23.
 */
'use strict';
const mutations = {};

// 资产信息
mutations.setBaofooInfo = (state, data) => {
    if (data.accountTotalAssets) {
        Object.keys(state).forEach(key=>{
            if (data.hasOwnProperty(key)) {
                state[key] = data[key];
            }
        });

    }
};
// 银行卡限额信息
mutations.setBankInfo = (state, data) => {
    if (data && data.bank_code) {
        Object.keys(state).forEach(key=>{
            if (data.hasOwnProperty(key)) {
                state[key] = data[key];
            }
        });

    }
};
// 个人信息
mutations.setUserInfo = (state, data) => {
    if (data.userUuid) {
        Object.keys(state).forEach(key=>{
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

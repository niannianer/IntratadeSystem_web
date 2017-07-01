/**
 * Created by hekk on 2017/5/23.
 */

'use strict';
const actions = {};
import $api from '../tools/api';
// 个人信息
let getUserInfo = () => {
    return $api.get('/user/getUserInfo');
};
actions.getUserInfo = ({commit}) => {
    return getUserInfo()
        .then(data => {
            if (data.code == 200) {
                commit('setUserInfo', data.data)
            }
            return data;
        });
};
// baofoo 信息
let getBaofooInfo = () => {
    return $api.get('/account/getAccountBaofoo');
};
actions.getBaofooInfo = ({commit}) => {
    return getBaofooInfo()
        .then(data => {
            if (data.code == 200) {
                commit('setBaofooInfo', data.data);
            }
            return data;
        });
};
 //bank info
let getBankInfo=()=>{
    return $api.get('/account/getUserBankCardInfo');
};
actions.getBankInfo= ({commit}) => {
    return getBankInfo()
        .then(data=>{
            if(data.code==200){
                let {bankUserCardNo} = data.data;
                commit('setBankUser', data.data);
                if (!bankUserCardNo) {
                    return false;
                }
                return $api.get('/getBankInfo', {bankNo: bankUserCardNo.substring(0, 6)})
                    .then(data => {
                        if (data.code == 200) {
                            commit('setBankInfo', data.data);
                        }
                    });
            }
            return data;
        });
};
export default actions;

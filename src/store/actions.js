/**
 * Created by hekk on 2017/5/23.
 */

'use strict';
const actions = {};
import $api from '../tools/api';
// 个人信息
let getUserInfo = () => {
    return $api.get('/account/getAccountBaofoo');
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
actions.getUserInfo = ({commit}) => {
    return getBaofooInfo()
        .then(data => {
            if (data.code == 200) {
                commit('setBaofooInfo', data.data);
            }
            return data;
        });
};
export default actions;

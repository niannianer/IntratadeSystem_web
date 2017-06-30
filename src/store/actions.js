/**
 * Created by hekk on 2017/5/23.
 */

'use strict';
const actions = {};
import $api from '../tools/api';
// 个人信息
let getUserInfo = () => {
    return $api.get('/getUserInfo');
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
export default actions;

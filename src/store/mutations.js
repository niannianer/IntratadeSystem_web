/**
 * Created by hekk on 2017/5/23.
 */
'use strict';
const mutations = {};

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
export default  mutations;

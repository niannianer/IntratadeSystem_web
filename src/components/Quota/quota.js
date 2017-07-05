/**
 * Created by chuting on 2017/7/1.
 */
import Vue from 'vue';

const QuotaConstructor = Vue.extend(require('./Quota.vue'));

let instance = null;
let initInstance = () => {
    instance = new QuotaConstructor({
        el: document.createElement('div')
    });
};
let Quota = (callback) => {
    if (!instance) {
        initInstance();
    }
    document.body.appendChild(instance.$el);
    instance.callback = (result) => {
        window.setTimeout(() => {
            document.body.removeChild(instance.$el);
        });
        if (callback) {
            callback(result);
        }
    };
    return instance;

}
export default Quota;

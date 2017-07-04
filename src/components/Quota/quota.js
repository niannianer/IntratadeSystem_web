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
    /*instance.close = () => {
        window.setTimeout(() => {
            document.body.removeChild(instance.$el);
        });
    };*/
};
let Quota = (options) => {
    if (!instance) {
        initInstance();
    }
    document.body.appendChild(instance.$el);
    instance.callback = (result) => {
        window.setTimeout(() => {
            document.body.removeChild(instance.$el);
        });
        if (options.callback) {
            options.callback(result);
        }
    };
    return instance;

}
export default Quota;

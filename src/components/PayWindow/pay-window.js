/**
 * Created by hekk on 2017/6/3.
 */
import Vue from 'vue';

const PayWindowConstructor = Vue.extend(require('./PayWindow.vue'));

let instance = null;
let initInstance = () => {
    instance = new PayWindowConstructor({
        el: document.createElement('div')
    });
    instance.close = () => {
        window.setTimeout(() => {
            document.body.removeChild(instance.$el);
        });
    };
};
let PayWindow = (options) => {
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
export default PayWindow;

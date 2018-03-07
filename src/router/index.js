import Vue from 'vue';
import store from '../store';
import Router from 'vue-router';
Vue.use(Router)
import {setTitle} from '../tools/operation';
import Login from '../containers/Login';
import Menus from '../containers/Menus';
import Blank from '../containers/Blank';
let routes = [
    {
        path: '/blank',
        component: Blank,
        meta: {
            title: '跳转中...',
            login: true
        }
    },
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        component: Login,
        meta: {
            title: '登录',
            login: true
        }
    },
    {
        path: '/menus',
        name: 'menus',
        component: Menus,
        meta: {
            title: '菜单'

        }
    }
];
let beforeEach = ((to, from, next) => {
    next()
    /*if (store.state.userId) {
        next()
    } else {
        store.dispatch('getUserInfo')
            .then(data => {
                if (data.code == '401') {
                    logout();
                } else {
                    next()
                }
            });
    }*/
})
routes.map(route => {
    route.beforeEnter = (to, from, next) => {
        let {meta} = to;
        let {title} = meta;
        setTitle(title);
        if (!route.meta.login) {
            return beforeEach(to, from, next);
        } else {
            next();
        }


    };
    if (route.children) {
        route.children.map(child => {
            child.beforeEnter = (to, from, next) => {
                let {meta} = to;
                let {title} = meta;
                setTitle(title);
                if (!child.meta.login) {
                    return beforeEach(to, from, next);
                } else {
                    next();
                }


            };
        });
    }
});
routes.push({
    path: '*',
    redirect: '/login'
});
export default new Router({
    mode: 'history',
    routes
})

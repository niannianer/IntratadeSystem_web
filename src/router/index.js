import Vue from 'vue';
import store from '../store';
import Router from 'vue-router';
import {logout} from '../tools/operation';
Vue.use(Router)
import {setTitle} from '../tools/operation';
import Login from '../containers/Login';
import Menus from '../containers/Menus';
import PersonalCenter from '../containers/PersonalCenter';
import Recharge  from '../containers/Recharge';
import Withdraw from '../containers/Withdraw';
import Blank from '../containers/Blank';
let routes = [
    {
         path:'/blank',
        component:Blank,
        meta: {
            title: '跳转中...',
            login: true
        }
    },
    {
        path:'/',
        redirect:'/menus/personal-center'
    },
    {
        path:'/login',
        component:Login,
        meta: {
            title: '登录',
            login: true
        }
    },
    {
        path:'/menus',
        name:'menus',
        redirect:'/menus/personal-center',
        component:Menus,
        meta: {
            title: '菜单'

        },
        children:[
            {
                path:'personal-center',
                name:'personal-center',
                component:PersonalCenter,
                meta: {
                    title: '个人中心'
                },
            },
            {
                path:'recharge',
                name:'recharge',
                component:Recharge,
                meta: {
                    title: '充值'
                }
            },
            {
                path:'withdraw',
                name:'withdraw',
                component:Withdraw,
                meta: {
                    title: '提现'
                }
            }
        ]
    }
];
let beforeEach = ((to, from, next) => {
    if (store.state.userId) {
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
        store.dispatch('getBaofooInfo');
        store.dispatch('getBankInfo');
    }
})
routes.map(route => {
    route.beforeEnter = (to, from, next)=>{
        let {meta} = to;
        let {title} = meta;
        setTitle(title);
        if (!route.meta.login) {
            return  beforeEach(to, from, next);
        }else {
            next();
        }


    };
});
routes.push({
    path: '*',
    redirect: '/menus/personal-center'
});
export default new Router({
    mode: 'history',
    routes
})

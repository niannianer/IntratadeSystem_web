<template>
    <div class="menu-warp" flex>

        <div class="menus" flex-box="0">
            <router-link class="menu" :to="{path:'/menus/personal-center'}"
                         active-class="menu-active"
                         replace>账户中心
            </router-link>
            <router-link class="menu" :to="{path:'/menus/recharge'}"
                         active-class="menu-active"
                         replace>充值
            </router-link>
            <router-link class="menu" :to="{path:'/menus/withdraw'}"
                         active-class="menu-active"
                         replace>提现
            </router-link>
            <router-link class="menu" :to="{path:'/menus/purchase'}" v-if="userType==3"
                         active-class="menu-active"
                         replace>机构购买
            </router-link>
        </div>

        <router-view flex-box="1" class="content-view"></router-view>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import '../less/menus.less';
    export default {
        name: 'menus',
        computed: {
            ...mapState([
                'userType'
            ])

        }
    }
</script>

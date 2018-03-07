<template>
    <div class="menu-warp" flex>

        <div class="menus" flex-box="0">
            <router-link class="menu" :to="{path:'/login'}"
                         active-class="menu-active"
                         replace>菜单1
            </router-link>
            <router-link class="menu" :to="{path:'/login'}"
                         active-class="menu-active"
                         replace>菜单1
            </router-link>
        </div>

        <router-view flex-box="1" class="content-view"></router-view>
    </div>
</template>

<script>
    import '../less/menus.less';
    export default {
        name: 'menus',
        computed: {
        }
    }
</script>

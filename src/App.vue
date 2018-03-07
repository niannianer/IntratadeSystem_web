<template>
    <div id="app" class="app" flex="dir:top">
        <div class="header" flex-box="0">
            头部
        </div>
        <div id="body-warp" flex-box="1">
            <router-view></router-view>
        </div>

        <div class="footer" flex-box="0">
            底部
        </div>

    </div>
</template>

<script>
    import './less/app.less';

    export default {
        name: 'app',
        data(){
            return {

            }
        },
        computed: {

        },
        methods: {

        }
    }
</script>

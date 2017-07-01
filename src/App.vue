<template>
    <div id="app" class="app" flex="dir:top">
        <div class="header" flex-box="0">
            <div class="header-top">
                <div class="content" flex>
                    <div flex-box="1"></div>
                    <div flex-box="0">客服电话：011-48800211  </div>
                    <div flex-box="0">登录</div>
                </div>
            </div>
            <div class="header-body">
                <div class="content">
                    募集方平台

                    <div class="logo"></div>
                </div>
            </div>
        </div>
        <div  id="body-warp" flex-box="1">
            <router-view></router-view>
        </div>

        <div class="footer" flex-box="0">
            <div class="footer-top">
                <div class="content" flex="box:mean">
                    <div>客服电话：400-010-0987</div>
                    <div>工作日 09:00~18:00</div>
                </div>
            </div>
            <div class="footer-bottom">Copyright © 2016 all rights reserved 中冀投资股份有限公司 版权所有 冀ICP备16024224号</div>
        </div>

    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import './less/app.less';

    export default {
        name: 'app'
    }
</script>

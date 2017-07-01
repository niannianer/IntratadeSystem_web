<template>
    <div id="app" class="app" flex="dir:top">
        <div class="header" flex-box="0">
            <div class="header-top">
                <div class="content" flex>
                    <div class="div" flex-box="1"></div>
                    <div class="div" flex-box="0">客服电话：011-48800211  </div>
                    <div class="div" flex-box="0" v-if="!userId">登录</div>
                    <div class="div user" flex-box="0" v-else @click.stop="preLogout">
                        <span>{{userLoginName}}</span>
                        <span class="triangle"></span>
                        <div class="logout" flex="main:center cross:center">
                            <img class="head-image" src=""/>
                            <span>退出</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="header-body">
                <div class="content">
                    募集方平台

                    <div class="logo"></div>
                </div>
            </div>
        </div>
        <div id="body-warp" flex-box="1">
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
        name: 'app',
        data(){
            return {
                showLogout: false
            }
        },
        computed: mapState([
            'userLoginName',
            'userId',
            'userUuid',
            'legalPersonMobile'
        ]),
        methods: {
            preLogout(){
                this.showLogout = true;
            }
        }
    }
</script>

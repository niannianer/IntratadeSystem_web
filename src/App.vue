<template>
    <div id="app" class="app" flex="dir:top">
        <div class="header" flex-box="0">
            <div class="header-top">
                <div class="content" flex>
                    <div class="div" flex-box="1"></div>
                    <div class="div" flex-box="0">客服电话：{{telNumber}}  </div>
                    <div class="div" flex-box="0" v-if="!userId"></div>
                    <div class="div user" flex-box="0"
                         @mouseleave.stop="hideLogout"
                         v-else @mouseenter.stop="preLogout">
                        <span>{{userLoginName}}</span>
                        <span class="triangle" :class="{'rotate':showLogout}"></span>
                        <div class="logout" v-show="showLogout"
                             flex="main:center cross:center">
                            <span class="head-image"></span>
                            <span class="do-logout" @click.stop="doLogout">退出</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="header-body">
                <div class="content">
                    {{userText}}

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
                    <div>客服电话：{{telNumber}}</div>
                    <div>工作日 09:00~18:00</div>
                </div>
            </div>
            <div class="footer-bottom">
                Copyright © 2017 all rights reserved 北京中冀汇通天下互联网科技有限公司版权所有 京ICP备17013695-1
            </div>
        </div>

    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import $api from './tools/api';
    import {logout} from './tools/operation';
    import './less/app.less';
    import {telNumber} from './tools/config';

    export default {
        name: 'app',
        data(){
            return {
                showLogout: false,
                telNumber
            }
        },
        computed: {
            ...mapState([
                'userLoginName',
                'userId',
                'userUuid',
                'userType',
                'legalPersonMobile'
            ]),
            userText(){
                if (!this.userType) {
                    return '机构用户平台';
                }
                if (this.userType == 3) {
                    return '机构投资者'
                } else {
                    return '募集方平台'
                }
            }
        },
        methods: {
            preLogout(){
                this.showLogout = true;
            },
            hideLogout(){
                this.showLogout = false;
            },
            doLogout(){
                $api.post('/user/logout')
                    .then(data => {
                        if (data.code == 200) {
                            logout();
                        }
                    });
            }
        }
    }
</script>

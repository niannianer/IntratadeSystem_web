<template>
    <div class="login">
        <div class="form-warp">
            <div class="form">
                <div class="form-item" flex>
                    <label flex-box="0" for="email" flex="cross:center">
                        <img class="icon" src="../images/login/icon-email.png"/>
                    </label>
                    <input type="email" id="email"
                           v-model.trim="userLoginName"
                           class="input" flex-box="1" placeholder="法人手机号"/>
                </div>

                <div class="form-item" flex>
                    <label flex-box="0" for="password">
                        <img class="icon" src="../images/login/icon-password.png"/>
                    </label>
                    <input type="password" id="password"
                           v-model.trim="userLoginPassword"
                           class="input" flex-box="1" placeholder="密码"/>
                </div>
                <div class="form-item" flex>
                    <label flex-box="0" for="password">
                        <img class="icon" src="../images/login/icon-password.png"/>
                    </label>
                    <input type="password" id="re-password"
                           v-model.trim="userLoginPassword"
                           class="input" flex-box="1" placeholder="重复密码"/>
                </div>
                <div class="code-item" flex>
                    <div class="input-code" flex-box="1">
                        <input type="text"
                               v-model.trim="inputCode"
                               class="input text-center" placeholder="短信验证码"/>
                    </div>

                    <div class="verify-code text-center" flex-box="0" flex="cross:center">
                        <div style="width: 100%" class="btn btn-primary" @click.stop="getImageCode">{{verifyText}}</div>
                    </div>

                </div>
                <div class="code-item" flex>
                    <div class="input-code" flex-box="1">
                        <input type="text"
                               v-model.trim="inputCode"
                               class="input text-center" placeholder="请输入图形验证码"/>
                    </div>

                    <div class="input-code image-code text-center" flex-box="0">
                        <div class="input" @click.stop="getImageCode">{{1234}}</div>
                    </div>

                </div>

                <div class="err-info">{{errInfo}}</div>


                <div class="btn-warp">
                    <button class="btn-primary btn-login" @click.stop="login">{{loginText}}</button>
                </div>

                <div class="footer-info">北京中冀汇通天下互联网科技有限公司提供服务</div>


            </div>
        </div>

    </div>
</template>

<script>
    import '../less/login.less';
    export default {
        name: 'forgot-password',
        data(){
            return {
                userLoginName: '',
                userLoginPassword: '',
                imageCode: '',
                inputCode: '',
                errInfo: '',
                loginText: '找回密码',
                verifyText:'获取验证码',
                loading: false
            }
        },
        components: {},
        created(){
        },
        computed: {},
        methods: {},
        mounted(){
        },
        destroyed(){

        }
    }
</script>

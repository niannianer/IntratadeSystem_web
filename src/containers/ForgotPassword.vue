<template>
    <div class="login">
        <div class="form-warp">
            <div class="form">
                <div class="form-item" flex>
                    <label flex-box="0" for="email" flex="cross:center">
                        <img class="icon" src="../images/login/icon-email.png"/>
                    </label>
                    <input type="tel" id="email"
                           v-model.trim="mobile" maxlength="11"
                           class="input" flex-box="1" placeholder="法人手机号"/>
                </div>

                <div class="form-item" flex>
                    <label flex-box="0" for="password">
                        <img class="icon" src="../images/login/icon-password.png"/>
                    </label>
                    <input type="hidden" v-model.trim="userLoginPassword"/>
                    <input type="password" id="password" maxlength="20"
                           v-model.trim="userLoginPassword"
                           class="input" flex-box="1" placeholder="密码"/>
                </div>
                <div class="form-item" flex>
                    <label flex-box="0" for="password">
                        <img class="icon" src="../images/login/icon-password.png"/>
                    </label>
                    <input type="hidden" v-model.trim="repassword"/>
                    <input type="password" id="re-password" maxlength="20"
                           v-model.trim="repassword"
                           class="input" flex-box="1" placeholder="重复密码"/>
                </div>
                <div class="code-item" flex>
                    <div class="input-code" flex-box="1">
                        <input type="text"
                               v-model.trim="inputCode"
                               class="input text-center" placeholder="请输入图形验证码"/>
                    </div>

                    <div class="input-code image-code text-center" flex-box="0">
                        <div class="input" @click.stop="getImageCode" flex="main:justify">
                            <span v-for="code in imageCode">{{code}}</span>
                        </div>
                    </div>

                </div>
                <div class="code-item" flex>
                    <div class="input-code" flex-box="1">
                        <input type="text"
                               v-model.trim="verifyCode"
                               class="input text-center" placeholder="短信验证码"/>
                    </div>

                    <div class="verify-code text-center" flex-box="0" flex="cross:center">
                        <div style="width: 100%" class="btn btn-primary" v-show="verifyTimeLeft<1"
                             @click.stop="getVerify">{{verifyText}}
                        </div>
                        <div style="width: 100%;color: #888" class="btn btn-default"
                             v-show="verifyTimeLeft>=1">{{verifyTimeLeft}}
                        </div>
                    </div>

                </div>


                <div class="err-info">{{errInfo}}</div>


                <div class="btn-warp">
                    <button class="btn-primary btn-login" @click.stop="resetPassword">{{loginText}}</button>
                </div>

                <div class="footer-info">北京中冀汇通天下互联网科技有限公司提供服务</div>


            </div>
        </div>

    </div>
</template>

<script>
    import '../less/login.less';
    import $api from '../tools/api';
    import Toast from '../components/Toast';
    export default {
        name: 'forgot-password',
        data(){
            return {
                mobile: '',
                userLoginPassword: '',
                repassword: '',
                imageCode: '',
                inputCode: '',
                errInfo: '',
                loginText: '找回密码',
                verifyCode: '',
                verifyText: '获取验证码',
                loading: false,
                verifyTimeLeft: 0,
                timer: null
            }
        },
        components: {},
        created(){
            this.getImageCode();
        },
        computed: {},
        methods: {
            checkPhone(){
                if (!this.mobile) {
                    this.errInfo = ('请输入手机号码');
                    return false;
                }
                let reg = /^1[3|4|5|7|8]\d{9}$/;
                if (!reg.test(this.mobile)) {
                    this.errInfo = ('请输入正确的手机号码');
                    return false;
                }
                return true;
            },
            checkPassword(){
                if (!this.userLoginPassword) {
                    this.errInfo = ('请输入密码');
                    return false;
                }
                let reg = /(?=.*[0-9])(?=.*[A-Za-z])^[0-9A-Za-z]{6,20}$/;
                if (reg.test(this.userLoginPassword)) {
                    return true;
                }
                this.errInfo = ('请输入正确的登录密码（6~20位数字和字母）');
                return false;
            },
            getImageCode(){
                $api.get('/imageCode')
                    .then(res => {
                        if (res.code == 200) {
                            this.imageCode = res.data;
                        }
                    });
            },
            getVerify(){
                if (!this.checkPhone()) {
                    return false;
                }
                if (!this.inputCode) {
                    this.errInfo = '请输入图片验证码';
                    return false;
                }
                let bussType = 1;
                let imageCode = this.inputCode;
                let mobile = this.mobile;
                this.timeCount();
                this.verifyTimeLeft = 59;
                $api.get('/sendVerifyCode', {mobile, imageCode, bussType})
                    .then(res => {
                        if (res.code == 200) {
                            this.verifyText = '重新获取';
                            this.errInfo = '';
                            return false;
                        }
                        this.clearTimeCount();
                        if (res.code == 1001) {
                            this.errInfo = ('验证码错发送失败!');
                            return false;
                        }
                        if (res.code == 1004) {
                            if (this.inputCode) {
                                this.errInfo = ('图片验证码错误!');
                            } else {
                                this.errInfo = ('请输入图片验证码!');
                            }

                            this.imageCode = res.data.imageCode;
                            return false;
                        }
                        this.errInfo = res.msg;
                    })
            },
            timeCount(){
                // 倒计时
                this.timer = setTimeout(() => {
                    this.verifyTimeLeft = this.verifyTimeLeft - 1;
                    if (this.verifyTimeLeft >= 1) {
                        this.timeCount();
                    }
                }, 1000);
            },
            clearTimeCount(){
                // 清除倒计时
                this.verifyTimeLeft = 0;
                if (this.timer) {
                    clearTimeout(this.timer);
                }
            },
            resetPassword(){
                if (!this.checkPhone()) {
                    return false;
                }
                if (!this.inputCode) {
                    this.errInfo = '请输入图片验证码';
                }
                if (!this.checkPassword()) {
                    return false;
                }
                if (!this.repassword) {
                    this.errInfo = '请输入重复密码';
                    return false;
                }
                if (this.userLoginPassword != this.repassword) {
                    this.errInfo = '两次密码不一致';
                    return false;
                }

                let {mobile, verifyCode, userLoginPassword} = this;
                if (!verifyCode) {
                    this.errInfo = '请输入短信验证码';
                    return false;
                }
                $api.post('/user/resetUserPassword', {mobile, verifyCode, userLoginPassword})
                    .then(res => {
                        if (res.code == 200) {
                            Toast('重置密码成功');
                            this.$router.push('/login');
                            return false;
                        }
                        this.errInfo = res.msg;
                        this.getImageCode();
                    })
            }
        },
        mounted(){
        },
        destroyed(){

        }
    }
</script>

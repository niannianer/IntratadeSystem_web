<template>
    <div class="pay-password">
        <div class="pay-body" @click.stop=";">
            <div class="title text-center">
                {{title}}
                <span @click.stop="clearVar"
                      style="position: absolute;right: 10px;top: 6px;font-size: 20px;cursor: pointer">X</span>
            </div>
            <div class="form-warp">
                <div class="form-item" flex>
                    <label class="label" flex-box="0">法人身份证号：</label>
                    <input class="input" flex-box="1" v-model.trim="idCard" maxlength="18"/>
                </div>
                <div class="form-item" flex>
                    <label class="label" flex-box="0">法人手机号：</label>
                    <input class="input" flex-box="1" v-model.trim="mobile" maxlength="11"/>
                </div>
                <div v-show="update" class="form-item" flex>
                    <label class="label" flex-box="0">原交易密码：</label>
                    <input class="input" type="hidden" flex-box="1" v-model.trim="preUserPayPassword"
                           maxlength="6"/>
                    <input class="input" type="password" flex-box="1" v-model.trim="preUserPayPassword"
                           maxlength="6"/>
                </div>
                <div class="form-item" flex>
                    <label class="label" flex-box="0">设置交易密码：</label>
                    <input class="input" type="hidden" flex-box="1" v-model.trim="userPayPassword" maxlength="6"/>
                    <input class="input" type="password" flex-box="1" v-model.trim="userPayPassword" maxlength="6"/>
                </div>
                <div class="form-item" flex>
                    <label class="label" flex-box="0">重新输入密码：</label>
                    <input class="input" type="hidden" flex-box="1" v-model.trim="rePassword" maxlength="6"/>
                    <input class="input" type="password" flex-box="1" v-model.trim="rePassword" maxlength="6"/>
                </div>
                <div class="form-item" flex>
                    <label class="label" flex-box="0">图形验证码：</label>
                    <input class="input" flex-box="1" v-model.trim="inputCode" maxlength="4"/>
                    <span class="image-text btn btn-default" flex-box="0" flex="main:justify"
                          @click.stop="getImageCode">
                        <span v-for="code in imageCode">{{code}}</span>
                    </span>
                </div>
                <div class="form-item" flex>
                    <label class="label" flex-box="0">短信验证码：</label>
                    <input class="input" flex-box="1" v-model.trim="verifyCode" maxlength="6"/>
                    <span class="verify-text btn btn-primary" v-show="verifyTimeLeft<1"
                          @click.stop="getVerify">{{verifyText}}</span>
                    <span class="verify-text btn btn-default" v-show="verifyTimeLeft>=1">{{verifyTimeLeft}}</span>
                </div>

                <div class="form-item" style="height: 40px">
                    <span class="err-info">{{errInfo}}</span>
                </div>
                <div class="form-item" flex="main:center">
                    <button class="btn btn-primary btn-reset" @click.stop="reset">提交</button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import './pay-password.less';
    import $api from '../../tools/api';
    import {isIdCard, isPayPassword, isPhone} from '../../tools/operation';
    import Toast from '../../components/Toast';
    import EventBus from  '../../tools/event-bus';
    export default {
        name: 'pay-password',
        props: ['title', 'update'],
        data(){
            return {
                mobile: '',
                verifyCode: '',
                verifyText: '获取验证码',
                preUserPayPassword: '',
                userPayPassword: '',
                rePassword: '',
                idCard: '',
                imageCode: '',
                verifyTimeLeft: 0,
                inputCode: '',
                errInfo: '',
                timer: null
            }
        },
        components: {},
        created(){
            /* this.getImageCode();*/
            EventBus.$on('open', () => {
                this.getImageCode();
            })
        },
        computed: {},
        methods: {

            clearVar(){
                this.mobile = '';
                this.verifyCode = '';
                this.userPayPassword = '';
                this.preUserPayPassword = '';
                this.rePassword = '';
                this.idCard = '';
                this.verifyText = '获取验证码';
                this.verifyTimeLeft = '';
                this.inputCode = '';
                this.timer = '';
                this.callback();
                this.errInfo = '';
                this.clearTimeCount();
            },
            checkPhone(){
                if (!this.mobile) {
                    this.errInfo = ('请输入手机号码');
                    return false;
                }
                if (isPhone(this.mobile)) {
                    return true;
                }
                this.errInfo = ('请输入正确的手机号码');
                return false;
            },
            checkPassword(){
                if (this.update) {
                    if (!this.preUserPayPassword) {
                        this.errInfo = ('请输入原交易密码');
                        return false;
                    }
                }
                if (!this.userPayPassword) {
                    this.errInfo = ('请输入交易密码');
                    return false;
                }
                if (isPayPassword(this.userPayPassword)) {
                    return true;
                }
                this.errInfo = ('请输入正确的交易密码（6位数字）');
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
                let bussType = 2;
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
            reset(){
                console.log(this.$data);
                if (!this.idCard) {
                    this.errInfo = '请输入法人身份证';
                    return false;
                }
                if (!isIdCard(this.idCard)) {
                    this.errInfo = '法人身份证号不正确'
                }
                if (!this.checkPhone()) {
                    return false;
                }
                if (!this.checkPassword()) {
                    return false;
                }
                if (!this.rePassword) {
                    this.errInfo = '请输入重复密码';
                    return false;
                }
                if (this.rePassword != this.userPayPassword) {
                    this.errInfo = '两次密码不一致';
                    return false;
                }
                if (!this.verifyCode) {
                    this.errInfo = '请输入短信验证码';
                    return false;
                }
                if (!this.inputCode) {
                    this.errInfo = '请输入图形证码';
                    return false;
                }

                this.errInfo = '';

                let {mobile, verifyCode, userPayPassword, idCard, preUserPayPassword} = this;
                $api.post('/user/resetPayPassword', {
                    mobile, verifyCode,
                    userPayPassword, idCard, preUserPayPassword
                })
                    .then(res => {
                        if (res.code == 200) {
                            Toast('重置交易密码成功');
                            setTimeout(() => {
                                this.clearVar();
                            }, 1000);
                            return false;
                        }
                        if (res.code == 1002) {
                            this.errInfo = res.msg;
                        }
                        else {
                            this.errInfo = res.msg;
                            this.getImageCode();
                        }
                    });
            }
        },
        mounted(){
        },
        destroyed(){


        }
    }
</script>

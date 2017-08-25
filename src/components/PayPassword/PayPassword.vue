<template>
    <div class="pay-password">
        <div class="pay-body">
            <div class="title text-center">忘记交易密码</div>
            <div class="form-warp">
                <div class="form-item" flex>
                    <label class="label" flex-box="0">法人身份证号：</label>
                    <input class="input" flex-box="1"/>
                </div>
                <div class="form-item" flex>
                    <label class="label" flex-box="0">法人手机号：</label>
                    <input class="input" flex-box="1" v-model.trim="mobile"/>
                </div>
                <div class="form-item" flex>
                    <label class="label" flex-box="0">设置交易密码：</label>
                    <input class="input" type="hidden" flex-box="1" v-model.trim="userPayPassword"/>
                    <input class="input" type="password" flex-box="1" v-model.trim="userPayPassword"/>
                </div>
                <div class="form-item" flex>
                    <label class="label" flex-box="0">重新输入密码：</label>
                    <input class="input" type="hidden" flex-box="1" v-model.trim="rePassword"/>
                    <input class="input" type="password" flex-box="1" v-model.trim="rePassword"/>
                </div>
                <div class="form-item" flex>
                    <label class="label" flex-box="0">短信验证码：</label>
                    <input class="input" flex-box="1" v-model.trim="verifyCode"/>
                    <span class="verify-text btn btn-primary" v-show="verifyTimeLeft<1"
                          @click.stop>{{verifyText}}</span>
                    <span class="verify-text btn btn-default" v-show="verifyTimeLeft>=1">{{verifyTimeLeft}}</span>
                </div>
                <div class="form-item" flex>
                    <label class="label" flex-box="0">图形验证码：</label>
                    <input class="input" flex-box="1" v-model.trim="inputCode"/>
                    <span class="image-text btn btn-default" flex-box="0" flex="main:justify">
                        <span v-for="code in imageCode">{{code}}</span>
                    </span>
                </div>
                <div class="form-item">
                    <span class="err-info">{{errInfo}}</span>
                </div>
                <div class="form-item" flex="main:center">
                    <button class="btn btn-primary btn-reset">提交</button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import './pay-password.less';
    import $api from '../../tools/api';
    export default {
        name: 'pay-password',
        data(){
            return {
                mobile: '',
                verifyCode: '',
                verifyText: '获取验证码',
                userPayPassword: '',
                rePassword: '',
                idCard: '',
                imageCode: '',
                verifyTimeLeft: 0,
                inputCode: '',
                errInfo: '123'
            }
        },
        components: {},
        created(){
            this.getImageCode();
        },
        computed: {},
        methods: {
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
            }
        },
        mounted(){
        },
        destroyed(){

        }
    }
</script>

<template>
    <div class="login">
        <div class="form-warp">
            <div class="title">登录</div>
            <div class="form">
                <div class="form-item" flex>
                    <label flex-box="0" for="email">
                        <img class="icon" src="../images/login/password.png"/>
                    </label>
                    <input type="email" id="email"
                           v-model.trim="userLoginName"
                           class="input" flex-box="1" placeholder="邮箱"/>
                </div>

                <div class="form-item" flex>
                    <label flex-box="0" for="password">
                        <img class="icon" src="../images/login/password.png"/>
                    </label>
                    <input type="password" id="password"
                           v-model.trim="userLoginPassword"
                           class="input" flex-box="1" placeholder="密码"/>
                </div>

                <div class="code-item" flex v-if="imageCode">
                    <div class="input-code" flex-box="1">
                        <input type="text"
                               v-model.trim="inputCode"
                               class="input text-center" placeholder="请输入图形验证码"/>
                    </div>

                    <div class="input-code image-code text-center" flex-box="0">
                        <div class="input" @click.stop="getImageCode">{{imageCode}}</div>
                    </div>

                </div>

                <div class="err-info">{{errInfo}}</div>

                <div class="btn-warp">
                    <button class="btn-primary btn-login" @click.stop="login">登录</button>
                </div>


            </div>
        </div>

    </div>
</template>

<script>
    import $api from '../tools/api';
    import '../less/login.less';
    export default {
        name: 'login',
        data(){
            return {
                userLoginName: '',
                userLoginPassword: '',
                imageCode: '',
                inputCode: '',
                errInfo: ''
            }
        },
        created(){
        },
        computed: {},
        methods: {
            checkEmail(){
                let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
                if (!this.userLoginName) {
                    this.errInfo = '请输入登录邮箱';
                    return false;
                }
                if (!reg.test(this.userLoginName)) {
                    this.errInfo = '邮箱格式不正确';
                    return false;
                }
                return true;

            },
            checkPassword(){
                let reg = /^\w{6,20}$/
                if (!this.userLoginPassword) {
                    this.errInfo = '请输入登录密码';
                    return false;
                }
                if (!reg.test(this.userLoginPassword)) {
                    this.errInfo = '密码为6~20位数字或字母';
                    return false;
                }
                return true;
            },
            getImageCode(){
                if (!this.checkEmail()) {
                    return false;
                }
                let userLoginName = this.userLoginName;
                $api.get('/user/changeImageCode',{userLoginName})
                    .then(data=>{
                        if(data.code==200){
                            this.imageCode = data.data.imageCode;
                        }
                    });
            },
            login(){

                if (!this.checkEmail()) {
                    return false;
                }
                if (!this.checkPassword()) {
                    return false;
                }
                if (this.imageCode && !this.inputCode) {
                    this.errInfo = '请输入图片验证码';
                    return false;
                }
                let param = {
                    userLoginName: this.userLoginName,
                    userLoginPassword: this.userLoginPassword
                };
                if (this.imageCode) {
                    param.imageCode = this.inputCode;
                }
                $api.post('/user/login', param)
                    .then(data => {

                        if (data.code == 1004) {
                            this.imageCode = data.data.imageCode;
                            this.errInfo = data.msg;
                            return false;
                        }
                        if (data.code == 1110 || data.code == 1109) {
                            this.errInfo = data.msg;
                            if(data.data&&data.data.imageCode){
                                this.imageCode = data.data.imageCode;
                            }
                            return false;
                        }
                        if (data.code == 1103) {
                            this.errInfo = '该邮箱未注册';
                            return false;
                        }
                        if (data.code == 200) {
                            this.$router.push('/menus/personal-center')
                        } else {
                            this.errInfo = '系统错误，稍后再试';
                        }
                    });

            }
        },
        destroyed(){

        }
    }
</script>

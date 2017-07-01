<template>
    <div class="login">
        <div class="form-warp">
            <div class="title">登录</div>
            <div class="form">
                <div class="form-item" flex>
                    <label flex-box="0" for="email">
                        <img src="../images/login/password.png"/>
                        邮箱
                    </label>
                    <input id="email" class="input" flex-box="1"/>
                </div>

            </div>
        </div>

    </div>
</template>

<script>
    import '../less/login.less';
    export default {
        name: 'login',
        data(){
            return {}
        },
        created(){
        },
        computed: {},
        methods: {},
        destroyed(){

        }
    }
</script>

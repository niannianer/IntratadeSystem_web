<template>
    <div class="withdraw" flex="dir:top">
        <div class="title">
            提现
        </div>
        <div class="content">
            <div class="item" flex>
                <p class="item-title" flex-box="0">提现银行卡</p>
                <div flex-box="1" class="item-content">
                    <div class="bank">
                        <div class="bank-name">
                            <img src="../images/bank/ccb.png" class="bank-logo">
                            <span class="name">建设银行</span>
                            <div class="bank-info">6227 **** **** ***0 828</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="item" flex>
                <p class="item-title" flex-box="0">可提现余额</p>
                <div flex-box="1" class="item-content">
                    <p><span class="high-light">8899.77</span>元</p>
                </div>
            </div>
            <div class="item" flex>
                <p class="item-title" flex-box="0">提现金额</p>
                <div flex-box="1" class="item-content">
                    <input type="text" placeholder="请输入提现金额">元
                </div>
            </div>
            <div class="item" flex>
                <p class="item-title" flex-box="0">手续费</p>
                <div flex-box="1" class="item-content">
                    <p>
                        <span class="high-light">8899.77</span>元
                        <span class="tip">（提现免手续费）</span></p>
                </div>
            </div>
            <div class="item" flex>
                <p class="item-title" flex-box="0">手机验证码</p>
                <div flex-box="1" class="item-content">
                    <div class="verify-code" flex>
                        <input type="text" placeholder="请输入手机验证码">
                        <button>获取验证码</button>
                    </div>
                    <p class="tip">验证码发送到手机186****5678</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import '../less/withdraw.less'
    export default {
        name: 'withdraw',
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

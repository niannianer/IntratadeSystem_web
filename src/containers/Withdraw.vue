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
                            <img :src="bankImg" class="bank-logo">
                            <span class="name">{{bank_name}}</span>
                            <div class="bank-info">{{bankUserCardNo|bankCardNoFormat}}</div>
                        </div>
                    </div>
                    <div class="bank-info" flex>
                        <p flex-box="1">限额：单笔{{single_limit}}元</p>
                        <p flex-box="0">单日{{perday_limit}}元</p>
                    </div>
                </div>
            </div>
            <div class="item" flex>
                <p class="item-title" flex-box="0">可提现余额</p>
                <div flex-box="1" class="item-content">
                    <p><span class="high-light">{{accountCashAmount|currencyFormat}}</span>元</p>
                </div>
            </div>
            <div class="item" flex>
                <p class="item-title" flex-box="0">提现金额</p>
                <div flex-box="1" class="item-content">
                    <input type="text" placeholder="请输入提现金额" v-model="amount" @input="checkAmount">元
                    <p class="red">{{checkAmountText}}</p>
                </div>
            </div>
            <div class="item" flex>
                <p class="item-title" flex-box="0">手续费</p>
                <div flex-box="1" class="item-content">
                    <p>
                        <span class="high-light">2</span>元
                        <!--<span class="tip">（提现免手续费）</span>-->
                    </p>
                </div>
            </div>
         <!--   <div class="item" flex>
                <p class="item-title" flex-box="0">手机验证码</p>
                <div flex-box="1" class="item-content">
                    <div class="verify-code" flex>
                        <input type="text" placeholder="请输入手机验证码">
                        <button>获取验证码</button>
                       &lt;!&ndash; <button class="waitting">已发送(59s)</button>&ndash;&gt;
                    </div>
                    <p class="tip">验证码发送到手机186****5678</p>
                </div>
            </div>-->
            <div class="item paypass" flex>
                <p class="item-title" flex-box="0">交易密码</p>
                <div flex-box="1" class="item-content">
                    <input type="password" maxlength="6" placeholder="请输入交易密码" v-model="paypass" @input="checkPayPass">
                    <p class="red">{{checkPayPassText}}</p>
                </div>
            </div>
            <div class="item" flex>
                <p class="item-title" flex-box="0"></p>
                <div flex-box="1" class="item-content">
                   <button class="butn" :class="{'disable':clickState}" :disabled="clickState" @click.stop="withdraw">提现</button>
                    <p class="red">{{withdrawMsg}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import '../less/withdraw.less';
    import $api from '../tools/api';
    import {mapState} from 'vuex';
    let imgNames = ['abchina', 'bankcomm', 'bankofshanghai',
        'boc', 'ccb', 'cebbank', 'cgbchina', 'cib', 'cmbc',
        'cmbchina', 'ecitic', 'hxb', 'icbc', 'pingan', 'psbc', 'spdb'];
    let imgUrls = {};
    imgNames.map(url => {
        imgUrls[url] = require(`../images/bank/${url}.png`)
    });
    export default {
        name: 'withdraw',
        data(){
            return {
                imgUrls,
                bankImg:'',
                withdrawMsg:'',
                amount:'',
                checkAmountText:'',
                paypass:'',
                checkPayPassText:'',
                amountState:false,
                paypassState:false
            }
        },
        created(){
            if (this.bank_code) {
                this.bankImg = this.imgUrls[this.bank_code];
            }
        },
        watch:{
            bank_code(){
                if (this.bank_code) {
                    this.bankImg = this.imgUrls[this.bank_code];
                }
            }
        },
        computed: {
            ...mapState(['bank_code','bank_name','bankUserCardNo','accountCashAmount','single_limit','perday_limit']),
            clickState(){
                return !(this.paypassState&&this.amountState);
            }
        },
        methods: {
            withdraw(){
                $api.post('/trade/withdraw',{
                    amount:this.amount,
                    userPayPassword:this.paypass
                })
                    .then((resp)=>{
                        if(resp.code == 200){
                            this.$router.push('/menus/person-center');
                        }else{
                            this.withdrawMsg = resp.msg;
                        }
                    })
            },
            checkAmount(){
                if(!this.amount){
                    this.amountState = false;
                    this.checkAmountText = '';
                    return false;
                }
                if(isNaN(this.amount)){
                    this.checkAmountText = '提现金额必须为数字';
                    this.amountState = false;
                    return false;
                }
                if(parseFloat(this.amount)<=0){
                    this.checkAmountText = '提现金额需大于0元';
                    this.amountState = false;
                    return false;
                }
                this.checkAmountText = '';
                this.amountState = true;
            },
            checkPayPass(){
                if(!this.paypass){
                    this.checkPayPassText = '交易密码不能为空';
                    this.paypassState = false;
                    return false;
                }
                if(this.paypass.length <6){
                    this.checkPayPassText = '交易密码为6位';
                    this.paypassState = false;
                    return false;
                }
                this.checkPayPassText = '';
                this.paypassState = true;
            }
        },
        destroyed(){

        }
    }
</script>

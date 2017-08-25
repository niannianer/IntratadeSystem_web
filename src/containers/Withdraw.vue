<template>
    <div class="withdraw" flex="dir:top">
        <div class="title">
            提现
        </div>
        <div v-if="withdrawStatus">
            <div class="content">
                <div class="item" flex>
                    <p class="item-title" flex-box="0">提现银行卡</p>
                    <div flex-box="1" class="item-content">
                        <div class="bank">
                            <div class="bank-name">
                                <img :src="bankImg" class="bank-logo">
                                <span class="name">{{bank_name}}</span>
                                <div class="bank-info">{{bankUserCardNo | bankCardNoFormat}}</div>
                            </div>
                        </div>
                        <div class="bank-info" flex>
                            <p flex-box="1">限额：单笔{{withdraw_limit}}元</p>
                        </div>
                    </div>
                </div>
                <div class="item" flex>
                    <p class="item-title" flex-box="0">可提现余额</p>
                    <div flex-box="1" class="item-content">
                        <p><span class="high-light">{{accountCashAmount | currencyFormat}}</span>元</p>
                    </div>
                </div>
                <div class="item" flex>
                    <p class="item-title" flex-box="0">提现金额</p>
                    <div flex-box="1" class="item-content">
                        <input type="text" placeholder="请输入提现金额" v-model.trim="amount" autocomplete="off"
                               @keyup="formAmount">元
                    </div>
                </div>
                <div class="item" flex>
                    <p class="item-title" flex-box="0">手续费</p>
                    <div flex-box="1" class="item-content">
                        <p>
                            <span class="high-light">{{fee}}</span>元
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
                    <div flex-box="0" class="item-content">
                        <input type="hidden" maxlength="6" placeholder="请输入交易密码" name="password">
                        <input type="password" maxlength="6" placeholder="请输入交易密码" v-model.trim="paypass"
                               autocomplete="off" name="password">
                    </div>
                    <div class="set-pay" @click.stop="setPay">忘记交易密码</div>
                </div>

                <div class="item" flex>
                    <p class="item-title" flex-box="0"></p>
                    <div flex-box="1" class="item-content">
                        <button class="butn" :disabled="disable" @click.stop="withdraw">{{btnMsg}}</button>
                        <p class="red">{{erroMsg}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div v-else="withdrawStatus">
            <div class="success-icon" flex="main:center">
                <div class="img"><img src="../images/icon-success.png" alt=""></div>
                <div>提现成功！</div>
            </div>
        </div>
    </div>
</template>

<script>
    import '../less/withdraw.less';
    import $api from '../tools/api';
    import {mapState} from 'vuex';
    import PayPassword from '../components/PayPassword';
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
                bankImg: '',
                amount: '',
                paypass: '',
                erroMsg: '',
                fee: 2,
                withdrawStatus: true,
                btnMsg: '提现',
                withdraw_limit: '200万',
                withdraw_limit_value: 2000000,
                disable: false
            }
        },
        created(){
            if (this.bank_code) {
                this.bankImg = this.imgUrls[this.bank_code];
            }
        },
        watch: {
            bank_code(){
                if (this.bank_code) {
                    this.bankImg = this.imgUrls[this.bank_code];
                }
            }
        },
        computed: mapState(['bank_code', 'bank_name', 'bankUserCardNo', 'accountCashAmount', 'single_limit', 'perday_limit',]),
        methods: {
            withdraw(){
                if (!this.checkAmount()) {
                    return false;
                }
                if (!this.checkPayPass()) {
                    return false;
                }
                this.btnMsg = '提现中。。。';
                this.disable = true;
                $api.post('/trade/withdraw', {
                    amount: this.amount,
                    userPayPassword: this.paypass
                })
                    .then((resp) => {
                        this.btnMsg = '提现';
                        this.disable = false;
                        if (resp.code == 200) {
                            this.withdrawStatus = false;
                        } else {
                            this.erroMsg = resp.msg;
                        }
                    })
            },
            checkAmount(){
                if (!this.amount) {
                    this.erroMsg = '提现金额不能为空';
                    return false;
                }
                if (isNaN(this.amount)) {
                    this.erroMsg = '提现金额必须为数字';
                    return false;
                }
                if (parseFloat(this.amount) <= 0) {
                    this.erroMsg = '提现金额需大于0元';
                    return false;
                }
                if (parseFloat(this.amount) > parseFloat(this.accountCashAmount - this.fee)) {
                    this.erroMsg = '提现金额+手续费金额须小于或等于可提现金额';
                    return false;
                }
                if (parseFloat(this.amount) > parseFloat(this.withdraw_limit_value)) {
                    this.erroMsg = '提现金额不能大于单笔限额';
                    return false;
                }
                this.erroMsg = '';
                return true;
            },
            checkPayPass(){
                if (!this.paypass) {
                    this.erroMsg = '交易密码不能为空';
                    return false;
                }
                if (this.paypass.length < 6) {
                    this.erroMsg = '交易密码为6位';
                    return false;
                }
                this.erroMsg = '';
                return true;
            },
            formAmount(){
                setTimeout(() => {
                    this.amount = this.amount.replace(/(^\d+\.\d{2})(.+)$/, ($1, $2) => {
                        return $2;
                    })
                }, 200)

            },
            setPay(){
                PayPassword()
            }
        },
        destroyed(){

        }


    }
</script>

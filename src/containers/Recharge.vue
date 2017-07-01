<template>
    <div class="recharge">
        <div class="recharge-tabs">
            <div class="tab" :class="{active:tab == 1}" @click.stop="tab = 1">网上银行</div>
            <div class="tab" :class="{active:tab == 2}" @click.stop="tab = 2">快捷支付</div>
        </div>
        <div class="recharge-content">
            <div class="recharge-pay" v-if="!status">
                <div class="way clear com">
                    <div class="way-name left div">充值方式</div>
                    <div class="left">{{way[tab-1]}}</div>
                </div>
                <div class="monery clear com">
                    <div class="left div">充值金额</div>
                    <div class="left com inputs"><input @keyup="myKeyup" type="text" placeholder="请输入充值金额" v-model="rechargeMoney"></div>
                </div>
                <!-- <p class="hint">点击“下一步”按钮即代表您已阅读并知晓《XXXXXX协议》</p> -->
            </div>
            <div class="recharge-success" v-else>
                <div class="success-icon" flex="main:center" v-if="complete">
                    <div class="img"><img src="../images/icon-success.png" alt=""></div>
                    <div>充值成功！</div>
                </div>
                <div class="success-icon" flex="main:center" v-else>
                    <div class="img"><img src="../images/icon-error.png" alt=""></div>
                    <div>充值失败</div>
                </div>
            </div>
            <div class="btns" v-if="!status">
                <button @click.stop="next">下一步</button>
            </div>
            <div class="btns again" v-else flex="main:center">
                <button @click.stop="again">再充一笔</button>
            </div>
            <div class="page-list">
                <h5>温馨提示</h5>
                <p>1、如果在充值过程中遇到问题请致电：<span>400-812-1111</span>；</p>
                <p>2、如果超出支付限额，整体投资金额进行拆分，多次充值；</p>
                <p>3、请使用借记卡充值，信用卡无法充值，充值提现0手续费；</p>
                <p>4、开通网银方法: (1)携带本人身份证到银行柜台办理; (2)登录网上银行办理；</p>
                <p>5、每日的充值限额依据各银行限额为准。</p>
            </div>
        </div>
    </div>
</template>
<script>
    import '../less/recharge.less';
    import {mapState} from 'vuex';
    import $api from '../tools/api';
    import PayWindow from '../components/PayWindow';
    import Toast from '../components/Toast';
    import {submitRecharge, currencyInputValidate} from '../tools/operation';
    let timer = null;
    export default {
        name: 'recharge',
        data(){
            return {
                tab:1,
                way:['网银支付','快捷充值'],
                status:0,
                complete:true,
                rechargeMoney:'',
                disabled:true
            }
        },
        created(){
            
        },
        computed: mapState([
            'bankUserCardNo',
            'bank_code',
            'bank_name',
            'perday_limit',
            'single_limit',
            'single_limit_value',
            'bankUserPhone']),
        methods: {
            next(){
                if (!this.rechargeMoney) {
                    Toast('请输入充值金额');
                    return false;
                }
                if(this.disabled){return false}
                if(this.tab == 2){
                    //快捷支付
                    let newWind = window.open('/blank','_KingGoldBlank');
                    $api.post('/trade/recharge', {amount:this.rechargeMoney})
                        .then(data => {
                            if (data.code == 200) {
                                let params = data.data || {};
                                params.amount = this.rechargeMoney;
                                params.userId = this.$store.state.userId;
                                PayWindow({
                                    callback:(result)=>{
                                        this.status = 1;
                                        this.complete = true;
                                        /*$api.post('/trade/rechargeStatus', {amount:this.rechargeMoney})
                                            .then(data => {
                                                this.status = 1;
                                                if (data.code == 200) {
                                                    //充值成功
                                                    this.complete = true;
                                                } else {
                                                    Toast(data.msg);
                                                    this.complete = false;
                                                }
                                            });*/
                                        
                                    }
                                });
                                submitRecharge(params);
                            } else {
                                newWind.close();
                                Toast(data.msg);
                            }
                        });
                }else{
                   //网银
                }
            },
            again(){
                this.rechargeMoney = '';
                this.status = 0;
            },
            myKeyup(){
                if (timer) {
                    clearTimeout(timer);
                }
                timer = setTimeout(() => {
                    this.rechargeMoney = currencyInputValidate(this.rechargeMoney);
                    if (this.rechargeMoney) {
                        this.disabled = false;
                    }
                    console.log(this.single_limit_value)
                    if (parseFloat(this.rechargeMoney) > this.single_limit_value) {
                        Toast('充值金额不能大于单笔限额，请重新输入');
                        this.disabled = true;
                    }
                }, 200);
            }
        },
        destroyed(){

        }
    }
</script>

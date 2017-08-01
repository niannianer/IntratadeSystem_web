<template>
    <div class="recharge">
        <div class="recharge-tabs" flex>
            <!-- <div class="tab" flex-box="1" :class="{active:tab == 1}" @click.stop="tab = 1">快捷支付</div> -->
            <div class="tab" flex-box="1" :class="{active:tab == 2}">网上银行</div>
        </div>
        <div class="recharge-content">
            <div class="recharge-pay" v-if="!status">
                <div class="way clear com">
                    <div class="way-name left div">充值方式</div>
                    <div class="left">{{way[tab-1]}}</div>
                </div>
                <div class="monery clear com">
                    <div class="left div">充值金额</div>
                    <div class="left com inputs"><input @input="myKeyup" type="text" placeholder="请输入充值金额" v-model="rechargeMoney" maxlength="12"><i>元</i></div>
                    <div class="showtab"><span @click.stop="show()">查看充值限额</span></div>
                </div>
                <!-- <p class="hint">点击“下一步”按钮即代表您已阅读并知晓《XXXXXX协议》</p> -->
                <div class="handling-charge" flex>
                    <div class="name">手续费</div>
                    <div><span>{{handlingCharge}}</span>元</div>
                </div>
                <div class="handling-charge" flex>
                    <div class="name">实际提交金额</div>
                    <div><span>{{amount}}</span>元</div>
                </div>
            </div>
            <div class="recharge-success" v-else>
                <div class="success-icon" flex="main:center" v-if="complete == 1">
                    <div class="img"><img src="../images/icon-success.png" alt=""></div>
                    <div>充值申请成功！</div>
                </div>
                <div class="success-icon" flex="main:center" v-if="complete == 0">
                    <div class="img"><img src="../images/icon-error.png" alt=""></div>
                    <div>充值处理中</div>
                </div>
                <div class="success-icon" flex="main:center" v-if="complete == 2">
                    <div class="img"><img src="../images/icon-error.png" alt=""></div>
                    <div>充值失败</div>
                </div>
            </div>
            <div class="btns" v-if="!status" flex>
                <button @click.stop="next">下一步</button>
            </div>
            <div class="btns again" v-else flex="main:center">
                <button @click.stop="again">再充一笔</button>
            </div>
            <div class="page-list">
                <h5>温馨提示</h5>
                <p>1、如果在充值过程中遇到问题请致电：<span>{{telNumber}}</span>；</p>
                <p>2、请使用借记卡充值，信用卡无法充值；</p>
                <p>3、开通网银方法: (1)携带本人身份证到银行柜台办理; (2)登录网上银行办理；</p>
                <p>4、每日的充值限额依据各银行限额为准。</p>
            </div>
        </div>
    </div>
</template>
<script>
    import '../less/recharge.less';
    import {mapState} from 'vuex';
    import $api from '../tools/api';
    import PayWindow from '../components/PayWindow';
    import Quota from '../components/Quota';
    import Toast from '../components/Toast';
    import {telNumber} from '../tools/config';
    import {submitRecharge, currencyInputValidate} from '../tools/operation';
    let timer = null;
    export default {
        name: 'recharge',
        data(){
            return {
                tab:2,
                way:['快捷充值','网银支付'],
                status:0,
                complete:1,
                rechargeMoney:'',
                disabled:true,
                handlingCharge:5,
                telNumber
            }
        },
        created(){

        },
        computed: {
                ...mapState([
                'bankUserCardNo',
                'bank_code',
                'bank_name',
                'perday_limit',
                'single_limit',
                'single_limit_value',
                'bankUserPhone']),
            amount:function(){
                if(this.rechargeMoney){
                    return Number(this.rechargeMoney)+Number(this.handlingCharge);
                }
                return 0;
            }
        },
        methods: {
            next(){
                if (!this.rechargeMoney) {
                    Toast('请输入充值金额');
                    return false;
                }
                if (Number(this.rechargeMoney)<0) {
                    Toast('请输入正确金额');
                    return false;
                }
                if(this.disabled){return false}
                if(this.amount>=1000000000000){
                    Toast('充值金额加手续费不要超过10000亿元！');
                    return false;
                }
                if(this.tab == 2){
                    //网银支付
                    let newWind = window.open('/blank','_KingGoldBlank');
                    $api.post('/trade/recharge', {amount:this.amount})
                        .then(data => {
                            if (data.code == 200) {
                                let params = data.data || {};
                                params.amount = this.amount;
                                params.userId = this.$store.state.userId;
                                submitRecharge(params);
                                PayWindow({
                                    callback:(result)=>{
                                        if(result == 0){
                                            //已完成
                                            $api.get('/trade/rechargeStatus', {orderBillCode:params.orderBillCode})
                                                .then(data => {
                                                    this.status = 1;
                                                    if (data.code == 200) {
                                                        if(data.data.status == 0){
                                                            //处理中
                                                            this.complete = 0;
                                                        }else if(data.data.status == 1){
                                                            //成功
                                                            this.complete = 1;
                                                        }else{
                                                            //充值失败与取消
                                                            this.complete = 2;
                                                        }
                                                    } else {
                                                        this.complete = 2;
                                                    }
                                                });

                                        }else{
                                            //未完成或者“×”
                                            //测试 调用查询接口触发更新
                                            $api.get('/trade/rechargeStatus', {orderBillCode:params.orderBillCode});
                                            this.$router.go(0);
                                        }
                                    }
                                });
                            } else {
                                newWind.close();
                                Toast(data.msg);
                            }
                        });
                }else{
                   //网银暂无
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
                }, 0);
            },
            show(){
                Quota();
            }
        },
        destroyed(){

        }
    }
</script>

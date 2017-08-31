<template>
    <div class="purchase">
        <div class="form-content">
            <div>
                <div class="form-item" flex>
                    <label class="form-label" flex-box="0">机构邮箱</label>
                    <span flex-box="1" class="form-input">{{userLoginName}}</span>
                </div>
                <div class="form-item" flex>
                    <label class="form-label" flex-box="0">机构名称</label>
                    <span flex-box="1" class="form-input">{{enterpriseName}}</span>
                </div>
                <div class="form-item" flex>
                    <label class="form-label" flex-box="0">账户余额</label>
                    <span flex-box="1" class="form-input">{{accountCashAmount | currencyFormat}} 元</span>
                </div>
                <div class="form-item" flex>
                    <label class="form-label" flex-box="0">产品编号</label>
                    <div flex-box="1" class="form-input">
                        <div class="select-warp">
                            <king-select :options="productList" @callback="callback"></king-select>
                        </div>

                    </div>

                </div>
                <div class="form-item" flex>
                    <label class="form-label" flex-box="0">产品名称</label>
                    <span flex-box="1" class="form-input">{{currentProduct.productName}}</span>
                </div>
                <div class="form-item" flex>
                    <label class="form-label" flex-box="0">产品期限</label>
                    <span flex-box="1" class="form-input">{{currentProduct.productPeriod}}天</span>
                </div>
                <div class="form-item" flex>
                    <label class="form-label" flex-box="0">年化收益率</label>
                    <span flex-box="1" class="form-input">{{currentProduct.annualInterestRate}}</span>
                </div>
                <div class="form-item" flex>
                    <label class="form-label" flex-box="0">起投金额</label>
                    <span flex-box="1"
                          class="form-input">{{currentProduct.productMinInvestment | currencyFormat}}元</span>
                </div>
                <div class="form-item" flex>
                    <label class="form-label" flex-box="0">最高可投</label>
                    <span flex-box="1" v-show="currentProduct.productMaxInvestment"
                          class="form-input">{{currentProduct.productMaxInvestment | currencyFormat}}元
                    </span>
                    <span flex-box="1" v-hide="currentProduct.productMaxInvestment"
                          class="form-input">无
                    </span>
                </div>
                <div class="form-item" flex>
                    <label class="form-label" flex-box="0">剩余可投</label>
                    <span flex-box="1"
                          class="form-input">{{currentProduct.productRemainAmount | currencyFormat}}元</span>
                </div>
                <div class="form-item" flex>
                    <label class="form-label" flex-box="0">购买金额</label>
                    <div class="form-input" flex-box="1">
                        <input class="input input-purchase" @blur="keyUp"
                               v-model="orderAmount">
                    </div>

                </div>
                <div class="form-item" flex>
                    <label class="form-label" flex-box="0">交易密码</label>
                    <div class="form-input" flex-box="0">
                        <input class="input input-purchase" type="hidden" autocomplete="off"
                               v-model.trim="userPayPassword"
                               maxlength="6">
                        <input class="input input-purchase" autocomplete="off"
                               type="password" v-model.trim="userPayPassword"
                               maxlength="6">
                    </div>
                    <div class="set-pay" @click.stop="setPay">忘记交易密码</div>

                </div>
                <div class="form-item" flex>
                    <div class="err-info">{{errInfo}}</div>

                </div>
                <div class="form-item" flex>
                    <label class="form-label" flex-box="0"></label>
                    <div class="form-input" flex-box="1">
                        <button class="btn btn-primary btn-purchase" :disabled="loading"
                                @click.stop.prevent="purchase">{{loading ? '正在购买...' : '购买'}}
                        </button>
                    </div>

                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import '../less/purchase.less';
    import $api from '../tools/api';
    import {isPayPassword} from '../tools/operation';
    import Toast from '../components/Toast';
    import PayPassword from '../components/PayPassword';
    import KingSelect from '../components/KingSelect';
    export default {
        name: 'purchase',
        data(){
            return {
                productList: [],
                currentProduct: {},
                productUuid: '',
                orderAmount: '',
                userPayPassword: '',
                errInfo: '',
                loading: false,
                timer: null
            }
        },
        components: {
            KingSelect
        },
        created(){
            this.getList();
        },
        computed: {
            ...mapState([
                'accountCashAmount',
                'userLoginName',
                'enterpriseName'
            ])
        },
        methods: {
            keyUp(){
                if (this.timer) {
                    clearTimeout(this.timer);
                }
                this.timer = setTimeout(() => {
                    if (!this.orderAmount) {
                        return false;
                    }
                    if (isNaN(this.orderAmount)) {
                        this.orderAmount = '';
                    } else {
                        this.orderAmount = (parseInt(this.orderAmount)).toFixed(2);
                    }
                }, 100);

            },
            /*检查交易密码*/
            checkPassword(){
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
            /*检查输入金额*/
            isAmount(){
                if (!this.orderAmount) {
                    this.errInfo = '请输入购买金额';
                    return false;
                }
                if (isNaN(this.orderAmount)) {
                    this.errInfo = '请输入正确的购买金额';
                    return false;
                }
                if (Number(this.orderAmount) < Number(this.currentProduct.productMinInvestment)) {
                    this.errInfo = '购买金额不能小于最小投资金额';
                    return false;
                }
                if (Number(this.orderAmount) > Number(this.currentProduct.productRemainAmount)) {
                    this.errInfo = '购买金额不能大于剩余可投金额';
                    return false;
                }
                if (Number(this.orderAmount) > Number(this.accountCashAmount)) {
                    this.errInfo = '购买金额不能大于可用余额';
                    return false;
                }
                return true;
            },
            /*获取产品列表*/
            getList(){
                $api.get('/product/getList')
                    .then(res => {
                        if (res.code == 200) {
                            this.productList = res.data.productList;
                        }
                    })
            },
            /*设置当前产品*/
            setCurrent(){
                let {productUuid} = this;
                if (!productUuid) {
                    this.currentProduct = {};
                    return false;
                }
                this.productList.map(p => {
                    if (p.productUuid == productUuid) {
                        this.currentProduct = p;
                    }
                });
            },
            /*购买*/
            purchase(){
                if (!this.productUuid) {
                    this.errInfo = '请选择购买产品';
                    return false;
                }
                if (this.isAmount() && this.checkPassword()) {
                    let {productUuid, orderAmount, userPayPassword} = this;
                    this.loading = true;
                    $api.post('/trade/invest', {productUuid, orderAmount, userPayPassword})
                        .then(res => {
                            this.loading = false;
                            this.getList();
                            if (res.code == 200) {
                                Toast('购买成功');
                                this.userPayPassword = '';
                                this.orderAmount = '';
                                this.$store.dispatch('getBaofooInfo')
                                    .then(() => {
                                        this.productUuid = '';
                                        this.setCurrent();
                                    });
                            }
                            else {
                                this.errInfo = res.msg;
                            }
                        });
                }
            },
            /*设置交易密码*/
            setPay(){
                PayPassword()
            },
            /*产品选择回调*/
            callback(opt){
                this.productUuid = opt.productUuid;
                this.setCurrent();
            }
        },
        mounted(){

        },
        destroyed(){

        }
    }
</script>

<template>
    <div class="person-center">
        <div class="fund-center" flex>
            <div class="right-line" flex-box="1">
                <p class="num" v-if="mode">{{accountTotalAssets|currencyFormat}}</p>
                <p class="num" v-else="mode">****</p>
                <p class="category">募集总额(元)</p>
            </div>
            <div class="right-line" flex-box="1">
                <p class="num"  v-if="mode">{{accountFreezeAmount|currencyFormat}}</p>
                <p class="num" v-else="mode">****</p>
                <p class="category">冻结金额(元)</p>
            </div>
            <div class="right-line" flex-box="1">
                <p class="num"  v-if="mode">{{accountCashAmount|currencyFormat}}</p>
                <p class="num" v-else="mode">****</p>
                <p class="category">可用余额(元)</p>
            </div>
            <div class="btn-part" flex-box="1" flex="dir:top">
                <router-link class="butn" :to="{path:'/menus/recharge'}"
                             active-class="menu-active">充值</router-link>
                <router-link class="butn" :to="{path:'/menus/withdraw'}"
                             active-class="menu-active">提现</router-link>
            </div>
            <div flex-box="0" class="switch-mode" @click.stop="switchMode">
                <img src="../images/person-center/eyes-show.png" alt="show" v-show="mode">
                <img src="../images/person-center/eyes-hide.png" alt="show" v-show="!mode">
            </div>
        </div>
        <div class="info-center" flex="dir:top">
            <div flex-box="1" flex>
                <div class="info-left right-line" flex-box="0">
                    <img src="../images/person-center/portrait-logo.png" alt="portrait-logo">
                   <!-- <p>ID{{userId}}</p>-->
                </div>
                <div class="info-right" flex-box="1">
                    <div class="info-item" flex>
                        <span>用户名</span>
                        <p>{{userLoginName}}</p>
                       <div class="btn-part">
                       </div>
                    </div>
                    <div class="info-item" flex>
                        <span>绑银行卡</span>
                        <p>{{bank_full_name}}</p>
                        <div class="btn-part">
                            <!--<div  class="butn">立即绑卡</div>-->
                        </div>
                    </div>
                <!--    <div class="info-item" flex>
                        <span>待还总金额</span>
                        <p>898989</p>
                        <div class="btn-part">
                            <div  class="butn">立即充值</div>
                        </div>
                    </div>
                    <div class="info-item" flex>
                        <span>下个还款日</span>
                        <p>2017.10.11</p>
                        <div class="btn-part">
                            <div  class="butn">查看详情</div>
                        </div>
                    </div>-->
                </div>
            </div>
            <div class="tip" flex-box="0">
                温馨提示：因个人信息涉及到购买金疙瘩平台产品的合同有效性，故身份认证信息不可变更。
            </div>
        </div>
    </div>
</template>

<script>
    import '../less/person-center.less';
    import $api from '../tools/api';
    import {mapState} from 'vuex';
    export default {
        name: 'person-center',
        data(){
            return {
                mode:true
            }
        },
        created(){
            this.$store.dispatch('getBaofooInfo');
        },
        computed: mapState([
            'accountTotalAssets',
            'accountFreezeAmount',
            'accountCashAmount',
            'userId',
            'userLoginName',
            'bank_full_name'
        ]),
        methods: {
            switchMode(){
                this.mode = !this.mode;
            }
        },
        destroyed(){

        }
    }
</script>

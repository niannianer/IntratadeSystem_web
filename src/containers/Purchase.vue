<template>
    <div class="purchase">
        <div class="form-content">
            <form>
                <div class="form-item" flex>
                    <label class="form-label" flex-box="0">机构邮箱</label>
                    <span flex-box="1" class="form-input">dsg@163.com</span>
                </div>
                <div class="form-item" flex>
                    <label class="form-label" flex-box="0">机构名称</label>
                    <span flex-box="1" class="form-input">中冀汇通科技互联网有限公司</span>
                </div>
                <div class="form-item" flex>
                    <label class="form-label" flex-box="0">账户余额</label>
                    <span flex-box="1" class="form-input">12345</span>
                </div>
                <div class="form-item" flex>
                    <label class="form-label" flex-box="0">产品编号</label>
                    <div flex-box="1" class="form-input">
                        <select class="select-purchase">
                            <option value="1">编号1</option>
                            <option value="2">编号2</option>
                            <option value="3">编号3</option>
                            <option value="4">编号4</option>
                        </select>
                    </div>

                </div>
                <div class="form-item" flex>
                    <label class="form-label" flex-box="0">产品名称</label>
                    <span flex-box="1" class="form-input">北斗中枢定期产品12</span>
                </div>
                <div class="form-item" flex>
                    <label class="form-label" flex-box="0">产品期限</label>
                    <span flex-box="1" class="form-input">180天</span>
                </div>
                <div class="form-item" flex>
                    <label class="form-label" flex-box="0">剩余可投</label>
                    <span flex-box="1" class="form-input">11999元</span>
                </div>
                <div class="form-item" flex>
                    <label class="form-label" flex-box="0">购买金额</label>
                    <div class="form-input" flex-box="1">
                        <input  class="input input-purchase">
                    </div>

                </div>
                <div class="form-item" flex>
                    <label class="form-label" flex-box="0"></label>
                    <div class="form-input" flex-box="1">
                        <button  class="btn btn-primary btn-purchase">购买</button>
                    </div>

                </div>
            </form>
        </div>

    </div>
</template>

<script>
    import '../less/purchase.less';
    import $api from '../tools/api';
    export default {
        name: 'purchase',
        data(){
            return {}
        },
        components: {},
        created(){
        },
        computed: {},
        methods: {},
        mounted(){

        },
        destroyed(){

        }
    }
</script>

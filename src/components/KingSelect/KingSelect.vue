<template>
    <div class="king-select">
        <div class="placeholder" :class="{'expend':expend}" @click.stop="expend=!expend">
            {{display}}
        </div>
        <ul class="lists" v-show="expend">
            <li class="item ellipsis" v-for="option in options" @click.stop="setOption(option)">
                {{option.productName}} 【{{option.productCode}}】
            </li>
        </ul>

    </div>
</template>

<script>
    import './king-select.less';
    export default {
        name: 'king-select',
        props: ['options'],
        data(){
            return {
                expend: false,
                current: {}
            }
        },
        components: {},
        created(){
        },
        computed: {
            display(){
                if (this.current.productCode) {
                    return `${this.current.productName}
                    【${this.current.productCode}】`
                }
                return '';
            }
        },
        methods: {
            setOption(option){
                this.expend = false;
                this.$emit('callback', option);
                this.current = option;
            }
        },
        mounted(){
        },
        destroyed(){

        }
    }
</script>

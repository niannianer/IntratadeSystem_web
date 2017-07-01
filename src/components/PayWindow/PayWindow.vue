<template>
    <div class="confirm">
        <div class="shade"></div>
        <div class="box">
            <div class="content" flex="dir:top">
                <p class="text" flex-box="1">是否在宝付完成充值</p>
                <div class="btns" flex-box="0" flex="main:justify">
                    <button class="ok"  @click.stop="btnAction(0)">已完成</button>
                    <button  @click.stop="btnAction(1)">未完成</button>
                </div>
                <div class="dclose" @click.stop="btnAction(2)">×</div>
            </div>
        </div>
    </div>


</template>

<script>
    import './pay-window.less';
    export default {
        name: 'pay-window',
        data(){
            return {
                //visible: false

            }
        },
        methods: {
            btnAction(result){
                this.callback(result)
            }
        }

    }
</script>

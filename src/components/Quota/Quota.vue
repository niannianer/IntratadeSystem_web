<template>
    <div class="quota">
        <div class="shade"></div>
        <div class="box">
            <div class="table">
                <h6>企业网银充值限额表</h6>
                <ul flex class="thead">
                    <li>
                        <span>限额</span>
                        <span>银行</span>
                    </li>
                    <li>单笔限额(元)</li>
                    <li>日累计限额(元)</li>
                </ul>
                <div class="tbody">
                    <table>
                        <tr>
                            <td width="107">工商银行B2B</td>
                            <td width="107">无限额</td>
                            <td >无限额</td>
                        </tr>
                        <tr>
                            <td>农业银行B2B</td>
                            <td>999万</td>
                            <td>无限额</td>
                        </tr>
                        <tr>
                            <td>中国银行B2B</td>
                            <td>1亿</td>
                            <td>5亿</td>
                        </tr>
                        <tr>
                            <td>建设银行B2B</td>
                            <td>500万</td>
                            <td>1亿</td>
                        </tr>
                        <tr>
                            <td>交通银行B2B</td>
                            <td>500万</td>
                            <td>1亿</td>
                        </tr>
                        <tr>
                            <td>招商银行B2B</td>
                            <td>500万</td>
                            <td>1亿</td>
                        </tr>
                        <tr>
                            <td>民生银行B2B</td>
                            <td>无限额</td>
                            <td>无限额</td>
                        </tr>
                        <tr>
                            <td>光大银行B2B</td>
                            <td>无限额</td>
                            <td>无限额</td>
                        </tr>
                        <tr>
                            <td>平安银行B2B</td>
                            <td>无限额</td>
                            <td>无限额</td>
                        </tr>
                        <tr>
                            <td>广发银行B2B</td>
                            <td>30万</td>
                            <td>30万</td>
                        </tr>
                        <tr>
                            <td>浦发银行B2B</td>
                            <td>500万</td>
                            <td>1亿</td>
                        </tr>
                        <tr>
                            <td>兴业银行B2B</td>
                            <td>无限额</td>
                            <td>无限额</td>
                        </tr>
                        <tr>
                            <td>华夏银行B2B</td>
                            <td>500万</td>
                            <td>1亿</td>
                        </tr>
                        <tr>
                            <td>上海农商B2B</td>
                            <td>5000万</td>
                            <td>1亿</td>
                        </tr>
                        <tr>
                            <td>东亚银行B2B</td>
                            <td>500万</td>
                            <td>1亿</td>
                        </tr>
                        <tr>
                            <td>上海银行B2B</td>
                            <td>无限额</td>
                            <td>无限额</td>
                        </tr>
                        <tr>
                            <td>中信银行B2B</td>
                            <td>500万</td>
                            <td>1亿</td>
                        </tr>
                    </table>
                </div>
                <div class="btns" flex="main:center">
                    <button @click.stop="btnAction()">关闭</button>
                </div>
                <span class="span-close" @click.stop="btnAction()">×</span>
            </div>
        </div>
    </div>


</template>

<script>
    import './quota.less';
    export default {
        name: 'quota',
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

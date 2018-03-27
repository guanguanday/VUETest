<template>
    
</template>

<script>
    import CommonUtil from "../../tool/commonUtil.js";
    
    export default {
        name: "BodySection",
        props:["actions"],
        data(){
            return {
                bodyData:[]
            }
        },
        mounted(){
            
        },
        methods:{
            
        }
    }
</script>

<style scoped>
    .tableList .relative{
        position: relative;
    }
    .tableList .maskLayer{
        position: absolute;left: 0;top: 0;bottom: 0;right: 0;
    }
    .btnCls{
        margin:0 5px;
    }
</style>
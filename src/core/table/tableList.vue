<template>
    <div class="tableContainer">

        <table>
            <header-section :show-ck="showCk" :origin-cols="originCols" :accpet-h-b-notice="accpetHBNotice" :notice-change-cols="noticeChangeCols" :ck="state.ck" :actions="actions" :cols="state.cols"></header-section>        

            <!-- <body-section></body-section> -->
        </table>

        <!-- <paging-section></paging-section> -->
    </div>
</template>

<script>
    import HeaderSection from "./header.vue";
    import BodySection from "./body.vue";
    import PagingSection from "./paging.vue";
    import Util from "../../tool/commonUtil.js";
    import AjaxUtil from "../../tool/ajaxService.js";
    export default {
        extends:AjaxUtil,
        components: {HeaderSection,BodySection,PagingSection},
        props:["options"],
        name: "TableList",
        data(){
            return {
                state:{
                    data:[],
                    cols:this.options.map,
                    ck:false,
                    pageOption:{
                        index:this.options.pageOption.index?this.options.pageOption.index:1,
                        size:this.options.pageOption.size?this.options.pageOption.size:10,
                        count:0,
                        total:0
                    }
                }
            }
        },
        computed:{
            originCols:function(){
                return Util.object.cloneObj(this.options.map);
            },
            showCk:function(){
                return this.options.showCk;
            },
            actions:function(){
                return this.options.actions;
            },
            getUrl:function(){
                return this.options.getUrl;
            }
        },
        methods:{
            getData(index){
                if(!index){
                    index = 1;
                }
                let url = this.options.getUrl();
                if( url === ""){
                    return;
                }
                let suffix = url.indexOf('?') === -1?"?":"&";
                let size = this.state.pageOption.size;
                url += suffix + this.options.pageOption.indexKey + "=" + index + "&"+ this.options.pageOption.sizeKey + "=" + size;
                this.doFetch(url,"get",null).then(data=>{
                    let res = {};
                    if(this.options.analysis){
                        res = this.options.analysis(data);
                    }else{
                        res = data;
                    }
                    res.data = Util.object.addPrimaryAndCk(res.data);
                    if(res.data && res.data instanceof Array && res.data.length != 0){
                        let arr = Util.object.addPrimaryAndCk(res.data);
                        let total = -1;
                        if(parseInt(res.count)%size == 0){
                            total = parseInt(res.count)/size;
                        }else{
                            total = parseInt(parseInt(res.count)/size) + 1;
                        }

                        this.state.data = arr;
                        this.state.pageOption = {index:index,count:arr.length,total:total,size:size};
                    }else{
                        Util.throwError("检查analysis, getUrl, pageOption参数!");
                    }
                })
            },
            accpetHBNotice(){

            },
            noticeChangeCols(map){
                this.state.cols = map;
            }
        },
        created(){
            
        },
        mounted () {
            this.getData(this.state.pageOption.index);
        }
    }
</script>

<style scoped>
    .tableContainer{
        border: 1px solid rebeccapurple;
    }
</style>

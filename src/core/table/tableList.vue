<template>
    <div class="tableContainer">
        <body-section ref="primaryKey" :actions="actionOptions" :community-key="primaryKey" :body="bodyData"></body-section>

        <paging :options="pagingOptions"></paging>
    </div>
</template>

<script>
    import BodySection from "./body.vue";
    import Paging from "./paging.vue";
    import CommonUtil from "../../tool/commonUtil.js";
    import AjaxUtil from "../../tool/ajaxUtil.js";
    export default {
        extends:AjaxUtil,
        components: {BodySection,Paging},
        props:["options"],
        name: "TableList",
        data(){
            return {
                pagingOptions:this.options.paging,
                bodyOptions:this.options.body,
                actionOptions:this.options.actions,
                primaryKey:Math.ceil(Math.random()*1000000000),
                currentIndex:1,
                bodyData:[],
                pagingData:{
                    index:1,
                    pageTotal:1,
                    countTotal:1,
                    pagingCallback:this.pagingCallback
                }
            }
        },
        methods:{
            getUrl:function (index){
                var _get_url = this.pagingOptions.getUrl;
                if(typeof _get_url != "function" || _get_url() == ""){
                    CommonUtil.throwError("TableList must config getUrl param");
                    return "";
                }
                if(!index){
                    index = this.currentIndex;
                }
                var url = this.pagingOptions.getUrl();
                var chat = url.indexOf('?') ==-1?"?":"&";
                var pageParams = this.pagingOptions.pageParams;
                url = url + chat + pageParams["indexKey"] + "=" + index + "&" + pageParams["sizeKey"] + "=" + pageParams.size+"&ran="+Math.random();
                return url;
            },
            getData:function (index){
                var _url = this.getUrl(index);
                if(_url == ""){
                    return;
                }
                var that = this;
                this.doFetch(_url,"get",null).then(function(d){
                    //处理body需要的数据结构完毕
                    var data = that.pagingOptions.analysis(d.data);
                    var list = CommonUtil.addPrimaryAndCk(data.data);

                    //页码数据赋值
                    if(parseInt(data.totalCount)%size == 0){
                        that.pagingData.totalPage = parseInt(data.totalCount)/size;
                    }else{
                        that.pagingData.totalPage = parseInt(parseInt(data.totalCount)/size) + 1;
                    }
                    that.pagingData.totalCount = data.totalCount;
                    if(that.pagingData.callback){
                        that.pagingOptions.callback(list,that.currentIndex);
                    }

                    eventCtl.broadcast(that.primaryKey,list);
                })
            },
            init:function(){
                this.currentIndex = this.pagingOptions.pageParams.index;
                this.getData(this.currentIndex);
            }
        }
    }
</script>

<style scoped>
    .tableContainer{

    }
</style>
<template>
    <div class="tableContainer">
        <body-section :ck-callback="bodyOptions.ckCallback?bodyOptions.ckCallback:null" :show-ck="bodyOptions.showCk?true:false" :header-cols="bodyOptions.map" :actions="actionOptions" :community-key="bodyPrimaryKey" :body-data="bodyData"></body-section>

        <paging :community-key="pagingPrimaryKey" :options="pagingData"></paging>
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
                pagingPrimaryKey:Math.ceil(Math.random()*1000000000),
                bodyPrimaryKey:Math.ceil(Math.random()*1000000000),
                currentIndex:1,
                bodyData:{},
                pagingData:{
                    index:"-",
                    pageTotal:"-",
                    countTotal:"-",
                    callback:this.pagingReload
                }
            }
        },
        methods:{
            pagingReload:function (index) {
                this.getData(index);
            },
            getUrl:function (index){
                let _get_url = this.pagingOptions.getUrl;
                if(typeof _get_url != "function" || _get_url() == ""){
                    CommonUtil.throwError("TableList must config getUrl param");
                    return "";
                }
                if(!index){
                    index = this.currentIndex;
                }
                let url = this.pagingOptions.getUrl();
                let chat = url.indexOf('?') ==-1?"?":"&";
                let pageParams = this.pagingOptions.pageParams;
                url = url + chat + pageParams["indexKey"] + "=" + index + "&" + pageParams["sizeKey"] + "=" + pageParams.size+"&ran="+Math.random();
                return url;
            },
            getData:function (index){
                let _url = this.getUrl(index);
                if(_url == ""){
                    return;
                }
                let that = this;
                let size = that.pagingOptions.pageParams.size;
                this.doFetch(_url,"get",null).then(function(d){
                    //处理body需要的数据结构完毕
                    let data = that.pagingOptions.analysis(d.data);
                    let list = d.list;
                    //页码数据赋值
                    if(parseInt(data.totalCount)%size == 0){
                        that.pagingData.pageTotal = parseInt(data.totalCount)/size;
                    }else{
                        that.pagingData.pageTotal = parseInt(parseInt(data.totalCount)/size) + 1;
                    }
                    that.pagingData.index = index?index:1;
                    that.pagingData.countTotal = data.totalCount;
                    if(that.pagingOptions.callback){
                        that.pagingOptions.callback(list,that.currentIndex);
                    }
                    //通知body和paging更新数据
                    eventCtl.broadcast(that.pagingPrimaryKey,that.pagingData);
                    eventCtl.broadcast(that.bodyPrimaryKey,list);
                })
            },
            init:function(){
                this.currentIndex = this.pagingOptions.pageParams.index;
                this.getData(this.currentIndex);
            }
        },
        created(){
            this.init();
        }
    }
</script>

<style scoped>
    .tableContainer{

    }
</style>

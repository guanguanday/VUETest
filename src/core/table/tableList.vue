<template>
    <div class="tableContainer">
        <body-section ref="primaryKey" :actions="actionOptions" :community-key="primaryKey" :body="bodyOptions"></body-section>

        <paging :options="pagingOptions"></paging>
    </div>
</template>

<script>
    import BodySection from "./body.vue";
    import Paging from "./paging.vue";
    import CommonUtil from "../../tool/commonUtil.js";
    import {AjaxUtil} from "../../tool/ajaxUtil.js";
    export default {
        components: {BodySection,Paging},
        props:["options"],
        name: "table-list",
        data(){
            return {
                pagingOptions:this.options.paging,
                bodyOptions:this.options.body,
                actionOptions:this.options.actions,
                primaryKey:this.options.primaryKey
            }
        },
        methods:{
            getUrl:function (index){
                if(typeof constant.getUrl != "function" || constant.getUrl() == ""){
                    CommonUtil.throwError("TableList must config getUrl param");
                    return "";
                }
                if(!index){
                    index = $scope.currentIndex;
                }
                var url = constant.getUrl();
                var chat = url.indexOf('?') ==-1?"?":"&";
                var pageParams = constant.pageParams;
                url = url + chat + pageParams["indexKey"] + "=" + index + "&" + pageParams["sizeKey"] + "=" + size+"&ran="+Math.random();
                return url;
            },
            getData:function (index){
                if(this.getUrl(index) == ""){
                    return;
                }
                AjaxUtil.get(this.getUrl(index)).then(function(d){
                    //处理body需要的数据结构完毕
                    var data = constant.analysis(d.data);
                    var list = CommonUtil.addPrimaryAndCk(data.data);

                    //页码数据赋值
                    if(parseInt(data.totalCount)%size == 0){
                        $scope.totalPage = parseInt(data.totalCount)/size;
                    }else{
                        $scope.totalPage = parseInt(parseInt(data.totalCount)/size) + 1;
                    }
                    $scope.totalCount = data.totalCount;
                    if(constant.callback){
                        constant.callback(list,$scope.currentIndex);
                    }

                    Communication.broadcast($scope.communicationKey,list);
                })
            },
            init:function(){
                $scope.currentIndex = constant.pageParams.index;
                ctl.getData($scope.currentIndex);
            },
            reload:function () {

            }
        }
    }
</script>

<style scoped>
    .tableContainer{

    }
</style>
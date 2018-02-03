<template>
    <table class="table table-bordered table-hover">
        <thead>
        <tr>
            <th v-show="showCk" class="text-center"><input v-model="allCK" type="checkbox" @click="selectAll();" /></th>
            <th v-show="showActions" class="text-center">操作</th>
            <th v-for="item in originCols" :key="item.value" class="text-center">{{item.value}}</th>
        </tr>
        </thead>
        <tbody>
        <tr @click="selectOne(item);" v-for="item in bodyData" :key="item.__tmpId">
            <td v-show="showCk" class="relative"><div class="maskLayer"></div><input ng-model="item.ck" type="checkbox" /></td>
            <td v-show="showActions" class="text-center">
                <a v-for="x in actions" @click="x['action'](item,bodyData);" class="btn btn-default btn-xs btnCls">{{x.name}}</a>
            </td>
            <td v-for="col in originCols" :key="col.key">
                <div v-if="col.config.convert && col.config.click">
                    <div :id="item.__tmpId" :title="item[col.key]" @click="col['click'](item,bodyData);">{{col['convert'](item[col.key],item,bodyData)}}</div>
                </div>
                <div v-if="col.config.convert == false && col.config.click">
                    <div :id="item.__tmpId" :title="item[col.key]" @click="col['click'](item,bodyData);">{{item[col.key]}}</div>
                </div>
                <div v-if="col.config.convert && col.config.click == false">
                    <div :id="item.__tmpId" :title="item[col.key]">{{col['convert'](item[col.key],item,bodyData)}}</div>
                </div>
                <div v-if="col.config.convert == false && col.config.click == false">
                    <div :id="item.__tmpId" :title="item[col.key]">{{item[col.key]}}</div>
                </div>
            </td>
        </tr>
        </tbody>
    </table>
</template>

<script>
    import CommonUtil from "../../tool/commonUtil.js";
    /* head & body 的一些业务逻辑处理 */
    let ctl = {
        //处理表头数据源，添加convert和click标识，方便渲染html的时候判断
        dealHeaderData:function(item){
            item.config = {convert:false,click:false};
            if(item.convert && typeof item.convert == "function"){
                item.config.convert = true;
            }
            if(item.click && typeof item.click == "function"){
                item.config.click = true;
            }
            return item;
        },
        //复选框全选事件
        selectAll : function(){
            let tag = $scope.allCK;
            $scope.bodyData.map(function(item){
                item.ck = tag;
            })
            let items = CommonUtil.getSelectedItemsByField($scope.bodyData,"ck");
            $scope.ckCallback(items.array);
        },
        //复选框单选事件
        selectOne : function(item){
            item.ck = !item.ck;
            let items = CommonUtil.getSelectedItemsByField($scope.bodyData,"ck");
            let len = $scope.bodyData.length;
            let selectItemsCount = items.field.length;
            $scope.allCK = len != selectItemsCount?false:true;
            $scope.ckCallback(items.array);
        }
    }
    export default {
        name: "BodySection",
        props:["communityKey","actions","data","showCk","ckCallback","headerCols"],
        data(){
            return {
                showActions:this.actions && this.actions.length != 0?true:false,
                allCK:false,
                bodyData:[],
                originCols:this.dealCols()
            }
        },
        mounted(){
            let that = this;
            console.log(this.communityKey);
            eventCtl.on(this.communityKey,function (data) {
                that.bodyData = data;
            })
        },
        methods:{
            dealCols:function () {
              var res = [];
              this.headerCols.map(item=>{
                  res.push(ctl.dealHeaderData(item));
              })
                return res;
            },
            onConvert:function () {

            },
            selectAll:function () {

            },
            selectOne:function (item) {

            }
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
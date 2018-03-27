<template>
    <div class="text-right" style="margin-right:40px;">
        总条数:{{countTotal}}
        <input type="button" class="btn btn-info btn-sm" @click='prev' value="上一页" />
        <input type="button" class="btn btn-info btn-sm" @click='next' value="下一页" />
        {{index}}/{{pageTotal}} to
        <input type='text' class="form-control input-sm enterIndexCls" v-model='enterIndex' />
        <input type="button" class="btn btn-success btn-sm" @click='go' value="确定" />
    </div>
</template>

<script>
    export default {
        props:["options"],
        name: "PagingSection",
        data(){
            return {
                index:this.options.index,
                pageTotal:this.options.pageTotal,
                countTotal:this.options.countTotal,
                pagingCallback:this.options.callback,
                enterIndex:""
            }
        },
        methods:{
            next:function () {
                if(this.index == this.pageTotal){
                    return;
                }
                this.index ++;
                this.pagingCallback(this.index);
            },
            prev:function () {
                if(this.index == 1){
                    return;
                }
                this.index--;
                this.pagingCallback(this.index);
            },
            go:function () {
                if( this.enterIndex > this.pageTotal ||this.enterIndex< 1 || isNaN(this.enterIndex)){
                    this.enterIndex = "";
                    return;
                }
                this.pagingCallback(this.enterIndex);
            }
        },
        updated(a,b) {
            console.log("-------------------",a,b);
        },
        mounted(){
            var that = this;
            console.log(this.communityKey);
            eventCtl.on(this.communityKey,function (data) {
                that.index = data.index;
                that.pageTotal = data.pageTotal;
                that.countTotal = data.countTotal;
                that.enterIndex = "";
            })
        },
        created(){
            
        }
    }
</script>

<style scoped>
    .enterIndexCls{width: 50px;display: inline-block;}
</style>
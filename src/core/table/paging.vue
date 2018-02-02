<template>
    <div>
        总条数:{{countTotal}}
        <a @click='prev'>上一页</a>
        <a @click='next'>下一页</a>
        {{index}}/{{pageTotal}} to
        <input type='text' v-model='enterIndex' />
        <a @click='go'>确定</a>
    </div>
</template>

<script>
    export default {
        props:["options","communityKey"],
        name: "Paging",
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
        }
    }
</script>

<style scoped>

</style>
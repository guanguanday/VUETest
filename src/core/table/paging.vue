<template>
    <div>
        总条数:{{item.countTotal}}
        <a @click='prev'>上一页</a>
        <a @click='next'>下一页</a>
        {{item.index}}/{{item.pageTotal}} to
        <input type='text' v-model='item.enterIndex' />
        <a @click='go'>确定</a>
    </div>
</template>

<script>
    export default {
        props:["options"],
        name: "Paging",
        data(){
            return {
                item:{
                    index:this.options.index,
                    pageTotal:this.options.pageTotal,
                    countTotal:this.options.countTotal,
                    pagingCallback:this.options.callback,
                    enterIndex:0
                }
            }
        },
        methods:{
            next:function () {
                debugger
                if(this.index == this.pageTotal){
                    return;
                }
                this.index ++;
                this.pagingCallback(this.index);
            },
            prev:function () {
                debugger
                if(this.index == 1){
                    return;
                }
                this.index--;
                this.pagingCallback(this.index);
            },
            go:function () {
                debugger
                if( this.enterIndex > this.pageTotal ||this.enterIndex< 1 || isNaN(this.enterIndex)){
                    this.enterIndex = "";
                    return;
                }
                this.pagingCallback(this.enterIndex);
            }
        },
        updated:function (a,b) {
            console.log("-------------------",a,b);
        }
    }
</script>

<style scoped>

</style>
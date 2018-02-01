<template>
    <div>
        总条数:{{countTotal}}
        <a @click='prev();'>上一页</a>
        <a @click='next();'>下一页</a>
        {{index}}/{{pageTotal}} to
        <input type='text' v-model='enterIndex' />
        <a @click='go()'>确定</a>
    </div>
</template>

<script>
    export default {
        props:["options"],
        name: "Paging",
        data(){
            return {
                index:this.options.index,
                pageTotal:this.options.total,
                countTotal:this.options.countTotal,
                clickCallback:this.options.clickCallback,
                enterIndex:0
            }
        },
        methods:{
            next:function () {
                if(this.index == this.pageTotal){
                    return;
                }
                this.index ++;
                this.clickCallback(this.index);
            },
            prev:function () {
                if(this.index == 1){
                    return;
                }
                this.index--;
                this.clickCallback(this.index);
            },
            go:function () {
                if( this.enterIndex > this.pageTotal ||this.enterIndex< 1 || isNaN(this.enterIndex)){
                    this.enterIndex = "";
                    return;
                }
                this.clickCallback(this.enterIndex);
            }
        }
    }
</script>

<style scoped>

</style>
<template>
    <div class="text-right" style="margin-right:40px;">
        总条数:{{countTotal}}
        <input type="button" class="btn btn-info btn-sm" @click='prev' value="上一页">
        <input type="button" class="btn btn-info btn-sm" @click='next' value="下一页">
        {{index}}/{{pageTotal}} to
        <input type='text' class="form-control input-sm enterIndexCls" v-model='enterIndex' />
        <input type="button" class="btn btn-success btn-sm" @click='go' value="确定">

        <!--另一种分页样式-->
        <div>
            <nav aria-label="Page navigation">
                <ul class="pagination">
                    <li>
                        <a href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    <li><a href="#">1</a></li>
                    <li><a href="#">2</a></li>
                    <li><a href="#">3</a></li>
                    <li><a href="#">4</a></li>
                    <li><a href="#">5</a></li>
                    <li>
                        <a href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
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
    .enterIndexCls{width: 50px;display: inline-block;}
</style>
<template>
    <thead>
        <tr>
            <th v-if="showCk">
                <input type="checkbox" :checked="ck" @click="setAll" />
            </th>
            <th v-if="actions && actions.length != 0">
                操作
                <div v-for="(item,index) in defaultCols" :key="index">
                    <p>
                        <input type="checkbox" :checked="item.ck" @click="e=>{itemCheckChange(item,e)}" />
                        <span>{{item.val}}</span>
                    </p>
                </div>
                <div>
                    <input type="button" value="取消" />
                    <input type="button" value="确定" @click="reSetCols" />
                </div>
            </th>
            <th v-for="(item,index) in cols" :key="index">{{item.val}}</th>
        </tr>
    </thead>
</template>

<script>
    import Util from "../../tool/commonUtil.js";
    export default {
        props:["originCols","accpetHBNotice","noticeChangeCols","ck","actions","cols","showCk"],
        name: "HeaderSection",
        data(){
            return {
            }
        },
        computed:{
            defaultCols:function(){
                return Util.object.addPrimaryAndCk(Util.object.cloneObj(this.originCols),true);
            }
        },
        methods:{
            setAll:function(){

            },
            itemCheckChange:function(item,e){
                item.ck = !item.ck;
                e.target.checked = item.ck;
            },
            reSetCols:function(){
                let cols = Util.object.getCheckedItems(this.defaultCols).items;
                this.noticeChangeCols(cols);
            }
        },
        updated(a,b) {
            
        },
        mounted(){
            
        },
        created(){
            
        }
    }
</script>

<style scoped>
    .enterIndexCls{width: 50px;display: inline-block;}
</style>
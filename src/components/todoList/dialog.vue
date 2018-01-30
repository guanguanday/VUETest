<template>
  <div class="dialog" v-show="isShow">
    name:<input v-model="item.name" type="text" />
    age:<input v-model="item.age" type="text" />
    sex:<input v-model="item.sex" type="text" />

    <input type="button" value="Save" @click="save"/>
    <input type="button" value="Close" @click="close" />
  </div>
</template>

<script>
  var flag = "add";
    export default {
        name: "ItemDialog",
        data(){
            return {
              isShow:false,
              item:{
                name:"",
                age:"",
                sex:""
              }
            }
        },
        methods:{
          bind:function (id) {
            var that = this;
            window.setTimeout(function () {
              that.item = {
                id:id,
                name:id + "_edit_",
                age:id + "_edit_",
                sex:id + "_edit_",
              }
            },100)
          },
          save:function () {
            console.log("action flag is: " + flag);
            var that = this;
            window.setTimeout(function () {
              that.isShow = false;
              eventCtl.broadcast("saveItem",that.item);
            },500)
          },
          close:function () {
            this.isShow = false;
          }
        },
        mounted(){
            this.isShow = false;
            var that = this;
            eventCtl.on("showData",function (data) {
              if(!data){
                flag = "add";
                console.log("add action");
              }else{
                flag = "edit";
                that.bind(data.id);
                console.log("selected item id is: ",data.id);
              }
              that.isShow = true;
              // that.item = data;
            })
        }
    }
</script>

<style scoped>
  .dialog{
    border: 1px solid red;
    height: 300px;
    width:300px;
  }
</style>

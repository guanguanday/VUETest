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
            var that = this;
            window.setTimeout(function () {
              that.isShow = false;
              eventCtl.broadcast("saveItem",that.item);
            },500)
          },
          close:function () {

          }
        },
        mounted(){
            this.isShow = false;
            var that = this;
            eventCtl.on("showData",function (data) {
              console.log("selected item id is: ",data.id);
              that.isShow = true;
              that.bind(data.id);
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

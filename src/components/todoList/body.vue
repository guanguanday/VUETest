<template>
  <tbody>
    <tr v-for="(item,indexItem) in data" :key="indexItem">
      <td>
        <input type="button" value="edit" @click="editItem(item)" />
        <input type="button" value="delete" @click="deleteItem(item)" />
      </td>
      <td v-for="(col,indexCol) in cols" :key="indexCol">{{convertSex(item,col)}}</td>
    </tr>
  </tbody>
</template>

<script>

    export default {
        name: "Body",
        props:['cols',"data",'delCb'],
        methods:{
            convertSex:function (item,col) {
              if(col != "sex"){
                return item[col];
              }
              if(item[col] == "0"){
                return "man";
              }else if(item[col] == "1"){
                return "women";
              }else{
                return "not person";
              }
            },
            editItem:function (item) {
              eventCtl.broadcast("showData",item);
            },
            deleteItem:function (item) {
              console.log("id: "+item.id + ", will be deleted!");
              this.delCb(item);
            }
        },
        mounted(){

        }
    }
</script>

<style scoped>

</style>

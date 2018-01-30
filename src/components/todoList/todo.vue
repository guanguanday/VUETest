<template>
  <div class="todo">
    <input type="button" @click="goHome" value="goHome" />

    name:<input type="text" v-model="name" />
    <input type="button" @click="search" value="search"/>

    <input type="button" value="Add" @click="addItem"/>

    <div style="float: left">
      <todo-table ref="tableObject" :getUrl="getUrl"></todo-table>
    </div>
    <div style="float: left">
      <item-dialog></item-dialog>
    </div>
  </div>
</template>

<script>
    import TodoTable from "./table";
    import ItemDialog from "./dialog";
    export default {
      components: {ItemDialog,TodoTable},
      name: "todoList",
      data () {
        return {
          name: ''
        }
      },
      methods:{
          goHome:function (event) {
            this.$router.push({path:"/"});
          },
          getUrl:function () {
            return "/api/xxx/p.json?name="+this.name;
          },
          search:function () {
            this.$refs['tableObject'].getData();
          },
          addItem:function () {
            eventCtl.broadcast("showData",null);
          }
      }
    }
</script>

<style scoped>
  .todo{
    border: 1px solid red;
    height: 500px;
    width:500px;
  }
</style>

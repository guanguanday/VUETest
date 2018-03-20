<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <a @click="goTodo">Todo</a>
      </li>
    </ul>

    <table-list ref="table1" :options="optionsTable"></table-list>
  </div>
</template>

<script>
  import TableList from "../core/table/tableList.vue";
export default {
  name: 'HelloWorld',
    components: {TableList},
  data () {
    return {
      msg: 'Welcome to Your Vue.js a',
      optionsTable:{
          paging:{
              getUrl:function(){
                  return "/api/at/list?describe=";
              },
              analysis:function(d){
                  return {
                    data:data.data.data,
                    totalCount:data.data.count
                };
              },
              pageParams:{
                  size:10,
                  index:1,
                  indexKey:"index",
                  sizeKey:"size"
              },
              callback:function(data,index){
                  console.log(data,index);
                  // currentIndex = index;
              }
          },
          body:{
              map:[
                {key:"describe",val:"测试用例描述"},
                {key:"operator",val:"操作人"},
                {key:"runTime",val:"操作时间"},
                {key:"items.length",val:"用例个数"}
              ],
              showCk:true,
              ckCallback:function(d){
                  console.log("selected items length is: " + d.length);
              }
          },
          actions:[
              {name:"编辑",action:function (a,b,c) {
                  }},
              {name:"delete",action:function () {

                  }}
          ]
        }
    }
  },
  methods:{
    goTodo:function (event) {
      this.$router.push({path:"todo"});
    }
  },
    mounted:function () {
        
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .red{
    color:red;
  }
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

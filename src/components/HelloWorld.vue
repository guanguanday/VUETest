<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <a @click="goTodo">Todo</a>

        <a @click="e=>{this.SET('aaaaa')}">Change</a>
      </li>
    </ul>

    <v-v :data="data1" :cb="RESET"></v-v>

    <table-list ref={tk} :options="optionsTable"></table-list>
  </div>
</template>

<script>
  import TableList from "../core/table/tableList.vue";
  import VV from "./vv.vue";
export default {
  name: 'HelloWorld',
  components: {TableList,VV},
  data () {
    return {
      tk:"abc",
      msg: 'Welcome to Your Vue.js a',
      optionsTable:{
          paging:{
              getUrl:function(){
                  return "/api/at/list?describe=11";
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
              showCk:true
          },
          actions:[
              {name:"编辑",action:function (a,b,c) {
                  }},
              {name:"delete",action:function () {

                  }}
          ]
        },
      data1:{
          name:"xxxxx"
      }
    }
  },
  methods:{
    goTodo:function (event) {
      this.$router.push({path:"todo"});
    },
    RESET:function (e) {
        debugger
        this.data1 = e;
    }
  },
  mounted:function () {

  },
  created(){

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

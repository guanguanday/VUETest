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
          actions :[
                {key:"edit",val:"修改"},
                {key:"run",val:"Run"}
            ],
            showCk:true,
            map:[
                {key:"runTime",val:"操作时间",type:"date"},
                {key:"runTime",val:"操作时间1",type:"datetime"},
                {key:"runTime",val:"操作时间2",type:"time"},
                {key:"items.length",val:"用例个数"}
            ],
            getUrl:()=>{
                return "/api/at/list?describe=";
            },
            pageOption:{
                sizeKey:"size",
                indexKey:"index",
                index:1,
                size:10
            },
            analysis:(data)=>{
                return {
                    data:data.data.data,
                    count:data.data.count
                };
            }
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

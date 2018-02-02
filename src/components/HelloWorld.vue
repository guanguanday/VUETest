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
                  return "./static/js/list.json";
              },
              analysis:function(d){
                  var data = {data: d.list,totalCount: d.total};
                  return data;
              },
              pageParams:{
                  size:10,
                  index:1,
                  indexKey:"pageNum",
                  sizeKey:"pageSize"
              },
              callback:function(data,index){
                  console.log(data,index);
                  // currentIndex = index;
              }
          },
          body:{
              map:[
                  {key:"username",value:"username"},
                  {key:"id",value:"id",convert:function (a,b,c,d) {
                          let dom = document.querySelector("#"+b.__tmpId);
                          if(a>5){
                              dom.innerHTML = "<span style='color:red'></span>";
                          } else {
                              dom.innerHTML = "<span style='color:yellow'></span>";
                          }
                      }},
                  {key:"name",value:"name"},
                  {key:"id",value:"name11"}
              ],
              showCk:true,
              ckCallback:function(d){
                  console.log("selected items length is: " + d.length);
              }
          },
          actions:[
              {name:"edit",action:function (a,b,c) {
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
    },
    initTable:function () {
        var that = this;
        window.setTimeout(function () {
            that.optionsTable = {
                paging:{
                    getUrl:function(){
                        return "./static/js/list.json";
                    },
                    analysis:function(d){
                        var data = {data: d.list,totalCount: d.total};
                        return data;
                    },
                    pageParams:{
                        size:10,
                        index:1,
                        indexKey:"pageNum",
                        sizeKey:"pageSize"
                    },
                    callback:function(data,index){
                        console.log(data,index);
                        // currentIndex = index;
                    }
                },
                headBody:{
                    map:[
                        {key:"id",value:"id"},
                        {key:"username",value:"username"},
                        {key:"name",value:"name"},
                        {key:"id",value:"name11"}
                    ],
                    showCk:true,
                    ckCallback:function(d){
                        console.log("selected items length is: " + d.length);
                    }
                },
                actions:[
                    {name:"edit",action:function () {
                            
                        }},
                    {name:"delete",action:function () {

                        }}
                ]
            }

            that.$refs['table1'].getData();
        },1000)
    }
  },
    mounted:function () {
        this.initTable();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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

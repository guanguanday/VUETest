<template>
  <div class="list">
    <table class="table table-bordered table-hover table-condensed">
      <Head :cols="cols"></Head>
      <Body :cols="cols" :data="data" :delCb="delcb"></Body>
    </table>
  </div>
</template>

<script>
    import Head from './header';
    import Body from './body';
    export default {
        components:{Head,Body},
        props:['getUrl'],
        name: "TodoTable",
        data(){
            return {
              data:[],
              cols:[]
            }
        },
        methods:{
            getData:function () {
              window.console.log("ready to get data from server, url is: " + this.getUrl());
              var that = this;
              window.setTimeout(function () {
                that.data = [
                  {id:"1",name:"aa",age:"12",sex:"1"},
                  {id:"2",name:"bb",age:"13",sex:"0"},
                  {id:"3",name:"cc",age:"14",sex:"1"},
                  {id:"4",name:"dd",age:"15",sex:"0"}
                ];
                that.cols = that.getCols(that.data);
              },100)
            },
            getCols:function (data) {
              var res = [];
              for(var i in data[0]){
                res.push(i);
              }
              return res;
            },
            delcb:function (item) {
              debugger
            }
        },
        mounted(){
          var that = this;
            this.getData();
            eventCtl.on("saveItem",function (data) {
              console.log("save success, id is: " + data.id);
              that.getData();
            });
        },
    }
</script>

<style scoped>
  .list{

  }
</style>

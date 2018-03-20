<template>
  <div class="list">
    <table class="table table-bordered table-hover table-condensed">
      <Head :cols="cols"></Head>
      <Body :cols="cols" :data="data" :delCb="delcb"></Body>
    </table>
  </div>
</template>

<script>
    import Head from './header.vue';
    import Body from './body.vue';
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

              this.cols = that.getCols(that.data);
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

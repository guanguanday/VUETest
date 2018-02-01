/**
 * Created by wupeng5 on 2018/1/14.
 */

app.factory("DataCache",function(){
    return {
        data:{},
        set:function(key,item){
            this.data[key] = item;
        },
        get:function(key){
            return this.data[key];
        }
    }
})
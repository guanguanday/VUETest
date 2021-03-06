/**
 * Created by wupeng5 on 2018/1/7.
 */
/**
 * ajax 处理类，
 * get: return promise
 * post: return promise
 * all: params:PromiseArray, return promise
 * 接口返回格式{code:0,message:"xx",data:object}
 * code:200, 成功, 其他为失败
 * code:701，未登录
 * code失败的情况下，打印message
 * data  为返回结果
 * 
 * 
 * 
 * 组件内部请求ajax必须继承此类extends:AjaxUtil
 * 
 **/
let AjaxUtil = function(){
    this.doFetch = function(url,method,data){
        let symbol = url.indexOf('?') == -1?"?":"&";
        url = url + symbol + "ran="+Math.ceil(Math.random()*10000000);
        let defer = Q.defer();

        let headers = {
            'Content-Type': 'application/json'
        };
        let options = {
            method:method.toUpperCase(),
            credentials:'include',
            headers:headers
        };
        if(method.toLowerCase() == "post"){
            if(data){
                options.body = JSON.stringify(data);
            }
        }
        let that = this;
        fetch(url).then(d =>d.json()).then(function (data) {
            let code = data.status;
            if(code == "701"){
                that.$router.push({path:"todo"});
            }else{
                if(code == "200"){
                    defer.resolve({data:data.data,params:data.params});
                }else{
                    defer.reject({data: data.msg});
                }
            }
        }).catch(function(err) {
            defer.reject({data: "Server Error!"});
            throw new Error(url + " request server error!");
        });
        return defer.promise;
    };
};

// export default new AjaxUtil();

let AjaxService = new AjaxUtil();
export default {
    name: "AjaxUtil",
    methods:{
        doFetch:AjaxService.doFetch
    }
};
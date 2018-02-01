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
 **/
import CommonUtil from "./commonUtil.js";
var AjaxUtil = function(){
    this.get = function(url){
        var originUrl = url;
        var symbol = url.indexOf('?') == -1?"?":"&";
        url = url + symbol + "ran="+Math.ceil(Math.random()*10000000);
        var defer = $q.defer();

        fetch(url).then(d =>d.json());

        $http.get(url).success(function(d){
            var code = d.code;
            if(code == "701"){
                $state.go('login');
            }else{
                if(code == "200"){
                    defer.resolve({data: d.data});
                }else{
                    defer.reject({data: d.message});
                }
            }
        }).error(function(a,b,c,d){
            CommonUtil.throwError("["+ originUrl + "] request error!");
            defer.reject({data: "Server Error!"});
        })
        return defer.promise;
    };

    this.post = function(url,data){
        var originUrl = url;
        var symbol = url.indexOf('?') == -1?"?":"&";
        url = url + symbol + "ran="+Math.ceil(Math.random()*10000000);
        var defer = $q.defer();
        $http({
            method:"POST",
            url:url,
            data:data
        }).success(function(d){
            var code = d.code;
            if(code == "701"){
                $state.go('login');
            }else{
                if(code == "200"){
                    defer.resolve({data: d.data});
                }else{
                    defer.reject({data: d.message});
                }
            }
        }).error(function(d){
            CommonUtil.throwError("["+ originUrl + "] request error!");
            defer.reject({data: "Server Error!"});
        })
        return defer.promise;
    };

    this.all = function(promises){
        return $q.all(promises);
    }

};
var AjaxService = new AjaxUtil();
export default AjaxService;
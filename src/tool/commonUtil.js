/**
 * Created by wupeng5 on 2018/2/1.
 */

/**
 * taskQueue : 任务队列
 * throttle  : 节流函数
 * deepClone : 深度复制
 * addPrimaryAndCk : 添加临时主键以及Ck属性
 * cookie : 操作cookie,包含get，set，remove
 * equalsObject : 比较2对象相等
 * */
var CommonUtil = {
    /**
     * js中的任务队列
     * @params: data:Array
     * @params: process:function
     * @params: completedCallback : function 执行完毕的回调
     * @params: context(可选): 执行环境,如果没有，则为window
     * return undefined
     * demo:
     * var data = [{name:1},{name:2},{name:3},{name:4},{name:5},{name:6},{name:7}];
     * function print(item){console.log(item.name);}
     * taskQueue(data,print,2000);
     * **/
    taskQueue:function(array,process,completedCallback,context){
        setTimeout(function(){
            if(completedCallback && typeof completedCallback == "function"){
                if(array.length == 0){
                    completedCallback({data:"all tasks completed!"});
                    return;
                }
            }
            var item = array.shift();
            process.call(context,item);
            if(array.length >0){
                setTimeout(arguments.callee,100);
            }
        },100)
    },
    /**
     * 节流函数:
     * 如果在段时间内一直操作DOM,可能会导致浏览器内存问题，甚至崩溃，所以在一段时间内，我们让该持续性的操作间隔的执行
     * @params: method：function 需要执行的函数
     * @params: context(可选)：执行环境，如果没有，则为window
     * return undefined
     * demo:
     * function resizeDiv(){
         *      var div = document.querySelector("#div1");
         *      div.style.height = div.offsetWidth + "px";
         * }
     * throttle(resizeDiv);
     * **/
    throttle:function(method,context) {
        clearTimeout(method.tId);
        method.tId = setTimeout(function () {
            method.call(context);
        }, 80)
    },
    /**
     * 深度复制,不支持数据源json对象中含有function
     * @params: source:Object
     * return: new Object
     * */
    deepClone:function(source){
        if(source){
            return JSON.parse(JSON.stringify(source));
        }
        return null;
    },
    /**
     * 为数据源添加ck属性以及临时主键__tmpId
     * @params: data:Array
     * @params: ck:bool,可选
     * return: Array
     * */
    addPrimaryAndCk:function(data){
        data.map(function(item){
            item.ck = false;
            item.__tmpId = Math.ceil(Math.random()*10000000000000000);
        });
        return data;
    },
    /**
     * 操作cookie
     * @get: name:key, return String
     * @set: name,value,expires (到期时间)
     * @remove 移除
     */
    cookie:{
        get:function(name){
            var cookie = document.cookie;
            var cookieName = encodeURIComponent(name) + "=",
                cookieStart = cookie.indexOf(cookieName),
                cookieValue = null;
            if(cookieStart > -1){
                var cookieEnd = cookie.indexOf(';',cookieStart);
                if(cookieEnd == -1){
                    cookieEnd = cookie.length;
                }
                cookieValue = decodeURIComponent(cookie.substring(cookieStart + cookieName.length,cookieEnd));
            }
            return cookieValue;
        },
        set:function(name,value,expires){
            var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);
            if(expires instanceof Date){
                cookieText += "; expires=" + expires.toGMTString();
            }
            document.cookie = cookieText;
        },
        remove:function(name){
            this.set(name,"",new Date(0));
        }
    },
    /**
     * 比较2个对象是否相等
     * @params: source:Object
     * @params: target:Object
     * return: bool
     * **/
    equalsObject:function(source,target){
        var p;
        for (p in source) {
            if (typeof (target[p]) == 'undefined') {
                return false;
            }
        }
        for (p in source) {
            if (source[p]) {
                switch (typeof (source[p])) {
                    case 'object':
                        if (!equals(source[p], target[p])) {
                            return false;
                        }
                        break;
                    case 'function':
                        if (typeof (target[p]) == 'undefined' ||
                            (p != 'equals' && source[p].toString() != target[p].toString()))
                            return false;
                        break;
                    default:
                        if (source[p] != target[p]) {
                            return false;
                        }
                }
            } else {
                if (target[p])
                    return false;
            }
        }
        for (p in target) {
            if (typeof (source[p]) == 'undefined') {
                return false;
            }
        }
        return true;
    },
    /**
     * 公用抛出异常错误方法
     * @params：str
     * 错误日志统一入口
     * */
    throwError:function(str){
        console.log(str);
        //throw new Error(str);
    },
    /**
     * 获取数据源中得指定字段
     * @params：data, 数据源
     * @params: field, json对象中的字段
     * @params: filterCk, 是否需要判断ck属性为true
     * return Array, array:所选中得items，field所选中得field集合
     * */
    getSelectedItemsByField:function(data,field,filterCk){
        var res = {array:[],field:[]};
        if(data instanceof Array == false){
            return res;
        }
        if(filterCk){
            data.map(function(item){
                if(item["ck"] && item[field]){
                    res.field.push(item[field]);
                    res.array.push(item);
                }
            })
        }else{
            data.map(function(item){
                if(item[field]){
                    res.field.push(item[field]);
                    res.array.push(item);
                }
            })
        }
        return res;
    }
    ///**
    // * 延迟处理某个方法
    // * @params：fn function
    // * @time: 可选, 默认值为300
    // * */
    //delayTodo:function(fn,time){
    //    if(!time || time <= 1000){
    //        time = 1000;
    //    }
    //    $timeout(function(){ fn(); },time);
    //}
}
export default CommonUtil;
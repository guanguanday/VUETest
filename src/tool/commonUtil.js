/**
 * Created by wupeng5 on 2018/2/1.
 */

let CommonUtil = {
    throwError:function(str){
        console.log(str);
        //throw new Error(str);
    },
    object:{
        equalsObject(source,target){
            let p;
            for (p in source) {
                if (typeof (target[p]) == 'undefined') {
                    return false;
                }
            }
    
            for (p in source) {
                if (source[p]) {
                    switch (typeof (source[p])) {
                        case 'object':
                            if (!this.equalsObject(source[p], target[p])) {
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
        cloneObj(source){
            if(source){
                return JSON.parse(JSON.stringify(source));
            }
            return null;
        },
        getProperties(obj){
            let res = [];
            if(!obj){
                return res;
            }
            for(let i in obj){
                res.push(i);
            }
            return res;
        },
        /**
         * js中的任务队列
         * @params: data:Array
         * @params: process:function
         * @params: completedCallback : function 执行完毕的回调
         * @params: context(可选): 执行环境,如果没有，则为window
         * return undefined
         * demo:
         * let data = [{name:1},{name:2},{name:3},{name:4},{name:5},{name:6},{name:7}];
         * function print(item){console.log(item.name);}
         * taskQueue(data,print,cb);
         * **/
        taskQueue:function(array,process,completedCallback,context){
            setTimeout(function(){
                if(completedCallback && typeof completedCallback == "function"){
                    if(array.length == 0){
                        completedCallback({data:"all tasks completed!"});
                        return;
                    }
                }
                let item = array.shift();
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
             *      let div = document.querySelector("#div1");
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
        addPrimaryAndCk(data,ck){
            data.map(item=>{
                if(ck!=undefined){
                    if(!ck){
                        item.ck = false;
                    }else{
                        item.ck = true;
                    }
                }else{
                    item.ck = false;
                }
                item.__tmpId = Math.ceil(Math.random()*10000000000000000);
            });
            return data;
        },
        getCheckedItems(arr,field){
            let res = {items:[],vals:[]};
            arr.map(item=>{
                if(item.ck){
                    res.items.push(item);
                    res.vals.push(item[field]);
                }
            })
            return res;
        },
        getInfoInArrayByField(field,vals,array){
            let res = [];
            vals.map(item=>{
                array.map(k=>{
                    if(k[vals] == item){
                        res.push(k);
                    }
                })
            })
            return res;
        }
    },
    cookie:{
        removeCookie(name){
            this.setCookie(name,"",new Date(0));
        },
        getCookie(name){
            let cookie = document.cookie;
            let cookieName = encodeURIComponent(name) + "=",
                cookieStart = cookie.indexOf(cookieName),
                cookieValue = null;
            if(cookieStart > -1){
                let cookieEnd = cookie.indexOf(';',cookieStart);
                if(cookieEnd == -1){
                    cookieEnd = cookie.length;
                }
                cookieValue = decodeURIComponent(cookie.substring(cookieStart + cookieName.length,cookieEnd));
            }
            return cookieValue;
        },
        setCookie(name,value,expires){
            let cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);
            if(expires instanceof Date){
                cookieText += "; expires=" + expires.toGMTString();
            }
            document.cookie = cookieText+";path=/;domain="+document.domain;
        },
    },
    arrayServer:{
        _private:{
            getIndexByString: function (array, str) {
                let _index = -1;
                for (let i = 0; i < array.length; i++) {
                    if (array[i] == str) {
                        _index = i;
                        break;
                    }
                }
                return _index;
            },
            getIndexByObject: function (array, obj) {
                let _index = -1;
                for (let i = 0; i < array.length; i++) {
                    if (CommonUtil.object.equalsObject(array[i], obj)) {
                        _index = i;
                        break;
                    }
                }
                return _index;
            },
            removeSingleStr: function (array, str) {
                let _index = this.getIndexByString(array, str);
                if (_index == -1) {
                    return array;
                }
                array.splice(_index, 1);
                return array;
            },
            removeSingleObject: function (array, item) {
                let _index = this.getIndexByObject(array, item);
                if (_index == -1) {
                    return array;
                }
                array.splice(_index, 1);
                return array;
            },
            sortByDate:function(array, field, desc){
                let _arr = CommonUtil.object.cloneObj(array);
                _arr.map(function(item){
                    item._tmpDateField = new Date(item[field]).getTime();
                })
                _arr.sort(function (a, b) {
                    if(desc){
                        return a._tmpDateField - b._tmpDateField;
                    }else{
                        return b._tmpDateField - a._tmpDateField;
                    }
                })
                return _arr;
            },
            sortByNumAndChar:function(array, field, desc){
                let _arr = CommonUtil.object.cloneObj(array);
                _arr.sort(function (a, b) {
                    if(desc){
                        return a[field] - b[field];
                    }else{
                        return b[field] - a[field];
                    }
                })
                return _arr;
            }
        },
        getIndex:function(array, item){
            if(array instanceof Array == false){
                CommonUtil.throwError("params[array] must be Array in getIndex method");
                return;
            }
            if (typeof item == "object") {
                return CommonUtil.arrayServer._private.getIndexByObject(array, item);
            } else if (typeof item == "string") {
                return CommonUtil.arrayServer._private.getIndexByString(array, item);
            } else {
                return -1;
            }
        },
        removeItems:function(array, items){
            if(array instanceof Array == false){
                CommonUtil.throwError("params[array] must be Array in removeItems method");
                return;
            }
            items.map(function (item) {
                if (typeof item == "object") {
                    CommonUtil.arrayServer._private.removeSingleObject(array, item);
                }
                if (typeof item == "string") {
                    CommonUtil.arrayServer._private.removeSingleStr(array, item);
                }
            })
            return array;
        },
        insertItem:function(array, item){
            if(array instanceof Array == false){
                CommonUtil.throwError("params[array] must be Array in removeItems method");
                return;
            }
            items.map(function (item) {
                if (typeof item == "object") {
                    CommonUtil.arrayServer._private.removeSingleObject(array, item);
                }
                if (typeof item == "string") {
                    CommonUtil.arrayServer._private.removeSingleStr(array, item);
                }
            })
            return array;
        },
        uniq:function(array){
            if(array instanceof Array == false){
                CommonUtil.throwError("params[array] must be Array in uniq method");
                return;
            }
            let res = [];
            let items = {};
            for (let i = 0; i < array.length; i++) {
                if (!items[JSON.stringify(array[i])]) {
                    res.push(array[i]);
                    items[JSON.stringify(array[i])] = 1;
                }
            }
            return res;
        },
        getSimpleValuesByField:function(array,field){
            if(array instanceof Array == false){
                CommonUtil.throwError("params[array] must be Array in getSimpleValuesByField method");
                return;
            }
            let res = [];
            array.map(function(item){
                res.push(item[field]);
            })
            return res;
        },
        sortByField:function(array,field,desc){
            if(array instanceof Array == false){
                CommonUtil.throwError("params[array] must be Array in sortByField method");
                return;
            }
            if(array.length == 0){
                return array;
            }
            let res = null;
            let tmp = array[0][field];

            //check Date
            if (new Date(tmp) != "Invalid Date") {
                res = _private.sortByDate(array, field, desc);
            } else {
                res = _private.sortByNumAndChar(array, field, desc);
            }
            return res;
        }
    },
    date:{
        date:function(val){
            let d = new Date(val);
            return d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate()
        },
        dateTime:function(val){
            return this.date(val) + " " + this.time(val);
        },
        time:function(val){
            let d = new Date(val);
            let t = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
            return t;
        }
    }
}
export default CommonUtil;
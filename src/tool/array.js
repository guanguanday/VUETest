/**
 * Created by wupeng5 on 2018/1/7.
 */

app.service("ArrayTool", ['CommonUtil',function (CommonUtil) {

    /*
     * Array 操作类
     * 需依赖：CommonUtil工具类
     * */
    var ArrayOperate = function () {

        /**
         *  private methods
         * */
        var _private = {
            /**
             * 获取索引,key为字符串
             * params: array
             * params: string
             * return: Number
             * */
            getIndexByString: function (array, str) {
                var _index = -1;
                for (var i = 0; i < array.length; i++) {
                    if (array[i] == str) {
                        _index = i;
                        break;
                    }
                }
                return _index;
            },
            /**
             * 获取索引,key为对象
             * params: array
             * params: Object
             * return: Number
             * */
            getIndexByObject: function (array, obj) {
                var _index = -1;
                for (var i = 0; i < array.length; i++) {
                    if (CommonUtil.equalsObject(array[i], obj)) {
                        _index = i;
                        break;
                    }
                }
                return _index;
            },
            /**
             * 移除数组里面的一项
             * params:array
             * params:string
             * return new Array
             * */
            removeSingleStr: function (array, str) {
                var _index = this.getIndexByString(array, str);
                if (_index == -1) {
                    return array;
                }
                array.splice(_index, 1);
                return array;
            },
            /**
             * 移除数组里面的一项
             * params:array
             * params:Object
             * return new Array
             * */
            removeSingleObject: function (array, item) {
                var _index = this.getIndexByObject(array, item);
                if (_index == -1) {
                    return array;
                }
                array.splice(_index, 1);
                return array;
            },
            /**
             * sort by date
             * params: array required
             * params: field required
             * params: desc not required
             * return new Array
             * */
            sortByDate:function(array, field, desc){
                var _arr = CommonUtil.deepClone(array);
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
            /**
             * sort by Number and char
             * params: array required
             * params: field required
             * params: desc not required
             * return new Array
             * */
            sortByNumAndChar:function(array, field, desc){
                var _arr = CommonUtil.deepClone(array);
                _arr.sort(function (a, b) {
                    if(desc){
                        return a[field] - b[field];
                    }else{
                        return b[field] - a[field];
                    }
                })
                return _arr;
            }
        }

        /**
         * get index in Array
         * params: array
         * params: Object || string
         * return: Number, -1->not found
         * */
        this.getIndex = function (array, item) {
            if(array instanceof Array == false){
                CommonUtil.throwError("params[array] must be Array in getIndex method");
                return;
            }
            if (typeof item == "object") {
                return _private.getIndexByObject(array, item);
            } else if (typeof item == "string") {
                return _private.getIndexByString(array, item);
            } else {
                return -1;
            }
        }

        /**
         * remove items in Array
         * params: array
         * params: items Array
         * return: new Array
         * */
        this.removeItems = function (array, items) {
            if(array instanceof Array == false){
                CommonUtil.throwError("params[array] must be Array in removeItems method");
                return;
            }
            items.map(function (item) {
                if (typeof item == "object") {
                    _private.removeSingleObject(array, item);
                }
                if (typeof item == "string") {
                    _private.removeSingleStr(array, item);
                }
            })
            return array;
        }

        /**
         * insert item to array
         * params: array
         * params: items Object||String
         * return: bool
         * */
        this.insertItem = function (array, item) {
            if(array instanceof Array == false){
                CommonUtil.throwError("params[array] must be Array in insertItem method");
                return;
            }
            if (this.getIndex(array, item) == -1) {
                array.push(item);
                return true;
            }
            return false;
        }

        /**
         * uniq the array(include Object & String)
         * params: array
         * return: new Array
         * */
        this.uniq = function (array) {
            if(array instanceof Array == false){
                CommonUtil.throwError("params[array] must be Array in uniq method");
                return;
            }
            var res = [];
            var items = {};
            for (var i = 0; i < array.length; i++) {
                if (!items[JSON.stringify(array[i])]) {
                    res.push(array[i]);
                    items[JSON.stringify(array[i])] = 1;
                }
            }
            return res;
        }

        /**
         * get values by field in array
         * params: array
         * params: field
         * return Array
         * */
        this.getSimpleValuesByField = function(array,field){
            if(array instanceof Array == false){
                CommonUtil.throwError("params[array] must be Array in getSimpleValuesByField method");
                return;
            }
            var res = [];
            array.map(function(item){
                res.push(item[field]);
            })
            return res;
        }

        /**
         * sort by field in array
         * params: array required
         * params: field required
         * params: desc not required
         * return new Array
         * */
        this.sortByField = function(array,field,desc){
            if(array instanceof Array == false){
                CommonUtil.throwError("params[array] must be Array in sortByField method");
                return;
            }
            if(array.length == 0){
                return array;
            }
            var res = null;
            var tmp = array[0][field];

            //check Date
            if (new Date(tmp) != "Invalid Date") {
                res = _private.sortByDate(array, field, desc);
            } else {
                res = _private.sortByNumAndChar(array, field, desc);
            }
            return res;
        }
    }

    return new ArrayOperate();
}])
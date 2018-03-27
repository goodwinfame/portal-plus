/**
 * ******** 工具类 ********
 * 
 * @method createNode 将字符串模板转换为node
 * @method getOffsetValue 获取元素距离浏览器窗口的上下边距
 * @method getEditNode 获取html中可编辑的元素，判断条件为是否有rc-key属性
 * @method getQueryString 获取url中的query参数
 * @method addClass 添加元素class
 * @method removeClass 删除元素class
 * @method hasClass 查询元素是否包含某一class
 * @method request ajax请求
 * 
*/

import locale from './locale'

class Utils {
    static templateValuePattern = /<%(.+?)%>/g;
    static createNode(template) {
        /**
         * 将模板按照语言包翻译进行插值
         * 将组件中的字符串模板转换为node元素
        */
        const langPackage = locale[Utils.i18n];
        template = template.replace(Utils.templateValuePattern, function($0, $1){
            return langPackage[$1.replace(/\s/g, '')];
        })

        const WrapperNode = document.createElement('div');
        WrapperNode.innerHTML = template;
        return WrapperNode.firstElementChild;
    }
    static getOffsetValue(obj) {
        /**
         * 通过查找父元素，累积计算边距
        */
        let offsetLeft = obj.offsetLeft;
        let offsetTop = obj.offsetTop;
        let val = obj.offsetParent;
        while(val != null){
            offsetLeft += val.offsetLeft;
            offsetTop += val.offsetTop;
            val = val.offsetParent;
        }
        return {
            offsetLeft,
            offsetTop
        };
    }
    static getEditNode() {
        /**
         * 运算量较大，使用promise 对象返回
        */
        return new Promise((resolve)=>{
            let EditNodes = Array.prototype.slice.call(document.body.querySelectorAll('*:not(script)'));
            resolve(
                EditNodes.filter(node=>{
                    let flag = false;
    
                    for(const i in Object.keys(node.attributes)){
                        if(node.attributes[i].name.indexOf('rc-key') > -1){
                            flag = true;
                            break;
                        }
                    }
                
                    return flag;
                })
            )
        })
    }
    /**
     * 获取url传参
    */
    static getQueryString(name) { 
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
        var r = window.location.search.substr(1).match(reg); 
        if (r != null) return unescape(r[2]); 
        return null; 
    } 
    /**
     * 操作class
    */
    static addClass( elements,cName ){ 
        if( !Utils.hasClass( elements,cName ) ){ 
            elements.className += " " + cName; 
        }; 
    }; 
    static removeClass( elements,cName ){ 
        if( Utils.hasClass( elements,cName ) ){ 
            elements.className = elements.className.replace( new RegExp( "(\\s|^)" + cName + "(\\s|$)" ), " " );
        }; 
    };
    static hasClass( elements,cName ){ 
        return !!elements.className.match( new RegExp( "(\\s|^)" + cName + "(\\s|$)") ); 
    }; 
    /**
     * AJAX请求
     * @param method 请求方法：GET,POST,PUT,DELETE,UPLOAD
     * @param url API接口
     * @param data<Object> 发送数据对象
     * @param headers 请求头 
    */
    static request({
        method = 'GET',
        url,
        data,
        headers = {}
    }) {
        return new Promise((resolve, reject)=>{

            if(Utils.token){
                headers['X-Auth-Token'] = Utils.token;
            }

            method = method.toUpperCase();

            let formData;
            
            if(method === 'UPLOAD') {
                /**
                 * 当请求方法为上传时
                 * 构建表单对象
                */
                method = 'POST';
                formData = new FormData();
                for(const i in data){
                    formData.append(i, data[i]);
                }
            } else if (method === 'POST' || method === 'PUT') {
                /**
                 * 当请求方法为post或put时
                 * 构建json对象
                */
                headers['Content-type'] = "application/json";
                formData = JSON.stringify(data || '');

            }


            let xhr;

            if(window.XMLHttpRequest)
            {
                xhr = new window.XMLHttpRequest();
            }
            else
            {
                xhr = new window.ActiveXObject("Microsoft.XMLHTTP");//IE6浏览器创建ajax对象
            }


            xhr.open(method, `${Utils.publicPath}${url}`, true);

            xhr.withCredentials = true

            for(const h in headers){
                xhr.setRequestHeader(h, headers[h]);
            }
            
            xhr.send(formData);
            
            xhr.onreadystatechange=function()
            {
                if(xhr.readyState === 4)
                {
                    try {
                        const jsonData = JSON.parse(xhr.responseText);
                        resolve(jsonData);
                    } catch (error) {
                        reject(error)
                    }
                }
            };
        })
    }
}

export default Utils;
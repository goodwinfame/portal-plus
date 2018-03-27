import Modal from './Modal';
import Utils from '../utils';
import styles from '../index.less'
import FormItems from '../formItems'

class Component {
    constructor(node){
        this.renderTimer = null;
        if(node){
            this.$node = node;
            //读取并保存rc属性
            this.$rcFields = this.readRcAttr();
            
            //设置编辑模板
            this.$template = (
                `<div class="${styles.EditWrapper}"><i rc-event-src="${Object.keys(this.$rcFields).join()}" class="${styles.iconfont} ${styles['icon-edit']} ${styles.ControlBtn}"></i></div>`
            );

            //窗口大小调整后，重新渲染编辑框大小及位置
             window.addEventListener('resize', this.windowResize);
            //挂载
            this.mount();
        }
        /**
         * 子组件有弹窗内容（可以进行编辑操作）
         * 则做弹窗初始化
        */
        this.$modal = new Modal(this);

        //监听点击事件，这里主要处理点击编辑按钮后的弹窗操作
        this.$body.addEventListener('click', this.onClick.bind(this));

        
    }
    readRcAttr(){
        /**
         * 读取rc属性
         * 转换为对象
        */
        const RcFields = {};
        for(const i in Object.keys(this.$node.attributes)){
            const attrName = this.$node.attributes[i].name;
            if(attrName.indexOf('rc-') > -1){
                const rc = attrName.split('-');
                const type = rc[1], key = rc[2], value = this.$node.attributes[i].value;
                RcFields[key] = {
                    ...(RcFields[key] || {}),
                    ...(type === 'key'?{key, value}:{[type]: value})
                }

            }
        }
        return RcFields
       
    }
    getRcFormItems(){
        /**
         * 过滤不存在的表单类型
         * 将rc属性构造为表单对象集合
        */
        return Object.keys(this.$rcFields || {}).filter(key=>FormItems[this.$rcFields[key].type])
                    .map(key=>new FormItems[this.$rcFields[key].type]({...this.$rcFields[key]}))
    }
    /**
     * 窗口变动则重新渲染各组件编辑框大小
    */
    windowResize = () => {
        this.render();
    }
    onClick(e) {
        /**
         * 组件元素绑定点击事件，判断点击事件源的类型是否为当前实例所触发
         * rc-event-src值为rc-key值
        */
        if(e.target.attributes['rc-event-src'] && e.target.attributes['rc-event-src'].value === Object.keys(this.$rcFields).join()){
           
            this.$modal.open();
        }
    }
    
    mount(){
        /**
         * 解析模板并挂载元素
         * 将编辑框等元素挂载到body下，避免放在表单元素下可能有遮挡问题。
        */
        this.$el = Utils.createNode(this.$template);
        this.$body.appendChild(this.$el);
    }
  
    saved(formFields){
        console.log(formFields, this.$rcFields)
        /**
         * ***************请求示例*****************
         * 
         * *****获取******
         * 
         * Utils.request({
         *   'url': '/account/sessions/logon',
         * })
         * .then(data=>console.log(data))
         * 
         * *****提交*****
         * 
         * Utils.request({
         *   'method': 'POST',
         *   'url': '/account/sessions/logon',
         *   'data': formFields
         * })
         * .then(data=>console.log(data))
         * 
         * *****上传*****
         * Utils.request({
         *   'method': 'UPLOAD',
         *   'url': '/cloud/v1/portal/757/property',
         *   'data': formFields
         * })
         * .then(data=>console.log(data))
         * *****
        **/
       

        
        
    }
    closed(){

    }
    render(){
        if(this.$el){

            if(this.renderTimer){
                this.renderTimer = window.clearTimeout(this.renderTimer);
            }

            this.renderTimer =  window.setTimeout(()=>{
                this.$el.style.height = this.$node.clientHeight + 'px';
                this.$el.style.width = this.$node.clientWidth + 'px';
                const offsetValue = Utils.getOffsetValue(this.$node);
                this.$el.style.top = offsetValue.offsetTop + 'px';
                this.$el.style.left = offsetValue.offsetLeft + 'px';
                this.renderTimer = null;
            }, 10)
           
        }
        
        return null;
    }
    
   
}

export default Component;
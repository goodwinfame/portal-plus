import Utils from '../utils';

class FormItem {
    getFormItem(){
        /**
         * 获取表单node，包含label和input
         * 绑定表单控件change事件
         * 缓存node
        */
        if(!this.$el){
            this.$el = Utils.createNode(this.$template);
            this.getFieldTouchedItem().onchange = this.onFieldChange.bind(this);
        }
       
        return this.$el;
    }
    getFieldTouchedItem(){
        /**
         * 获取表单控件
        */
        return this.$el.querySelector('[name]');
    }
    getField() {
        /**
         * 返回表单值对象
        */
        const fieldItem = this.getFieldTouchedItem();
        return {
            [fieldItem.attributes['name'].value]: this.getFieldValue()
        }
    }
    getFieldValue() {
        /**
         * 返回表单值
         * 默认返回value
         * file类型可能要返回files
         */
        return this.getFieldTouchedItem().value;
    }
    onFieldChange(e) {
        /**
         * 表单控件onchange事件
         * 主要用于image组件展示预览图
         */
        
        
        console.log(e)
    }
   
}

export default FormItem;
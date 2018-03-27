import FormItem from './FormItem';
import styles from '../index.less'
import Utils from '../utils';

class Switch extends FormItem {
    
    constructor(field){
        //接受当前域值
        super(field);
        this.$field = field;
        //设置弹窗模板
        this.$template = (
            `<div class="${styles.FormItem}">
                <label>
                    ${this.$field.desc}
                    <br >
                    <span name="${this.$field.key}" id="${this.$field.key}" class="${styles.Switch} ${field.value == 1 && 'checked'}">
                        <span class="${styles.SwitchInner}"></span>
                    </span>
                </lablel>
                
            </div>`
        )
    }
    getFieldValue() {
        /**
         * 返回表单值
         * 默认返回value
         * file类型可能要返回files
         */
        return this.$field.value;
    }
    getFormItem(){
        /**
         * 获取表单node，包含label和input
         * 绑定表单控件change事件
         * 缓存node
        */
        if(!this.$el){
            this.$el = Utils.createNode(this.$template);
            this.$el.querySelector(`#${this.$field.key}`).onclick = this.onClick.bind(this);
        }
       
        return this.$el;
    }
    onClick(){
        const switchBtn = this.$el.querySelector(`#${this.$field.key}`);
        if(this.$field.value == '1'){
            this.$field.value = '0';
            Utils.removeClass(switchBtn, 'checked')
            
        } else {
            this.$field.value = '1';
            Utils.addClass(switchBtn, 'checked')
        }
    }
}

export default Switch;
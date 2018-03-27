import FormItem from './FormItem';
import styles from '../index.less'

class Text extends FormItem {
    
    constructor(field){
        //接受当前域值
        super(field);
        this.$field = field;
        //设置弹窗模板
        this.$template = (
            `<div class="${styles.FormItem}">
                <label>
                    ${this.$field.desc}
                    <input name="${this.$field.key}" value="${this.$field.value}">
                </lablel>
                
            </div>`
        )
    }
}

export default Text;
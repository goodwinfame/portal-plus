import FormItem from './FormItem';
import styles from '../index.less'

class Textarea extends FormItem {
    constructor(field){
        //接受当前域值
        super(field);
        this.$field = field;
        //设置弹窗模板
        this.$template = (
            `<div class="${styles.FormItem}">
                <label>
                    ${this.$field.desc}
                    <textarea name="${this.$field.key}" rows="4">${this.$field.value}</textarea>
                </lablel>
                
            </div>`
        )
    }
    
}

export default Textarea;
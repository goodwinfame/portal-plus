import FormItem from './FormItem';
import styles from '../index.less';

class Upload extends FormItem {
    
    constructor(field){
        super(field);
        this.$field = field;
        //设置弹窗模板
        this.$template = (
            `<div class="${styles.FormItem} ${styles.ImageFormItem}">
                <label>
                    <h4>${this.$field.desc}</h4>
                    <div id="${this.$field.key}" class=${styles.ImagePreview} style="background-image: url(${this.$field.value})">
                        <i class="${styles.iconfont} ${styles['icon-shangchuan']} ${styles.UploadBtn}"> </i>
                    </div>
                    
                    <input style="display: none" type="file" name="${this.$field.key}" value="${this.$field.value}">
                </lablel>
                
            </div>`
        )

    }
    /**
     * 重写方法
    */
    onFieldChange(e){
        /**
         * 此处绑定了modal作用域，
         * 通过$node修改弹窗中的预览图
        */
        const fileUrl = window.URL.createObjectURL(e.target.files[0]);
        console.log(fileUrl);
        this.getFormItem().querySelector(`#${this.$field.key}`).style.backgroundImage = `url(${fileUrl})`;
    }
    /**
     * 重写方法
    */
    getFieldValue(formItem) {
       
        return this.getFieldTouchedItem().files[0];
    }
    
}

export default Upload;
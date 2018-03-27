import styles from '../index.less';
import Utils from '../utils';


class Modal{
    constructor(component){
        /**
         * 接受源组件对象
        */
        this.$srcCompnent = component;

        this.$body = document.querySelector("body");

        /**
         * 弹窗模板
         * 渲染源组件中的弹窗内容
        */
        this.$template = (
            `<div class="${styles.ModalWrapper}">
                <div class="${styles.Modal}">
                    <form id="modalFields">
                        
                        <div class="${styles.ModalHead}">
                            <h4><% config %></h4>
                            <span id="close">×</span>
                        </div>
                        <div id="modalContent" class="${styles.ModalContent}">
                        /**
                         * 此处填充表单内容
                        */
                        </div>
                        <div class="${styles.ModalFoot}">
                            <input id="ok" type="submit" value="<% ok %>">
                            <input id="cancel" type="button" value="<% cancel %>">
                        </div>
                    </form>
                </div>
            </div>`
        );

        //解析弹窗模板
        this.$el = Utils.createNode(this.$template);

        //绑定关闭事件
        this.$el.querySelectorAll('#cancel, #close').forEach(target=>{
            target.onclick = this.close.bind(this);
        });

        //绑定成功事件
        this.$el.querySelectorAll('#ok').forEach(target=>{
            target.onclick = this.ok.bind(this);
        });
    }
    ok(e, a) {
        e.preventDefault();
        console.log('ok');
        /**
         * 读取表单控件值，并存入field对象
         * 回调源组件保存成功钩子方法
         * 关闭弹窗
         */
        let formFields = {};
        this.modalFormItems.forEach(item=>{
            formFields = {
                ...formFields,
                ...item.getField()
            };
        })
        this.$srcCompnent.saved(formFields);
        this.close();
    }
    open = () => {
        console.log('open');
        
        /**
         * 打开弹窗后开始获取表单集合
         * 并挂载到弹窗content元素中
         * 
        */
        const modalContent = this.$el.querySelector('#modalContent');
        modalContent.innerHTML = "";
       
        this.modalFormItems = this.$srcCompnent.getRcFormItems();
        this.modalFormItems.forEach(item=>{
            modalContent.appendChild(item.getFormItem())
        })

        //挂载弹窗，打开
        this.$body.appendChild(this.$el);
        
    }
    close() {
        console.log('close');
        //移除弹窗，关闭
        this.$body.removeChild(this.$el);
        this.$srcCompnent.closed();
    }
}

export default Modal
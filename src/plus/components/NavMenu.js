import Component from './Component';
import Utils from '../utils';
import styles from '../index.less'

class NavMenu extends Component {
    
    constructor(){
        super();
        const pages = this.$portal.pages.map(page=>{
            return {
                ...page,
                url: `${this.$publicPath}${this.$portal.portal_uri}/${page.page_id}.php${window.location.search}`
            }
        })
        this.$template = (
            `<ul class="${styles.NavWrapper}">
                <li key="global" rc-event-src="authCenter"><% authCenter %></li>
                ${
                    pages.map(page=>`<li key="${page.page_id}"><a href="${page.url}">${page.page_name}</a></li>`).join('')
                }
            </ul>`
        );

        // this.mount();

    }
    async onClick(e) {
        /**
         * 组件元素绑定点击事件，判断点击事件源的类型是否为当前实例所触发
         * rc-event-src值为rc-key值
        */
        if(e.target.attributes['rc-event-src'] && e.target.attributes['rc-event-src'].value === 'authCenter'){
            const data = await Utils.request({
                url: `/cloud/v1/portal/${this.$portalId}/property?language=${this.$i18n}&module=index`
            });

            /**
             * 获取全局配置
             * 构造全局配置对象
            */
            this.$rcFields = {
                center: {
                    key: 'center',
                    desc: '平台URL',
                    value: 'https://XXX.XXXX.XXX',
                    type: 'text'
            
                }
            }
            
            this.$modal.open();
        }
    }
    
    
    
}

export default NavMenu;
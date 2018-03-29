import { NavMenu, Component } from './components';
import Utils from './utils';


class PortalPlus {

    /**************************实例化参数*************************
     * @param publicPath <String> 接口url
     * @param token <String> 接口token
     * @param i18n <String> 国际化，语言类型，默认浏览器语言
     * @param editLevel <Number> 组件可编辑类型，0: 不可编辑, 1: 全平台可编辑, 2: ACS可编辑， 3: APP可编辑
     * @param portalId <Number> portal Id
     * 
     **********************组件DOM自定义属性***********************
     * @attribute rc-module 模块名
     * @attribute rc-key-* 字段名，星号代表接口字段名，属性值为该字段默认值
     * @attribute rc-desc-* 显示名，展示名称，星号代表接口字段名，属性值为展示名称，由页面渲染端做国际化
     * @attribute rc-option-* <Array[Object]>选项, {key,value}集合。字符串。
     * @attribute rc-level(-*) <Array[int]>组件可编辑等级，约定权限等级，1: 全平台, 2: ACS, 3: APP，星号代表字段名，可约束单独的字段
     * @attribute rc-event-src 事件源，用于区分事件操作类型， 为rc-key集合组成
     * 
     *
     ************************************************************/

    constructor({publicPath, token, i18n, editLevel = 1, portalId} = {}){
        /**
         * 初始化参数
         * 以下参数在PortalPlus，component中均可访问
         * PortalPlus为单例模式
        */
        if(!PortalPlus.instance){
            this.$publicPath = Utils.publicPath = Component.prototype.$publicPath = publicPath || window.location.origin;
            this.$token = Utils.token = Component.prototype.$token = token || Utils.getQueryString('token');
            this.$i18n = Utils.i18n = Component.prototype.$i18n = i18n || Utils.getQueryString('language') ||  window.navigator.language.replace(/-/gi, '_') || 'zh_CN';
            this.$editLevel = Component.prototype.$editLevel = editLevel || Utils.getQueryString('editLevel') || 1;
            this.$portalId =  Component.prototype.$portalId = portalId || Utils.getQueryString('editLevel');
            this.$body = Component.prototype.$body = document.querySelector('body');
            this.$currentPage = Component.prototype.$currentPage = window.location.pathname.split('.')[0].split('/').pop();
            this.$components = []; //所有component实例
            /**
             * 如果当前可编辑等级为0，则不做操作
            */
            if(this.$editLevel === 0) return;

            this.$plusContainer = Component.prototype.$plusContainer = document.createElement('div');
            this.$body.appendChild(this.$plusContainer);
            
            /**
             * 获取portal实例信息
             * 添加底部按钮
            */
            Utils.request({
                url: `/cloud/v1/portal/${this.$portalId}?language=${this.$i18n}`
            })
            .then(data=>{
                if(data.ret_code === 10000 && data.data){
                    this.$portal = Component.prototype.$portal = data.data;
                    new NavMenu().mount();
                }
                
            })
            

            /**
             * 获取可编辑节点
             * 挂载可编辑组件
            */
            Utils.getEditNode()
                .then(nodes=>{
                    nodes.forEach(node=>{
                        //当组件rc-level（可编辑权限等级）属性存在，并且包含当前PortalPlus权限等级时，组件方可编辑
                        if((node.attributes['rc-level'] && node.attributes['rc-level'].value.indexOf(this.$editLevel) < 0)){
                            return;
                        }
                        /**
                         * 注册component
                         * 实例化component时传入可编辑节点及事件回调
                         * */
                        this.$components.push(new Component(node, this.subsriber).render())
                        
                    })
            
                })

                PortalPlus.instance = this;
        }

        return PortalPlus.instance;
        
    }
    subsriber = (event, source) => {
        //如果事件为渲染所有组件，则重新渲染所有组件
        if(event === 'renderAllComponents'){
            this.$components.forEach(component=>{
                component.render();
            })
        }
    }
    
    
  
}

window.PortalPlus = PortalPlus;

export default PortalPlus;
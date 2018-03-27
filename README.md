# portal-plus
#### Read html attributes to generates edit form
-----
通过解析html 标签上的rc属性来生成可编辑项      
允许多种表单类型的提交     


-----
#### 开发&生产
`npm install` 安装  
`npm run dev` 开发      
`npm run build` 生产      


#### 使用
生产后会在dist目录下生成portalPlus.js文件；           
在html页面上引用该文件；        
在需要进行编辑的标签上添加rc属性（具体属性参考源代注释）；        
`new PortalPlus()` 实例化后即可解析html；      

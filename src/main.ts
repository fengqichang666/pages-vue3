/*
 * @Author: feng
 * @Date: 2022-10-09 20:39:57
 * @LastEditTime: 2022-10-09 21:04:22
 * @Description: file content
 */
import { createApp } from 'vue'
import './style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    // 与菜单组件重名
    if(key==='Menu'){
        app.component('icon-menu', component)
    }else{
        app.component(key, component)
    }
}
app.use(ElementPlus)
app.use( router)
app.mount('#app')

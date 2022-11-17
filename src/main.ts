/*
 * @Author: feng
 * @Date: 2022-10-09 20:39:57
 * @LastEditTime: 2022-11-16 21:22:25
 * @Description: file content
 */
import { createApp } from 'vue'
import './style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import { createPinia } from 'pinia'
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
app.use(createPinia())
app.use( router)
app.mount('#app')

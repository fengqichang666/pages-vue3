/*
 * @Author: feng
 * @Date: 2022-09-28 14:59:54
 * @LastEditTime: 2022-11-16 20:54:33
 * @Description: file content
 */
//引入路由对象
import { createRouter, createWebHistory, createWebHashHistory, createMemoryHistory, RouteRecordRaw } from 'vue-router'

//vue2 mode history vue3 createWebHistory
//vue2 mode  hash  vue3  createWebHashHistory
//vue2 mode abstact vue3  createMemoryHistory

//路由数组的类型 RouteRecordRaw
// 定义一些路由
// 每个路由都需要映射到一个组件。
const routes: Array<RouteRecordRaw> = [{
    path: '/',
    redirect: '/home/okr',
    component: () => import('@/pages/layout.vue'),
    children: [
        {
            path: '/home/okr',
            component: () => import('@/pages/okr/index.vue')
        }, {
            path: '/home/todolist',
            component: () => import('@/pages/todolist/index.vue')
        }, {
            path: '/home/notepad',
            component: () => import('@/pages/notepad/index.vue')
        }
    ]
}, {
    path: '/map',
    component: () => import('@/pages/epidemicMap/index.vue')
},
{
    path: '/:pathMatch(.*)',
    component: () => import('@/pages/404/404.vue')
}

]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
//导出router
export default router
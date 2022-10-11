/*
 * @Author: feng
 * @Date: 2022-10-09 20:39:57
 * @LastEditTime: 2022-10-10 11:07:22
 * @Description: file content
 */
import { defineConfig,ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// 找不到模块“path”或其相应的类型声明 或者 找不到名称“__dirname 安装 @types/node
import path from 'path';

const resolve = (dir: string) => path.resolve(__dirname, dir)
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv) => {
    return {
        resolve: {
            alias: {
                '@': resolve('src') // 配置别名
            }
        },
        server: {
            open: true,
            host: '0.0.0.0' //ip地址
        },
        plugins: [
            vue(),
            AutoImport({
                resolvers: [ElementPlusResolver()],
                imports: ['vue', 'vue-router'],
                dts: "src/auto-import.d.ts"
            }),
            Components({
                resolvers: [ElementPlusResolver()]
            })
        ],
        base: command === 'build' ? '/fast-page/' : '/'
    }
})

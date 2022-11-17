/*
 * @Author: feng
 * @Date: 2022-10-09 20:39:57
 * @LastEditTime: 2022-11-16 20:47:45
 * @Description: file content
 */
import { defineConfig, ConfigEnv } from 'vite'
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
        base: command === 'build' ? '/fast-page/' : '/',
        build: {
            rollupOptions: {
                output: {
                    chunkFileNames: 'static/js/[name]-[hash].js',
                    entryFileNames: 'static/js/[name]-[hash].js',
                    assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
                    manualChunks(id) { //静态资源分拆打包
                        if (id.includes('node_modules')) {
                            return id.toString().split('node_modules/')[1].split('/')[0].toString();
                        }
                    }
                }
            }
        }
    }
})

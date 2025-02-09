import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({

    // Vite 中 base 配置项的默认值是 /。
    // 这意味着，如果你没有显式设置 base，Vite 会默认将所有静态资源的路径当作相对于网站根目录 / 来处理。
    // 会影响到所有硬编码的路径。而像变量动态绑定的路径，不会受影响。
    base: '/code2word/',
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    build: {
        minify: 'terser', // 使用 Terser 进行更好的代码压缩
        terserOptions: {
            compress: {
                //drop_console: true, // 删除所有 console.* 语句
                drop_debugger: true, // 删除 debugger
                //pure_funcs: ['console.log'], // 删除 console.log 调用
            },
        },
        chunkSizeWarningLimit: 500 // 避免打包时警告
    }
})

import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({

    // Vite 中 base 配置项的默认值是 /。
    // 这意味着，如果你没有显式设置 base，Vite 会默认将所有静态资源的路径当作相对于网站根目录 / 来处理。
    base: '/code2word/',
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})

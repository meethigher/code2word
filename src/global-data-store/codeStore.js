// src/stores/codeStore.js
import {defineStore} from 'pinia'

export const useCodeStore = defineStore('code', {
    state: () => ({
        detectedLanguage: '未识别',
        rawCode: '',    // 原始代码（输入区）
        emitCode:'', // 高亮按钮传递的数据
        highlightedCode: '', // 高亮后的代码（预览区）
        outside: false // 序号是否展示在外侧。word只支持内侧
    }),
    actions: {
        // 更新输入的代码
        setRawCode(code) {
            this.rawCode = code
        },
        // 更新高亮代码（这里可以集成 highlight.js 进行高亮处理）
        setHighlightCode(code) {
            this.highlightedCode = code;
        }
    }
})

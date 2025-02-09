<template>
  <div class="control-panel">
    <button @click="highlightCode">高亮</button>
    <button @click="copyCode" v-show="false">复制</button>
    <button @click="jsObfuscator">JS混淆</button>
    <button @click="toggleOutside">{{ codeStore.outside ? '外部序号' : '内部序号' }}</button>
    <button @click="copyDesc">复制说明</button>
  </div>
</template>

<script setup>
import {useCodeStore} from '@/global-data-store/codeStore'
import {Utils} from "@/utils/utils";
import {obfuscate} from 'javascript-obfuscator';

const codeStore = useCodeStore()

function jsObfuscator() {
  let rawCode = codeStore.rawCode;
  if (rawCode) {
    codeStore.rawCode = obfuscate(
        rawCode,
        {
          compact: true,                      // 紧凑模式，移除多余空格和换行符
          controlFlowFlattening: true,       // 启用控制流平坦化（极大增强混淆程度）
          controlFlowFlatteningThreshold: 1, // 100% 启用控制流平坦化
          numbersToExpressions: true,        // 将数字转换为复杂表达式
          simplify: false,                    // 关闭代码简化优化
          stringArrayShuffle: true,          // 乱序字符串数组，提高混淆效果
          splitStrings: true,                 // 拆分字符串
          stringArrayThreshold: 1            // 100% 的字符串都进行混淆
        }
    ).getObfuscatedCode();
  } else {
    alert("请先输入内容");
  }
}

const highlightCode = () => {
  if (!codeStore.rawCode) {
    alert("请先输入内容");
  } else {
    codeStore.emitCode = codeStore.rawCode;
  }
};
const toggleOutside = () => {
  codeStore.outside = !codeStore.outside;
  codeStore.emitCode = '';
  alert("已切换为" + (codeStore.outside ? "外部序号" : "内部序号") + ", 点击高亮按钮，即可重新渲染");
}
const copyDesc = async () => {
  Utils.usage();
};
const copyCode = async () => {
  try {
    let html = codeStore.highlightedCode;
    alert(html);
    /**
     * 剪切板一次复制可以支持多种格式
     * 如果想要查看对应格式的内容，可以使用工具[CopyQ](https://github.com/hluk/CopyQ)
     */
    await navigator.clipboard.write([
      new ClipboardItem({
        "text/html": new Blob([html], {type: "text/html"}),
        "text/plain": new Blob([html], {type: "text/plain"}),
      }),
    ]);
    alert("成功");
  } catch (err) {
    alert("失败！请手动复制！");
  }
};
</script>

<style scoped>
.control-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  background: darkgrey;
  color: white;
  width: 150px;
  justify-content: center;
}

button {
  margin: 5px 0;
  padding: 5px;
  font-size: 14px;
}
</style>

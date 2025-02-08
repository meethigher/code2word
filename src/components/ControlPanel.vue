<template>
  <div class="control-panel">
    <button @click="highlightCode">高亮</button>
    <button @click="toggleOutside">{{ codeStore.outside ? '外部序号' : '内部序号' }}</button>
    <button @click="copyCode" v-show="false">复制</button>
    <button @click="copyDesc">复制说明</button>
  </div>
</template>

<script setup>
import {useCodeStore} from '@/global-data-store/codeStore'

const codeStore = useCodeStore()

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
  alert("1. 复制高亮输出区的代码，然后保留原格式粘贴至Word\n" +
      "2. Word支持内部序号，并不支持外部序号\n" +
      "3. Word中可鼠标右键-调整列表缩进，进行布局美化\n")
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

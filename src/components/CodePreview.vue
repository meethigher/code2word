<template>
  <div class="preview-container">
    <!-- 代码高亮显示区域 -->
    <div class="title">
      <div class="font-size-controls">
        <button @click="decreaseFontSize">-</button>
        <span>{{ fontSize }}px</span>
        <button @click="increaseFontSize">+</button>
      </div>
      高亮输出区
      <div class="detected-language">语言: {{ codeStore.detectedLanguage }}</div>
    </div>
    <pre><code ref="codeBlock">{{ code }}</code></pre>
  </div>
</template>

<script setup>
import {useCodeStore} from '@/global-data-store/codeStore'
import {ref, watch, onMounted} from 'vue';
import {hljs} from '@/assets/highlight/highlight.min.js';

const codeStore = useCodeStore()

const code = ref('');
const codeBlock = ref(null);
const fontSize = ref(12); // 初始字体大小

const olId="renderedHighlightCode";

// 定义处理高亮代码并添加 ol 列表的方法
const renderHighlightCodeAndCreateOl = () => {
  if(codeStore.emitCode) {
    // 使用 hljs 进行高亮处理
    const result = hljs.highlightAuto(codeStore.emitCode); // 获取代码文本内容
    const highlightedCode = result.value;
    codeStore.detectedLanguage = result.language || "未识别";


    // 判断是否存在旧的渲染代码。
    let codeElement = document.getElementById(olId);
    if (codeElement) {
      codeElement.remove();
    }

    const ol = document.createElement('ol');
    ol.id = 'renderedHighlightCode';
    if(codeStore.outside) {
      ol.style="list-style: decimal;font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;margin: 10px 10px 10px 4em !important;";
    }else {
      ol.style="list-style: decimal;font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;margin: 10px 0 !important;";
    }
    ol.style.fontSize = fontSize.value + "px";
    // 将每一行代码分割成数组
    const lines = highlightedCode.split('\n');
    // 遍历每一行，创建 li 标签并添加到 ol 中
    let index = 1;
    lines.forEach(line => {
      const li = document.createElement('li');
      if(codeStore.outside) {
        li.style = "font-family: monospace;white-space: pre-wrap;word-wrap: break-word;border-right: 4px solid #87CEEB;border-left: 4px solid #87CEEB;list-style: decimal-leading-zero;list-style-position: outside !important;padding: 0 4px 0 4px !important;" + (index++ % 2 == 0 ? "background-color: #F6F9FB;" : "background-color: #FDFDFD;");
      }else {
        li.style = "font-family: monospace;white-space: pre-wrap;word-wrap: break-word;border-right: 4px solid #87CEEB;border-left: 4px solid #87CEEB;list-style: decimal-leading-zero;list-style-position: inside !important;padding: 0 4px 0 4px !important;" + (index++ % 2 == 0 ? "background-color: #F6F9FB;" : "background-color: #FDFDFD;");
      }
      li.innerHTML = line;  // 设置高亮代码为 li 的内容
      ol.appendChild(li);    // 将 li 添加到 ol 中
    });

    // 清空原有的 codeBlock 内容并插入新的 ol
    codeBlock.value.innerHTML = ''; // 清空原本的内容
    codeBlock.value.parentNode.appendChild(ol);

    updateHighlightCode();
  }else {
    codeStore.detectedLanguage = "未识别";


    // 判断是否存在旧的渲染代码。
    let codeElement = document.getElementById(olId);
    if (codeElement) {
      codeElement.remove();
    }
  }
};

const updateHighlightCode = () => {
  codeStore.highlightedCode = document.getElementById(olId).outerHTML;
}

onMounted(() => {

});

// 监听 highlightedCode 的变化，触发 applyHighlight 方法
watch(() => codeStore.emitCode, () => {
  renderHighlightCodeAndCreateOl()
})
// 字体大小调整方法
const increaseFontSize = () => {
  if (fontSize.value < 40) {
    fontSize.value += 2; // 最大为30px
    document.getElementById(olId).style.fontSize = (fontSize.value + "px");
    updateHighlightCode();
  }
};

const decreaseFontSize = () => {
  if (fontSize.value > 12) {
    fontSize.value -= 2; // 最小为10px
    document.getElementById(olId).style.fontSize = (fontSize.value + "px")
    updateHighlightCode();
  }
};
</script>

<style>
@import '../assets/highlight/hightlight-theme-github.min.css';
</style>

<style scoped>
.preview-container {
  flex: 1;
  padding: 10px;
  color: white;
  overflow: auto;
}

pre {
  width: 100%;
  height: 100%;
  color: #000;
  font-family: monospace;
  background-color: #fff;
  border: 1px solid #000;
  font-size: 12px;
  overflow-y: auto;
}

.detected-language {
  display: flex;
  align-items: center;
  position: absolute;
  right: 0;
  top: 0;
  margin-bottom: 10px;
}

.font-size-controls {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  position: absolute;
}

.font-size-controls button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 1px 6px;
  cursor: pointer;
}

.font-size-controls button:hover {
  background-color: #45a049;
}
</style>


<!--

/*
以下ol、li相关的样式，都转换成内联样式。方便代码复制内容时，直接复制到内联的代码。
即使不使用内联样式写法，使用浏览器手动复制时，也会自动转换为内联样式。之所以这么做只是为了方便代码复制。
*/
<style>
ol {
  list-style: decimal;
  font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
  margin: 10px 10px 10px 4em !important;
}

ol li {
  font-family: monospace;
  white-space: pre-wrap; /* 让文本换行 */
  word-wrap: break-word; /* 自动换行，防止溢出 */
  border-right: 4px solid #87CEEB;
  border-left: 4px solid #87CEEB;
  list-style: decimal-leading-zero;
  list-style-position: outside !important;
  padding: 0 4px 0 4px !important;
}


/* 设置偶数行样式 */
li:nth-child(even) {
  background-color: #F6F9FB;
}

/* 设置奇数行样式 */
li:nth-child(odd) {
  background-color: #FDFDFD;
}

</style>
-->

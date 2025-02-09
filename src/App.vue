<template>
  <div class="app-container">
    <NavBar/>
    <div class="main-content">
      <CodeEditor @updateCode="code = $event"/>
      <ControlPanel @changeLang="selectedLang = $event" @highlight="highlight = !highlight"/>
      <CodePreview :code="code" :lang="selectedLang" :highlight="highlight"/>
    </div>

    <!-- 弹窗提示 -->
    <div v-if="showWarning" class="overlay">
      <div class="modal">
        <p>请使用 PC 访问，以获得最佳体验！</p>
        <button @click="redirectToPC">知道了</button>
<!--        <button @click="showWarning = false">知道了</button>-->
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, onUnmounted} from 'vue';
import NavBar from './components/NavBar.vue';
import CodeEditor from './components/CodeEditor.vue';
import ControlPanel from './components/ControlPanel.vue';
import CodePreview from './components/CodePreview.vue';
import {Utils} from "./utils/utils";

const code = ref('');
const selectedLang = ref('javascript');
const highlight = ref(true);
const showWarning = ref(false);

// 检查窗口大小
const checkWindowSize = () => {
  showWarning.value = window.innerWidth < 1024; // 小于1024px时显示警告
};

// 监听窗口变化
onMounted(() => {
  checkWindowSize();
  window.addEventListener('resize', checkWindowSize);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkWindowSize);
});

const redirectToPC = () => {
  window.location.href = Utils.home; // 替换为你想跳转的网址
};

Utils.printProjectInfo();
Utils.printAttention();

</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.main-content {
  display: flex;
  flex: 1;
  height: 100vh;
  padding-top: 50px;
}

/* 弹窗样式 */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #13172f;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.modal button {
  margin-top: 10px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
}

</style>

<template>
  <div class="editor-container">
    <div class="title">代码输入区</div>
    <textarea v-model="codeStore.rawCode" ></textarea>
  </div>
</template>

<script setup>
import { useCodeStore } from '@/global-data-store/codeStore';

import { ref } from 'vue'

const codeStore = useCodeStore()
</script>

<style scoped>
.editor-container {
  flex: 1;
  padding: 10px;
  color: white;
  overflow: auto;
}

textarea {
  padding: 10px 20px;
  width: 100%;
  height: 100%;
  font-family: monospace;
  font-size: 16px;
  font-weight: bolder;
  resize: none;
  overflow-y: auto;
}
</style>

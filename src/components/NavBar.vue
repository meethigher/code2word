<template>
  <nav class="navbar">
    <div class="logo-container">
      <img :src="logo" alt="Logo" class="logo"/>
      <h1>Code2Word - 让高亮的代码完美呈现至 Word</h1>
    </div>
    <div class="nav-links">
      <a href="https://meethigher.top" class="link">主页</a>
      <a href="https://meethigher.top/blog" class="link">博客</a>
      <a href="https://github.com/meethigher" target="_blank" class="link">GitHub</a>
    </div>
  </nav>
</template>

<script setup>
import logo from '@/assets/logo.svg'; // 导入 SVG 文件
</script>

<style scoped>
.navbar {
  height: 50px;
  background-color: #333;
  color: white;
  display: flex;
  justify-content: space-between; /* 两端对齐 */
  align-items: center;
  padding: 0 20px;
  position: fixed;
  top: 0;
  width: 100vw;
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

.nav-links {
  display: flex;
  gap: 15px; /* 设置链接间距 */
}

.link {
  color: white;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s;
}

.link:hover {
  color: #ffd700; /* 鼠标悬停变色 */
}
</style>

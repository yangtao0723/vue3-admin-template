<template>
  <div class="navbar">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/">promotion management</a>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script lang="ts" setup></script>
<style scoped lang="scss">
.navbar {
  height: 50px;
  background: #fff;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 18px;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  background: #fff;
  -webkit-box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}
</style>

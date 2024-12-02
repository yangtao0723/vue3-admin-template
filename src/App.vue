<template>
  <router-view
    v-slot="{ Component }"
    style="height: 100%; width: 100%">
    <!-- 使用 keep-alive 缓存组件 -->
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>
<script setup lang="ts"></script>
<style lang="scss">
@use '@/assets/style/init.scss';
</style>

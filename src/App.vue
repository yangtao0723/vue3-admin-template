<template>
  <router-view
    v-slot="{ Component, route }"
    style="height: 100%; width: 100%">
    <component :is="Component" />
  </router-view>
</template>
<script setup lang="ts"></script>
<style lang="scss">
@use '@/assets/style/init.scss';
</style>

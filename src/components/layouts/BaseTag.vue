<template>
  <div class="tags-view-container">
    <div
      @click="switchTag(item.path)"
      v-for="(item, index) in tags"
      :key="index"
      class="tag"
      :class="{ active: route.fullPath === item.path }">
      {{ item.name }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const tags = ref([
  {
    name: '首页',
    path: '/dashboard',
  },
  {
    name: '活动页',
    path: '/activity',
  },
  {
    name: '登录页',
    path: '/login',
  },
])
const switchTag = (path) => {
  router.push(path)
}
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  box-sizing: border-box;
  .tag {
    display: inline-block;
    position: relative;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    color: #495060;
    background: #fff;
    padding: 0 8px;
    font-size: 12px;
    margin-left: 5px;
    margin-top: 2px;
    &:first-of-type {
      margin-left: 15px;
    }
  }
  .active {
    background-color: #42b983;
    color: #fff;
    border-color: #42b983;
    &::before {
      content: '';
      background: #fff;
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      position: relative;
      margin-right: 4px;
    }
  }
}
</style>

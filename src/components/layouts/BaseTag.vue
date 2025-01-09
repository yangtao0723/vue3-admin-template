<template>
  <div class="tags-view-container">
    <div
      @click="switchTag(item.path)"
      v-for="(item, index) in tagsViews"
      :key="index"
      class="tag"
      :class="{ active: route.fullPath === item.path }">
      {{ item.name }}
      <el-icon
        style="margin-left: 3px"
        v-if="index !== 0"
        @click.stop="globalInfo.removeTags(item, router)">
        <CloseIcon />
      </el-icon>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGlobalInfo } from '@/store'
const route = useRoute()
const router = useRouter()
const globalInfo = useGlobalInfo()
const tagsViews = globalInfo.baseTags
watch(
  () => route.fullPath,
  (newV) => {
    // 监听路由变化
    const { fullPath, name } = route
    globalInfo.addTags({ name, path: fullPath })
    globalInfo.baseMatchedRouters = route.matched
  },
  {
    immediate: true,
  }
)
const switchTag = (path) => {
  router.push(path)
}
</script>

<style lang="scss" scoped>
.tags-view-container {
  display: flex;
  height: 34px;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  box-sizing: border-box;
  .tag {
    display: flex;
    align-items: center;
    justify-content: center;
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

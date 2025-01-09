<template>
  <div class="navbar">
    <div style="display: flex; align-items: center; flex: 1">
      <el-icon
        size="20px"
        @click="baseIsCollapse = !baseIsCollapse"
        style="margin-right: 20px">
        <ExpandIcon v-if="baseIsCollapse" />
        <FoldIcon v-else />
      </el-icon>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item
          v-for="(item, index) in filterMatched"
          :key="item.path">
          {{ item.name }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="text-align: right">
      <img
        style="border-radius: 50%"
        src="https://avatars.githubusercontent.com/u/25154432?v=4&size=35"
        alt="" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { useGlobalInfo, useGlobalStatus } from '@/store'
import { storeToRefs } from 'pinia'
const globalInfo = useGlobalInfo()
const globalStatus = useGlobalStatus()
const { baseIsCollapse } = storeToRefs(globalStatus)
const filterMatched = computed(() => {
  return globalInfo.baseMatchedRouters.filter((item: any) => item.path && item.path != '/dashboard')
})
</script>
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

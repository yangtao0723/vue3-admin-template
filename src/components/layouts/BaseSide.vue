<template>
  <div class="side">
    <el-menu
      class="el-menu-custom"
      :collapse="globalStatus.baseIsCollapse"
      :default-active="$route.path"
      router
      unique-opened
      text-color="#bfcbd9"
      active-text-color="#409EFF"
      background-color="#304156">
      <template
        v-for="(item, index) in globalInfo.userRouters"
        :key="index">
        <el-sub-menu
          :index="item.name"
          :route="item.path"
          v-if="item.children && item.children.length">
          <template #title>
            <el-icon><MessageBoxIcon /></el-icon>
            <span>
              {{ item.name }}
            </span>
          </template>
          <BaseSubMenu :menu="item.children"></BaseSubMenu>
        </el-sub-menu>
        <el-menu-item
          v-else
          :route="item.path"
          :index="item.path">
          <el-icon><MessageBoxIcon /></el-icon>
          <span>
            {{ item.name }}
          </span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import BaseSubMenu from './BaseSubMenu.vue'
import { ref } from 'vue'
import { useGlobalInfo, useGlobalStatus } from '@/store'
const globalInfo = useGlobalInfo()
const globalStatus = useGlobalStatus()
</script>
<style scoped lang="scss">
.side {
  height: 100%;
  .el-menu-custom {
    height: 100%;
    overflow-y: auto;
    &:not(.el-menu--collapse) {
      width: 210px;
    }
  }
}
</style>

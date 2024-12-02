<template>
  <div class="side">
    <el-menu
      class="el-menu-custom"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
      background-color="#304156">
      <template
        v-for="(item, index) in globalInfo.userRouters"
        :key="index">
        <el-sub-menu
          :index="item.id"
          v-if="item.children && item.children.length">
          <template #title>
            <el-icon><MessageBoxIcon /></el-icon>
            {{ item.name }}</template
          >
          <BaseSubMenu :menu="item.children"></BaseSubMenu>
        </el-sub-menu>
        <el-menu-item
          v-else
          :index="item.path">
          <el-icon><MessageBoxIcon /></el-icon>
          {{ item.name }}
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import BaseSubMenu from './BaseSubMenu.vue'
import { ref } from 'vue'
import { Location, Document, Menu as IconMenu, Setting } from '@element-plus/icons-vue'
import { useGlobalInfo } from '@/store'
const globalInfo = useGlobalInfo()
console.log(globalInfo.userRouters)
const isCollapse = ref(false)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
Location
</script>
<style scoped lang="scss">
.side {
  width: 210px;
  height: 100%;
  .el-menu-custom {
    height: 100%;
    width: 100%;
    overflow-y: auto;
    &::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      border-radius: 0;
      background: rgba(215, 215, 215, 0.1);
    }
    &::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 2px;
      background: rgb(133, 131, 131);
    }
    &::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
      height: 4px;
    }
  }
}
</style>

<template>
  <template
    v-for="(item, index) in props.menu"
    :key="index">
    <el-sub-menu
      v-if="item.children && item.children.length"
      :index="item.id">
      <template #title> {{ item.name }}</template>
      <BaseSubMenu :menu="item.children"></BaseSubMenu>
    </el-sub-menu>
    <el-menu-item
      v-else
      :index="item.path">
      {{ item.name }}
    </el-menu-item>
  </template>
</template>

<script setup>
import { defineComponent } from 'vue'
const props = defineProps({
  menu: {
    type: Array,
    default: () => [],
  },
})
defineComponent({
  name: 'BaseSubMenu',
})
</script>

<style lang="scss" scoped></style>

<template>
  <template
    v-for="(item, index) in props.menu"
    :key="index">
    <el-sub-menu
      v-if="item.children && item.children.length"
      :index="item.name">
      <template #title>
        <span>{{ item.name }}</span>
      </template>
      <BaseSubMenu :menu="item.children"></BaseSubMenu>
    </el-sub-menu>
    <el-menu-item
      v-else
      :route="item.path"
      :index="item.path">
      <span>{{ item.name }}</span>
    </el-menu-item>
  </template>
</template>

<script setup name="BaseSubMenu">
const props = defineProps({
  menu: {
    type: Array,
    default: () => [],
  },
})
defineExpose({})
</script>

<style lang="scss" scoped></style>

<template>
  <div style="display: flex">
    <BaseSide></BaseSide>
    <div style="flex: 1">
      <BaseHeader></BaseHeader>
      <BaseTag></BaseTag>
      <div style="height: calc(100% - 84px); display: flex; flex-direction: column">
        <RouterView
          :key="$route.fullPath"
          style="flex: 1; overflow: auto"></RouterView>
        <BaseFooter></BaseFooter>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>

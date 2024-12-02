<template>
  <div style="display: flex">
    <BaseSide></BaseSide>
    <div style="flex: 1">
      <BaseHeader></BaseHeader>
      <BaseTag></BaseTag>
      <RouterView style="height: calc(100% - 84px); overflow: auto"></RouterView>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>

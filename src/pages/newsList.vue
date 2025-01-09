<template>
  <div>
    <div class="container">
      <GlobalUpload
        v-for="(item, index) in list"
        :key="index"
        v-model="item.fileId"></GlobalUpload>
      <button @click="printForm">打印</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
const form = ref({
  fileId: '59217,59216',
})
const list = reactive([
  {
    id: 1,
    name: '张三',
    fileId: '59217,59216',
  },
  {
    id: 2,
    name: '李四',
    fileId: '59218,59219',
  },
])
const printForm = () => {
  console.log(list)
}
</script>

<style scoped></style>

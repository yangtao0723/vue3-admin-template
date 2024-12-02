<template>
  <div>
    这是dashboard
    <el-button @click="resetRefs">重置</el-button>
    <div style="height: 1000px; width: 100%; background-color: red">1</div>
  </div>
</template>

<script setup lang="ts">
import { useGlobalInfo } from '@/store'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
const globalInfo = useGlobalInfo()
// globalInfo.test = '修改后的部门名称'
// const { test } = storeToRefs(globalInfo)
// test.value = '修改后的部门名称'

const countAAA = ref(68)
const emits = defineEmits(['resetRefs'])
const resetRefs = () => {
  emits('resetRefs', '我是传过来的数据')
}
defineExpose({
  countAAA,
  resetRefs,
})
</script>

<style scoped></style>

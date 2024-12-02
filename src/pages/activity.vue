<template>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      prop="date"
      label="Date"
      width="180" />
    <el-table-column
      prop="name"
      label="Name"
      width="180" />
    <el-table-column
      prop="address"
      label="Address" />
  </el-table>
  <el-form
    ref="ruleFormRef"
    style="max-width: 600px"
    :model="ruleForm"
    :rules="rules"
    label-width="auto"
    class="demo-ruleForm"
    :size="formSize"
    status-icon>
    <el-form-item
      label="Activity name"
      prop="name">
      <el-input v-model="ruleForm.name" />
    </el-form-item>
    <el-form-item
      label="Activity name"
      prop="region">
      <el-input v-model="ruleForm.region" />
    </el-form-item>
  </el-form>
  <el-button @click="regTable">验证</el-button>
  <el-button @click="resetForm">Reset</el-button>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { validateTableData, isEmpty } from '@/utils/func'
import router from '@/router'
const ruleFormRef = ref()
const ruleForm = reactive({ name: 'Hello', region: '', count: '', date1: '', date2: '', delivery: false, location: '', type: [], resource: '', desc: '' })
const rules = reactive({
  name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
  region: [{ required: true, message: '请选择活动区域', trigger: 'change' }],
})
const resetForm = async () => {
  ruleFormRef.value.resetFields()
}
const regTable = async () => {
  ruleFormRef.value.validate((valid: boolean) => {
    console.log(valid)
  })
  return
  const tableData = [
    {
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-04',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '',
      name: '',
      address: 'No. 189, Grove St, Los Angeles',
    },
  ]
  await validateTableData(tableData, {
    date: (value: any, row: object, callback: Function) => {
      if (isEmpty(value)) {
        callback(new Error(`日期不能为空`))
      } else {
        callback()
      }
    },
    name: (value: any, row: object, callback: Function) => {
      if (isEmpty(value)) {
        callback(new Error(`姓名不能为空`))
      } else {
        callback()
      }
    },
    address: (value: any, row: object, callback: Function) => {
      if (isEmpty(value)) {
        callback(new Error(`地址不能为空`))
      } else {
        callback()
      }
    },
  })
}
</script>

<style scoped></style>

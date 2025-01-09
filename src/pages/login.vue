<template>
  <div class="login-bg">
    <div class="login-box">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        size="midium"
        label-width="80px">
        <el-form-item prop="name">
          <el-input
            prefix-icon="userIcon"
            v-model="ruleForm.username" />
        </el-form-item>
        <el-form-item prop="name">
          <el-input
            prefix-icon="lockIcon"
            v-model="ruleForm.pwd"
            type="password" />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Encrypt } from '@/utils/AESUtils'
import { ref, reactive } from 'vue'
import router from '@/router'
import { login, getRoute } from '@/api/login'
import { ElMessage } from 'element-plus'
import { useGlobalInfo } from '@/store'
import { storeToRefs } from 'pinia'

const ruleForm = reactive({
  username: '谭畅',
  pwd: 'Aa@123456',
})
const rules = reactive({
  username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  pwd: [{ required: true, message: '请输入密码', trigger: 'blur' }],
})
const globalInfo = useGlobalInfo()

// const { userToken, userRouters } = storeToRefs(globalInfo)
const { setUserToken, setUserRouters, setUserInfo } = globalInfo
const ruleFormRef = ref()
const submitForm = async () => {
  await ruleFormRef.value.validate()
  let formData = new FormData()
  formData.append('client_id', 'app')
  formData.append('client_secret', '123456')
  formData.append('grant_type', 'password')
  formData.append('username', ruleForm.username)
  formData.append('password', Encrypt(ruleForm.pwd))
  formData.append('type', 'pc-app')
  formData.append('enterpriseId', '')
  formData.append('partner', 'zhantong')
  const { userinfo, access_token } = await login(formData)
  setUserToken(access_token)
  setUserInfo(JSON.parse(userinfo))
  await getAllRoute()
  ElMessage.success('登录成功')
  router.push('/')
}
const getAllRoute = async () => {
  const { router } = await getRoute().finally(() => Promise.resolve())
  setUserRouters(router)
}
</script>

<style scoped lang="scss">
.login-bg {
  width: 100%;
  height: 100%;
  background-image: url('@/assets/images/login-bg.png');
  background-size: cover;
  .login-box {
    width: 400px;
    height: 300px;
    background-color: #fff;
    position: absolute;
    top: 50%;
    right: 10%;
    transform: translate(-10%, -50%);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }
}
</style>

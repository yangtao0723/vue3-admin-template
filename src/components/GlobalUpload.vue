<template>
  <div>
    <el-upload
      :file-list="fileList"
      multiple
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-upload="beforeUpload"
      :http-request="uploadRequest"
      :limit="props.limit"
      :on-exceed="handleExceed">
      <el-button type="primary">上传文件</el-button>
      <template #tip>
        <div class="el-upload__tip">请上传{{ accept }}格式文件，大小限制{{ limitSize }}MB</div>
      </template>
    </el-upload>
    <ElImageViewer
      v-if="reviewVisible"
      :url-list="[reviewUrl]"
      @close="reviewVisible = false">
    </ElImageViewer>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import Config from '@/config/env.config'
import { getById } from '@/api/upload'
import { UploadProps, UploadUserFile } from 'element-plus'
import { ElMessage, ElImageViewer } from 'element-plus'
import { useGlobalInfo } from '@/store'
import { ref, defineEmits, onMounted } from 'vue'
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  action: {
    type: String,
    default: '/api-base/sysAtt/save',
  },
  limit: {
    type: Number,
    default: 10,
  },
  // MB
  limitSize: {
    type: Number,
    default: 50,
  },
  accept: {
    type: String,
    default: '.jpg,.png,.jpeg,.gif,.bmp,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx',
  },
})
const emits = defineEmits(['update:modelValue'])
const globalInfo = useGlobalInfo()
const fileList = ref<UploadUserFile[]>([])
const reviewUrl = ref<string | undefined>('')
const reviewVisible = ref(false)

onMounted(async () => {
  if (props.modelValue) {
    const { list } = await getById({ ids: props.modelValue })
    fileList.value = list
  }
})
const beforeUpload: UploadProps['beforeUpload'] = (file) => {
  const { limitSize, accept } = props
  const isLt2M = file.size / 1024 / 1024 < limitSize
  if (!isLt2M) {
    ElMessage.error('附件大小不能超过 ' + limitSize + 'MB!')
    return false
  } else if (accept && file.name) {
    const fileName = file.name.toLowerCase(),
      acceptName = accept.toLowerCase().split(',')
    if (!acceptName.includes(fileName.substring(fileName.lastIndexOf('.')))) {
      ElMessage.error('附件格式不正确，请上传' + accept + '格式文件!')
      return false
    }
  }
  return true
}
const emitValue = () => {
  emits('update:modelValue', fileList.value.map((item: any) => item.id).toString())
}
const uploadRequest: UploadProps['httpRequest'] = async (param) => {
  let formData = new FormData()
  formData.append('file', param.file)
  const { data } = await axios({
    url: `${Config.BASE_URL}${props.action}`,
    method: 'post',
    data: formData,
    headers: {
      Authorization: globalInfo.userToken,
    },
  })
  fileList.value.push({ ...data.att, uid: param.file.uid })
  emitValue()
}
const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
  console.log(file, fileList.value)
  fileList.value = fileList.value.filter((item) => item.uid !== file.uid)
  emitValue()
}

const handlePreview: UploadProps['onPreview'] = (uploadFile: any) => {
  reviewUrl.value = uploadFile.url ? `${Config.BASE_URL}${uploadFile.url}` : URL.createObjectURL(uploadFile.raw)
  const suffix = uploadFile.name.split('.').at(-1).toLowerCase(),
    img = /(gif|jpg|jpeg|bmp|png|ico|tif)/g,
    office = /(doc|docx|xls|xlsx)/g
  if (img.test(suffix)) {
    reviewVisible.value = true
  } else if (office.test(suffix)) {
    downloadFile(reviewUrl.value, uploadFile.name)
  } else {
    window.open(reviewUrl.value)
  }
}

const downloadFile = (url: string, fileName: string) => {
  const x = new XMLHttpRequest()
  x.open('GET', url, true)
  x.responseType = 'blob'
  x.onload = function (e) {
    const url = window.URL.createObjectURL(x.response)
    const a = document.createElement('a')
    a.href = url
    a.download = fileName
    a.click()
  }
  x.send()
}

const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
  ElMessage.error(`最多上传${props.limit}个文件，还能上传${props.limit - uploadFiles.length}个文件`)
}
</script>

<style scoped></style>

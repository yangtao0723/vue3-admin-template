import { defineStore } from 'pinia'
import { RouterHistory } from 'vue-router'
interface tagsData {
  path: string
  name: string
}
const defaultTags: tagsData = {
  path: '/dashboard',
  name: '首页',
}
export const useGlobalInfo = defineStore('globalInfo', {
  state: () => ({
    userToken: '',
    userInfo: {},
    userRouters: [],
    baseTags: [defaultTags] as Array<object>,
    baseMatchedRouters: [],
  }),
  actions: {
    setUserToken(data: any) {
      this.userToken = 'Bearer ' + data
    },
    setUserInfo(data: any) {
      this.userInfo = data
    },
    setUserRouters(data: any) {
      this.userRouters = data
    },
    setBaseMatchedRouters(data: any) {
      this.baseMatchedRouters = data
    },
    addTags(data: tagsData) {
      if (this.baseTags.some((item: any) => item.path === data.path)) return
      this.baseTags.push(data)
    },
    removeTags(data: tagsData, router: RouterHistory) {
      const fIndex = this.baseTags.findIndex((item: any) => item.path === data.path)
      this.baseTags.splice(fIndex, 1)
      const activeTag = this.baseTags[fIndex] || this.baseTags[fIndex - 1]
      router.push((activeTag as tagsData).path)
    },
    removeAllTags() {
      this.baseTags = [defaultTags]
    },
  },
  persist: true, // 整个store都会被持久化
})
export const useGlobalStatus = defineStore('globalStatus', {
  state: () => ({
    baseIsCollapse: false as Boolean,
  }),
  actions: {
    setBaseIsCollapse(data: Boolean) {
      this.baseIsCollapse = data
    },
  },
})

import { defineStore } from 'pinia'
export const useGlobalInfo = defineStore('globalInfo', {
  state: () => ({
    userToken: '',
    userInfo: {},
    userRouters: [],
    test: '',
  }),
  actions: {
    setUserToken(data: any) {
      this.userToken = data
    },
    setUserInfo(data: any) {
      this.userInfo = data
    },
    setUserRouters(data: any) {
      this.userRouters = data
    },
  },
  persist: true, // 整个store都会被持久化
})

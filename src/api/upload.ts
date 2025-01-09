import httpRequest from '@/utils/httpRequest'

export const upload = (data?: any) => {
  return httpRequest({
    url: '/api-admin/oauth/token',
    method: 'post',
    data,
  })
}

export const getById = (params?: any) => {
  return httpRequest({
    url: '/api-base/sysAtt/getAttByIds',
    method: 'get',
    params,
  })
}

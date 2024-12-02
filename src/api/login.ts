import httpRequest from '@/utils/httpRequest'

export const login = (data?: any) => {
  return httpRequest({
    url: '/api-admin/oauth/token',
    method: 'post',
    data,
  })
}

export const getRoute = (params?: any) => {
  return httpRequest({
    url: '/api-admin/router',
    method: 'get',
    params,
  })
}

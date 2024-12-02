const config: any = {
  dev: {
    BASE_URL: 'http://192.168.0.254:8002',
  },
  prod: {
    BASE_URL: 'http://192.168.0.72:8002',
  },
}
export default config[import.meta.env.MODE]

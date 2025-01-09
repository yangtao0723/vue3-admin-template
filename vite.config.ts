import { defineConfig, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass',
        }),
      ],
      dts: 'src/components.d.ts',
    }),
  ],

  server: {
    /** 设置 host: true 才可以使用 Network 的形式，以 IP 访问项目 */
    host: true, // host: "0.0.0.0"
    port: 9527,
    open: true,
    /** 跨域设置允许 */
    cors: true,
    /** 端口被占用时，是否直接退出 */
    strictPort: false,
    /** 预热常用文件，提高初始页面加载速度 */
    warmup: {
      clientFiles: ['./src/components/layouts/**/*.vue'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.vue', '.jsx', '.tsx', '.ts', '.json', '.js'],
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
  build: {
    /** 单个 chunk 文件的大小超过 2048KB 时发出警告 */
    chunkSizeWarningLimit: 2048,
    /** 禁用 gzip 压缩大小报告 */
    reportCompressedSize: false,
    /** 打包后静态资源目录 */
    assetsDir: 'static',
    rollupOptions: {
      output: {
        /**
         * 分块策略
         * 1. 注意这些包名必须存在，否则打包会报错
         * 2. 如果你不想自定义 chunk 分割策略，可以直接移除这段配置
         */
        // manualChunks: {
        //   vue: ['vue', 'vue-router', 'pinia'],
        //   element: ['element-plus', '@element-plus/icons-vue'],
        //   vxe: ['vxe-table', 'vxe-table-plugin-element', 'xe-utils'],
        // },
      },
    },
  },
})

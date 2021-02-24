import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
const path = require('path')
const fs = require('fs')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)
const pathSrc = path.resolve(__dirname, './src')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  resolve: {
    alias: {
      src: resolveApp('src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "${pathSrc}/scss/variables";`
      }
    }
  }
})

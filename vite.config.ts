import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, './index.js'),
      name: 'nanod',
      fileName: 'nanod'
    },
    sourcemap: true,
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    },
    // 导入时想要省略的扩展名列表
    extensions: ['.ts', 'tsx', '.js', '.jsx'],
  },
  plugins: [react(), svgr({
    svgrOptions: {
      icon: '1em'
    }
  })],

})

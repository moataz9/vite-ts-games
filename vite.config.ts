import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'npc-movement-animation': resolve(__dirname, 'pages/npc-movement-animation/index.html'),
        'parallex-background': resolve(__dirname, 'pages/parallex-background/index.html'),
        'playing-animation': resolve(__dirname, 'pages/playing-animation/index.html'),
        'point-shoot': resolve(__dirname, 'pages/point-shoot/index.html'),
        'sprite-moving': resolve(__dirname, 'pages/sprite-moving/index.html'),
        'enemy-variety': resolve(__dirname, 'pages/enemy-variety/index.html'),
      },
    },
  },
})

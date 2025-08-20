/// <reference types="vite/client" />

// Permite importar archivos .vue en TS
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

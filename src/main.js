import { createApp } from 'vue'
import {
  ElTabs,
  ElTabPane,
  ElTable,
  ElTableColumn,
  ElEmpty,
  ElLoading
} from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

// 全局引入防抖函数
// import debounce from './mixins/debounce';

const app = createApp(App)

app.use(ElTabs)
app.use(ElTabPane)
app.use(ElTable)
app.use(ElTableColumn)
app.use(ElEmpty)
app.use(ElLoading)

// app.mixin(debounce);
app.mount('#app')
import { createApp } from 'vue'
import App from './App.vue'
import installElementPlus from './plugins/element'

// 全局引入防抖函数
// import debounce from './mixins/debounce';

const app = createApp(App)
installElementPlus(app)
// app.mixin(debounce);
app.mount('#app')
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引用less
import less from 'less'
Vue.use(less)

// 导入全局样式表
import './assets/css/global.css'

// 配置axios
import axios from 'axios'
// 配置请求的根路径
axios.defaults.baseURL = 'http://localhost:9999/'
Vue.prototype.$axios=axios

// 配置element-ui
// 从element-ui中导出资源
import ElementUI from "element-ui";
// 导入element-ui的主css文件
import 'element-ui/lib/theme-chalk/index.css'
// 把ElementUI当成Vue的插件进行加载
Vue.use(ElementUI)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

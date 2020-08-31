import Vue from 'vue'
import App from './App.vue'
// import Login from './login.vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import request from './tools/request'

// import user from './pages/user/a'

console.log(request)
Vue.prototype.$request   = request;
console.log(Vue)
Vue.use(ElementUI)
Vue.use(VueRouter);
Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import router from './router'
Vue.config.productionTip = false
import request from './utils/request'
import store from './store'

Vue.prototype.$request   = request;
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

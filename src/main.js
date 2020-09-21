// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'//axios
import http from './http/index.js'//vuex

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './filters/statusFormat'
import './filters/isnewFormat'
import './filters/ishotFormat'//在main里面引入过滤器


Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$http=http
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

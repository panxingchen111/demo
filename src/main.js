// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import
FormValidate
from "./utils/validate";
import store from './store/index.js'
import jsCookie from 'js-cookie'
// 挂载到Vue实力上，全局可通过this.$store进行调用
Vue.use(ElementUI);
Vue.prototype.$FormValidate = FormValidate; //  2、注册成全局验证
Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$cookie = jsCookie;
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});

/* eslint-disable no-new */

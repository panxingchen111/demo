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
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
import dayjs from "dayjs"
import checkRights from "./utils/checkRights";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // nprogress样式文件
process.env.VUE_APP_MOCK === 'true' && require('./mock/index');
// 挂载到Vue实力上，全局可通过this.$store进行调用
Vue.use(ElementUI);
Vue.prototype.$FormValidate = FormValidate; //  2、注册成全局验证
Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$cookie = jsCookie;
Vue.prototype.dayjs = dayjs; //可以全局使用dayjs
Vue.prototype.$checkRights = checkRights;
Vue.use(Viewer);
Viewer.setDefaults({
  Options: {
    "inline": true,
    "button": true,
    "navbar": true,
    "title": true,
    "toolbar": true,
    "tooltip": true,
    "movable": true,
    "zoomable": true,
    "rotatable": true,
    "scalable": true,
    "transition": true,
    "fullscreen": true,
    "keyboard": true,
    "url": "data-source"
  }
});
NProgress.configure({
  easing: 'ease', // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3 // 初始化时的最小百分比
})

//当路由进入前
router.beforeEach((to, from, next) => {
  // 每次切换页面时，调用进度条
  NProgress.start();
  next()
  // 若加载时间长且不定，担心进度条走完都没有加载完，可以调用　　NProgress.inc（）；//这会以随机数量递增，且永远达不到100%，也可以设指定增量    next();
});
//当路由进入后：关闭进度条
router.afterEach(() => {
  // 在即将进入新的页面组件前，关闭掉进度条
  NProgress.done()
})


new Vue({
  el: '#app',
  router,
  render: h => h(App)
});

/* eslint-disable no-new */

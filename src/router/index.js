import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout/layout'
import Cookies from 'js-cookie';
import check from "../utils/checkRouter";
import store from "../store/index";
import {
  MessageBox
} from "element-ui";
Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject)
  }
  return originalPush.call(this, location).catch(err => err)
}
const constantRoutes = [{
    path: '/',
    component: Layout,
    children: [{
      path: "/",
      name: '首页',
      component: resolve => require(["@/views/home"], resolve),
      meta: {
        needLogin: true,
        title: "Welcome"
      }
    }],
  },
  {
    path: "/login",
    component: resolve => require(["@/views/login"], resolve),
    hidden: true,
  },
  {
    path: "/404",
    component: resolve => require(["@/views/noView"], resolve),
    hidden: true
  },
  {
    path: "/401",
    component: resolve => require(["@/views/noFound"], resolve),
    hidden: true
  },
  {
    path: '/data-manage',
    component: Layout,
    children: [{
        path: 'list',
        name: '资源管理-列表',
        component: () => import('@/views/data-manage/list'),
        meta: {
          needLogin: true,
          title: "List"
        }
      },
      {
        path: 'imgInfo',
        name: '资源管理-信息',
        component: () => import('@/views/data-manage/imgInfo'),
        meta: {
          needLogin: true,
          title: "imgInfo"

        }
      },
    ]
  },
  {
    path: '/test-data',
    component: Layout,
    children: [{
        path: 'list',
        name: '测试数据-列表',
        component: () => import('@/views/test-data/list'),
        meta: {
          needLogin: true
        }
      },
      {
        path: 'charts',
        name: '测试数据-图表',
        component: () => import('@/views/test-data/charts'),
        meta: {
          needLogin: true,
          title: 'charts'
        }
      },
    ]
  },
  {
    path: '/decoration',
    component: Layout,
    children: [{
      path: 'index',
      name: '页面装修',
      component: () => import('@/views/decoration/index'),
      meta: {
        needLogin: true
      }
    }, ]
  },
  {
    path: '*',
    redirect: '/404'
  }
]

const router = new Router({
  // mode: "history", // 去掉url中的#
  // scrollBehavior: () => ({
  //   y: 0
  // }),
  mode: 'hash',//先改成hash模式
  routes: constantRoutes
});
router.beforeEach(function (to, from, next) {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (to.meta.needLogin) {
    //从cookie中获取用户信息，判断是否已登录
    if (Cookies.get('userInfoToken')) {
      console.log(1)
      let data = store.state.userInfo.menuList || JSON.parse(sessionStorage.getItem("store")).userInfo.menuList
      let checkRouter = check(to.path, data)
      if (checkRouter) {
        console.log(2)
        console.log('------', )
        next(); //表示已经登录
      } else {
        console.log(3)
        console.log('++++++', )
        next('/401')
      }
    } else {
      console.log(4)
      MessageBox.confirm('登录已失效, 是否重新登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //未登录
        //next可以传递一个路由对象作为参数 表示需要跳转到的页面
        next({
          // name: "login",
          // query: {
          //   redirect: to.meta.redirect
          // } //登录后再跳回此页面时要做的配置
          path: '/login'
        });
      }).catch(() => {

      });

    }
  } else {
    //表示不需要登录
    next(); //继续往后走
  }
});
export default router;

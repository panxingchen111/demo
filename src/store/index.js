 // 导入vue及vuex
 import Vue from 'vue'
 import Vuex from 'vuex'
 // 挂载vuex
 Vue.use(Vuex)
 import * as getters from './getters';
 //  import * as mutations from './mutations';
 import actions from './actions';
 import mutations from './mutations';
 // 创建vuex对象并向外暴露
 //  export default new Vuex.Store({
 //    // 全局属性变量
 //    state: {
 //      userInfo: {

 //      }
 //    },
 //    // 全局同步方法, 调用方法,this.$store.commit("xxx")
 //    mutations: {},
 //    // 异步方法 调用方法,this.$store.dispatch("xxx") 
 //    actions: {},
 //    // Vuex属性计算,在视图里面当变量使用
 //    getters: {},
 //    // 模块化注册
 //    modules: {}
 //  })
 const state = {
   userInfo: {}, //用户信息
  //  permission: [], //按钮权限
 };
 export default new Vuex.Store({
   state,
   getters,
   mutations,
   actions
 });

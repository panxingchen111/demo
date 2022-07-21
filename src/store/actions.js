const actions = {
  //这里面的方法是用来异步触发mutations里面的方法,context与store 实例具有相同方法和属性
  //清空vuex数据
  resetVuex({
    commit
  }) {
    commit("setUserInfo", null);
    commit("setTime", null)
  },
};
export default actions;

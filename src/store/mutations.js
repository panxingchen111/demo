import Cookies from 'js-cookie'

const mutations = {
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo;
  },
  getList(state, data) {
    console.log(87878788, state, data)
  },
  setTime(state, time) {
    state.loginTime = time
  },
}
export default mutations;

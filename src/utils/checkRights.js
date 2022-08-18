import store from "@/store";
const checkRights = function (value) {
  if (!store.state.userInfo && !store.state.userInfo.rights) {
    return
  }
  const arr = store.state.userInfo.rights
  let flag = false
  if (arr) {
    arr.forEach(i => {
      if (i == value[0]) {
        flag = true
      }
    })
    return flag
  }
}
export default checkRights

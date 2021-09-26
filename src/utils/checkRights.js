import store from "@/store";
const checkRights = function (value) {
  const arr = store.state.userInfo.rights
  let flag = false
  arr.forEach(i => {
    if (i == value[0]) {
      flag = true
    }
  })
  return flag
}
export default checkRights

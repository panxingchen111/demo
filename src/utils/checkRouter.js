let flag = false
const check = function (data, arr) {
  if (arr && arr.length > 0) {
    arr.forEach(i => {
      if (i.path == data && i.show) {
        flag = true
      } else if (i.children && i.children.length > 0) {
        check(data, i.children)
      } else {}
    });
    return flag
  }
}
export default check

import {
  get,
  post
}
from "../utils/request";
//获取测试列表数据
export function getList(params) {
  return get("/api/test-data", params)
}
//获取测试图表统计数据
export function getChartsInfo(params) {
  return get("/api/test-chartsInfo", params)
}
//获取轮播图数据
export function getImgList(params) {
  return get("/api/imgList", params)
}
//待办事项列表
export function getBackLogList(params) {
  return get('/api/backLogList', params)
}
//资源管理列表
export function getResList(params) {
  return get('/api/resList', params)
}
//资源图片
export function getResImgList(params) {
  return get('/api/resImgList', params)
}

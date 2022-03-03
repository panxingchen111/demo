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

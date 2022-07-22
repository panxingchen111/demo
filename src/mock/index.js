import Mock from "mockjs";
import Api from "./list";

//设置200-2000毫秒延时请求数据
Mock.setup({
  timeout: "200-2000"
});
//拦截的/home/getData
Mock.mock(/\/api\/test-data/, "get", Api.getTestListData);
Mock.mock(/\/api\/test-chartsInfo/, "get", Api.getTestChartsInfo);
Mock.mock(/\/api\/imgList/, "get", Api.getImgList);
Mock.mock(/\/api\/backLogList/, "get", Api.getBackLogList);
Mock.mock(/\/api\/resList/, "get", Api.getResList);
Mock.mock(/\/api\/resImgList/, "get", Api.getResImgList);

import Mock from "mockjs";
import homeApi from "./list";

//设置200-2000毫秒延时请求数据
Mock.setup({
  timeout: "200-2000"
});
//拦截的/home/getData
Mock.mock(/\/api\/test-data/, "get", homeApi.getTestListData);
Mock.mock(/\/api\/test-chartsInfo/, "get", homeApi.getTestChartsInfo);
Mock.mock(/\/api\/imgList/, "get", homeApi.getImgList);

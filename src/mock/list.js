import Mock from "mockjs";
export default {
  getTestListData: () => {
      console.log(7777777777)
    let list = [];
    for (let i = 0; i < 7; i++) {
      list.push(
        Mock.mock({
          vue: Mock.Random.float(1000, 5000, 0, 2),
          wechat: Mock.Random.float(1000, 5000, 0, 2),
          ES6: Mock.Random.float(1000, 5000, 0, 2),
          Redis: Mock.Random.float(1000, 5000, 0, 2),
          React: Mock.Random.float(1000, 5000, 0, 2),
          springboot: Mock.Random.float(1000, 5000, 0, 2)
        })
      );
    }
    console.log(1111111,list)
    return {
      code: 200, //选个200来区别mock数据和正常数据
      data: {
        book: list
      }
    };
  }
};
import Mock from "mockjs";
const getParameters = (URL) => {
  URL = JSON.parse(
    '{"' +
    decodeURI(URL.split("?")[1])
    .replace(/"/g, '\\"')
    .replace(/&/g, '","')
    .replace(/=/g, '":"') +
    '"}'
  );
  return URL
};
export default {
  getTestListData: (data) => {
    let obj = getParameters(data.url);
    let list = [];
    let arr = []
    for (let i = 0; i < 100; i++) {
      list.push(
        Mock.mock({
          id: Mock.Random.integer(1, 100),
          vue: Mock.Random.float(1000, 5000, 0, 2),
          wechat: Mock.Random.float(1000, 5000, 0, 2),
          ES6: Mock.Random.float(1000, 5000, 0, 2),
          Redis: Mock.Random.float(1000, 5000, 0, 2),
          React: Mock.Random.float(1000, 5000, 0, 2),
          springboot: Mock.Random.float(1000, 5000, 0, 2)
        })
      );
    }
    const pageSize = parseInt(obj.pageSize)
    const pageIndex = parseInt(obj.pageIndex)
    if (obj.id) {
      arr.push(list.find(p => p.id == obj.id))
      // list = arr
      console.log('obj.id', arr)
    } else {
      arr = list.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
      console.log('else',arr)
    }
    return {
      code: 200,
      data: {
        list: arr,
        total: list.length,
        pageIndex: pageIndex
      }
    };
  }
};

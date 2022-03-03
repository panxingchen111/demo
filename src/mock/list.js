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
      console.log('else', arr)
    }
    return {
      code: 200,
      data: {
        list: arr,
        total: list.length,
        pageIndex: pageIndex
      }
    };
  },
  getTestChartsInfo: (data) => {
    console.log(777777, data)
    const pageViewlist = [{
      name: '一月',
      value: 200
    }, {
      name: '二月',
      value: 1200
    }, {
      name: '三月',
      value: 800
    }, {
      name: '四月',
      value: 780
    }, {
      name: '五月',
      value: 780
    }, {
      name: '六月',
      value: 1330
    }, {
      name: '七月',
      value: 750
    }, {
      name: '八月',
      value: 2000
    }, {
      name: '九月',
      value: 1200
    }, {
      name: '十月',
      value: 550
    }, {
      name: '十一月',
      value: 1230
    }, {
      name: '十二月',
      value: 490
    }]
    const pageViewRanking = [{
        name: '网页一',
        value: 1200
      },
      {
        name: '网页二',
        value: 1190
      },
      {
        name: '网页三',
        value: 1180
      },
      {
        name: '网页四',
        value: 1000
      },
      {
        name: '网页五',
        value: 1000
      },
      {
        name: '网页六',
        value: 1000
      },
      {
        name: '网页七',
        value: 1000
      }

    ]
    return {
      code: 200,
      data: {
        addUser: 98989,
        addPage: 200,
        addShare: 210333,
        clicks: 89898989,
        pageViewlist: pageViewlist,
        pageViewRanking: pageViewRanking
      }
    }
  },
  getImgList: (data) => {
    return {
      code: 200,
      data: {
        imgList: [{
            url: 'https://img1.baidu.com/it/u=1376324071,162125697&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500',

          },
          {
            url: 'https://img2.baidu.com/it/u=690487400,3736912659&fm=253&fmt=auto&app=120&f=JPEG?w=1200&h=675',
          }, {
            url: 'https://img1.baidu.com/it/u=1353414575,3717902620&fm=253&fmt=auto&app=120&f=JPEG?w=1200&h=675',

          }, {
            url: 'https://img1.baidu.com/it/u=722430420,1974228945&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500',

          }, {
            url: 'https://img1.baidu.com/it/u=3569420573,2690721824&fm=253&fmt=auto&app=120&f=JPEG?w=889&h=500',

          }, {
            url: 'https://img2.baidu.com/it/u=3710988509,630731277&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500',

          }, {
            url: 'https://img2.baidu.com/it/u=2326903703,1471706484&fm=253&fmt=auto&app=138&f=JPEG?w=890&h=500'

          }

        ]
      }
    }
  }
};

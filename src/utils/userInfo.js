const userInfo = {
  1: {
    name: 1,
    id: 1,
    token: 'Bearer abcdefghijklmnopq',
    avatar: 'https://img1.baidu.com/it/u=1706751365,3645392677&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
    menuList: [{
        name: "首页",
        path: "/",
        icon: "el-icon-menu",
        show: true
      },
      {
        name: "页面装修",
        path: "/decoration/index",
        icon: "el-icon-brush",
        show: true
      },
      {
        name: "测试数据",
        path: "",
        icon: "el-icon-s-data",
        show: true,
        children: [{
            name: "测试数据-列表",
            path: "/test-data/list",
            show: true,
          },
          {
            name: "测试数据-图表",
            path: "/test-data/charts",
            show: true,
          }
        ]
      },
      {
        name: "资源管理",
        path: "",
        icon: "el-icon-s-management",
        show: true,
        children: [{
            name: "资源管理-列表",
            path: "/data-manage/list",
            show: true,
          },
          {
            name: "资源管理-信息",
            path: "/data-manage/imgInfo",
            show: true,
          }
        ]
      },
    ],
    rights: [
      'test-data:list:del', 'data-manage:list:add', 'data-manage:list:edit', 'data-manage:list:del',
    ]
  },
  2: {
    name: 2,
    id: 2,
    token: 'Bearer abcdefghijklmn',
    avatar: 'https://img1.baidu.com/it/u=1706751365,3645392677&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
    menuList: [{
        name: "首页",
        path: "/",
        icon: "el-icon-menu",
        show: true
      },
      {
        name: "测试数据",
        path: "/test-data",
        icon: "el-icon-s-data",
        show: true,
        children: [{
            name: "测试数据-列表",
            path: "/test-data/list",
            show: true,
          },
          {
            name: "测试数据-图表",
            path: "/test-data/charts",
            show: true,
          }
        ]
      },
      {
        name: "资源管理",
        path: "/data-manage",
        icon: "el-icon-s-management",
        show: true,
        children: [{
            name: "资源管理-列表",
            path: "/data-manage/list",
            show: true,
          },
          {
            name: "资源管理-信息",
            path: "/data-manage/imgInfo",
            show: false,
          }
        ]
      },
    ],
    rights: []
  },
}
export {
  userInfo
}

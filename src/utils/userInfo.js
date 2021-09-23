const userInfo = {
  1: {
    name: 1,
    id: 1,
    token: '111111111111',
    menuList: [{
        name: "首页",
        path: "/",
        icon: "el-icon-menu",
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
    ]
  },
  2: {
    name: 2,
    id: 2,
    token: '2222222222',
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
    ]
  },
}
export {
  userInfo
}

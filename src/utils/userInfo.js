const userInfo = {
  1: {
    name: 1,
    id: 1,
    token: 'Bearer abcdefghijklmnopq',
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
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
    ],
    rights: [
      'data-manage:list:add', 'data-manage:list:edit', 'data-manage:list:del',
    ]
  },
  2: {
    name: 2,
    id: 2,
    token: 'Bearer abcdefghijklmn',
    avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
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

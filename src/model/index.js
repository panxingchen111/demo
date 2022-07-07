const moduleList = [{
    name: '图文类',
    children: [{
      id: 'carousel',
      name: '轮播图',
      icon: 'el-icon-picture-outline',
      options: {
        imgList: []
      }
    }, {
      id: 'secondsKillGoods',
      name: '秒杀商品',
      icon: 'el-icon-warning-outline'
    }, {
      id: 'txt',
      name: '纯文本',
      icon: 'el-icon-edit-outline',
      options: {
        color: '#2c3e50',
        fontSize: '16px',
        textAlign: 'left',
        value: '这是文本标签'
      }
    }, ]
  },
  {
    name: '商品类',
    children: [{
      id: 'allGoods',
      name: '全部商品',
      icon: 'el-icon-goods'
    }, {
      id: 'hotGoods',
      name: '推荐商品',
      icon: 'el-icon-sell',
      options: {
        color: '#2c3e50',
        fontSize: '12px',
        textAlign: 'left',
        titleName: '推荐商品',
        layout: 1
      }
    }, ]
  }

]
const selectFontList = [{
    label: '12px',
    value: '12px'
  },
  {
    label: '14px',
    value: '14px'
  },
  {
    label: '16px',
    value: '16px'
  },
  {
    label: '18px',
    value: '18px'
  },
  {
    label: '20px',
    value: '20px'
  },
  {
    label: '22px',
    value: '22px'
  },
  {
    label: '24px',
    value: '24px'
  },
  {
    label: '26px',
    value: '26px'
  },
  {
    label: '28px',
    value: '28px'
  },
  {
    label: '30px',
    value: '30px'
  }
]
const alignList = [{
  label: '左对齐',
  value: 'left'
}, {
  label: '右对齐',
  value: 'right'
}, {
  label: '居中',
  value: 'center'
}, ]
const layoutList = [{
    label: '2x3',
    value: 1
  }, {
    label: '3x2',
    value: 2
  },
  {
    label: '1x4',
    value: 3
  }
]
export {
  moduleList,
  selectFontList,
  alignList,
  layoutList
}

<template>
  <div>
    <p
      class="title"
      :style="{
        'font-size': obj.options.fontSize,
        color: obj.options.color,
        'text-align': obj.options.textAlign
      }"
    >
      {{ obj.options.titleName }}
    </p>
    <el-row :gutter="20">
      <el-col v-for="(item, index) in 5" :key="index" :span="getLayout(index)"
        ><div class="grid-content bg-purple"></div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "RecommendGoods",
  props: ["obj"],
  data() {
    return {
      title: "推荐商品"
    };
  },
  methods: {
    getLayout(index) {
      const val = this.obj.options.layout;
      if (val === 1) {
        if (index == 0) {
          return 16;
        } else {
          return 8;
        }
      }
      if (val == 2) {
        if (index == 3) {
          return 16;
        } else {
          return 8;
        }
      } else {
        if (index == 0) {
          return 24;
        } else {
          return 6;
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
// .el-row {
//   margin-bottom: 20px;
//   &:last-child {
//     margin-bottom: 0;
//   }
// }
.el-col {
  border-radius: 4px;
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  height: 180px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.title {
  margin: 0;
  position: relative;
  margin-left: 5px;
  &::before {
    position: absolute;
    width: 2px;
    height: 20px;
    content: "";
    background: black;
    top: 10px;
    margin-left: -5px;
  }
  &:hover::before {
    background-color: #409eff;
  }
}
</style>

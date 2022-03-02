<template>
  <div>
    <p class="title">{{ title }}</p>
    <el-row :gutter="20">
      <el-col
        v-for="(item, index) in 5"
        :key="index"
        :span="index == 0 ? 16 : 8"
        ><div class="grid-content bg-purple"></div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "RecommendGoods",
  data() {
    return {
      title: "推荐商品"
    };
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
  text-align: left;
  font-size: 12px;
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

<template>
  <div class="home">
    <el-row :gutter="10">
      <el-col :span="4"><LeftSide></LeftSide></el-col>
      <el-col :span="16" class="center" ref="center"><Center></Center></el-col>
      <el-col :span="4"> <RightSide></RightSide></el-col>
    </el-row>
  </div>
</template>
<script>
import LeftSide from "./Options/LeftSide";
import Center from "./Options/Center";
import RightSide from "./Options/RightSide";

export default {
  components: { Center, LeftSide, RightSide },
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped>
.el-col {
  border: 1px solid transparent;
}
.home {
  height: 100%;
}
.el-row {
  height: 100%;
}
.center {
  overflow-y: auto;
  height: 100%;
}
</style>

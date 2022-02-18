<template>
  <el-row :gutter="16">
    <el-col :span="4"><LeftSide></LeftSide></el-col>
    <el-col :span="16"><Center></Center></el-col>
    <el-col :span="4"><RightSide></RightSide></el-col>
  </el-row>
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
<style lang="less" scoped></style>

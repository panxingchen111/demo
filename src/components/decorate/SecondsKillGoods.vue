<template>
  <div>
    <el-row>
      <el-col :span="4">1</el-col>
      <el-col :span="16">2 </el-col>
      <el-col :span="4">3</el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "SecondsKillGoods",
  props: ["obj"],
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped></style>

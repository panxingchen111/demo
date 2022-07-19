<template>
  <div class="home">
    <el-row :gutter="10">
      <el-col :span="4"><LeftSide></LeftSide></el-col>
      <el-col :span="16" class="center"><Center ref="center"></Center></el-col>
      <el-col :span="4">
        <div style="text-align:left">
          <el-tooltip
            class="item"
            effect="dark"
            content="保存"
            placement="top-start"
          >
            <el-button
              type="primary"
              icon="el-icon-document"
              circle
              size="mini"
              @click="save(1)"
            ></el-button>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="发布"
            placement="top-start"
          >
            <el-button
              type="success"
              size="mini"
              icon="el-icon-check"
              circle
              @click="save(2)"
            ></el-button>
          </el-tooltip>
        </div>
        <el-divider></el-divider>
        <RightSide></RightSide
      ></el-col>
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
  },
  methods: {
    save(type) {
      // type 1是保存2是发布
      // this.$refs.center.list是拼好的参数
      const list = this.$refs.center.list;
      console.log("save", list);
      if (list.length == 0 || !list) {
        this.$message({
          message: "请先补充装修数据！",
          type: "warning"
        });
        return;
      }
    }
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

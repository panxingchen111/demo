<template>
  <el-dialog
    :visible.sync="flag"
    width="50%"
    :before-close="close"
    title="选择图片"
  >
    <div style="display: flex;flex-flow: wrap;">
      <div
        class="imgList"
        v-for="item in list"
        :key="item.url"
        @click="choose(item)"
      >
        <el-image
          style="width: 100px; height: 100px"
          :src="item.url"
          fit="contain"
          :class="item.select ? 'choose-imgList' : ''"
        ></el-image>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { getImgList } from "../api/test-service";
export default {
  name: "ImgDialog",
  props: ["flag", "close", "callBack"],
  data() {
    return {
      list: [],
      chooseList: []
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      let obj = {
        time: new Date().getTime()
      };
      getImgList(obj).then(res => {
        this.list = res.data.imgList;
        this.list.forEach(i => {
          this.$set(i, "select", false);
          this.$set(i, "btnUrl", "");
        });
      });
    },
    choose(item) {
      item.select = !item.select;
      if (item.select) {
        this.chooseList.push(item);
      } else {
        this.chooseList.splice(item, 1);
      }
    },
    confirm() {
      if (this.chooseList.length > 5) {
        this.$message({
          message: "最多只能选择五张图片",
          type: "warning"
        });
        return;
      } else {
        let data = this.chooseList;
        this.callBack(data);
        this.close();
      }
    }
  }
};
</script>
<style lang="less" scoped>
.imgList {
  width: 25%;
}
.choose-imgList {
  border: dashed #409eff;
}
/deep/ .el-dialog__header {
  text-align: left;
}
</style>

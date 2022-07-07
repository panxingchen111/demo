<template>
  <div>
    <p>推荐商品设置</p>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="24">
        <div class="set-font">标题名称</div>
        <el-input
          v-model="curObj.options.titleName"
          class="set-select"
        ></el-input>
      </el-col>
      <el-col :span="24">
        <div class="set-font">字体大小</div>
        <el-select
          placeholder="请选择"
          size="small"
          class="set-select"
          clearable
          v-model="curObj.options.fontSize"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="8">
        <div class="set-font">字体颜色</div>
        <el-color-picker
          v-model="curObj.options.color"
          size="small"
          style="margin-left: 0;display: flex;"
          class="set-select"
        ></el-color-picker>
      </el-col>
      <el-col :span="16">
        <div class="set-font-right">对齐方式</div>
        <el-select
          placeholder="请选择"
          size="small"
          class="set-align"
          clearable
          v-model="curObj.options.textAlign"
        >
          <el-option
            v-for="item in alignList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="24">
        <div class="set-font">布局方式</div>
        <el-select
          placeholder="请选择"
          size="small"
          class="set-select"
          clearable
          v-model="curObj.options.layout"
        >
          <el-option
            v-for="item in layoutList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { selectFontList, alignList, layoutList } from "../../model/index";
export default {
  name: "RecommendGoodsSet",
  props: ["obj", "callBack"],
  data() {
    return {
      options: selectFontList,
      alignList: alignList,
      layoutList: layoutList,
      curObj: { options: {} }
    };
  },
  mounted() {
    if (this.obj) {
      this.curObj = this.obj;
    }
  },
  watch: {
    obj: {
      handler(newVal) {
        if (newVal) {
          this.curObj = newVal;
        }
      },
      deep: true
    },
    curObj: {
      handler(newVal) {
        if (newVal) {
          this.curObj = newVal;
          this.callBack(newVal);
        }
      },
      deep: true
    }
  }
};
</script>
<style scoped lang="less">
p {
  text-align: left;
}
.set-font {
  font-size: 12px;
  text-align: left;
  cursor: pointer;
}
.set-select {
  margin-top: 10px;
}
.set-font-right {
  font-size: 12px;
  text-align: right;
}
.set-align {
  font-size: 12px;
  text-align: left;
  margin-top: 10px;
}
.el-col {
  margin-bottom: 10px;
}
.img-set {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.del,
.sort-up,
.sort-down {
  cursor: pointer;
}
</style>

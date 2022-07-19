<template>
  <el-container>
    <el-aside
      :width="value ? '200' + 'px' : '60' + 'px'"
      style="position: relative"
    >
      <div style="left: 25px; position: absolute; top: 20px">
        <el-switch v-model="value" :width="35"> </el-switch>
      </div>
      <aside1 :value="value" />
    </el-aside>
    <el-container>
      <el-header
        ><header1/>
        <bread-crumb
          :class="value ? 'isValue' : 'noValue'"
          class="tagList"
        ></bread-crumb>
      </el-header>
      <el-main :class="value ? 'isValue' : 'noValue'">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import header1 from "./seeting/header";
import aside1 from "./seeting/aside";
import BreadCrumb from "../components/BreadCrumb.vue";
export default {
  components: { header1, aside1, BreadCrumb },
  data() {
    return {
      value: true,
      screenWidth: "100%"
    };
  },
  methods: {}
};
</script>
<style lang="less" scoped>
.el-container {
  position: absolute;
  width: 100%;
  top: 0px;
  left: 0;
  bottom: 0;
}
.el-header {
  padding: 0;
  z-index: 1000;
  background-color: #b3c0d1;
}

// header菜单需要靠右的添加.fr即可(如：<el-menu-item class="fr" index="3">消息中心</el-menu-item>)
.el-header .fr {
  float: right;
}
.el-header .el-menu {
  border-bottom: none;
}
.el-aside,
.el-main {
  padding-top: 60px;
}
.el-aside {
  background-color: #d3dce6;
  z-index: 999999;
}
.el-aside .el-menu {
  border-right: none;
}
.isValue {
  width: calc(100% - 200px);
  margin-left: 200px;
}
.noValue {
  margin-left: 60px;
  width: calc(100% - 60px);
}
.tagList {
  text-align: left;
  padding-top: 10px;
  z-index: 999999999999;
  background: white;
}
</style>

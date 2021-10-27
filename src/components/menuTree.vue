<template>
  <div style="text-align: left">
    <template v-for="menu in menuData">
      <el-submenu :index="menu.name" v-if="menu.children" :key="menu.name">
        <template slot="title">
          <i :class="menu.icon"></i>
          <span slot="title" v-if="showValue">{{ menu.name }}</span>
        </template>
        <menu-tree :menuData="menu.children"> </menu-tree>
      </el-submenu>
      <el-menu-item :key="menu.path" :index="menu.path" v-else>
        <i :class="menu.icon"></i>
        <span slot="title" v-if="showValue">{{ menu.name }}</span>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
export default {
  props: ["menuData", "value"],
  name: "MenuTree",
  data() {
    return {
      showValue: true
    };
  },
  mounted() {},
  watch: {
    value(newVal, oldVal) {
      this.showValue = newVal;
      console.log("showValue", this.showValue);
    }
  },
  methods: {}
};
</script>
<style lang="less" scoped>
.el-submenu .el-menu-item {
  background-color: #d3dce6 !important;
}
</style>

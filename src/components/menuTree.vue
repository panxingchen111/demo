<template>
  <div style="text-align: left">
    <template v-for="menu in menuData">
      <el-submenu :index="menu.name" v-if="menu.children" :key="menu.name">
        <template slot="title">
          <i :class="menu.icon"></i>
          <span slot="title">{{ menu.name }}</span>
        </template>
        <menu-tree :menuData="menu.children"> </menu-tree>
      </el-submenu>
      <el-menu-item :key="menu.path" :index="menu.path" v-else>
        <i :class="menu.icon"></i>
        <span slot="title">{{ menu.name }}</span>
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
<style lang="less">
.el-submenu .el-menu-item {
  background-color: #d3dce6 !important;
}
/*隐藏文字*/
.el-menu--collapse .el-submenu__title span {
  display: none;
}
/*隐藏 > */
// 不能使用scoped,隐藏icon会不生效
.el-menu--collapse .el-submenu__title .el-submenu__icon-arrow {
  display: none;
}
.el-menu-item:hover {
  outline: 0;
  background-color: #ecf5ff !important;
}
.el-menu-item.is-active {
  outline: 0;
  background-color: #ecf5ff !important;
  // &:after {
  //   content: "";
  //   position: absolute;
  //   top: 50%;
  //   right: 0;
  //   display: block;
  //   width: 0;
  //   height: 0;
  //   margin-top: -15px;
  //   border-color: transparent transparent transparent transparent;
  //   border-style: solid;
  //   border-width: 6px;
  // }
}
</style>

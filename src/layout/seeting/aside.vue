<template>
  <div>
    <el-menu
      router
      :unique-opened="true"
      :collapse="!value"
      :default-active="defaultActive"
    >
      <menu-tree :menuData="menuList" :value="value"></menu-tree>
    </el-menu>
  </div>
</template>
<script>
import MenuTree from "../../components/menuTree";
export default {
  components: { MenuTree },
  props: ["value"],
  data() {
    return {
      menuList: [],
      defaultActive: ""
    };
  },
  mounted() {
    const menuList = this.$store.state.userInfo.menuList;
    this.getmenuListByshow(menuList);
    this.defaultActive = this.$route.path;
  },
  watch: {
    value(newVal, oldVal) {},
    $route(newVal, oldVal) {
      this.defaultActive = newVal.path;
    }
  },
  methods: {
    getmenuListByshow(arr) {
      arr.forEach((i, index) => {
        if (!i.show) {
          arr.splice(index, 1);
        } else if (i.children && i.children.length > 0) {
          this.getmenuListByshow(i.children);
        } else {
          return;
        }
      });
      this.menuList = arr;
    }
  }
};
</script>
<style lang="less" scoped>
.el-menu {
  background: none !important;
}
</style>

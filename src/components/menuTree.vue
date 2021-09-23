<template>
  <div style="text-align: left">
    <template v-for="menu in menuData">
      <el-submenu :key="menu.index" :index="menu.path" v-if="menu.children">
        <template slot="title">
          <i :class="menu.icon"></i>
          <span slot="title">{{ menu.name }}</span>
        </template>
        <menu-tree :menuData="menu.children"></menu-tree>
      </el-submenu>
      <el-menu-item :key="menu.index" :index="menu.path" v-else>
        <i :class="menu.icon"></i>
        <span slot="title">{{ menu.name }}</span>
      </el-menu-item>
    </template>
  </div>
</template>
 
<script>
export default {
  props: ["menuData"],
  name: "MenuTree",
};
</script>
<style lang="less" scoped>
</style>
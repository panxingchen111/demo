<template>
  <div>
    <el-tag
      v-for="(tag, index) in breadCrumbList"
      :key="index"
      closable
      :type="tag.path == $route.path ? '' : 'info'"
      @click="choose(tag, index)"
      @close="closeTag(tag, index)"
    >
      {{ tag.name }}
    </el-tag>
    <el-divider></el-divider>
  </div>
</template>
<script>
export default {
  data() {
    return {
      breadCrumbList: [],
    };
  },
  watch: {
    $route: {
      handler: function (newV, oldV) {
        // this.breadCrumbList.push(route);
        // console.log(88888, newV, oldV);
        this.getRouter();
      },
      immediate: true,
    },
  },
  created() {
    this.getRouter();
  },
  methods: {
    getRouter() {
      const map = new Map();
      this.breadCrumbList.push(this.$route);
      this.breadCrumbList = this.breadCrumbList.filter(
        (key) => !map.has(key.path) && map.set(key.path, 1)
      );
    },
    //点击tag
    choose(tag, newIndx) {
      if (tag.path === this.$route.path) {
        return;
      } else {
        this.$router.push(tag.path);
      }
    },
    //关闭
    closeTag(tag, index) {
      if (this.breadCrumbList.length == 1) {
        return;
      } else {
        this.breadCrumbList.splice(index, 1);
        this.$router.push(this.breadCrumbList[index - 1].path);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.el-tag {
  margin-left: 5px;
}
.el-divider--horizontal {
  display: block;
  height: 1px;
  width: 100%;
  margin: 10px 0;
}
</style>
<template>
  <div>
    <el-card shadow="hover">
      <!-- 天气插件 -->
      <div>
        <iframe
          width="500"
          height="40"
          frameborder="0"
          scrolling="no"
          hspace="0"
          src="https://i.tianqi.com/?c=code&a=getcode&id=40&icon=1"
        ></iframe>
      </div>
      <img src="../assets/bg.jpeg" class="image" />
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>
<style lang="less" scoped>
.card {
  margin: 20px;
}
.image {
}
</style>

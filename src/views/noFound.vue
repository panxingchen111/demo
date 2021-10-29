<template>
  <div>
    <el-card>
      <div slot="header" style="display: flex;justify-content: end;">
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          @click="toLogin"
          >返回登录</el-button
        >
      </div>
      <img src="../assets/401.png" class="image" />
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    toLogin() {
      this.$router.push("/login");
    }
  }
};
</script>
<style lang="less" scoped></style>

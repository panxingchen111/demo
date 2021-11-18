<template>
  <div class="header">
    <el-avatar :src="$store.state.userInfo.avatar"></el-avatar>
    <el-dropdown>
      <span class="el-dropdown-link">
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="logoOut">注销</el-dropdown-item>
        <el-dropdown-item @click.native="forgetPwd">忘记密码</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    logoOut() {
      this.$confirm("是否退出系统?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.dispatch("resetVuex");
          this.$cookie.remove("userInfoToken");
          this.$router.push("/login");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    forgetPwd() {}
  }
};
</script>
<style lang="less" scoped>
.header {
  text-align: right;
  padding-right: 50px;
  margin-top: 10px;
}
.el-dropdown {
  position: relative;
  color: #606266;
  font-size: 14px;
  float: right;
  margin-top: 15px;
  display: block;
}
</style>

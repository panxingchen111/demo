<template>
  <div class="header">
    <el-row>
      <el-col :span="12">
        <h3
          :style="{
            'text-align': 'left',
            'margin-left': value ? '250px' : '120px'
          }"
        >
          {{ env.VUE_APP_TITLE }}
        </h3>
      </el-col>
      <el-col :span="12" v-if="$store.state.userInfo">
        <div style="display: flex;justify-content: end;">
          <i
            class="el-icon-full-screen"
            style="margin-right:10px;margin-top:24px"
            @click="full"
          ></i>
          <el-avatar
            :src="$store.state.userInfo.avatar"
            style="margin-top:15px"
            size="small"
          ></el-avatar>
          <el-dropdown>
            <span class="el-dropdown-link">
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="logoOut">注销</el-dropdown-item>
              <el-dropdown-item @click.native="forgetPwd"
                >忘记密码</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  props: ["value"],
  data() {
    return {
      env: process.env,
      isScreenFull: false
    };
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
    forgetPwd() {},
    full() {
      // 如果未开启就开启 如果已开启就关闭
      if (this.isScreenFull) {
        document.exitFullscreen(); // 关闭全屏
      } else {
        document.documentElement.requestFullscreen(); //开启全屏
      }
      this.isScreenFull = !this.isScreenFull;
    }
  }
};
</script>
<style lang="less" scoped>
.header {
  text-align: right;
  padding-right: 50px;
}
.el-dropdown {
  position: relative;
  color: #606266;
  font-size: 14px;
  float: right;
  margin-top: 25px;
  display: block;
}
</style>

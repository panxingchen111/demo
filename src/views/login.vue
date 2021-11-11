<template>
  <div>
    <el-card class="login-card">
      <div slot="header" class="clearfix">
        <h3>登录</h3>
      </div>
      <el-form
        :model="obj"
        :rules="rules"
        ref="obj"
        @keyup.enter.native="login"
      >
        <el-form-item label="账号" prop="account">
          <el-input v-model="obj.account" clearable>
            <template slot="prepend">
              <i class="el-icon-user"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="obj.password" clearable type="password">
            <template slot="prepend">
              <i class="el-icon-key"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-row :gutter="20" style="display: flex; align-items: center">
          <el-col :span="16">
            <el-form-item label="图形验证码" prop="imgCode">
              <el-input v-model="obj.imgCode" clearable>
                <template slot="prepend">
                  <i class="el-icon-chat-dot-square"></i>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <div @click="changeCode()">
              <img-code
                :identifyCode="identifyCode"
                style="margin-top: 20px"
              ></img-code>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <el-button size="small" icon="el-icon-check" @click="login" type="submit"
        >确 定</el-button
      >
      <el-button icon="el-icon-refresh" size="small" @click="reset"
        >重 置</el-button
      >
    </el-card>
  </div>
</template>
<script>
import imgCode from "../components/imgCode.vue";
import md5 from "js-md5";
import { userInfo } from "../utils/userInfo";
export default {
  components: { imgCode },
  data() {
    return {
      obj: {},
      rules: {
        account: [
          {
            required: true,
            validator: this.$FormValidate.FormValidate.Form().validateCode,
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            validator: this.$FormValidate.FormValidate.Form().validatePsdReg,
            trigger: "blur",
          },
        ],
        imgCode: [
          {
            required: true,
            validator: this.$FormValidate.FormValidate.Form().imgCode,
            trigger: "blur",
          },
        ],
      },
      identifyCode: "m6a8",
      identifyCodes: "123456789abcdefghjkmnpqrstuvwxyz",
    };
  },
  mounted() {
    // 刷新页面就生成随机验证码
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  },
  methods: {
    // 点击验证码刷新验证码
    changeCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    // 生成一个随机整数  randomNum(0, 10) 0 到 10 的随机整数， 包含 0 和 10
    randomNum(min, max) {
      max = max + 1;
      return Math.floor(Math.random() * (max - min) + min);
    },
    // 随机生成验证码字符串
    makeCode(data, len) {
      for (let i = 0; i < len; i++) {
        this.identifyCode += data[this.randomNum(0, data.length - 1)];
      }
    },
    //重置
    reset() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
      this.$refs["obj"].resetFields();
    },
    //登录
    login() {
      let loginid = "";
      this.$refs["obj"].validate((valid) => {
        if (valid) {
          this.obj.password = md5(this.obj.password);
          if (this.obj.account == "admin1") {
            loginid = 1;
          }
          if (this.obj.account == "admin2") {
            loginid = 2;
          }
          userInfo[loginid].token =
            userInfo[loginid].token + new Date().valueOf();
            console.log(888888888,new Date().valueOf())
          this.$cookie.set("userInfoToken", userInfo[loginid].token, {
            // expires: new Date(new Date().getTime() + 60 * 1000 * 1),//精确到分钟
            expires: 1, //1天
          });
          this.$store.commit("setUserInfo", userInfo[loginid]);
          this.$router.replace("/");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.login-card {
  width: 480px;
  margin: auto;
}
</style>
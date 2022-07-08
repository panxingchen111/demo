<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6" v-for="(item, index) in 12" :key="index">
        <div class="goods-image">
          <el-image :src="item.src">
            <div slot="error" class="image-slot">
              <i class="el-icon-goods goods-icon"></i>
            </div>
          </el-image>
        </div>
        <div
          class="image-title"
          :style="{ background: !item.title ? '#f1f1f1' : '' }"
        >
          {{ item.title }}
        </div>
        <div
          class="image-amount"
          :style="{ background: !item.amount ? '#f1f1f1' : '' }"
        >
          {{ item.amount ? `￥${item.amount}` : "" }}
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "AllGoods",
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped>
.el-row {
  margin-left: 0 !important;
  margin-right: 0 !important;
  padding: 5px;
}
.goods-image {
  background: white;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.image-title {
  width: 100%;
  margin-top: 5px;
  margin-bottom: 5px;
  text-align: left;
  font-size: 14px;
  height: 30px;
  line-height: 30px;
  background: white !important;
}
.image-amount {
  width: 60%;
  margin-bottom: 10px;
  text-align: left;
  font-size: 12px;
  height: 20px;
  line-height: 20px;
  color: red;
  background: white !important;
}
.goods-icon {
  font-size: 50px;
  color: #409eff;
}
</style>

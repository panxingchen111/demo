<template>
  <div>
    <el-carousel :interval="5000" arrow="always">
      <el-carousel-item
        v-for="(item, index) in obj.options.imgList"
        :key="index + Date.now()"
      >
        <el-image
          :src="item.url"
          style="height: 100%;width: inherit;"
        ></el-image>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
export default {
  name: "Slideshow",
  props: ["obj"],
  data() {
    return {};
  },
  watch: {
    obj: {
      handler(val) {
        if (val) {
          this.$forceUpdate();
        }
      },
      immediate: true,
      deep: true
    }
  }
};
</script>
<style lang="less" scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>

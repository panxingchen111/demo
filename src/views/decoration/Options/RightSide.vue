<template>
  <div>
    <!-- 文本设置 -->
    <TxtSet :obj="obj" v-if="obj.id == 'txt'" :callBack="callBack"></TxtSet>
    <!-- 文本设置 -->
    <!-- 轮播图设置 -->
    <SlideshowSet
      :obj="obj"
      v-else-if="obj.id == 'carousel'"
      :callBack="callBack"
    ></SlideshowSet>
    <!-- 轮播图设置 -->
  </div>
</template>

<script>
import Bus from "./bus";
import TxtSet from "../../../components/decorate-set/TxtSet.vue";
import SlideshowSet from "../../../components/decorate-set/SlideshowSet.vue";
export default {
  components: { TxtSet, SlideshowSet },
  name: "RightSide",
  data() {
    return {
      obj: {},
      index: 0,
      arr: []
    };
  },
  created() {
    Bus.$on("edit", (data, index, list) => {
      this.obj = data;
      this.index = index;
      this.arr = list;
    });
  },
  methods: {
    callBack(data) {
      console.log("回参", data);
    }
  }
};
</script>

<style lang="less" scoped></style>

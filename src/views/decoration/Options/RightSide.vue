<template>
  <div>
    <!-- 文本设置 -->
    <TxtSet :obj="obj" v-if="obj.id == 'txt'" :callBack="callBack"></TxtSet>
    <!-- 文本设置 -->
  </div>
</template>

<script>
import Bus from "./bus";
import TxtSet from "../../../components/decorate-set/TxtSet.vue";
export default {
  components: { TxtSet },
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
      console.log(999999,this.obj)
    });
  },
  methods: {
    callBack(data) {
      console.log(888888, data, this.arr, this.index);
    }
  }
};
</script>

<style lang="less" scoped></style>

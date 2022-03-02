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
  created() {},
  methods: {
    callBack(data) {}
  }
};
</script>

<style lang="less" scoped></style>

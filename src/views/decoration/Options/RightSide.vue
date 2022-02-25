<template>
  <div>3</div>
</template>

<script>
import Bus from "./bus";
export default {
  name: "RightSide",
  data() {
    return {};
  },
  created() {
    Bus.$on("info", info => {
      console.log('info', info);
    });
  }
};
</script>

<style lang="less" scoped></style>

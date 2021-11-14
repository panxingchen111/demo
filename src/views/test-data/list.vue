<template>
  <h1>list</h1>
</template>
<script>
import { getList } from "../../api/test-service";
export default {
  data() {
    return {};
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      getList({
        name: "test",
        id: 22222
      })
        .then(res => {
          console.log(111111111111,res);
        })
        .catch(e => {});
    }
  }
};
</script>
<style lang="less" scoped></style>

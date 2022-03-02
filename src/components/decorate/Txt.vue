<template>
  <div>
    <p
      :style="{
        'font-size': obj.options.fontSize,
        color: obj.options.color,
        'text-align': obj.options.textAlign
      }"
    >
      {{ obj.options.value }}
    </p>
  </div>
</template>
<script>
export default {
  name: "Txt",
  props: ["obj"],
  data() {
    return {};
  },
  mounted() {}
};
</script>
<style lang="less" scoped></style>

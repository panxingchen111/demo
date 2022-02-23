<template>
  <div class="page">
    <draggable
      :options="{ group: 'article', disabled: false }"
      class="draggable2"
    >
      <div v-for="(item, index) in list" :key="index">
        <div
          class="draggable2-list"
          @click="show(item, index)"
          :class="index == activeIndex ? 'active' : ''"
        >
          <p>{{ item.id }}-{{ item.name }}</p>
          <i
            class="el-icon-circle-close del"
            @click.stop="del(item.index)"
            v-show="index == activeIndex"
          ></i>
        </div>
      </div>
    </draggable>
  </div>
</template>
<script>
import draggable from "vuedraggable";
import Bus from "./bus";
export default {
  components: {
    draggable
  },
  name: "Center",
  data() {
    return {
      list: [],
      activeIndex: 0
    };
  },
  created() {
    Bus.$on("decorationInfo", item => {
      this.list.push(item);
      console.log(99999999, this.list);
    });
  },
  methods: {
    del(item, index) {
      this.list.splice(index, 1);
    },
    sort(item, index) {},
    show(item, i) {
      this.activeIndex = i;
      console.log(i);
    }
  }
};
</script>
<style lang="less" scoped>
.page {
  width: 100%;
  min-height: 620px;
  height: 100%;
  background: #f2f2f2;
}
.draggable2 {
  height: 100%;
}
.draggable2-list {
  min-height: 40px;
  line-height: 40px;
  cursor: pointer;
  position: relative;
}
.active {
  border: dashed #409eff;
}
.del {
  color: #409eff;
  position: absolute;
  right: -15px;
  top: 20px;
}
</style>

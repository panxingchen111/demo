<template>
  <div>
    <div v-for="(item, index) in moduleList" :key="index">
      <p>{{ item.name }}</p>
      <div class="list">
        <div
          v-for="(data, index) in item.children"
          :key="data.id"
          class="list-data"
        >
          <draggable
            :list="item.children"
            @end="end($event, data, index)"
            class="draggable1"
            :options="{
              group: { name: 'article', pull: 'clone', put: false },
              sort: false
            }"
          >
            <el-card shadow="hover">
              <i :class="`${data.icon}`"></i>
              <div class="list-data-span">{{ data.name }}</div>
            </el-card>
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { moduleList } from "../../../model/index";
import draggable from "vuedraggable";
import Bus from "./bus";
export default {
  name: "LeftSide",
  components: {
    draggable
  },
  data() {
    return {
      moduleList: moduleList
    };
  },
  created() {},
  methods: {
    end(e, item, index) {
      if (e.to.className != "draggable2") {
        return; //禁止其他区域触发事件
      } else {
        Bus.$emit("data", item);
      }
    }
  }
};
</script>
<style lang="less" scoped>
p {
  text-align: left;
}
.list {
  display: flex;
  flex-flow: wrap;
}
.list-data {
  width: 50%;
  .list-data-span {
    font-size: 12px;
  }
}
.el-card {
  margin: 5px;
  border: 0.5px solid #ebeef5 !important;
  cursor: pointer;
}
/deep/ .el-card__body {
  padding: 10px !important;
}
</style>

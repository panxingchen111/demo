<template>
  <div>
    <div v-for="(item, index) in moduleList" :key="index">
      <p>{{ item.name }}</p>
      <div class="list">
        <div v-for="(data, id) in item.children" :key="id" class="list-data">
          <draggable>
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
  created() {
    console.log(3333, moduleList);
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
    font-size: 14px;
  }
}
.el-card {
  margin: 5px;
}
</style>

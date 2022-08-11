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
          <i
            class="el-icon-circle-close del"
            @click.stop="del(item, index)"
            v-show="index == activeIndex"
          ></i>
          <!-- 文本标签 -->
          <Txt v-if="item.id == 'txt'" :obj="item"></Txt>
          <!-- 文本标签 -->
          <!-- 轮播图 -->
          <Slideshow v-else-if="item.id == 'carousel'" :obj="item"></Slideshow>
          <!-- 轮播图 -->
          <!-- 秒杀商品组件 -->
          <SecondsKillGoods
            v-else-if="item.id == 'secondsKillGoods'"
            :obj="item"
          ></SecondsKillGoods>
          <!-- 秒杀商品组件 -->
          <!-- 全部商品 -->
          <AllGoods v-else-if="item.id == 'allGoods'"></AllGoods>
          <!-- 全部商品 -->
          <!-- 推荐商品 -->
          <RecommendGoods
            v-else-if="item.id == 'hotGoods'"
            :obj="item"
          ></RecommendGoods>
          <!-- 推荐商品 -->
          <p v-else>{{ item.id }}-{{ item.name }}</p>
        </div>
      </div>
      <h3 v-if="list.length == 0" style="padding-top:10px">
        可将左侧控件拖入当前位置，实现装修功能。
      </h3>
    </draggable>
  </div>
</template>
<script>
import Txt from "../../../components/decorate/Txt";
import Slideshow from "../../../components/decorate/Slideshow";
import SecondsKillGoods from "../../../components/decorate/SecondsKillGoods";
import AllGoods from "../../../components/decorate/AllGoods";
import RecommendGoods from "../../../components/decorate/RecommendGoods.vue";
import draggable from "vuedraggable";
import Bus from "./bus";
export default {
  components: {
    draggable,
    Txt,
    Slideshow,
    SecondsKillGoods,
    AllGoods,
    RecommendGoods
  },
  name: "Center",
  data() {
    return {
      list: [],
      activeIndex: 0
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      Bus.$on("data", data => {
        let obj = JSON.parse(JSON.stringify(data));
        this.list.push(obj);
        this.activeIndex = this.list.length - 1;
        this.show(obj, this.activeIndex);
      });
    },
    del(item, index) {
      this.list.splice(index, 1);
      this.show(this.list[index], index);
    },
    sort(item, index) {},
    show(item, index) {
      this.activeIndex = index;
      Bus.$emit("edit", item, index, this.list);
    }
  }
};
</script>
<style lang="less" scoped>
.page {
  background: #f2f2f2;
  min-height: 78vh;
  margin-right: 15px;
  border-radius: 6px;
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
  position: relative;
}
.del {
  color: #409eff;
  position: absolute;
  right: -15px;
  top: 50%;
}
</style>

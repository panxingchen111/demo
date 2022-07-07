<template>
  <div>
    <p
      class="title"
      :style="{
        'font-size': obj.options.fontSize,
        color: obj.options.color,
        'text-align': obj.options.textAlign
      }"
    >
      {{ obj.options.titleName }}
    </p>
    <el-row :gutter="10">
      <el-col
        v-for="(item, index) in imgList.slice(0, 5)"
        :key="index"
        :span="getLayout(index)"
        ><div class="images">
          <el-image :src="item.url"></el-image>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getImgList } from "../../api/test-service";

export default {
  name: "RecommendGoods",
  props: ["obj"],
  data() {
    return {
      imgList: []
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      let obj = {
        time: new Date().getTime()
      };
      getImgList(obj).then(res => {
        this.imgList = res.data.imgList;
      });
    },
    getLayout(index) {
      const val = this.obj.options.layout;
      if (val === 1) {
        if (index == 0) {
          return 16;
        } else {
          return 8;
        }
      }
      if (val == 2) {
        if (index == 3) {
          return 16;
        } else {
          return 8;
        }
      } else {
        if (index == 0) {
          return 24;
        } else {
          return 6;
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
// .el-row {
//   margin-bottom: 20px;
//   &:last-child {
//     margin-bottom: 0;
//   }
// }
.el-col {
  border-radius: 4px;
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  height: 180px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.title {
  margin: 0;
  position: relative;
  margin-left: 5px;
  &::before {
    position: absolute;
    width: 2px;
    height: 20px;
    content: "";
    background: black;
    top: 10px;
    margin-left: -5px;
  }
  &:hover::before {
    background-color: #409eff;
  }
}
.images {
  overflow: hidden;
}
.el-image {
  width: 100%;
  height: 200px;
  transition: all 0.6s;
  cursor: pointer;
  &:hover {
    transform: scale(1.3);
  }
}
</style>

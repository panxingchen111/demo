<template>
  <div>
    <p>轮播图设置</p>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="24">
        <div class="set-font">
          添加图片<i class="el-icon-circle-plus-outline" @click="show"></i>
        </div>
      </el-col>
      <el-col
        :span="24"
        v-for="(item, index) in curObj.options.imgList"
        :key="index"
      >
        <div class="img-set">
          <el-image
            style="width: 100px; height: 100px"
            :src="item.url"
            fit="contain"
          ></el-image>
          <i class="el-icon-delete del" @click="del(item, index)"></i
          ><i
            class="el-icon-arrow-up sort-up"
            @click="sort(item, index, 1)"
            v-show="index > 0"
          ></i>
          <i
            class="el-icon-arrow-down sort-down"
            @click="sort(item, index, 2)"
            v-show="index != curObj.options.imgList.length - 1"
          ></i>
        </div>
        <div class="set-font">跳转链接</div>
        <el-input
          clearable
          class="set-select"
          placeholder="请输入"
          v-model="item.btnUrl"
          size="small"
        ></el-input>
        <el-divider></el-divider>
      </el-col>
    </el-row>
    <img-dialog
      v-if="flag"
      :flag="flag"
      :close="close"
      :callBack="saveData"
    ></img-dialog>
  </div>
</template>
<script>
import ImgDialog from "../imgDialog.vue";
export default {
  components: { ImgDialog },
  name: "SlideshowSet",
  props: ["obj", "callBack"],
  data() {
    return {
      curObj: {
        options: {}
      },
      flag: false
    };
  },
  mounted() {
    if (this.obj) {
      this.curObj = this.obj;
    }
  },
  watch: {
    obj: {
      handler(newVal) {
        if (newVal) {
          this.curObj = newVal;
        }
      },
      deep: true
    },
    curObj: {
      handler(newVal) {
        if (newVal) {
          this.curObj = newVal;
          this.callBack(newVal);
        }
      },
      deep: true
    }
  },
  methods: {
    show() {
      this.flag = true;
    },
    close() {
      this.flag = false;
    },
    saveData(data) {
      this.curObj.options.imgList = data;
    },
    del(item, index) {
      this.curObj.options.imgList.splice(item, 1);
    },
    sort(item, index, type) {
      //type =1是降序2是升序
      if (type == 1) {
      } else {
      }
    }
  }
};
</script>

<style lang="less" scoped>
p {
  text-align: left;
}
.set-font {
  font-size: 12px;
  text-align: left;
  cursor: pointer;
}
.set-select {
  margin-top: 10px;
}
.set-font-right {
  font-size: 12px;
  text-align: right;
}
.set-align {
  font-size: 12px;
  text-align: left;
  margin-top: 10px;
}
.el-col {
  margin-bottom: 10px;
}
.img-set {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.del,
.sort-up,
.sort-down {
  cursor: pointer;
}
</style>

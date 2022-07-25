<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="16">
        <el-card shadow="hover">
          <div class="main">
            <div id="main" style="width: 100%; height: 550px"></div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <!-- 天气插件 -->
        <el-card shadow="hover">
          <div style="margin-left: -60px;">
            <iframe
              width="450"
              height="40"
              frameborder="0"
              scrolling="no"
              hspace="0"
              src="https://i.tianqi.com/?c=code&a=getcode&id=40&icon=1"
              class="iframe1"
            ></iframe>
          </div>
        </el-card>
        <el-card shadow="hover" class="info">
          <div class="info-item">
            <span>本次登录地点：</span>
            <span>{{ address }}</span>
          </div>
          <el-divider></el-divider>
          <div class="info-item">
            <span>本次登录时间：</span> <span>{{ time }}</span>
          </div>
        </el-card>
        <el-card shadow="hover" class="info">
          <div
            slot="header"
            style="display: flex;justify-content: space-between;"
          >
            <span>近期事项</span>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              @click="view"
              >查看更多...</el-button
            >
          </div>
          <el-table
            :data="backLogList.slice(0, 5)"
            style="width: 100%"
            :show-header="false"
          >
            <el-table-column fixed prop="title" label="">
              <template slot-scope="scope">
                <span
                  :class="scope.row.status === 1 ? 'isStatus' : 'noStatus'"
                  >{{ scope.row.title }}</span
                >
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="" width="120" align="right">
              <template slot-scope="scope">
                <el-button
                  icon="el-icon-edit"
                  circle
                  @click="edit(scope.row)"
                  size="mini"
                >
                </el-button>
                <el-button
                  icon="el-icon-delete"
                  circle
                  @click="del(scope.row)"
                  :disabled="scope.row.status === 1"
                  size="mini"
                >
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <!-- <img src="../assets/bg.jpeg" class="image" /> -->
    <iframe
      id="geoPage"
      width="0"
      height="0"
      frameborder="0"
      style="display:none;"
      scrolling="no"
      src="https://apis.map.qq.com/tools/geolocation?key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp"
    ></iframe>
  </div>
</template>
<script>
import * as echarts from "echarts";
import "@/utils/china.js";
import { getBackLogList } from "../api/test-service";
export default {
  data() {
    return {
      list: [],
      address: "",
      time: "",
      backLogList: []
    };
  },
  created() {
    this.getLog();
  },
  mounted() {
    window.addEventListener("message", this.getIp);
    this.time = this.dayjs(this.$store.getters.getTime).format(
      "YYYY-MM-DD HH:mm:ss"
    );
  },
  destroyed() {
    // 在组件生命周期结束的时候销毁。
    window.removeEventListener("message", this.getIp);
  },
  methods: {
    getIp(e) {
      if (e.data && e.data.province) {
        console.log("1", e.data);
        let obj = {
          name: e.data.province.slice(0, e.data.province.length - 1),
          selected: true
        };
        this.list[0] = obj;
        this.address = e.data.nation + "-" + e.data.province;
        this.init();
      }
    },
    init() {
      const options = {
        //标题样式
        title: {
          text: "",
          x: "center",
          y: "0%",
          textStyle: {
            fontSize: 20,
            color: "#333"
          }
        },
        //这里设置提示框 (鼠标悬浮效果)
        tooltip: {
          //数据项图形触发
          trigger: "item",
          //提示框浮层的背景颜色。 (鼠标悬浮后的提示框背景颜色)
          backgroundColor: "white",
          //字符串模板(地图): {a}（系列名称），{b}（区域名称），{c}（合并数值）,{d}（无）
          formatter: "地区：{b}"
        },
        // visualMap: {
        //   top: "center",
        //   left: "left",
        //   // 数据的范围
        //   min: 10,
        //   max: 100,
        //   text: ["高", "低"],
        //   realtime: true, //拖拽时，是否实时更新
        //   calculable: true, //是否显示拖拽用的手柄
        //   inRange: {
        //     // 颜色分布
        //     color: ["white", "Tomato", "orangered"]
        //   }
        // },
        series: [
          {
            // name: "确诊",
            type: "map",
            mapType: "china",
            roam: true,
            areaColor: "red",
            //是否开启鼠标缩放和平移漫游
            itemStyle: {
              //地图区域的多边形 图形样式
              normal: {
                //是图形在默认状态下的样式
                label: {
                  show: true, //是否显示标签
                  textStyle: {
                    color: "black"
                  }
                }
              },
              zoom: 1,
              //地图缩放比例,默认为1
              emphasis: {
                //是图形在高亮状态下的样式,比如在鼠标悬浮或者图例联动高亮时
                label: { show: true },
                areaColor: "#b3c0d1"
              }
            },
            top: "0%",
            left: "15%",
            data: this.list,
            select: {
              // 地图选中区域样式
              label: {
                // 选中区域的label(文字)样式
                color: "black"
              },
              itemStyle: {
                // 选中区域的默认样式
                areaColor: "#b3c0d1"
              }
            }
          }
        ]
      };
      let chartDom = document.getElementById("main");
      let myChart = echarts.init(chartDom);

      // 获取数据
      // this.request.get("/echarts/epidemic").then(res => {
      //   this.total = res.data.chinaTotal.total;
      //   this.today = res.data.chinaTotal.today;
      //   this.extData = res.data.chinaTotal.extData;

      //   let data = [{ name: "南海诸岛", value: 0 }];
      //   res.data.areaTree[2].children.forEach(item => {
      //     data.push({
      //       name: item.name,
      //       value: item.total.confirm - item.total.dead - item.total.heal
      //     });

      //     options.series[0].data = data;
      myChart.setOption(options);
      myChart.on("click", function(param) {});
      //   });
      // });
    },
    async getLog() {
      let res = await getBackLogList({
        roleId: this.$store.state.userInfo.id,
        time: new Date().valueOf()
      });
      if (res) {
        this.backLogList = res.data.list;
      }
    },
    view() {
      this.$message({
        type: "info",
        message: "正在拼命开发中..."
      });
    },
    edit(row) {},
    del(row) {}
  }
};
</script>
<style lang="less" scoped>
.card {
  margin: 20px;
}
.info {
  margin-top: 20px;
  .info-item {
    display: inline-flex;
    justify-content: space-between;
    width: 100%;
    font-size: 14px;
    color: gray;
  }
}
.el-divider--horizontal {
  margin: 10px 0;
}
.isStatus {
  text-decoration: line-through;
  color: gray;
}
.noStatus {
  color: gray;
}
</style>

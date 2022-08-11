<template>
  <div ref="home" class="home">
    <div class="card-group">
      <el-card class="card-group-item" shadow="hover">
        <el-row>
          <el-col :span="8">
            <i class="el-icon-user" style="font-size:28px"></i>
          </el-col>
          <el-col :span="16">
            <h2>{{ obj.addUser }}</h2>
            <div>新增用户</div>
          </el-col>
        </el-row>
      </el-card>
      <el-card class="card-group-item" shadow="hover">
        <el-row>
          <el-col :span="8">
            <i class="el-icon-video-play" style="font-size:28px"></i>
          </el-col>
          <el-col :span="16">
            <h2>{{ obj.clicks }}</h2>
            <div>累计点击</div>
          </el-col>
        </el-row>
      </el-card>
      <el-card class="card-group-item" shadow="hover">
        <el-row>
          <el-col :span="8">
            <i class="el-icon-share" style="font-size:28px"></i>
          </el-col>
          <el-col :span="16">
            <h2>{{ obj.addShare }}</h2>
            <div>分享统计</div>
          </el-col>
        </el-row>
      </el-card>
      <el-card class="card-group-item" shadow="hover">
        <el-row>
          <el-col :span="8">
            <i class="el-icon-document-add" style="font-size:28px"></i>
          </el-col>
          <el-col :span="16">
            <h2>{{ obj.addPage }}</h2>
            <div>新增页面</div>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <el-card shadow="always" class="card-header-2">
      <el-row class="row-set">
        <el-col :span="12" class="card-header-1">
          <h3>
            访问量<span @click="download" style="margin-left:10px">
              <el-tooltip
                class="item"
                effect="light"
                content="导出pdf"
                placement="top"
              >
                <i class="el-icon-document"></i
              ></el-tooltip>
            </span>
          </h3>
        </el-col>
        <el-col :span="12" class="col-right">
          <el-date-picker
            v-model="date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="selectDate"
            value-format="timestamp"
          >
          </el-date-picker>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row class="row-set">
        <el-col :span="16">
          <div id="main" ref="chart" style="height:300px"></div>
        </el-col>
        <el-col :span="8" class="card-header-1">
          <h3>访问量排行</h3>
          <div v-for="(item, index) in obj.pageViewRanking" :key="index">
            <div class="list-set">
              <div :style="{ color: index + 1 < 4 ? 'red' : '' }">
                {{ index + 1 }}
              </div>
              <div>{{ item.name }}</div>
              <div>{{ item.value }}</div>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import * as echarts from "echarts";
require("echarts/theme/macarons"); //引入主题
require("echarts/lib/component/legend");
import { getChartsInfo } from "../../api/test-service";
import pdf from "../../utils/htmlToPdf";
export default {
  data() {
    return {
      date: [],
      obj: {
        addUser: null,
        addPage: null,
        addShare: null,
        clicks: null,
        pageViewlist: [],
        pageViewRanking: []
      }
    };
  },
  created() {
    // console.log(11111111,new Date().valueOf())
    // new Date().toLocaleDateString(); //时间改为当天的00:00:00
    //new Date(new Date().toLocaleDateString()).getTime() - 31 * 24 * 3600 * 1000
    //31 * 24 * 3600 * 1000 计算一个月的时间戳，如需计算一周，则改成 7 * 24 * 3600 * 1000
    this.date[1] = new Date().getTime();
    this.date[0] =
      new Date(new Date().toLocaleDateString()).getTime() -
      31 * 24 * 3600 * 1000;
    // this.load();
  },
  mounted() {
    this.initChart();
  },
  methods: {
    load() {},
    selectDate(val) {
      this.date = val;
      this.initChart();
    },
    initChart() {
      let nameArr = [];
      let valueArr = [];
      let obj = {
        firstTime: this.date[0],
        endTime: this.date[1]
      };
      getChartsInfo(obj)
        .then(res => {
          this.obj = res.data;
          if (this.obj.pageViewlist.length > 0) {
            this.obj.pageViewlist.forEach(i => {
              nameArr.push(i.name);
              valueArr.push(i.value);
            });
          }
          //基于准备好的dom，初始化echarts实例
          let myChart = echarts.init(document.getElementById("main"));
          // 绘制图表
          myChart.setOption({
            title: {
              text: "访问量趋势"
            },
            tooltip: {
              trigger: "axis",
              axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            xAxis: {
              data: nameArr
            },
            yAxis: {},
            color: ["#409eff"],
            series: [
              {
                name: "人数",
                type: "bar",
                data: valueArr
              }
            ]
          }); // 添加点击事件
          myChart.on("click", function(param) {
            console.log(1111111111, param);
          });
        })
        .catch(e => {});
    },
    download() {
      pdf.downloadPDF(document.querySelector(".home"), "访问量");
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/defaultStyle/index.less";
</style>

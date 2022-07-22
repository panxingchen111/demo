<template>
  <div>
    <!-- <viewer :images="imgList">
      <el-row :gutter="20">
        <el-col v-for="(item, index) in imgList" :key="index" :span="5">
          <el-card shadow="hover">
            <img :src="item.url" />
          </el-card>
        </el-col>
      </el-row>
    </viewer> -->
    <el-card style="margin-top: 10px">
      <el-table
        ref="multipleTable"
        :data="imgList"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        row-key="id"
        max-height="450"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="id" label="编号" width="160"> </el-table-column>
        <el-table-column prop="url" label="图片" align="left">
          <template slot-scope="scope">
            <el-image
              style="width: 160px; height: 50px"
              :src="scope.row.url"
              :preview-src-list="[scope.row.url]"
            >
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">{{ scope.row.createTime }}</template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="remove(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          hide-on-single-page
          @current-change="handleCurrentChange"
          :current-page.sync="obj.pageIndex"
          :page-size="obj.pageSize"
          layout="total, prev, pager, next"
          :total="total"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>
<script>
import { getResImgList } from "../../api/test-service";
export default {
  data() {
    return {
      obj: {
        pageSize: 10,
        pageIndex: 1
      },
      total: 0,
      imgList: [],
      multipleSelection: []
    };
  },
  created() {
    let date = new Date().valueOf();
    console.log(this.dayjs().format("YYYY-MM-DD"), date);
    this.$store.commit("getList", 12);
    this.load();
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleCurrentChange(val) {
      this.obj.pageIndex = val;
      this.load();
    },
    async load() {
      let res = await getResImgList(this.obj);
      if (res) {
        this.imgList = res.data.list;
        this.total = res.data.total;
      }
    },
    remove(row) {
      this.$confirm(`是否删除当前图片?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/defaultStyle/index.less";
</style>

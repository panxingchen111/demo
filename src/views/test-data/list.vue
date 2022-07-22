<template>
  <div>
    <el-card shadow="always" class="card-header-1">
      <el-row>
        <el-col :span="12">
          <el-button type="primary" icon="el-icon-plus" size="small"
            >新增</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="small"
            @click="del"
            :disabled="selectArr.length == 0"
            >删除</el-button
          >
        </el-col>
        <el-col :span="12">
          <el-input
            clearable
            placeholder="请输入编号"
            class="card-top-input"
            v-model="obj.id"
          ></el-input>
          <el-button
            type="primary"
            icon="el-icon-search"
            size="small"
            @click="search"
            >搜索</el-button
          >
          <el-button
            type="info"
            icon="el-icon-refresh"
            size="small"
            @click="reset"
            >重置</el-button
          >
        </el-col>
      </el-row>
    </el-card>
    <el-card shadow="always" class="card-header-2">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        row-key="id"
        max-height="450"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="编号" prop="id"> </el-table-column>
        <el-table-column label="vue" prop="vue"> </el-table-column>
        <el-table-column label="React" prop="React"> </el-table-column>
        <el-table-column label="Redis" prop="Redis"> </el-table-column>
        <el-table-column label="springboot" prop="springboot">
        </el-table-column>
        <el-table-column label="wechat" prop="wechat"> </el-table-column>
        <el-table-column label="ES6" prop="ES6"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip content="编辑" placement="top"    v-if="$checkRights(['test-data:list:del'])">
              <el-button
                type="primary"
                icon="el-icon-edit"
                circle
                size="mini"
                @click="handler(scope.row, 1)"
              ></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                size="mini"
                @click="handler(scope.row, 2)"
              ></el-button>
            </el-tooltip>
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
import { getList } from "../../api/test-service";
export default {
  data() {
    return {
      tableData: [],
      obj: {
        id: "",
        pageSize: 10,
        pageIndex: 1
      },
      total: 0,
      selectArr: []
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      getList(this.obj)
        .then(res => {
          console.log(111111111111, res);
          this.tableData = res.data.list;
          this.total = res.data.total;
        })
        .catch(e => {});
    },
    //全选、多选
    handleSelectionChange(val) {
      this.selectArr = val.map(item => item.id);
    },
    //批量删除
    del() {
      let ids = this.selectArr.toString();
      console.log(1111111, ids);
      this.$confirm(`是否删除编号为${ids}的数据?`, "提示", {
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
    },
    //搜索
    search() {
      this.obj.pageIndex = 1;
      this.load();
    },
    handleCurrentChange(val) {
      this.obj.pageIndex = val;
      this.load();
    },
    //重置
    reset() {
      this.obj.id = "";
      this.obj.pageIndex = 1;
      this.load();
    },
    handler(item, type) {
      // type: 1是编辑2是删除
      console.log(item, type);
      if (type == 1) {
      }
      if (type == 2) {
        this.$confirm(`是否删除编号为${item.id}的数据?`, "提示", {
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
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/defaultStyle/index.less";
</style>

<template>
  <div>
    <el-card>
      <el-row>
        <el-col :span="12" style="text-align:left">
          <el-button
            size="small"
            type="primary"
            @click="add"
            v-if="$checkRights(['data-manage:list:add'])"
            icon="el-icon-plus"
            >新增</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="del"
            v-if="$checkRights(['data-manage:list:del'])"
            icon="el-icon-delete"
            >删除</el-button
          >
        </el-col>
        <el-col :span="12">
          <el-input
            clearable
            placeholder="请输入姓名"
            class="card-top-input"
            v-model="obj.name"
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
    <el-card style="margin-top: 10px">
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
        <el-table-column prop="name" label="姓名" width="160">
        </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column label="登录时间">
          <template slot-scope="scope">{{ scope.row.createTime }}</template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="remove(scope.row)"
              v-if="$checkRights(['data-manage:list:del'])"
              >删除</el-button
            >
            <el-button type="text" size="small" @click="edit(scope.row)"
              >编辑</el-button
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
import Sortable from "sortablejs";
import { getResList } from "../../api/test-service";
export default {
  components: {
    Sortable
  },
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      obj: {
        name: "",
        pageSize: 10,
        pageIndex: 1
      },
      total: 0
    };
  },
  created() {
    // let rights = this.$checkRights(['data-manage:list:del'])
    // console.log(1111111111,rights)
    this.load();
  },
  mounted() {
    this.setSort();
  },
  methods: {
    async load() {
      let res = await getResList(this.obj);
      if (res) {
        this.tableData = res.data.list;
        this.total = res.data.total;
      }
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
      this.obj.name = "";
      this.obj.pageIndex = 1;
      this.load();
    },
    setSort() {
      const el = this.$refs.multipleTable.$el.querySelectorAll(
        ".el-table__body-wrapper > table > tbody"
      )[0];
      this.sortable = Sortable.create(el, {
        ghostClass: "sortable-ghost", // Class name for the drop placeholder,
        setData: function(dataTransfer) {
          // to avoid Firefox bug
          // Detail see : https://github.com/RubaXa/Sortable/issues/1012
          dataTransfer.setData("Text", "");
        },
        onEnd: evt => {
          const targetRow = this.tableData.splice(evt.oldIndex, 1)[0];
          this.tableData.splice(evt.newIndex, 0, targetRow);

          // for show the changes, you can delete in you code
          const tempIndex = this.tableData.splice(evt.oldIndex, 1)[0];
          this.tableData.splice(evt.newIndex, 0, tempIndex);
          console.log(888888888, targetRow, evt.newIndex);
          // evt.newIndex为拖拽后的顺序,targetRow是拖拽的那条数据,根据接口要求传参给后台
        }
      });
    },
    add() {},
    del() {
      if (this.multipleSelection.length == 0) {
        this.$message({
          message: "至少选择一条数据",
          type: "warning"
        });
        return;
      } else {
        let arr = this.multipleSelection.map(item => item.id).join(",");
        let names = this.multipleSelection.map(item => item.name).join(",");
        this.$confirm(`是否删除${names}用户的数据?`, "提示", {
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
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    edit(row) {},
    remove(row) {
      this.$confirm(`是否删除${row.name}用户的数据?`, "提示", {
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

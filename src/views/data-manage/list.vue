<template>
  <div>
    <el-card>
      <el-row>
        <el-col :span="4" style="text-align:left">
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
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="日期" width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="address" label="地址" show-overflow-tooltip>
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
    </el-card>
  </div>
</template>
<script>
import Sortable from "sortablejs";
export default {
  components: {
    Sortable
  },
  data() {
    return {
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          id: 1
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          id: 2
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          id: 3
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          id: 4
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          id: 5
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          id: 6
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          id: 7
        }
      ],
      multipleSelection: []
    };
  },
  created() {
    // let rights = this.$checkRights(['data-manage:list:del'])
    // console.log(1111111111,rights)
  },
  mounted() {
    this.setSort();
  },
  methods: {
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
          console.log(888888888, targetRow,evt.newIndex);
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
        console.log(arr);
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    edit(row) {},
    remove(row) {}
  }
};
</script>
<style lang="less" scoped></style>

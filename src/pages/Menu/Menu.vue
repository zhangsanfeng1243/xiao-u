<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>菜单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="primary" @click="goadd">添加</el-button>
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="id" label="菜单编号"></el-table-column>
      <el-table-column prop="title" label="菜单名称"></el-table-column>
      <el-table-column prop="icon" label="菜单图标"></el-table-column>
      <el-table-column prop="url" label="菜单地址"></el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.status | statusFormat}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$http.get("/api/menulist", { istree: true }).then((res) => {
      console.log(res);
      this.tableData = res.data.list;
    });
  },
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    goadd() {
      this.$router.push("/menu/add");
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.$router.push("/menu/edit?id=" + row.id);
    },
    handleDelete(i, row) {
      // console.log(index, row);
      this.$http.post("/api/menudelete", { id: row.id }).then((res) => {
        console.log(res);
        this.tableData = res.data.list;//handledelete方法报错显示未定义，未写到methods里面
      });
    },
  },
};
</script>
 
<style scoped>
</style>
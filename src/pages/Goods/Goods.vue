<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
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
      <el-table-column prop="id" label="商品编号"></el-table-column>
      <el-table-column prop="goodsname" label="商品名称"></el-table-column>
      <el-table-column prop="price" label="商品价格"></el-table-column>
      <el-table-column prop="market_price" label="市场价格"></el-table-column>
      <el-table-column prop="img" label="图片" width="180">
          <template slot-scope="scope">
             <img :src="'http://localhost:3000' + scope.row.img" alt="">
      
        </template> 
      </el-table-column>

     <el-table-column label="是否新品">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.isnew | isnewFormat}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="是否热卖">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.ishot | ishotFormat}}</el-tag>
        </template>
      </el-table-column>
         

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
    this.$http.get("/api/goodslist",{size:10,page:1}).then((res) => {
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
      this.$router.push("/goods/add");
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.$router.push("/goods/edit?id=" + row.id);
    },
    handleDelete(i, row) {
      // console.log(index, row);
      this.$http.post("/api/goodsdelete", { id: row.id }).then((res) => {
        console.log(res);
        this.tableData = res.data.list;//handledelete方法报错显示未定义，未写到methods里面
      });
    },
  },
};
</script>
 
<style scoped>
img {
  width: 150px;
}
</style>
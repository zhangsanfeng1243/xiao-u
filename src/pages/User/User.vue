<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>管理员列表</el-breadcrumb-item>
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
      <el-table-column prop="id" label="用户编号"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column  label="所属角色"><template slot-scope="scope">
          <el-tag>{{ scope.row.roleid |roleFormat(rolelist)}}</el-tag>
        </template></el-table-column>
        
     
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
export default {//调用用户接口，渲染数据
  mounted() {
    this.$http.get("/api/userlist", { size:10,page:1}).then((res) => {
      console.log(res);
      this.tableData = res.data.list;
    });
    //调用角色接口
    this.$http.get('/api/rolelist').then((res)=>{
        console.log(res);
         this.rolelist=res.data.list
    })
  },
//   filters:{
//       roleFormat(roleid,rolelist){
//         let item=rolelist.find(item=>{
//             return item.id==roleid
//         })
//         return item.rolename
//       }
//   },
    filters: {
        roleFormat(roleid, roleList) {
            // 根据所有的角色来进行查找满足roleid的那一项
            if (roleList.length > 0) {
                let item = roleList.find(item => {
                return item.id == roleid
            })
            console.log(item)
            return item.rolename;
            }
            
        }
    },
  data() {
    return {
        rolelist:[],
      tableData: [],
    };
  },
  methods: {
    goadd() {
      this.$router.push("/user/add");
    },
    handleEdit(index, row) {
      console.log(index, row);
    console.log(row);
      this.$router.push("/user/edit?id=" + row.uid);
    },
    handleDelete(i, row) {
      // console.log(index, row);
      this.$http.post("/api/userdelete", { uid: row.uid }).then((res) => {
        console.log(res);
        this.tableData = res.data.list;//handledelete方法报错显示未定义，未写到methods里面
      });
    },
  },
};
</script>
 
<style scoped>
</style>
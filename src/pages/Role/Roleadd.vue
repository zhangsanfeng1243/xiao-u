<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/role' }">角色列表</el-breadcrumb-item>
      <el-breadcrumb-item>{{rolename}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="角色名称" prop="rolename">
        <el-input v-model="ruleForm.rolename"></el-input>
      </el-form-item>

      <el-form-item label="角色权限" prop="menus">
        <el-tree
          :data="data"
          show-checkbox
          node-key="id"
          :default-expanded-keys="[2, 3]"
          :default-checked-keys="checkedarr"
          :props="defaultProps"
          ref="mytree"
          check-strictly
        ></el-tree>
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-switch v-model="ruleForm.status"></el-switch>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">{{buttonname}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
       id:'',
        rolename: "",
        menus: [],
        status: true,
      },
       rules: { // 每个表单元素的验证规则
                rolename: [
                    { required: true, message: '请输入菜单名称', trigger: 'blur' },
                ]
            },
       data: [],
       checkedarr:[],
    //    menulist:[],
       id:'',
       rolename:'',
       buttonname:'',

      defaultProps: {
        children: "children",
        label: "title",//表格中的数据渲染的是data中的这个字段，将这个字段改成菜单名
    }
      }
     
  },

  //回显
  mounted() {
    // console.log(this);
    if (this.$route.query.id) {
      //获取参数id，如果存在这个id，则证明是修改组件
      this.meuname = "角色修改";
      this.buttonname = "修改";
      this.$http
        .get("/api/roleinfo", { id: this.$route.query.id })
        .then((res) => {
          console.log(res);
          this.ruleForm = res.data.list;
          this.checkedarr=res.data.list.menus.split(',')
          if ((this.ruleForm.status = 1)) {
            this.ruleForm.status = true;
          } else {
            this.ruleForm.status = true;
          }
        });
    } else {
      this.meuname = "角色添加";
      this.buttonname = "添加";
    }

    //获取之前添加到数据库的菜单列表，并渲染到页面菜单选项中
    this.$http.get("/api/menulist", { istree: true }).then((res) => {
      // console.log(res)
      this.data = res.data.list;
    });
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //验证上面rules规则是否通过
          this.ruleForm.status = this.ruleForm.status ? 1 : 2;
          this.ruleForm.menus=this.$refs.mytree.getCheckedKeys() 
          if (this.$route.query.id) {
            //如果有id，证明是修改页面，则调用修改的接口
            this.ruleForm.id=this.$route.query.id
            this.$http.post("/api/roleedit", this.ruleForm).then((res) => {
              console.log(res);
         

              this.$router.back();
            });
          } else {
             //有返回值，用menus接收,这个menus选中的id的数组
             console.log(this.ruleForm.menus);
            //否则则是添加组件，调用添加到数据库的接口
            //在调接口前需检查要传的参数是否符合要求
            this.$http.post("/api/roleadd", this.ruleForm).then((res) => {
              console.log(res);
              this.$router.back();
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
</style>
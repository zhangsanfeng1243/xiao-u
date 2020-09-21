<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/menu' }">管理员列表</el-breadcrumb-item>
      <el-breadcrumb-item>{{meuname}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="角色编号" prop="roleid">
        <el-select v-model="ruleForm.roleid" placeholder="请选择">
          <el-option
            :label="item.rolename"
            :value="item.id"
            v-for="item in menulist "
            :key="item.id"
          ></el-option>
        </el-select>
        <!-- 此处用到menulist -->
      </el-form-item>

      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password"></el-input>
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
  //回显
  mounted() {
    // console.log(this);
    if (this.$route.query.id) {
      //获取参数id，如果存在这个id，则证明是修改组件
      this.meuname = "用户修改";
      this.buttonname = "修改";
      this.$http
        .get("/api/userinfo", { uid: this.$route.query.id })
        .then((res) => {
          console.log(res);
          this.ruleForm = res.data.list;
          this.ruleForm.password=''
           console.log(res);
          if (this.ruleForm.status == 1) {
            this.ruleForm.status = true;
          } else {
            this.ruleForm.status = false;
          }
        });
    } else {
      this.meuname = "用户添加";
      this.buttonname = "添加";
    }

    //获取之前添加到数据库的菜单列表，并渲染到页面菜单选项中
    this.$http.get("/api/rolelist").then((res) => {
      // console.log(res)
      this.menulist = res.data.list;

      //   console.log(this.menulist);
    });
  },
  data() {
    return {
      meuname: "",
      buttonname: "",
      menulist: [], //获取之前添加到数据库的菜单列表
      ruleForm: {
        roleid: "",
        username: "",
        password: "",
        status: true,
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        roleid: [{ required: true, message: "请选择", trigger: "change" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //验证上面rules规则是否通过
          this.ruleForm.status = this.ruleForm.status ? 1 : 2;
          if (this.$route.query.id) {
            //如果有id，证明是修改页面，则调用修改的接口
            this.$http.post("/api/useredit", this.ruleForm).then((res) => {
              console.log(res);

              this.$router.back();
            });
          } else {
            //否则则是添加组件，调用添加到数据库的接口
            this.$http.post("/api/useradd", this.ruleForm).then((res) => {
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
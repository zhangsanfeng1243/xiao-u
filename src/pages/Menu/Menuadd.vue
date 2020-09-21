<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/menu' }">菜单列表</el-breadcrumb-item>
      <el-breadcrumb-item>{{meuname}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      :model="ruleForm"
      :rules="rules"    
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="菜单名称" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>

      <el-form-item label="上级菜单" prop="pid">
        <el-select v-model="ruleForm.pid" placeholder="请选择">
          <el-option label="顶级菜单" :value="0"></el-option>
          <el-option :label="item.title" :value="item.id" v-for="item in menulist " :key="item.id"></el-option>
        </el-select><!-- 此处用到menulist -->
      </el-form-item>

      <el-form-item label="菜单类型" prop="type">
        <el-radio-group v-model="ruleForm.type">
          <el-radio :label="1">目录</el-radio><!-- Radio 的 value -->
          <el-radio :label="2">菜单</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="菜单图标" v-show="ruleForm.type==1" prop="icon">
        <el-input type="textarea" v-model="ruleForm.icon"></el-input>
      </el-form-item>

      <el-form-item label="菜单地址" v-show="ruleForm.type==2" prop="url">
        <el-input type="textarea" v-model="ruleForm.url"></el-input>
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
    if (this.$route.query.id) {//获取参数id，如果存在这个id，则证明是修改组件
      this.meuname = "菜单修改";
      this.buttonname = "修改";
      this.$http
        .get("/api/menuinfo", { id: this.$route.query.id })
        .then((res) => {
          console.log(res);
          this.ruleForm = res.data.list;
          if ((this.ruleForm.status = 1)) {
            this.ruleForm.status = true;
          } else {
            this.ruleForm.status = true;
          }
        });
    } else {
      this.meuname = "菜单添加";
      this.buttonname = "添加";
    }

    //获取之前添加到数据库的菜单列表，并渲染到页面菜单选项中
    this.$http.get("/api/menulist", { istree: true }).then((res) => {
      // console.log(res)
      this.menulist = res.data.list;
    });
  },
  data() {
    return {
      meuname: "",
      buttonname: "",
      menulist: [], //获取之前添加到数据库的菜单列表
      ruleForm: {
        pid: "",
        title: "",
        icon: "",
        type: "1",
        url: "",
        status: true,
      },
      rules: {
        name: [{ required: true, message: "请输入菜单名称", trigger: "blur" }],
        pid: [{ required: true, message: "请选择上级菜单", trigger: "change" }],
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
            this.$http.post("/api/menuedit", this.ruleForm).then((res) => {
              console.log(res);

              this.$router.back();
            });
          } else {
            //否则则是添加组件，调用添加到数据库的接口
            this.$http.post("/api/menuadd", this.ruleForm).then((res) => {
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
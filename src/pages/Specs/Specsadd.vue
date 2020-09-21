<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/specs' }">菜单列表</el-breadcrumb-item>
      <el-breadcrumb-item>{{meuname}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="规格名称" prop="specsname">
        <el-input v-model="ruleForm.specsname"></el-input>
      </el-form-item>

      <el-form-item
        v-for="(domain, index) in ruleForm.attrs"
        :label="'规格属性' + index"
        :key="domain.key"
      >
        <el-input v-model="domain.value"></el-input>
        <el-button @click="addDomain" v-if="index==0">新增属性</el-button>
        <el-button @click.prevent="removeDomain(domain)" v-if="index!=0">删除</el-button>
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
      this.meuname = "规格修改";
      this.buttonname = "修改";
      this.$http
        .get("/api/specsinfo", { id: this.$route.query.id })
        .then((res) => {
          console.log(res);
          this.ruleForm.specsname = res.data.list[0].specsname;

          this.ruleForm.attrs = res.data.list[0].attrs.map((item) => {
            return { value: item };
          });

          if (this.ruleForm.status == 1) {
            this.ruleForm.status = true;
          } else {
            this.ruleForm.status = false;
          }
        });
    } else {
      this.meuname = "规格添加";
      this.buttonname = "添加";
    }

    //获取之前添加到数据库的菜单列表，并渲染到页面菜单选项中
    // this.$http.get("/api/menulist", { istree: true }).then((res) => {
    //   // console.log(res)
    //   this.menulist = res.data.list;
    // });
  },
  data() {
    return {
      dynamicValidateForm: {
        domains: [
          {
            value: "",
          },
        ],
        email: "",
      },
      meuname: "",
      buttonname: "",
      menulist: [], //获取之前添加到数据库的菜单列表
      ruleForm: {
        specsname: "",
        attrs: [{ value: "" }],
        status: true,
      },
    };
  },
  methods: {
    removeDomain(item) {
      var index = this.ruleForm.attrs.indexOf(item);
      if (index !== -1) {
        this.ruleForm.attrs.splice(index, 1);
      }
    },
    addDomain() {
      this.ruleForm.attrs.push({
        value: "",
        key: Date.now(),
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //验证上面rules规则是否通过
          this.ruleForm.status = this.ruleForm.status ? 1 : 2;
          this.ruleForm.attrs = this.ruleForm.attrs
            .map((item) => {
              return item.value;
            })
            .join(",");

          if (this.$route.query.id) {
            //如果有id，证明是修改页面，则调用修改的接口
            this.ruleForm.id = this.$route.query.id;
            this.$http.post("/api/specsedit", this.ruleForm).then((res) => {
              console.log(res);

              this.$router.back();
            });
          } else {
            console.log(this.ruleForm.attrs)
            //否则则是添加组件，调用添加到数据库的接口

            this.$http.post("/api/specsadd", this.ruleForm).then((res) => {
              console.log(res);
              if (res.data.code == 200) {
                this.$router.back();
              }
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
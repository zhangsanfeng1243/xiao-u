<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/category' }">商品分类列表</el-breadcrumb-item>
      <el-breadcrumb-item>{{meuname}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="上级分类" prop="pid">
        <el-select v-model="ruleForm.pid" placeholder="请选择">
          <el-option label="顶级分类" :value="0"></el-option>

          <el-option :label="item.catename" :value="item.id" v-for="item in menulist " :key="item.id"></el-option>
        </el-select>
        <!-- 此处用到menulist -->
      </el-form-item>

      <el-form-item label="分类名称" prop="catename">
        <el-input v-model="ruleForm.catename"></el-input>
      </el-form-item>

      <el-form-item label="图片" prop="img">
        <el-upload
          action="#"
          list-type="picture-card"
          :auto-upload='false'
          :on-change='change'
          :file-list='arr'
        >
          <i class="el-icon-plus"></i>
        </el-upload>
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
      this.meuname = "商品分类修改";
      this.buttonname = "修改";
      this.$http
        .get("/api/cateinfo", { id: this.$route.query.id })
        .then((res) => {
          console.log(res);
          this.ruleForm = res.data.list;
          this.arr.push({
            url:'http://localhost:3000'+res.data.list.img
          })
        
          if ((this.ruleForm.status ==1)) {
            this.ruleForm.status = true;
          } else {
            this.ruleForm.status = true;
          }
        });
    } else {
      this.meuname = "商品分类添加";
      this.buttonname = "添加";
    }

    //获取之前添加到数据库的菜单列表，并渲染到页面菜单选项中
    this.$http.get("/api/catelist", { istree: true ,pid:0}).then((res) => {
      // console.log(res)
      this.menulist = res.data.list;
    });
  },
  data() {
    return {
      arr:[],
      meuname: "",
      buttonname: "",
      menulist: [], //获取之前添加到数据库的菜单列表
      ruleForm: {
       pid:'',
       catename:'',
       img:'',
        status: true,
      },
      rules: {
        name: [{ required: true, message: "请输入菜单名称", trigger: "blur" }],
        pid: [{ required: true, message: "请选择上级菜单", trigger: "change" }],
      },
    };
  },
  methods: {
      change(file, filelist){
console.log('上传成功');
this.ruleForm.img=file.raw
      },//修改
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //验证上面rules规则是否通过
          this.ruleForm.status = this.ruleForm.status ? 1 : 2;
          let form=new FormData()
          for(var key in this.ruleForm){
              form.append(key,this.ruleForm[key])
          }
          console.log(111);
        //   console.log(form);
          if (this.$route.query.id) {
            form.append('id',this.$route.query.id)
            //如果有id，证明是修改页面，则调用修改的接口
            this.$http.post("/api/cateedit", form).then((res) => {
              console.log(res);

              this.$router.back();
            });
          } else {
            //否则则是添加组件，调用添加到数据库的接口
            this.$http.post("/api/cateadd", form).then((res) => {
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
<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/goods' }">商品列表</el-breadcrumb-item>
      <el-breadcrumb-item>{{meuname}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="一级分类" prop="first_cateid">
        <el-select v-model="ruleForm.first_cateid " placeholder="请选择" @change="cateChange">
          <!-- <el-option label="顶级菜单" :value="0"></el-option> -->
          <el-option
            :label="item.catename"
            :value="item.id"
            v-for="item in catelist "
            :key="item.id"
          ></el-option>
        </el-select>
        <!-- 此处用到menulist -->
      </el-form-item>

      <el-form-item label="二级分类" prop="second_cateid">
        <el-select v-model="ruleForm.second_cateid" placeholder="请选择">
          <!-- <el-option label="顶级菜单" :value="0"></el-option> -->
          <el-option
            :label="item.catename"
            :value="item.id"
            v-for="item in catefirlist "
            :key="item.id"
          ></el-option>
        </el-select>
        <!-- 此处用到menulist -->
      </el-form-item>

      <el-form-item label="商品名称" prop="goodsname">
        <el-input v-model="ruleForm.goodsname"></el-input>
      </el-form-item>

      <el-form-item label="价格" prop="price">
        <el-input v-model="ruleForm.price"></el-input>
      </el-form-item>

      <el-form-item label="市场价格" prop="market_price">
        <el-input v-model="ruleForm.market_price"></el-input>
      </el-form-item>

      <el-form-item label="图片" prop="img">
        <el-upload
          action="#"
          list-type="picture-card"
          :auto-upload="false"
          :on-change="change"
          :file-list="arr"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="商品规格" prop="specsid">
        <el-select v-model="ruleForm.specsid" placeholder="请选择" @change="specschange">
          <!-- <el-option label="顶级菜单" :value="0"></el-option> -->
          <el-option
            :label="item.specsname"
            :value="item.id"
            v-for="item in specslist "
            :key="item.id"
          ></el-option>
        </el-select>
        <!-- 此处用到menulist -->
      </el-form-item>

      <el-form-item label="规格属性" prop="specsattr">
        <el-select v-model="ruleForm.specsattr" placeholder="请选择">
          <!-- <el-option label="顶级菜单" :value="0"></el-option> -->
          <el-option :label="item" :value="item" v-for="(item,index) in aa" :key="index" ></el-option>
        </el-select>
        <!-- 此处用到menulist -->
      </el-form-item>

      <el-form-item label="是否新品" prop="isnew">
        <el-radio-group v-model="ruleForm.isnew">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="2">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="是否热卖" prop="ishot">
        <el-radio-group v-model="ruleForm.ishot">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="2">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-switch v-model="ruleForm.status"></el-switch>
      </el-form-item>

      <el-form-item label="商品描述" prop="description">
        <div id="div5"></div>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">{{buttonname}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Editor from "wangeditor";
export default {
  methods: {
    specschange(id) {
      console.log(id);
      this.$http.get("/api/specsinfo",{id:id}).then((res) => {
        console.log(res);
      
       this.aa=res.data.list[0].attrs;
      });
    },
    cateChange(id) {
      console.log(id);
      this.$http.get("/api/catelist", { pid: id }).then((res) => {
        console.log(res);
        this.catefirlist = res.data.list;
      });
    },
    change(file, filelist) {
      console.log("上传成功");
      this.ruleForm.img = file.raw;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //验证上面rules规则是否通过

          let form = new FormData();
          for (var key in this.ruleForm) {
            form.append(key, this.ruleForm[key]);
          }
          this.ruleForm.status = this.ruleForm.status ? 1 : 2;
          // this.ruleForm.isnew = this.ruleForm.isnew ? 1 : 2;
          // this.ruleForm.ishot = this.ruleForm.ishot ? 1 : 2;

          if (this.$route.query.id) {
            //如果有id，证明是修改页面，则调用修改的接口
            this.$http.post("/api/goodsedit", form).then((res) => {
              console.log(res);

              this.$router.back();
            });
          } else {
            //否则则是添加组件，调用添加到数据库的接口
            // this.ruleForm.description=editor.txt.html()
            let form = new FormData();
            for (var key in this.ruleForm) {
              form.append(key, this.ruleForm[key]);
            }
            console.log(this.editor.txt.text());
            console.log(this.ruleForm);
            this.$http.post("/api/goodsadd", form).then((res) => {
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
   //回显
  mounted() {
    //富文本编辑器代码
    this.editor = new Editor("#div5");
    this.editor.create();

    // console.log(this);
    if (this.$route.query.id) {
      //获取参数id，如果存在这个id，则证明是修改组件
      this.meuname = "商品修改";
      this.buttonname = "修改";
      this.$http
        .get("/api/goodsinfo", { id: this.$route.query.id })
        .then((res) => {
          console.log(res);
          this.ruleForm = res.data.list;
          this.arr.push({
            url: "http://localhost:3000" + res.data.list.img,
          });
          if (this.ruleForm.status == 1) {
            this.ruleForm.status = true;
          } else {
            this.ruleForm.status = false;
          }
        });
    } else {
      this.meuname = "商品添加";
      this.buttonname = "添加";
    }

    //获取之前添加到数据库的菜单列表，并渲染到页面菜单选项中
    this.$http.get("/api/catelist", { pid: 0 }).then((res) => {
      console.log(res);

      this.catelist = res.data.list;
      // var arr = this.catelist.map(item => {
      //   return item.children
      // })
      // console.log(arr);
      this.$http.get("/api/specslist").then(res => {
        console.log(res);
        this.specslist = res.data.list;
      });
    });
  },
  data() {
    return {
      editor: "", //实例，放全局
      aa: [],
      arr: [],
      specslist: [],
      meuname: "",
      buttonname: "",
      catelist: [],
      catefirlist: [], //获取之前添加到数据库的菜单列表
      ruleForm: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: "",
        description: "",
        specsid: "",
        specsattr: "",
        isnew: true,
        ishot: true,
        status: true,
      },
      rules: {
        first_cateid: [
          { required: true, message: "请输入菜单名称", trigger: "change" },
        ],
        second_cateid: [
          { required: true, message: "请选择上级菜单", trigger: "change" },
        ],
      },
    };
  },
 
  
};
</script>

<style scoped>
#div6 {
  height: 200px;
  background: #f1f7f9;
}
</style>
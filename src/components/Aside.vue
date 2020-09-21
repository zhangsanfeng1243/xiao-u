<template>
  <div>
    <el-col :span="24">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="1">
          <i class="el-icon-setting"></i>
          <span slot="title">首页</span>
        </el-menu-item>

        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>系统设置</span>
          </template>

          <!-- <el-menu-item-group> -->
            <el-menu-item :index="index" @click="gopage(index)" v-for="(item,index) in menulist" :key="index" >{{item.title}}</el-menu-item>
            <!-- <el-menu-item index="1-2">角色管理</el-menu-item>
            <el-menu-item index="1-3">管理员管理</el-menu-item>-->
          <!-- </el-menu-item-group> -->
        </el-submenu>

        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>商城管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1" @click="topage(index)" v-for="(item,index) in goodslist" :key="index">{{item.title}}</el-menu-item>
            <!-- <el-menu-item index="2-2"></el-menu-item> -->
          </el-menu-item-group>

          <!-- <el-menu-item index="2-3"></el-menu-item> -->
        </el-submenu>
      </el-menu>
    </el-col>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menulist: [],
      goodslist:[]
    };
  },

  mounted() {
     this.$http.get("/api/menulist", { istree: true }).then((res) => {
      console.log(res);
      this.menulist = res.data.list[0].children
      //商城管理
      this.goodslist=res.data.list[1].children
     })
  },
    methods:{
gopage(i){
  if(i==0){
    window.location.href='http://localhost:8080/#/menu'
  }
  else if(i==1){
    window.location.href='http://localhost:8080/#/role'
  }
  else if(i==2){
    window.location.href='http://localhost:8080/#/user'
  }
//   this.$http.get("/api/menulist", { istree: true }).then((res) => {
//       console.log(res);
//       this.menulist = res.data.list[0].children
//     });
//  window.location.href='http://localhost:8080/#/'+this.menulist[i].url
},
topage(i){
   if(i==0){
    window.location.href='http://localhost:8080/#/category'
  }
  else if(i==1){
    window.location.href='http://localhost:8080/#/specs'
  }
  else if(i==2){
    window.location.href='http://localhost:8080/#/goods'
  }
    else if(i==3){
    window.location.href='http://localhost:8080/#/member'
  }
    else if(i==4){
    window.location.href='http://localhost:8080/#/banner'
  }
  else if(i==4){
    window.location.href='http://localhost:8080/#/seck'
  }
    
}
  },
};

//商城管理

</script>

<style scoped>
</style>
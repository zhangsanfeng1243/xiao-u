<template>
   <div id="app">
      <el-container>
  
  <el-aside width="200px"><Aside/></el-aside>
  <el-container>
    <el-header>{{username}}</el-header>
    <el-main><router-view></router-view></el-main>
  </el-container>
</el-container>
   </div>
   
   

</template>

<script>
import Aside from './components/Aside'
export default {
  components: {
 Aside
  },
  computed:{
    username(){
      return this.$store.state.user.username
    }
  }
}
</script>

<style>
.el-button--primary{
  margin-top: 10px;
}
*{
  margin:0;
  padding:0
}
html,body,#app,.el-container{
  width: 100%;
  height: 100%;
}
.el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: right;
    line-height: 60px;
    padding-right: 35px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;

  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>

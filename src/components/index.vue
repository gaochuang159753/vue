<template>
  <div id="index">
    <div class="index_header">
      <el-row :gutter="10">
        <el-col :span='4'>LOGO</el-col>
        <el-col :span='10'>
          <el-input
          placeholder="请选择日期"
          icon="search"
          v-model="input2"
          @keyup.enter.native="handleIconClick"
          :on-icon-click="handleIconClick">
          </el-input>
        </el-col>
        <el-col :span='1' class="text_align_center" :offset="2">
          <el-button type="text">求评</el-button>
        </el-col>
        <el-col :span='1' class="text_align_center">
          <el-button type="text">提问</el-button>
        </el-col>
        <el-col :span='1' class="text_align_center" :offset="2">
          <el-button type="text">首页</el-button>
        </el-col>
        <el-col :span='1' class="text_align_center" v-if="accessToken">
          <el-button type="text" @click="logout">注销</el-button>
        </el-col>
        <el-col :span='1' class="text_align_center" v-else>
          <el-button type="text">注册</el-button>
        </el-col>
        <el-col :span='2' class="text_align_center" v-if="accessToken">
          <el-button type="text">{{userName}}</el-button>
        </el-col>
        <el-col :span='1' class="text_align_center" v-else>
          <el-button type="text">登录</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name:'index',
  data(){
      return{
        accessToken:this.getCookie('accessToken'),
        userName:this.getCookie('userName'),
        input2:'',
      }
  },
  mounted(){

  },
  methods:{
    handleIconClick(){//search

    },
    logout(){
      var self=this;
      var url="http://hzmozhi.com:81/logout",
          param={
            accessToken:self.accessToken
          },
          successd=function(res){
            self.accessToken='';
            self.clearCookie("accessToken");
          };
        self.$get(url,param,successd);
    }
  }
}
</script>

<style scoped>
    #index {height: 60px;background-color: #fff;position: fixed;top: 0;width: 100%;line-height: 60px;}
    #index .index_header{max-width: 1000px;margin: 0 auto;}
</style>



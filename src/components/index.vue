<template>
<div>
  <div id="index">
    <div class="index_header">
      <el-row :gutter="10">
        <el-col :span='4'><div @click="gotoindex">LOGO</div></el-col>
        <el-col :span='10'>
          <el-input
          placeholder="请输入搜索内容"
          icon="search"
          v-model="input2"
          @keyup.enter.native="handleIconClick"
          :on-icon-click="handleIconClick">
          </el-input>
        </el-col>
        <el-col :span='1' class="text_align_center" :offset="2">
          <el-button type="text" @click="goadd(1)">求评</el-button>
        </el-col>
        <el-col :span='1' class="text_align_center">
          <el-button type="text" @click="goadd(2)">提问</el-button>
        </el-col>
        <el-col :span='1' class="text_align_center" :offset="2">
          <el-button type="text" @click="gotoindex">首页</el-button>
        </el-col>
        <el-col :span='1' class="text_align_center" v-if="accessToken">
          <el-button type="text" @click="logout">注销</el-button>
        </el-col>
        <el-col :span='1' class="text_align_center" v-else>
          <el-button type="text" @click="zhuce('1')">注册</el-button>
        </el-col>
        <el-col :span='2' class="text_align_center" v-if="accessToken">
          <el-button type="text" @click="gopersonal">{{userName}}</el-button>
        </el-col>
        <el-col :span='1' class="text_align_center" v-else>
          <el-button type="text" @click="zhuce('2')">登录</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
    <router-view style="margin-top:60px;"></router-view>
  </div>
</template>

<script>
import util from '../js/util.js';
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
        var self=this;
        if(self.input2){
          localStorage.keywords=self.input2;
          self.$router.push('/index/searchNull');
          // self.$router.push({name:'search',params:{keywords:self.input2}});
        }
    },
    logout(){
      var self=this;
      var url="/logout",
          param={
            accessToken:self.accessToken
          },
          successd=function(res){
            self.accessToken='';
            self.clearCookie("accessToken");
            self.$router.push("/login/2")
          };
        self.$get(url,param,successd);
    },
    zhuce(id){
      this.$router.push('/login/'+id);
    },
    gotoindex(){
      console.log("123");
      this.$router.push('/index/wenda');
    },
    goadd(type){
      this.$router.push('/index/add/'+type);
    },
    gopersonal(){
      this.$router.push("/index/personal");
    }
  }
}
</script>

<style scoped>
    #index {height: 60px;background-color: #fff;position: fixed;top: 0;width: 100%;z-index: 9;}
    #index .index_header{max-width: 1000px;margin: 0 auto; line-height: 60px;}
</style>



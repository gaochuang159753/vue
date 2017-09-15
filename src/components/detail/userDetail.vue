<template>
  <div id="userDetail">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="用户详情" name="1">
        <ul v-if="userDetail">
          <li>
            <img src="" alt="" class="headImg">
            <div class="headName"><h2>{{userDetail.follow}}人关注</h2><h1>{{userDetail.name}}</h1></div>
            <div class="techang">
              <span>特长 ： {{userDetail.special}}</span>
              <el-tag type="warning" style="margin-left:50px;">{{userDetail.sector}}</el-tag>
              <el-button type="primary" class="guanzhu">+关注</el-button>
            </div>
          </li>
          <li>
            <el-row>
              <el-col :span="12">
                <h1 class="display_inlineblock">可信度<el-button type="text">(?)</el-button></h1>
                <h2 class="display_inlineblock margin_left_50">前<span>{{userDetail.trustTopPercent}}</span></h2>
                <h3 class="display_inlineblock margin_left_50">{{userDetail.trustScore}}分</h3>
              </el-col>
              <el-col :span="12">
                <h1 class="display_inlineblock">活跃度<el-button type="text">(?)</el-button></h1>
                <h2 class="display_inlineblock margin_left_50">前<span>{{userDetail.actTopPercent}}</span></h2>
                <h3 class="display_inlineblock margin_left_50">{{userDetail.actScore}}分</h3>
              </el-col>
            </el-row>
          </li>
          <li>
            <el-row>
              <el-col :span="21">
                <h1 class="display_inlineblock">专业度<el-button type="text">(?)</el-button></h1>
                <h2 class="display_inlineblock margin_left_50" v-for="item in profession"><el-tag type="danger">{{item.sector}}</el-tag> &nbsp;&nbsp;&nbsp;前：<span>{{item.percent}}</span><span class="margin_left_10">{{item.score}}</span></h2>
                <!-- <h2 class="display_inlineblock margin_left_50"><el-tag type="danger">婴儿奶粉</el-tag> &nbsp;&nbsp;&nbsp;前：<span>1%</span></h2>
                <h2 class="display_inlineblock margin_left_50"><el-tag type="danger">婴儿奶粉</el-tag> &nbsp;&nbsp;&nbsp;前：<span>1%</span></h2> -->
              </el-col>
              <el-col :span="3" style="text-align:right;">
                <el-button type="text">所有排名</el-button>
              </el-col>
            </el-row>
          </li>
        </ul>
        <div v-else>用户不存在！</div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name:'userDetail',
  data(){
    return{
      activeName:'1',
      userDetail:{},
      profession:[],//专业度集合
    }
  },
  mounted(){
    this.index();
  },
  methods:{
    index(){
      var self=this;
      var url="/userDetail",
          param={uid:localStorage.uid},
          successd=function(res){
            console.log(res);
            self.userDetail=res.data.userDetail;
            self.profession=res.data.userDetail.profession;
          }
      self.$get(url,param,successd);
    },
    handleClick(){
      //
    }
  }
}
</script>

<style scoped>
  #userDetail{width: 1000px;margin: 20px auto 0;}
  #userDetail h2,#userDetail h3,#userDetail h4,#userDetail h5{font-weight: 400;}
  .headImg{width: 100px;height: 100px;display: block;background-color: #eee;float: left;}
  .headName{height: 50px;margin-left: 120px;line-height: 50px;}
  .headName h1{font-size: 28px;}
  .headName h2{float: right;}
  .techang{height: 50px;margin-left: 120px;}
  .techang .guanzhu{float: right;}
</style>


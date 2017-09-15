<template>
  <div id="personal">
    <el-tabs v-model="activeName">
      <el-tab-pane label="我的消息" name="1">
        <p><span></span>张三李四要请我的回答<el-button type="text">查看邀请我的列表</el-button></p>
        
        <el-row>
          <el-col :span="20">
            <h1>如何选择婴儿奶瓶的材质？</h1>
          </el-col>
          <el-col>品类：&nbsp; &nbsp; 奶瓶</el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="我的评价" name="2">
        <p>
          <el-button type="text" @click="goadd(1)">添加购物评价</el-button>
        </p>
        <div v-for="myComment in myComments" :key="myComment.cid" class="myComments">
          <el-row>
            <el-col :span="4">
              <h1>时间</h1>
              <p>{{myComment.createdAt}}</p>
            </el-col>
            <el-col :span="16">
              <h1>购买商品</h1>
              <p>{{myComment.name}}</p>
            </el-col>
            <el-col :span="4">
              <h1>购买渠道</h1>
              <p>{{myComment.channel}}</p>
            </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" class="text_align_right">
            <span class="margin_right_20">质量／品质：{{myComment.option1}}</span>
            <span class="margin_right_20">功能／效果：{{myComment.option2}}</span>
            <span class="margin_right_20">服务态度：{{myComment.option3}}</span>
            <el-button type="primary">修改评价</el-button>
          </el-col>
        </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane label="个人信息" name="3">
        <ul>
          <li>
            <img :src="userDetail.avatar" alt="" class="headImg">
            <div class="headName">
              <h2>{{userDetail.follow}}人关注</h2>
              <h1>{{userDetail.name}}<i class="el-icon-edit font_size_16 margin_left_20 cursor_pointer color_20a0ff"></i></h1>
            </div>
            <div class="techang">
              <span>特长:</span>
              <el-tag type="success" v-for="special in userDetail.speciality" :key="special" :closable="true" class="margin_left_20">{{special}}</el-tag>
              <!-- <el-tag type="warning" style="margin-left:50px;">{{userDetail.sector}}</el-tag> -->
              <el-button type="primary" class="margin_left_20" size="mini">添加特长</el-button>
              <!-- <el-button type="text" class="guanzhu">取消关注</el-button> -->
            </div>
          </li>
          <li>
            <el-row>
              <el-col :span="12">
                <h1 class="display_inlineblock">可信度<el-button type="text" @click="explanationBtn(2)">(?)</el-button></h1>
                <h2 class="display_inlineblock margin_left_50">前<span>{{userDetail.actTopPercent}}</span></h2>
                <h3 class="display_inlineblock margin_left_50">{{userDetail.trustScore}}分</h3>
              </el-col>
              <el-col :span="12">
                <h1 class="display_inlineblock">活跃度<el-button type="text" @click="explanationBtn(3)">(?)</el-button></h1>
                <h2 class="display_inlineblock margin_left_50">前<span>{{userDetail.trustTopPercent}}</span></h2>
                <h3 class="display_inlineblock margin_left_50">{{userDetail.actScore}}分</h3>
              </el-col>
            </el-row>
          </li>
          <li>
            <el-row>
              <el-col :span="21">
                <h1 class="display_inlineblock">专业度<el-button type="text" @click="explanationBtn(1)">(?)</el-button></h1>
                <h2 class="display_inlineblock margin_left_50" v-for="item in profession" :key="item"><el-tag type="danger">{{item.sector}}</el-tag> &nbsp;&nbsp;&nbsp;前：<span>{{item.percent}}</span></h2>
                <!-- <h2 class="display_inlineblock margin_left_50"><el-tag type="danger">婴儿奶粉</el-tag> &nbsp;&nbsp;&nbsp;前：<span>1%</span></h2>
                <h2 class="display_inlineblock margin_left_50"><el-tag type="danger">婴儿奶粉</el-tag> &nbsp;&nbsp;&nbsp;前：<span>1%</span></h2> -->
              </el-col>
              <el-col :span="3" style="text-align:right;">
                <el-button type="text">所有排名</el-button>
              </el-col>
            </el-row>
            <h1 class="margin_top_20">我的关注</h1>
            <el-row v-for="follow in userDetail.follows" :key="follow.type">
              <el-col :span="2" :offset="1">{{follow.type}}</el-col>
              <el-col :span="18">
                <!-- <span v-for="item in follow.items" :key="item">{{item}}</span> -->
                <el-tag type="gray" v-for="item in follow.items" :key="item" :closable="true" class="margin_left_20">{{item}}</el-tag>
              </el-col>
              <el-col :span="3" class="text_align_right"><el-button type="text">...更多</el-button></el-col>
            </el-row>
          </li>
        </ul>
      </el-tab-pane>
      
    </el-tabs>
    <el-dialog
      :title="explanation.title"
      v-model="explanationShow"
      size="tiny">
      <span>{{explanation.content}}</span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name:'personal',
  data(){
    return{
      activeName:'1',
      userDetail:{},
      profession:[],
      explanation:{
        title:'标签解读:参数选型',
        content:'参数选型指的是:答题的重点在于解释商品的各项参数的具体含义以及在实际使用中的作用。以及如何根据实际情况来选择适合自己的商品型号。'
      },
      explanationShow:false,
      totalPage1:0,
      totalPage2:0,
      pageSize:10,
      myComments:[],
      msgs:[],
    }
  },
  mounted(){
    this.index();
    this.myInfo();
    this.getmyMsgs();
    this.getmyComments();
  },
  methods:{
    index(){
      var self=this;
    },
    handleClick(){
      //
    },
    myInfo(){
      var self=this;
      var url="/myInfo",
          successd=function(res){
            console.log(res);
            self.userDetail=res.data.userInfo;
            self.profession=res.data.userInfo.profession;
          };
      self.$get(url,{},successd);
    },
    explanationBtn(type){
      var self=this;
      switch (type) {
        case 1:
          self.explanation.title="标签解读:专业度";
          self.explanation.content="专业度指的是:专业度表征了该用户在某个行业的专业程度，它决定了用户的回答优先被其他人看 到的概率以及所有投票行为的权重值的高低。系统会在用户发表回答投票之后的一段时间之内，统计投票的票数比例，然后根据这个数据给予用户相应的积分。另外用户的回答获得其 他人的投票也可以按照比例获得积分。最后系统根据最近一年的积分排名给出投票加权值; ";
          break;
        case 2:
          self.explanation.title="标签解读:可信度";
          self.explanation.content="可信度指的是:可信度表征了该用户的评价类投票在多大程度上可以代表全体用户的投票。系统会 在用户发表投票之后的一段时间之内，统计投票的票数比例，然后根据这个数据给予用户相 应的积分。最后系统根据最近一年的积分排名给出投票加权值;";
          break;
        case 3:
          self.explanation.title="标签解读:活跃度";
          self.explanation.content="活跃度指的是:xXXXXXXX";
          break;
        case 4:
          self.explanation.title="标签解读:评测体验";
          self.explanation.content="评测体验指的是:答题的重点在于阐述通过某种专业的方法检测各项商品标注的性能是否达 标，用料是否属实和足量等问题。抑或是实际使用体验是否真的如商品描述一致";
          break;
        default:
          break;
      }
      self.explanationShow=true;
    },
    //我的消息
    getmyMsgs(page){
      var self=this;
      var url="/myMsgs",
          param={page:page?page:1},
          successd=function(res){
            console.log(res);
            self.msgs=res.data.msgs;
            self.totalPage2=res.data.totalPage2-0;
          };
      self.$get(url,param,successd);
    },
    //我的评价
    getmyComments(page){
      var self=this;
      var url="/myComments",
          param={page:page?page:1},
          successd=function(res){
            console.log(res);
            self.myComments=res.data.myComments;
            self.totalPage1=res.data.totalPage1-0;
          };
      self.$get(url,param,successd);
    },
    goadd(type){
      this.$router.push("/index/add/"+type);
    }
  }
}
</script>

<style scoped>
#personal{width: 1000px;margin: 0 auto;}
#personal h2,#personal h3,#personal h4,#personal h5{font-weight: 400;}
  .headImg{width: 100px;height: 100px;display: block;background-color: #eee;float: left;}
  .headName{height: 50px;margin-left: 120px;line-height: 50px;}
  .headName h1{font-size: 28px;}
  .headName h2{float: right;}
  .techang{height: 50px;margin-left: 120px;}
  .techang .guanzhu{float: right;}
  .myComments{padding-bottom: 10px;border-bottom: 1px solid #ddd;}
</style>


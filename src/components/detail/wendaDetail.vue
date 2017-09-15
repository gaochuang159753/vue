<template>
  <div id="wendaDetail">
    <el-tabs v-model="activeName">
      <el-tab-pane label="问答详情" name="1">
        <div class="margin_top_20" v-if="qaDetail">
          <el-row>
            <el-col :span="20" class="font_size_20">{{qaDetail.title}}</el-col>
            <el-col :span="4">品类：&nbsp; &nbsp; {{qaDetail.sector}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="4"><el-tag type="danger">{{qaDetail.tag}}</el-tag></el-col>
            <el-col :span="8" style="text-align:center;font-size:12px;"> {{qaDetail.follow}}人关注 &nbsp; &nbsp; {{qaDetail.join}}人参与 &nbsp; &nbsp; {{qaDetail.answerTotal}}个回答</el-col>
            <el-col :span="6" class="text_align_right">
              <el-button type="text" v-if="qaDetail.followQuestion==0" @click="operFollow(1,1,qaDetail.qid)">关注问题</el-button>
              <el-button type="text" v-else>取消关注</el-button>
            </el-col>
            <el-col :span="6" class="text_align_right">
              <el-button type="text">邀请回答</el-button>
              <el-button type="primary" @click="mywenda">我来回答</el-button>
            </el-col>
          </el-row>
          <div class="answers" v-for="answer in answers" :key="answer.aid">
            <el-row>
              <el-col :span="2"><img :src="answer.avatar" alt="" width="50px" height="50px"></el-col>
              <el-col :span="18"><h1>{{answer.name}}</h1><h2>品类专业度<el-button type="text" @click="zhuanyeShow=true;">(?)</el-button><span class="margin_left_10">前{{answer.topPercent}}</span></h2></el-col>
              <el-col :span="4">最后编辑：{{answer.lastUpdateTime}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="2"><h1>{{answer.recScore}}</h1><h2>推荐分<el-button type="text" @click="tuijianfenShow=true;">(?)</el-button></h2></el-col>
              <el-col :span="22">
                <p>{{answer.cont}}</p>
                <div>
                  <el-row>
                    <el-col :span="4"><span v-if="qaDetail.isDoubleScore==1">双倍积分<el-button type="text" @click="isDoubleScoreShow=true;">(?)</el-button></span></el-col>
                    <el-col :span="20" class="text_align_right">
                      <el-button type="text" @click="clickOper(1,1,answer.aid)">赞同({{answer.agree}})</el-button>
                      <el-button type="text" @click="clickOper(1,2,answer.aid)">反对({{answer.disAgree}})</el-button>
                      <el-button type="text" @click="clickOper(1,3,answer.aid)">感谢({{answer.thank}})</el-button>
                      <el-button type="text" @click="clickOper(1,4,answer.aid)">收藏({{answer.collect}})</el-button>
                      <el-button type="text" @click="getanswerId(answer.aid)">评论({{answer.comments}})</el-button>
                    </el-col>
                  </el-row>
              </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      title="添加商品/服务"
      v-model="addCommentShow">
      <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入评论内容"
        v-model="content">
      </el-input>
      <div class="text_align_right margin_top_20"><el-button type="primary" @click="addComment">发表评论</el-button></div>
      <div class="pinglun_list" v-for="comment in commentList" :key="comment.uid">
        <el-row>
          <el-col :span="2"><img :src="comment.avatar" alt="头像" width="50px" height="50px"></el-col>
          <el-col :span="22"><h1>{{comment.name}}</h1></el-col>
        </el-row>
        <p>{{comment.content}}</p>
        <div class="text_algin_right">
          <el-button type="text" @click="clickOper(3,1,answer.aid)">赞成({{comment.agree}})</el-button>
          <el-button type="text" @click="clickOper(3,2,answer.aid)">反对({{comment.disagree}})</el-button>
          <el-button type="text" @click="clickOper(3,3,answer.aid)">感谢({{comment.thank}})</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      title="双倍积分"
      v-model="isDoubleScoreShow"
      size="tiny">
      <span>当评价数目较少时，用户对答案的投票可以获得双倍积分</span>
    </el-dialog>
    <el-dialog
      title="专业度"
      v-model="zhuanyeShow"
      size="tiny">
      <span>专业度:专业度表征了该用户在某个行业的专业程度，它决定了用户的回答优先被其他人看 到的概率以及所有投票行为的权重值的高低。系统会在用户发表回答投票之后的一段时间之
内，统计投票的票数比例，然后根据这个数据给予用户相应的积分。另外用户的回答获得其 他人的投票也可以按照比例获得积分。最后系统根据最近一年的积分排名给出投票加权值; 可信度:可信度表征了该用户的评价类投票在多大程度上可以代表全体用户的投票。系统会 在用户发表投票之后的一段时间之内，统计投票的票数比例，然后根据这个数据给予用户相 应的积分。最后系统根据最近一年的积分排名给出投票加权值;</span>
    </el-dialog>
    <el-dialog
      title="推荐分"
      v-model="tuijianfenShow"
      size="tiny">
      <span>系统会根据每个用户的可信度，专业度和活跃度，按照一定的公式进
行计算可得到每个用户的投票加权值。将某一个商品或者某一个回答
的全部用户的投票，按照投票加权值进行计算可得到该商品或者回答
的推荐分。</span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name:'wendaDetail',
  data(){
    return{
      activeName:'1',
      answers:null,
      qaDetail:null,
      content:'',
      answerId:"",
      addCommentShow:false,
      isDoubleScoreShow:false,
      zhuanyeShow:false,
      tuijianfenShow:false,
      commentList:[],
    }
  },
  mounted(){
    this.index();
  },
  methods:{
    index(){
      var self=this;
      var url="/qaDetail",
          param={qid:localStorage.qid},
          successd=function(res){
            self.qaDetail=res.data.qaDetail;
            self.answers=res.data.qaDetail.answers;
          };
      self.$get(url,param,successd);
    },
    mywenda(){
      this.$router.push('/index/mywenda')
    },
    clickOper(opType,clickType,opId){
      var self=this;
      var url="/clickOper",
          param={opType:opType,clickType:clickType,opId:opId},
          successd=function(res){
            self.$message({
              message:'操作成功！',
              type:'success'
            });
            self.index();
          };
      self.$get(url,param,successd);
    },
    addComment(){
      var self=this;
      var url="/addComment",
          param={answerId:self.answerId,content:self.content},
          successd=function(res){
            self.index();
            self.addCommentShow=false;
          };
      self.$get(url,param,successd);
    },
    getanswerId(aid){
      this.answerId=aid;
      this.getcommentList(aid);
      this.addCommentShow=true;
    },
    getcommentList(answerId){
      var self=this;
      var url="/commentList",
          param={answerId:answerId},
          successd=function(res){
            self.commentList=res.data.comments;
          };
      self.$get(url,param,successd);
    },
    operFollow(opType,followType,followId){
      var self=this;
      var url="/operFollow",
          param={opType:opType,followType:followType,followId:followId},
          successd=function(res){
            self.index();
          };
      self.$get(url,param,successd);
    }
  }
}
</script>
<style scoped>
  #wendaDetail{width: 1000px;margin: 0 auto;}
  .answers,.pinglun_list{margin-top: 10px;padding-top: 10px;border-top: 1px solid #ddd;}
</style>



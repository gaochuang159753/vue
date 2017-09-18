<template>
  <div id="personal">
    <el-tabs v-model="activeName">
      <el-tab-pane label="我的消息" name="1">
        <div v-for="msg in msgs" :key="msg.msgId" class="msgs">
          <el-row>
            <el-col :span="12">
              <span class="noread" v-if="msg.isRead==1"></span>
              <span class="font_size_14">{{msg.tip}}</span>
            </el-col>
            <el-col :span="12">
              <el-button type="text" v-if="msg.type==1" @click="myyaoqingList(msg)">查看邀请我的列表</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <h1>{{msg.title}}</h1>
            </el-col>
            <el-col :span="4">推荐分：<span class="font_size_20">{{msg.recScore}}</span></el-col>
            <el-col :span="4" class="text_algin_right">品类：&nbsp; &nbsp; {{msg.sector}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <el-tag type="danger">{{msg.tag}}</el-tag>
            </el-col>
            <el-col :span="10">
              <span>{{msg.follow}}人关注</span>
              <span class="margin_left_20">{{msg.join}}人参与</span>
              <span class="margin_left_20">{{msg.answerTotal}}个回答</span>
            </el-col>
            <el-col :span="6" class="text_align_right">
              <el-button type="text" v-if="msg.eventType==1&&msg.type==2" @click="wendaDetail(msg.eventId)">查看回答</el-button>
              <el-button type="text" v-if="msg.eventType==1&&msg.type==3" @click="wendaDetail(msg.eventId)">查看我的回答</el-button>
              <el-button type="text" v-if="msg.eventType==1">邀请回答</el-button>
              <el-button type="text" v-if="msg.eventType==2">邀请评价</el-button>
            </el-col>
            <el-col :span="4" class="text_align_right">
              <el-button type="primary" v-if="msg.eventType==1" @click="mywenda(msg.eventId)">我来回答</el-button>
              <el-button type="primary" v-if="msg.eventType==2" @click="gopingjia">我来评价</el-button>
            </el-col>
          </el-row>
        </div>
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
            <el-button type="primary" @click="xiugaipingjia">修改评价</el-button>
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
              <h1>{{userDetail.name}}<i class="el-icon-edit font_size_16 margin_left_20 cursor_pointer color_20a0ff" @click="setUser"></i></h1>
            </div>
            <div class="techang">
              <span>特长:</span>
              <el-tag type="success" v-for="special in userDetail.speciality" :key="special.id" :closable="true" class="margin_left_20" @close="delespecial(special.id)">{{special.name}}</el-tag>
              <!-- <el-tag type="warning" style="margin-left:50px;">{{userDetail.sector}}</el-tag> -->
              <el-button type="primary" class="add_special" size="mini" @click="addspecialShow=true">添加特长</el-button>
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
                <h2 class="display_inlineblock margin_left_50" v-for="(item,index) in profession" :key="item.sector" v-if="index<4">
                  <el-tag type="danger">{{item.sector}}</el-tag> &nbsp;&nbsp;&nbsp;前：<span>{{item.percent}}</span>
                </h2>
                <!-- <h2 class="display_inlineblock margin_left_50"><el-tag type="danger">婴儿奶粉</el-tag> &nbsp;&nbsp;&nbsp;前：<span>1%</span></h2>
                <h2 class="display_inlineblock margin_left_50"><el-tag type="danger">婴儿奶粉</el-tag> &nbsp;&nbsp;&nbsp;前：<span>1%</span></h2> -->
              </el-col>
              <el-col :span="3" style="text-align:right;">
                <el-button type="text" @click="allshow=true;" v-if="profession.length>3">所有排名</el-button>
              </el-col>
            </el-row>
            <h1 class="margin_top_20">我的关注</h1>
            <el-row v-for="follow in userDetail.follows" :key="follow.type">
              <el-col :span="2" :offset="1">{{follow.type}}</el-col>
              <el-col :span="21">
                <!-- <span v-for="item in follow.items" :key="item">{{item}}</span> -->
                <el-tag type="gray" v-for="(item,index) in follow.items" :key="item.id" :closable="true" class="margin_left_20" @close="operFollow(2,follow.type,item.id)" v-if="index<4&&follow.morenoShow">{{item.name}}</el-tag>
              </el-col>
              <el-col :span="3" class="text_align_right"><el-button type="text" @click="more(follow.morenoShow)" v-if="follow.items.length>3">...{{morenoCon}}</el-button></el-col>
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

    <el-dialog
      title="添加特长"
      v-model="addspecialShow">
      <el-form :model="specialForm">
        <el-form-item label="输入品类名">
          <el-select v-model="specialForm.sectorId" filterable placeholder="请选择品类">
            <el-option
              v-for="item in sectorList"
              :key="item.sid"
              :label="item.name"
              :value="item.sid">
            </el-option>
          </el-select>
          <el-button type="text">没找到品类？新增一个</el-button>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addspecialShow = false">取 消</el-button>
        <el-button type="primary" @click="addspecial">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="我的专业度"
      v-model="allshow"
      size="tiny">
      <el-row v-for="item in profession" :key="item.sector">
        <el-col :span='8'>{{item.sector}}</el-col>
        <el-col :span='8'>前{{item.percent}}</el-col>
        <el-col :span='8'>{{item.score}}分</el-col>
      </el-row>
    </el-dialog>

    <el-dialog
      title="邀请我的列表"
      v-model="yaoqingShow"
      size="tiny">
      <el-row>
        <el-col :span='20'>
          <h1>{{yaoqing.title}}</h1>
        </el-col>
        <el-col :span='4'>{{yaoqing.type==1?'问答':'评价'}}</el-col>
      </el-row>
      <el-row v-for="friend in friends" :key="friend.uid" class="margin_top_20">
        <el-col :span='2'>
          <img :src="friend.avatar" alt="头像" width="50px" height="50px">
        </el-col>
        <el-col :span='22'>{{friend.name}}</el-col>
      </el-row>
    </el-dialog>

    <el-dialog
      title="修改个人信息"
      v-model="setpersonalShow">
      <el-form :model="perForm">
        <el-form-item label="修改头像" label-width="100px">
          <el-upload
            class="avatar-uploader"
            action="http://hzmozhi.com:81//uploadAvatar"
            :data="uploadAvatarData"
            name="imageUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>

        </el-form-item>
        <el-form-item label="修改姓名" label-width="100px">
          <el-input type="text" v-model="perForm.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setpersonalShow = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </span>
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
      addspecialShow:false,
      sectorList:[],
      specialForm:{
        sectorId:'',
      },
      allshow:false,
      morenoShow:true,
      morenoCon:'展开',
      friends:[],
      yaoqing:{
        title:'',
        type:'1',
      },
      yaoqingShow:false,
      setpersonalShow:false,
      perForm:{
        name:'',
      },
      imageUrl: '',
      uploadAvatarData:{accessToken:this.getCookie('accessToken')}
    }
  },
  mounted(){
    this.index();
    this.myInfo();
    this.getmyMsgs();
    this.getmyComments();
    this.getsectorList();
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
            self.userDetail.follows.forEach(function(ele) {
              ele.morenoShow=true;
            });
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
    },
    mywenda(qid){
      localStorage.qid=qid;
      this.$router.push('/index/mywenda');
    },
    operFollow(opType,followType,followId){
      var self=this;
      switch (followType) {
        case "问题":
          followType='1';
          break;
        case "用户":
          followType='2';
          break;
        case "商品":
          followType='3';
          break;
        case "服务":
          followType="4";
          break;
        case "品类":
          followType='4';
          break;
        default:
          break;
      }
      var url="/operFollow",
          param={opType:opType,followType:followType,followId:followId},
          successd=function(res){
            self.myInfo();
          };
      self.$get(url,param,successd);
    },
    getsectorList(){
      var self=this;
      var url="/sectorList",
          successd=function(res){
            self.sectorList=res.data.sectors;
          };
      self.$get(url,{},successd);
    },
    addspecial(){
      var self=this;
      var url="/operSpecial",
          param={type:1,sectorId:self.specialForm.sectorId},
          successd=function(res){
            self.addspecialShow=false;
            self.myInfo();
          };
      self.$get(url,param,successd);
    },
    delespecial(id){
      var self=this;
      var url="/operSpecial",
          param={type:2,sectorId:id},
          successd=function(res){
            self.$message({
              message:'删除成功！',
              type:'success'
            });
            self.myInfo();
          };
      self.$get(url,param,successd);
    },
    more(morenoShow){
      if(this.morenoCon=="展开"){
        this.morenoCon="收起";
      }else{
        this.morenoCon="展开";
      }
      morenoShow=!morenoShow;
    },
    myyaoqingList(msg){
      var self=this;
      self.yaoqing.title=msg.title;
      self.yaoqing.type=msg.eventType;
      var url="/inviteList",
          param={type:msg.eventType,eventId:msg.eventId},
          successd=function(res){
            self.friends=res.data.friends;
            self.yaoqingShow=true;
          };
      self.$get(url,param,successd);
    },
    gopingjia(){
      localStorage.activeName=2;
      this.$router.push('/index/mywenda');
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl=res.data.fileurl;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'||file.type === 'image/png'||file.type === 'image/gif';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    setUser(){
      var self=this;
      self.imageUrl=self.userDetail.avatar;
      self.perForm.name=self.userDetail.name;
      self.setpersonalShow=true;
    },
    editUser(){
      var self=this;
      var url="/editUser",
          param={
            userName:self.perForm.name
          },
          successd=function(res){
            self.setpersonalShow=false;
            self.myInfo();
          };
      self.$post(url,param,successd);
    },
    xiugaipingjia(){
      localStorage.activeName=2;
      this.$router.push("/index/mywenda");
    }
  }
}
</script>

<style>
  #personal{width: 1000px;margin: 0 auto;}
  #personal h2,#personal h3,#personal h4,#personal h5{font-weight: 400;}
  #personal .headImg{width: 100px;height: 100px;display: block;background-color: #eee;float: left;}
  #personal .headName{height: 50px;margin-left: 120px;line-height: 50px;}
  #personal .headName h1{font-size: 28px;}
  #personal .headName h2{float: right;}
  #personal .techang{height: 50px;margin-left: 120px;}
  #personal .techang .guanzhu{float: right;}
  #personal .myComments,.msgs{padding-bottom: 10px;border-bottom: 1px solid #ddd;}
  #personal .noread{width: 10px;height: 10px;border-radius: 50%;background-color: #f00;display: inline-block;}
  #personal .add_special{margin-left: 20px;}
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>


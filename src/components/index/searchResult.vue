<template>
  <div id="searchResult">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="商品/服务" name="1">
        <span class="noshangpin">没找到商品/服务?</span>
        <el-button type="text" @click="addGoodsSvr=true;">添加新的商品/服务</el-button>        
        <ul class="wenda_list" v-for="list in list1" :key="list.itemId">
          <li class="list_li list_li1">
            <h1 @click="goodsDetail(list.itemId)">{{list.itemName}}</h1>
            
            <span class="pinlei"><span>推荐分：<span class="font_size_20">{{list.recScore}}</span></span>品类： {{list.sector}}</span>
          </li>
          <li class="list_li2">
            <span style="width:100px;display:inline-block;"><el-tag type="danger" v-if="list.tag">{{list.tag}}</el-tag></span>
            <span class="margin_left_50 list_li2_span">{{list.follow}}人关注</span>
            <span class="margin_left_50 list_li2_span">{{list.comment}}人评价</span>
            <!-- <span class="margin_left_50 list_li2_span">34个回答</span> -->
            <div class="right_btn">
              <el-button type="text">邀请评价</el-button>
              <el-button type="primary">我来评价</el-button>
            </div>
          </li>
          
        </ul>
        <el-pagination
          small
          style="text-align:right;"
          layout="prev, pager, next"
          :total="totalPage1">
          </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="问答" name="2">
        <span class="noshangpin">没找到问题?</span>
        <el-button type="text" @click="addQaShow=true;">添加新的问题</el-button>
        <ul class="wenda_list" v-for="list in list2" :key="list.qid">
          <li class="list_li list_li1">
            <h1 @click="wendaDetail(list.qid)">{{list.title}}</h1>
            <span class="pinlei">品类： {{list.sector}}</span>
          </li>
          <li class="list_li2">
            <el-tag type="danger">{{list.tag}}</el-tag>
            <span class="margin_left_50 list_li2_span">{{list.follow}}人关注</span>
            <span class="margin_left_50 list_li2_span">{{list.join}}人参与</span>
            <span class="margin_left_50 list_li2_span">34个回答</span>
            <div class="right_btn">
              <el-button type="text">邀请评价</el-button>
              <el-button type="primary" @click="mywenda(list.qid)">我来评价</el-button>
            </div>
          </li>
          <li class="list_li3">
            <span>{{list.answer.name}}</span>
            <span>行业前{{list.answer.topPercent}}</span>
            <span>推荐分{{list.answer.recScore}}</span>
          </li>
          <li class="list_li4">
            <p>{{list.answer.cont}}</p>
          </li>
          <li class="list_li5">
            <el-button type="text">赞同({{list.answer.agree}})</el-button>
            <el-button type="text">反对({{list.answer.disAgree}})</el-button>
            <!-- <el-button type="text">双倍积分</el-button>
            <el-button type="text" style="margin-left:0;">(?)</el-button> -->
          </li>
        </ul>
        <el-pagination
          small
          style="text-align:right;"
          layout="prev, pager, next"
          :total="totalPage2">
          </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="用户" name="3">
        <dl class="yonghulist" v-for="list in list3" :key="list.uid">
          <dt><img :src="list.avatar" alt="头像"></dt>
          <dd class="yonghu_name" @click="userDetail(list.uid)">{{list.name}}</dd>
          <dd>账号 ： {{list.email}}</dd>
          <dd class="yonghu_two">{{list.sector}}<span>前{{list.topPercent}}</span></dd>
          <dd class="yonghu_guanzhu"><span>{{list.follow}}人关注</span><el-button type="primary">+关注</el-button></dd>
        </dl>
        <el-pagination
          small
          v-show="list3.length!=0"
          style="text-align:right;"
          layout="prev, pager, next"
          :total="totalPage3">
          </el-pagination>
        <dl v-if="list3.length==0">暂无用户！</dl>
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      title="添加商品/服务"
      v-model="addGoodsSvr"
      size="small">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="类别">
          <el-radio class="radio" v-model="form.opType" label="1">商品</el-radio>
          <el-radio class="radio" v-model="form.opType" label="2">服务</el-radio>
        </el-form-item>
        <el-form-item label="商品/服务">
          <el-input v-model="form.title" placeholder="请输入商品/服务名"></el-input>
        </el-form-item>
        <el-form-item label="所属品类">
          <el-select v-model="form.sectorId" placeholder="请选择商品品类">
            <el-option :label="sector.name" :value="sector.sid" v-for="sector in sectorList" :key="sector.sid"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addGoodsSvr = false">取 消</el-button>
        <el-button type="primary" @click="addGoods">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="添加问题"
      v-model="addQaShow"
      size="small">
      <el-form ref="form" :model="form2" label-width="80px">
        <el-form-item label="问题标题">
          <el-input v-model="form2.title" placeholder="请输入问题标题"></el-input>
        </el-form-item>
        <el-form-item label="所属品类">
          <el-select v-model="form2.sectorId" placeholder="请选择商品品类">
            <el-option :label="sector.name" :value="sector.sid" v-for="sector in sectorList" :key="sector.sid"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="问题标签">
          <el-radio class="radio" v-model="form2.tagId" label="1">
            <el-tag type="danger">参数选型</el-tag>
            <el-button type="text" @click="explanationBtn(1)">(?)</el-button>
          </el-radio>
          <el-radio class="radio" v-model="form2.tagId" label="2">
            <el-tag type="danger">使用保养</el-tag>
            <el-button type="text" @click="explanationBtn(2)">(?)</el-button>
          </el-radio>
          <el-radio class="radio" v-model="form2.tagId" label="3">
            <el-tag type="danger">辨别真伪</el-tag>
            <el-button type="text" @click="explanationBtn(3)">(?)</el-button>
          </el-radio>
          <el-radio class="radio" v-model="form2.tagId" label="4">
            <el-tag type="danger">评测体验</el-tag>
            <el-button type="text" @click="explanationBtn(4)">(?)</el-button>
          </el-radio>
        </el-form-item>
        <el-form-item label="邀请关注">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="friendIds" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="city in myFollowFriends" :label="city.uid" :key="city.uid">{{city.name + "前" + city.percent}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addQaShow = false">取 消</el-button>
        <el-button type="primary" @click="addQa">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 名词解释 -->
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
  name:'searchResult',
  data(){
    return {
      activeName:'1',
      keywords:'',
      list1:[],
      list2:[],
      list3:[],
      page1:1,
      page2:1,
      page3:1,
      totalPage1:0,
      totalPage2:0,
      totalPage3:0,
      addGoodsSvr:false,
      form:{
        opType:"1",
        title:'',
        sectorId:'',
      },
      dialogFormVisible:true,
      formLabelWidth:'80px',
      sectorList:null,
      addQaShow:false,
      form2:{
        title:'',
        sectorId:'',
        tagId:'1',
      },
      explanationShow:false,
      explanation:{
        title:'标签解读:参数选型',
        content:'参数选型指的是:答题的重点在于解释商品的各项参数的具体含义以及在实际使用中的作用。以及如何根据实际情况来选择适合自己的商品型号。'
      },
      followFriend:[],
      friendIds:[],
      myFollowFriends:[],
      checkAll: true,
      isIndeterminate: true,
      allfriendIds:[],
    }
  },
  mounted(){
    this.index();
    this.getsectorList();
  },
  methods:{
    index(){
      var self=this;
      // self.keywords=self.$route.params.keywords;
      self.keywords=localStorage.keywords;
      console.log(self.keywords)
      self.getList1();
      self.getList2();
      self.getList3();
    },
    getList1(){
      var self=this;
      var url="/searchGoodsSvr",//搜索商品
          params={keywords:self.keywords,page:self.page1},
          successd=function(res){
            self.totalPage1=res.data.totalPage-0;
            self.list1=res.data.goodSvrs;
          };
      self.$get(url,params,successd);
    },
    getList2(){
      var self=this;
      var url="/searchQa",
          params={keywords:self.keywords,page:self.page2},
          successd=function(res){
            self.list2=res.data.questions;
            self.totalPage2=res.data.totalPage-0;
          };
      self.$get(url,params,successd);
    },
    getList3(){
      var self=this;
      var url="/searchRelaUser",
          params={keywords:self.keywords,page:self.page3},
          successd=function(res){
            self.list3=res.data.users;
            self.totalPage3=res.data.totalPage-0;
          };
      self.$get(url,params,successd);
    },
    handleClick(){

    },
    userDetail(uid){
      localStorage.uid=uid;
      this.$router.push('/index/userDetail');
    },
    addGoods(){
      var self=this;
      var url="/addGoodsSvr",
          param=self.form,
          successd=function(res){
            console.log(res);
            self.addGoodsSvr=false;
            self.getList1();
          };
      self.$get(url,param,successd);
    },
    getsectorList(){
      var self=this;
      var url="/sectorList",
          successd=function(res){
            console.log(res);
            self.sectorList=res.data.sectors;
            self.getmyFollowFriends(self.sectorList[0].sid);
          };
      self.$get(url,{},successd);
    },
    explanationBtn(type){
      var self=this;
      switch (type) {
        case 1:
          self.explanation.title="标签解读:参数选型";
          self.explanation.content="参数选型指的是:答题的重点在于解释商品的各项参数的具体含义以及在实际使用中的作用。以及如何根据实际情况来选择适合自己的商品型号。";
          break;
        case 2:
          self.explanation.title="标签解读:使用保养";
          self.explanation.content="使用保养指的是:答题的重点在于介绍如何正确使用和保养商品使得商品的使用寿命增加或 者使用效果变好的经验和技巧";
          break;
        case 3:
          self.explanation.title="标签解读:辨别真伪";
          self.explanation.content="辨别真伪指的是:答题的重点在于介绍对于消费者来说如何通过简单的方法来区分商品正品 和仿冒品，从而避免上当受骗";
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
    addQa(){
      var self=this;
      var url="/addQa";
      var param=self.form2;
      param.friendIds=self.friendIds.join();
      var successd=function(res){
        console.log(res);
        self.addQaShow=false;
        self.getList2();
      }
      self.$get(url,param,successd);
    },
    // getfollowFriend(sectorId){
    //   var self=this;
    //   var url="/followFriend",
    //       param={sectorId:sectorId},
    //       successd=function(res){
    //         self.getfollowFriend=res.data.firends;
    //       };
    //   self.$get(url,param,successd);
    // },
    handleCheckAllChange(event) {
      this.friendIds = event.target.checked ? this.allfriendIds : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.allfriendIds.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.friendIds.length;
    },
    getmyFollowFriends(sectorId){
      var self=this;
      var url="/myFollowFriends",
          param={sectorId:sectorId},
          successd=function(res){
            self.myFollowFriends=res.data.friends;
            self.allfriendIds=[];
            for(var i=0;i<self.myFollowFriends.length;i++){
              self.allfriendIds.push(self.myFollowFriends[i].uid);
            }
          };
      self.$get(url,param,successd);
    },
    mywenda(qid){
      localStorage.qid=qid;
      this.$router.push("/index/mywenda");
    },
    wendaDetail(qid){
      localStorage.qid=qid;
      this.$router.push('/index/wendaDetail');
    },
    goodsDetail(id){
      localStorage.goodsId=id;
      this.$router.push('/index/goodsDetail');
    }
  }
}
</script>
<style scoped>
  #searchResult{width: 1000px;margin: 0 auto;}
  .wenda_list{margin-top:20px;}
  .wenda_list .list_li{overflow: hidden;position: relative;}
  .list_li1 h1{font-size: 18px;line-height: 32px; margin: 0;}
  .list_li1 .pinlei{position: absolute;right: 10px;top: 0px;width: 200px;height: 32px;line-height: 40px;font-size: 14px;text-align: right}
  .list_li2{height:40px;position: relative;line-height: 40px;}
  .list_li2 .right_btn{position: absolute;right:10px;top:0px;height: 40px;}
  .list_li2_span{font-size: 12px;vertical-align:bottom;}
  .list_li3{height: 20px;line-height: 20px;font-size: 12px;}
  .list_li3 span {margin-right:20px;}
  .list_li4 {font-size: 12px;line-height: 20px;}
  .list_li5{line-height: 20px;}
  .list_li1 .pingfen{position: absolute;right: 200px;top: 0;height: 32;line-height: 40px;font-size: 14px;}
  .noshangpin{font-size: 12px;}
  .yonghulist{margin-top:20px;padding-bottom:10px;border-bottom: 1px solid #ddd;}
  .yonghulist dt{width: 50px;height:50px;display: inline-block;}
  .yonghulist dt img{width:50px;height: 50px;}
  .yonghulist dd{display: inline-block;margin-left:50px;vertical-align: bottom;}
  .yonghu_name{font-size: 20px;}
  .yonghu_guanzhu{float: right;line-height: 56px;}
  .yonghu_guanzhu>span{margin-right: 20px;}
  .yonghu_two span{margin-left: 20px;}
</style>



<template>
  <div id="wenda">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="推荐问答" name="1">
        <ul class="wenda_list" v-for="q in questions" :key="q.qid">
          <li class="list_li list_li1">
            <h1 @click="wendaDetail(q.qid)" class="cursor_pointer">{{q.title}}</h1>
            <span class="pinlei">品类： {{q.sector}}</span>
          </li>
          <li class="list_li2">
            <el-tag type="danger">{{q.tag}}</el-tag>
            <span class="margin_left_50 list_li2_span">{{q.follow}}人关注</span>
            <span class="margin_left_50 list_li2_span">{{q.join}}人参与</span>
            <span class="margin_left_50 list_li2_span">{{q.answerTotal}}个回答</span>
            <div class="right_btn">
              <el-button type="text" @click="yaoqingda(q)">邀请回答</el-button>
              <el-button type="primary" @click="mywenda(q.qid)">我来回答</el-button>
            </div>
          </li>
          <li class="list_li3">
            <span @click="personal(q.answer.uid)" class="cursor_pointer">{{q.answer.name}}</span>
            <span>{{q.answer.topPercent}}</span>
            <span>推荐分{{q.answer.recScore}}</span>
          </li>
          <li class="list_li4">
            <p>{{q.answer.cont}}</p>
          </li>
          <li class="list_li5">
            <el-button type="text" @click="clickOper(1,1,q.qid)">赞同({{q.answer.agree}})</el-button>
            <el-button type="text" @click="clickOper(1,2,q.qid)">反对({{q.answer.disAgree}})</el-button>
            <span type="text" style="font-size:14px;margin-left:20px;" v-show="q.isDoubleScore==1">双倍积分</span>
            <el-button type="text" style="margin-left:0;" v-show="q.isDoubleScore==1" @click="isDoubleScoreShow=true;">(?)</el-button>
          </li>
        </ul>
        <el-pagination
          small
          style="text-align:right;"
          layout="prev, pager, next"
          :total="totalPage">
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="推荐商品/服务" name="2">
        <ul class="wenda_list" v-for="good in recComList" :key="good.goodsId">
          <li class="list_li list_li1">
            <h1 @click="goodsDetail(good.goodsId)" class="cursor_pointer">{{good.goodsName}}</h1>
            <span class="pingfen">推荐分：<span style="font-size:22px;font-weight:500;"> {{good.recScore}}</span></span>
            <span class="pinlei">品类： {{good.sector}}</span>
          </li>
          <li class="list_li2">
            <span>¥{{good.minPrice}}～¥{{good.maxPrice}}</span>
            <span class="margin_left_50 list_li2_span">{{good.follow}}人关注</span>
            <span class="margin_left_50 list_li2_span">{{good.comment}}个评价</span>
            <div class="right_btn">
              <el-button type="text" @click="yaoqingpingjia(good)">邀请评价</el-button>
              <el-button type="primary" @click="gopingjia()">我来评价</el-button>
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
    </el-tabs>
    <el-dialog
      title="双倍积分"
      v-model="isDoubleScoreShow"
      size="tiny">
      <span>当评价数目较少时，用户对答案的投票可以获得双倍积分</span>
    </el-dialog>
    <el-dialog
      title="添加商品/服务"
      v-model="addGoodsSvr"
      size="">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="商品/服务">
          <el-input v-model="form.title" placeholder="请输入商品/服务名"></el-input>
        </el-form-item>
        <el-form-item label="所属品类">
          <el-select v-model="form.sectorId" placeholder="请选择商品品类">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addGoodsSvr = false">取 消</el-button>
        <el-button type="primary" @click="addGoods">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name:'wenda',
  data(){
    return{
      activeName:'1',
      questions:[],
      recComList:[],
      isDoubleScoreShow:false,
      totalPage:0,
      totalPage1:0,
      page:1,
      page1:1,
      addGoodsSvr:false,
      form:{
        title:'',
        sectorId:'',
      }
    }
  },
  mounted(){
    this.getwendalist();
    this.getrecComList();
  },
  methods:{
    getwendalist(){
      var self=this;
      var url="/recQA",
          params={page:self.page},
          successd=function(res){
            self.questions=res.data.questions;
            self.totalPage=res.data.totalPage-0;
          };
      self.$get(url,{},successd);
    },
    handleClick(){

    },
    getrecComList(){
      var self=this;
      var url="/recCom",
          params={page:self.page1},
          successd=function(res){
            self.recComList=res.data.goods;
            self.totalPage1=res.data.totalPage-0;
          };
      self.$get(url,params,successd);
    },
    goodsDetail(id){
      localStorage.goodsId=id;
      this.$router.push('/index/goodsDetail');
    },
    wendaDetail(qid){
      localStorage.qid=qid;
      this.$router.push('/index/wendaDetail');
    },
    addGoods(){
      var self =this;
      var url="/addGoodsSvr",
          param={},
          successd=function(res){
            console.log(res);
          };
      self.$get(url,param,successd);
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
            self.getwendalist();
            self.getrecComList();
          };
      self.$get(url,param,successd);
    },
    mywenda(qid){
      localStorage.qid=qid;
      localStorage.activeName=1;
      this.$router.push('/index/mywenda');
    },
    personal(uid){
      localStorage.uid=uid;
      this.$router.push('/index/userDetail')
    },
    yaoqingda(q){
      localStorage.title=q.title;
      localStorage.qid=q.qid;
      localStorage.pingjia=true;
      this.$router.push('/index/add/2');
    },
    yaoqingpingjia(good){
      localStorage.goodsId=good.goodsId;
      localStorage.goodsName=good.goodsName;
      localStorage.pingjia=true;
      this.$router.push('/index/add/1');
    },
    gopingjia(){
      localStorage.activeName=2;
      this.$router.push('/index/mywenda');
    }
  }
}
</script>
<style scoped>
  #wenda{width: 1000px;margin: 0 auto;}
  .wenda_list{margin-top:20px;}
  .wenda_list .list_li{overflow: hidden;position: relative;}
  .list_li1 h1{font-size: 18px;line-height: 32px; margin: 0;}
  .list_li1 .pinlei{position: absolute;right: 10px;top: 0px;width: 100px;height: 32px;line-height: 40px;font-size: 14px;}
  .list_li2{height:40px;position: relative;line-height: 40px;}
  .list_li2 .right_btn{position: absolute;right:10px;top:0px;height: 40px;}
  .list_li2_span{font-size: 12px;vertical-align:bottom;}
  .list_li3{height: 20px;line-height: 20px;font-size: 12px;}
  .list_li3 span {margin-right:20px;}
  .list_li4 {font-size: 12px;line-height: 20px;}
  .list_li5{line-height: 20px;}
  .list_li1 .pingfen{position: absolute;right: 200px;top: 0;height: 32;line-height: 40px;font-size: 14px;}
</style>


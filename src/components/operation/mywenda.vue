<template>
  <div id="mywenda">
    <el-tabs v-model="activeName">
      <el-tab-pane label="我的问答详情" name="1" v-if="activeName==1">
        <div class="margin_top_20" v-if="qaDetail">
          <el-row>
            <el-col :span="20" class="font_size_20">{{qaDetail.title}}?</el-col>
            <el-col :span="4">品类：&nbsp; &nbsp; {{qaDetail.sector}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="4"><el-tag type="danger">{{qaDetail.tag}}</el-tag></el-col>
            <el-col :span="20" style="text-align:center;font-size:12px;"> {{qaDetail.follow}}人关注 &nbsp; &nbsp; {{qaDetail.join}}人参与 &nbsp; &nbsp; {{qaDetail.answerTotal}}个回答</el-col>
          </el-row>
          <el-row class="margin_top_20">
            <el-col :span="2">
              回答：
            </el-col>
            <el-col :span="22">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="content">
              </el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" class="text_align_right margin_top_20">
              <el-button type="primary" @click="commitAnswer">确认发布</el-button>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane label="消费评价详情" name="2" v-if="activeName==2">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="消费日期">
            <el-date-picker
              v-model="form.date"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="消费内容">
            <el-select v-model="form.goodsId" filterable placeholder="请选择商品/服务" :disabled="yaoqing" @change="getchannelList(form.goodsId)">
              <el-option :label="sector.itemName" :value="sector.itemId" v-for="sector in goodSvrs" :key="sector.itemId"></el-option>
            </el-select>
            <el-button type="text" @click="addGoodsSvr=true;">添加商品/服务</el-button>
          </el-form-item>
          <el-form-item label="质量/品质">
            <el-rate
              v-model="form.rate1"
              :texts="rateCon"
              show-text>
            </el-rate>
          </el-form-item>
          <el-form-item label="外观/工艺">
            <el-rate
              v-model="form.rate2"
              :texts="rateCon"
              show-text>
            </el-rate>
          </el-form-item>
          <el-form-item label="功能/效果">
            <el-rate
              v-model="form.rate3"
              :texts="rateCon"
              show-text>
            </el-rate>
          </el-form-item>
          <div>
            <el-button type="text" @click="addpinglun('1')">添加评论</el-button>
          </div>
          <div v-for="(ping,index) in pinglunL" :key="ping.content">
            <p> {{ping.content}}</p>
            <p class="text_align_right">
              <el-button type="text" @click="delePing(index)">移除评论</el-button>
              <!-- <el-button type="text" @click="commitAnswer">赞同</el-button>
              <el-button type="text" @click="commitAnswer">反对</el-button> -->
            </p>
          </div>
          <el-form-item label="消费价格">
            <el-input v-model="form.price" placeholder="请输入价格"></el-input>
          </el-form-item>
          <el-form-item label="消费渠道">
            <el-select v-model="form.channelId" filterable placeholder="请选择渠道" :disabled="yaoqing">
              <el-option :label="channel.name" :value="channel.cid" v-for="channel in channels" :key="channel.cid"></el-option>
            </el-select>
            <el-button type="text" @click="addChannelShow=true">添加渠道</el-button>
          </el-form-item>
          <el-form-item label="物美价廉">
            <el-rate
              v-model="form.rate11"
              :texts="rateCon"
              show-text>
            </el-rate>
          </el-form-item>
          <el-form-item label="服务态度">
            <el-rate
              v-model="form.rate12"
              :texts="rateCon"
              show-text>
            </el-rate>
          </el-form-item>
          <el-form-item label="发货速度">
            <el-rate
              v-model="form.rate13"
              :texts="rateCon"
              show-text>
            </el-rate>
          </el-form-item>
          <div>
            <el-button type="text" @click="addpinglun('2')">添加评论</el-button>
          </div>
          <div v-for="(ping,index) in pinglunL2" :key="ping.content">
            <p> {{ping.content}}</p>
            <p class="text_align_right">
              <el-button type="text" @click="delePing(index)">移除评论</el-button>
              <!-- <el-button type="text" @click="commitAnswer">赞同</el-button>
              <el-button type="text" @click="commitAnswer">反对</el-button> -->
            </p>
          </div>
          <el-form-item class="text_align_right">
            <el-button type="primary" @click="commentDetail">确定发布</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>

    <el-dialog
      title="添加商品/服务"
      v-model="addGoodsSvr"
      size="small">
      <el-form ref="form" :model="form1" label-width="80px">
        <el-form-item label="类别">
          <el-radio class="radio" v-model="form1.opType" label="1">商品</el-radio>
          <el-radio class="radio" v-model="form1.opType" label="2">服务</el-radio>
        </el-form-item>
        <el-form-item label="商品/服务">
          <el-input v-model="form1.title" placeholder="请输入商品/服务名"></el-input>
        </el-form-item>
        <el-form-item label="所属品类">
          <el-select v-model="form1.sectorId" filterable placeholder="请选择商品品类">
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
      title="添加评论"
      v-model="addpinglunShow"
      size="small">
      <el-row>
        <el-col :span="21">
          <el-input v-model="form3.content"></el-input>
        </el-col>
        <el-col :span="3">
          <el-button @click="addpinglunGood(form3.content)">新建评论</el-button>
        </el-col>
      </el-row>
      <el-row class="pinglun_list" v-for="com in goodsComments" :key="com.name">
        <el-col :span="22">
          <p>{{com.content}}</p>
        </el-col>
        <el-col :span="2">
          <p><el-button type="text" @click="addpinglunGood(com.content)">赞同</el-button></p>
          <!-- <p><el-button type="text">反对</el-button></p> -->
        </el-col>
      </el-row>
    </el-dialog>

    <el-dialog
      title="添加渠道"
      v-model="addChannelShow"
      size="small">
      <el-form ref="form" :model="form4" label-width="80px">
        <el-form-item label="渠道名">
          <el-input v-model="form4.channelName" placeholder="请输入渠道名"></el-input>
        </el-form-item>
        <el-form-item label="渠道类型">
          <el-radio class="radio" v-model="form4.channelType" label="1">线上</el-radio>
          <el-radio class="radio" v-model="form4.channelType" label="2">线下</el-radio>
        </el-form-item>
        <el-form-item label="渠道地址">
          <el-input v-model="form4.channelAddress" placeholder="请输入渠道地址"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addChannelShow = false">取 消</el-button>
        <el-button type="primary" @click="addChannel">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name:'mywenda',
  data(){
    return{
      qid:'',
      qaDetail:null,
      activeName:'1',
      content:'',
      form:{
        date:'',
        rate1:3,
        rate2:3,
        rate3:3,
        rate11:3,
        rate12:3,
        rate13:3,
        content:'',
        goodsId:'',
        channelId:'',
        price:'',
      },
      rateCon:['很差','差','一般','好','很好'],
      form1:{
        opType:"1",
        title:'',
        sectorId:'',
      },
      addGoodsSvr:false,
      sectorList:null,
      yaoqing:false,
      addpinglunShow:false,
      form3:{
        content:'',
      },
      pinglunL:[
        // {
        //   content:'感觉口味不太一样，不知道是不是过期了',
        // }
      ],
      pinglunL2:[
        // {
        //   content:'感觉口味不太一样，不知道是不是过期了',
        // }
      ],
      goodSvrs:[],
      goodsComments:[],
      channels:[],
      addChannelShow:false,
      form4:{
        channelName:'',
        channelType:"1",
        channelAddress:''
      },
      isGoodspinglun:true
    }
  },
  mounted(){
    this.index();
    this.getsectorList();
    // this.getgoodsComments();
    this.searchGoodsSvr();
  },
  methods:{
    index(){
      var self=this;
      self.activeName=localStorage.activeName;
      self.qid=localStorage.qid;
      var url="/qaDetail",
          param={qid:localStorage.qid},
          successd=function(res){
            self.qaDetail=res.data.qaDetail;
          };
      self.$get(url,param,successd);
    },
    commitAnswer(){
      var self=this;
      var url="/commitAnswer",
          param={content:self.content,questionId:self.qid},
          successd=function(res){
            self.$router.push('/index/wendaDetail');
          };
      self.$post(url,param,successd);
    },
    getsectorList(){
      var self=this;
      var url="/sectorList",
          successd=function(res){
            console.log(res);
            self.sectorList=res.data.sectors;
            // self.getmyFollowFriends(self.sectorList[0].sid);
          };
      self.$get(url,{},successd);
    },
    addGoods(){
      var self=this;
      var url="/addGoodsSvr",
          param=self.form1,
          successd=function(res){
            console.log(res);
            self.addGoodsSvr=false;
            self.searchGoodsSvr();
          };
      self.$get(url,param,successd);
    },
    delePing(index){
      this.pinglunL.splice(index,1);
    },
    getgoodsComments(){
      var self=this;
      var url="/goodsComments",
          param={
            goodsId:self.goodsId
          },
          successd=function(res){
            self.goodsComments=res.data.goodsComments;
          };
      self.$get(url,param,successd);
    },
    searchGoodsSvr(){
      var self=this;
      var url="/searchGoodsSvr",
          param={
            all:1,
            page:1
          },
          successd=function(res){
            self.goodSvrs=res.data.goodSvrs;
          };
      self.$get(url,param,successd);
    },
    addpinglun(type){
      var self=this;
      if (type==1) {//商品评价列表
        self.isGoodspinglun=true;
        if(self.form.goodsId==""){
          self.$message({
            message:'请选择商品',
            type:'error'
          })
          return;
        }
        var url="/goodsComments",
            param={
              goodsId:self.form.goodsId
            },
            successd=function(res){
              self.goodsComments=res.data.goodsComments;
              self.addpinglunShow=true;
            };
        self.$get(url,param,successd);
      } else {
        self.isGoodspinglun=false;
        if(self.form.channelId==""){
          self.$message({
            message:'请选择渠道',
            type:'error'
          })
          return;
        }
        var url="/goodsChannelComments",
            param={
              goodsChannelId:self.form.channelId
            },
            successd=function(res){
              self.goodsComments=res.data.goodsComments;
              self.addpinglunShow=true;
            };
        self.$get(url,param,successd);
      }
    },
    addpinglunGood(con){
      if(this.isGoodspinglun){
        this.pinglunL.push({content:con});
      }else{
        this.pinglunL2.push({content:con});
      }
      this.addpinglunShow=false;
    },
    getchannelList(goodsId){
      var self=this;
      var url="/channelList",
          param={
            goodsId:goodsId,
          },
          successd=function(res){
            self.channels=res.data.channels;
          };
      self.$get(url,param,successd);
    },
    addChannel(){
      var self=this;
      var url="/addChannel",
          param={
            goodsId:self.form.goodsId,
            channelName:self.form4.channelName,
            channelType:self.form4.channelType,
            channelAddress:self.form4.channelAddress
          },
          successd=function(res){
            self.addChannelShow=false;
            self.getchannelList(self.form.goodsId);
          };
      self.$get(url,param,successd);
    },
    commentDetail(){
      var self=this;
      var url="/commentDetail",
          param={
            consumeDate:self.$date(self.form.date),
            goodsId:self.form.goodsId,
            goodsSelectItems:(6-self.form.rate1)+','+(6-self.form.rate2)+','+(6-self.form.rate3),
            price:self.form.price,
            goodsCont:self.pinglunL[0].content,
            channelCont:self.pinglunL2[0].content,
            channelId:self.form.channelId,
            channelSelectItems:(6-self.form.rate11)+','+(6-self.form.rate12)+','+(6-self.form.rate13),
          },
          successd=function(res){
            self.$message({
              message:"评价成功！",
              type:'success'
            })
            localStorage.goodsId=self.form.goodsId;
            self.$router.push('/index/goodsDetail');
          };
      self.$get(url,param,successd);
    }
  }
}
</script>
<style scoped>
#mywenda{width: 1000px;margin: 0 auto;}
.pinglun_list{padding: 10px 0;border-bottom: 1px solid #ddd;}
</style>



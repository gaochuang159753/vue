<template>
  <div id="goodsDetail">
    <!-- 商品详情 -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="商品/服务详情" name="1">
        <ul class="wenda_list">
          <li class="list_li list_li1">
            <h1>{{goodsDetail.goodsName}}</h1>
            <span class="pingfen">推荐分：<span style="font-size:22px;font-weight:500;"> {{goodsDetail.recScore}}</span></span>
            <span class="pinlei">品类： {{goodsDetail.sector}}</span>
          </li>
          <li class="list_li2">
            <span>¥{{goodsDetail.minPrice}}～¥{{goodsDetail.maxPrice}}</span>
            <span class="margin_left_50 list_li2_span">{{goodsDetail.follow}}人关注</span>
            <el-button type="text" @click="operFollow(1,3,goodsDetail.goodsId)" v-if="goodsDetail.follow==0">+关注</el-button>
            <el-button type="text" @click="operFollow(2,3,goodsDetail.goodsId)" v-if="goodsDetail.follow==1">取消关注</el-button>
            <div class="right_btn">
              <el-button type="text" @click="yaoqingpingjia(goodsDetail)">邀请评价</el-button>
              <el-button type="primary" @click="gopingjia">我来评价</el-button>
            </div>
          </li>
          <li>
            <el-button type="text" @click="goodsCommentsShow=true">{{goodsDetail.comment}}个评价</el-button>
          </li>
          <li>
            <span class="zhiliang">质量/品质</span>
            <span class="el-icon-caret-top">{{option1Ratio[0]-0+(option1Ratio[1]-0) || 0}}%</span>
            <ul class="jindutiao">
              <li class="jindutiao1" :style="'width:'+option1Ratio[0]+'%'"></li>
              <li class="jindutiao2" :style="'width:'+option1Ratio[1]+'%'"></li>
              <li class="jindutiao3" :style="'width:'+option1Ratio[2]+'%'"></li>
              <li class="jindutiao4" :style="'width:'+option1Ratio[3]+'%'"></li>
              <li class="jindutiao5" :style="'width:'+option1Ratio[4]+'%'"></li>
            </ul>
            <span class="el-icon-caret-bottom">{{option1Ratio[3]-0+(option1Ratio[4]-0) || 0}}%</span>
            <span style="margin-left:50px;">评价分 ：<span style="font-size:22px;font-weight:500;">{{goodsDetail.option1Score}}</span></span>
          </li>
          <li>
            <span class="zhiliang">外观/工艺</span>
            <span class="el-icon-caret-top">{{option2Ratio[0]-0+(option2Ratio[1]-0) || 0}}%</span>
            <ul class="jindutiao">
              <li class="jindutiao1" :style="'width:'+option2Ratio[0]+'%'"></li>
              <li class="jindutiao2" :style="'width:'+option2Ratio[1]+'%'"></li>
              <li class="jindutiao3" :style="'width:'+option2Ratio[2]+'%'"></li>
              <li class="jindutiao4" :style="'width:'+option2Ratio[3]+'%'"></li>
              <li class="jindutiao5" :style="'width:'+option2Ratio[4]+'%'"></li>
            </ul>
            <span class="el-icon-caret-bottom">{{option2Ratio[3]-0+(option2Ratio[4]-0) || 0}}%</span>
            <span style="margin-left:50px;">评价分 ：<span style="font-size:22px;font-weight:500;"> {{goodsDetail.option2Score}}</span></span>
          </li>
          <li>
            <span class="zhiliang">功能/效果</span>
            <span class="el-icon-caret-top">{{option3Ratio[0]-0+(option3Ratio[1]-0) || 0}}%</span>
            <ul class="jindutiao">
              <li class="jindutiao1" :style="'width:'+option3Ratio[0]+'%'"></li>
              <li class="jindutiao2" :style="'width:'+option3Ratio[1]+'%'"></li>
              <li class="jindutiao3" :style="'width:'+option3Ratio[2]+'%'"></li>
              <li class="jindutiao4" :style="'width:'+option3Ratio[3]+'%'"></li>
              <li class="jindutiao5" :style="'width:'+option3Ratio[4]+'%'"></li>
            </ul>
            <span class="el-icon-caret-bottom">{{option3Ratio[3]-0+(option3Ratio[4]-0) || 0}}%</span>
            <span style="margin-left:50px;">评价分 ：<span style="font-size:22px;font-weight:500;"> {{goodsDetail.option3Score}}</span></span>
          </li>
          <li class="seemore"><el-button type="text" @click="goodsCommentsShow=true">查看更多评价</el-button></li>
          <li class="font_size_14 qudao">渠道评价</li>
          <li>
            <el-row :gutter="20" v-for="channel in channels" :key="channel.goodsChannelId">
              <el-col :span="16">
                <div @click="qudaoDetail(channel.goodsChannelId)">{{channel.channelName}}</div>
                <!-- <div class="font_size_12">最新单价：¥256</div> -->
              </el-col>
              <el-col :span="8">
                <div class="display_inlineblock qudao_name">{{channel.ctype}}</div>
                <ul class="display_inlineblock text_align_center margin_left_10">
                  <li>{{channel.option1Score}}</li>
                  <li class="font_size_12">货真价实</li>
                </ul>
                <ul class="display_inlineblock text_align_center margin_left_10">
                  <li>{{channel.option2Score}}</li>
                  <li class="font_size_12 ">服务态度</li>
                </ul>
                <ul class="display_inlineblock text_align_center margin_left_10">
                  <li>{{channel.option3Score}}</li>
                  <li class="font_size_12">物流体验</li>
                </ul>
              </el-col>
            </el-row>
          </li>
          <!-- <li class="seemore"><el-button type="text">展开所有渠道</el-button></li> -->
          </ul>
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      title="更多评论"
      v-model="goodsCommentsShow"
      size="small">
      <!-- <p>{{goodsDetail.goodsName}}</p> -->
      <el-row class="pinglun_list" v-for="com in goodsComments" :key="com.name">
        <el-col :span="22">
          <p>{{com.content}}</p>
        </el-col>
        <el-col :span="2">
          <p><el-button type="text">赞同</el-button></p>
          <p><el-button type="text">反对</el-button></p>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name:'goodsDetail',
  data(){
    return{
      activeName:'1',
      goodsDetail:{},
      channels:[],
      goodsCommentsShow:false,
      goodsComments:[],
      option1Ratio:[],
      option2Ratio:[],
      option3Ratio:[],
    }
  },
  mounted(){
    this.index();
  },
  methods:{
    index(){
      var self=this;
      var method="/goodsDetail",
          param={goodsId:localStorage.goodsId},
          successd=function(res){
            self.goodsDetail=res.data.goodsDetail;
            self.channels=res.data.goodsDetail.channels;
            self.option1Ratio=res.data.goodsDetail.option1Ratio.split('-');
            self.option2Ratio=res.data.goodsDetail.option2Ratio.split('-');
            self.option3Ratio=res.data.goodsDetail.option3Ratio.split('-');
            // self.option1Ratio.push(option1Ratio[0]-0+(option1Ratio[1]-0));
            // self.option1Ratio.push(option1Ratio[2]-0);
            // self.option1Ratio.push(option1Ratio[3]-0+(option1Ratio[4]-0));

            // self.option2Ratio.push(option2Ratio[0]-0+(option2Ratio[1]-0));
            // self.option2Ratio.push(option2Ratio[2]-0);
            // self.option2Ratio.push(option2Ratio[3]-0+(option2Ratio[4]-0));

            // self.option3Ratio.push(option3Ratio[0]-0+(option3Ratio[1]-0));
            // self.option3Ratio.push(option3Ratio[2]-0);
            // self.option3Ratio.push(option3Ratio[3]-0+(option3Ratio[4]-0));
            console.log(self.option1Ratio)
            console.log(self.option2Ratio)
            console.log(self.option3Ratio)
          };
      if(localStorage.goodsId){
        self.$get(method,param,successd);
      }
    },
    qudaoDetail(goodsChannelId){
      localStorage.goodsChannelId=goodsChannelId;
      this.$router.push('/index/qudaoDetail');
    },
    getgoodsComments(){
      var self=this;
      var url="/goodsComments",
          param={
            goodsId:localStorage.goodsId
          },
          successd=function(res){
            self.goodsComments=res.data.goodsComments;
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
    },
  }
}
</script>
<style scoped>
  #goodsDetail{width: 1000px;margin:0 auto;}
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

  .jindutiao{width:500px;height: 16px;display: inline-block;}
  .jindutiao li{float: left;height: 10px;margin-top: 3px;}
  .jindutiao1{width: 20%;background-color: #13ce66;}
  .jindutiao2{width: 20%;background-color: #20a0ff;}
  .jindutiao3{width: 20%;background-color: #F7BA2A;}
  .jindutiao4{width: 20%;background-color: #1F2D3D;}
  .jindutiao5{width: 20%;background-color: #FF4949;}
  .zhiliang{margin-right: 50px;}
  .seemore{text-align: center;}
  .qudao{margin-bottom: 10px;}
  .qudao_name{height: 40px;line-height: 40px;vertical-align: top;}
</style>


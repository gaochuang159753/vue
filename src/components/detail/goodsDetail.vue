<template>
  <div id="goodsDetail">
    <!-- 商品详情 -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
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
            <el-button type="text">+关注</el-button>
            <div class="right_btn">
              <el-button type="text">邀请评价</el-button>
              <el-button type="primary">我来评价</el-button>
            </div>
          </li>
          <li>
            <el-button type="text">{{goodsDetail.comment}}个评价</el-button>
          </li>
          <li>
            <span class="zhiliang">质量/品质</span>
            <span class="el-icon-caret-top">40%</span>
            <ul class="jindutiao">
              <li class="jindutiao1"></li>
              <li class="jindutiao2"></li>
              <li class="jindutiao3"></li>
            </ul>
            <span class="el-icon-caret-bottom">30%</span>
            <span style="margin-left:50px;">评价分 ：<span style="font-size:22px;font-weight:500;"> 4.7</span></span>
          </li>
          <li>
            <span class="zhiliang">外观/工艺</span>
            <span class="el-icon-caret-top">40%</span>
            <ul class="jindutiao">
              <li class="jindutiao1"></li>
              <li class="jindutiao2"></li>
              <li class="jindutiao3"></li>
            </ul>
            <span class="el-icon-caret-bottom">30%</span>
            <span style="margin-left:50px;">评价分 ：<span style="font-size:22px;font-weight:500;"> 4.7</span></span>
          </li>
          <li>
            <span class="zhiliang">功能/效果</span>
            <span class="el-icon-caret-top">40%</span>
            <ul class="jindutiao">
              <li class="jindutiao1"></li>
              <li class="jindutiao2"></li>
              <li class="jindutiao3"></li>
            </ul>
            <span class="el-icon-caret-bottom">30%</span>
            <span style="margin-left:50px;">评价分 ：<span style="font-size:22px;font-weight:500;"> 4.7</span></span>
          </li>
          <li class="seemore"><el-button type="text">查看更多评价</el-button></li>
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
          <li class="seemore"><el-button type="text">展开所有渠道</el-button></li>
          </ul>
      </el-tab-pane>
    </el-tabs>
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
            var option1Ratio=res.data.goodsChannelDetail.option1Ratio.split('-');
            var option2Ratio=res.data.goodsChannelDetail.option2Ratio.split('-');
            var option3Ratio=res.data.goodsChannelDetail.option3Ratio.split('-');
            self.option1Ratio.push(option1Ratio[0]-0+(option1Ratio[1]-0));
            self.option1Ratio.push(option1Ratio[2]-0);
            self.option1Ratio.push(option1Ratio[3]-0+(option1Ratio[4]-0));

            self.option2Ratio.push(option2Ratio[0]-0+(option2Ratio[1]-0));
            self.option2Ratio.push(option2Ratio[2]-0);
            self.option2Ratio.push(option2Ratio[3]-0+(option2Ratio[4]-0));

            self.option3Ratio.push(option3Ratio[0]-0+(option3Ratio[1]-0));
            self.option3Ratio.push(option3Ratio[2]-0);
            self.option3Ratio.push(option3Ratio[3]-0+(option3Ratio[4]-0));
          };
      if(localStorage.goodsId){
        self.$get(method,param,successd);
      }
    },
    qudaoDetail(goodsChannelId){
      localStorage.goodsChannelId=goodsChannelId;
      this.$router.push('/index/qudaoDetail');
    }
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

  .jindutiao{width:300px;height: 16px;display: inline-block;}
  .jindutiao li{float: left;height: 10px;margin-top: 3px;}
  .jindutiao1{width: 120px;background-color: #13ce66;}
  .jindutiao2{width: 90px;background-color: #20a0ff;}
  .jindutiao3{width: 90px;background-color: #F7BA2A;}
  .zhiliang{margin-right: 50px;}
  .seemore{text-align: center;}
  .qudao{margin-bottom: 10px;}
  .qudao_name{height: 40px;line-height: 40px;vertical-align: top;}
</style>


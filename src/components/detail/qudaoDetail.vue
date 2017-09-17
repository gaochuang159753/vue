<template>
  <div id="qudaoDetail">
    <!-- 渠道详情 -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="渠道详情" name="1">
        <el-row>
          <el-col :span="15">
            <h1 class="font_size_20">{{goodsChannelDetail.goodsName}}</h1>
          </el-col>
          <el-col :span="3">
            <el-tag>{{goodsChannelDetail.ctype}}</el-tag>
          </el-col>
          <el-col :span="6" class="text_align_right">
            <el-button type="text" @click="yaoqingpingjia">邀请评价</el-button>
            <el-button type="primary" @click="gopingjia">我来评价</el-button>
          </el-col>
        </el-row>
        <p class="font_size_12">选择商品:爱他美2段奶粉金装 新西兰原厂</p>
        <el-row>
          <el-col :span="6">
            <h1>物美价廉</h1>
          </el-col>
          <el-col :span="12">
            <i class="el-icon-caret-top">{{option1Ratio[0]-0+(option1Ratio[1]-0)||0}}%</i>
            <ul class="jindutiao">
              <li class="jindutiao1" :style="'width:'+option1Ratio[0]+'%'"></li>
              <li class="jindutiao2" :style="'width:'+option1Ratio[1]+'%'"></li>
              <li class="jindutiao3" :style="'width:'+option1Ratio[2]+'%'"></li>
              <li class="jindutiao4" :style="'width:'+option1Ratio[3]+'%'"></li>
              <li class="jindutiao5" :style="'width:'+option1Ratio[4]+'%'"></li>
            </ul>
            <i class="el-icon-caret-bottom">{{option1Ratio[3]-0+(option1Ratio[4]-0)||0}}%</i>
          </el-col>
          <el-col :span="6" class="text_align_right">
            评价分:<span class="font_size_18">{{goodsChannelDetail.option1Score}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <h1>服务态度</h1>
          </el-col>
          <el-col :span="12">
            <i class="el-icon-caret-top">{{option2Ratio[0]-0+(option2Ratio[1]-0)||0}}%</i>
            <ul class="jindutiao">
              <li class="jindutiao1" :style="'width:'+option2Ratio[0]+'%'"></li>
              <li class="jindutiao2" :style="'width:'+option2Ratio[1]+'%'"></li>
              <li class="jindutiao3" :style="'width:'+option2Ratio[2]+'%'"></li>
              <li class="jindutiao4" :style="'width:'+option2Ratio[3]+'%'"></li>
              <li class="jindutiao5" :style="'width:'+option2Ratio[4]+'%'"></li>
            </ul>
            <i class="el-icon-caret-bottom">{{option2Ratio[3]-0+(option2Ratio[4]-0)||0}}%</i>
          </el-col>
          <el-col :span="6" class="text_align_right">
            评价分:<span class="font_size_18">{{goodsChannelDetail.option2Score}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <h1>发货速度</h1>
          </el-col>
          <el-col :span="12">
            <i class="el-icon-caret-top">{{option3Ratio[0]-0+(option3Ratio[1]-0)||0}}%</i>
            <ul class="jindutiao">
              <li class="jindutiao1" :style="'width:'+option3Ratio[0]+'%'"></li>
              <li class="jindutiao2" :style="'width:'+option3Ratio[1]+'%'"></li>
              <li class="jindutiao3" :style="'width:'+option3Ratio[2]+'%'"></li>
              <li class="jindutiao4" :style="'width:'+option3Ratio[3]+'%'"></li>
              <li class="jindutiao5" :style="'width:'+option3Ratio[4]+'%'"></li>
            </ul>
            <i class="el-icon-caret-bottom">{{option3Ratio[3]-0+(option3Ratio[4]-0)||0}}%</i>
          </el-col>
          <el-col :span="6" class="text_align_right">
            评价分:<span class="font_size_18">{{goodsChannelDetail.option3Score}}</span>
          </el-col>
        </el-row>
        <h1>详细评价</h1>
        <ul v-for="comment in comments" :key="comment.content">
          <li>{{comment.content}}</li>
          <li>
            <span>赞同({{comment.agree}})</span>
            <span>反对({{comment.disagree}})</span>
          </li>
        </ul>
        <!-- <el-button type="text">...更多评价</el-button> -->
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name:'qudaoDetail',
  data(){
    return{
      activeName:'1',
      goodsChannelDetail:{},
      comments:[],
      option1Ratio:[],
      option2Ratio:[],
      option3Ratio:[]
    }
  },
  mounted(){
    this.index();
  },
  methods:{
    index(){
      var self=this;
      var url="/channelDetail",
          param={goodsChannelId:localStorage.goodsChannelId},
          successd=function(res){
            self.goodsChannelDetail=res.data.goodsChannelDetail;
            self.comments=res.data.goodsChannelDetail.comments;
            self.option1Ratio=res.data.goodsChannelDetail.option1Ratio.split('-');
            self.option2Ratio=res.data.goodsChannelDetail.option2Ratio.split('-');
            self.option3Ratio=res.data.goodsChannelDetail.option3Ratio.split('-');
            // self.option1Ratio.push(option1Ratio[0]-0+(option1Ratio[1]-0));
            // self.option1Ratio.push(option1Ratio[2]-0);
            // self.option1Ratio.push(option1Ratio[3]-0+(option1Ratio[4]-0));

            // self.option2Ratio.push(option2Ratio[0]-0+(option2Ratio[1]-0));
            // self.option2Ratio.push(option2Ratio[2]-0);
            // self.option2Ratio.push(option2Ratio[3]-0+(option2Ratio[4]-0));

            // self.option3Ratio.push(option3Ratio[0]-0+(option3Ratio[1]-0));
            // self.option3Ratio.push(option3Ratio[2]-0);
            // self.option3Ratio.push(option3Ratio[3]-0+(option3Ratio[4]-0));
          };
      self.$get(url,param,successd);
    },
    yaoqingpingjia(){
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
  #qudaoDetail{width:1000px;margin: 0 auto;}
  .jindutiao{width:300px;height: 16px;display: inline-block;}
  .jindutiao li{float: left;height: 10px;margin-top: 3px;}
  .jindutiao1{width: 0%;background-color: #13ce66;}
  .jindutiao2{width: 0%;background-color: #20a0ff;}
  .jindutiao3{width: 0%;background-color: #F7BA2A;}
  .jindutiao4{width: 0%;background-color: #1F2D3D;}
  .jindutiao5{width: 0%;background-color: #FF4949;}
  .zhiliang{margin-right: 50px;}
  .seemore{text-align: center;}
  .qudao{margin-bottom: 10px;}
  .qudao_name{height: 40px;line-height: 40px;vertical-align: top;}
</style>



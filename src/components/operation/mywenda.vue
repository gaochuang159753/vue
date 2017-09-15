<template>
  <div id="mywenda">
    <el-tabs v-model="activeName">
      <el-tab-pane label="我的问答详情" name="1">
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
    </el-tabs>
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
    }
  },
  mounted(){
    this.index();
  },
  methods:{
    index(){
      var self=this;
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
    }
  }
}
</script>
<style scoped>
#mywenda{width: 1000px;margin: 0 auto;}
</style>



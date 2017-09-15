<template>
  <div id="add">
    <el-tabs v-model="activeName">
      <el-tab-pane label="添加商品/服务" name="1">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="类别">
            <el-radio class="radio" v-model="form.opType" label="1">商品</el-radio>
            <el-radio class="radio" v-model="form.opType" label="2">服务</el-radio>
          </el-form-item>
          <el-form-item label="商品/服务">
            <el-input v-model="form.title" placeholder="请输入商品/服务名"></el-input>
          </el-form-item>
          <el-form-item label="所属品类">
            <el-select v-model="form.sectorId" filterable placeholder="请选择商品品类">
              <el-option :label="sector.name" :value="sector.sid" v-for="sector in sectorList" :key="sector.sid"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addGoods">确定创建</el-button>
          </el-form-item>
        </el-form>
        
      </el-tab-pane>
      <el-tab-pane label="添加问题" name="2">
        <el-form ref="form" :model="form2" label-width="80px">
          <el-form-item label="问题标题">
            <el-input v-model="form2.title" placeholder="请输入问题标题"></el-input>
          </el-form-item>
          <el-form-item label="所属品类">
            <el-select v-model="form2.sectorId" filterable placeholder="请选择商品品类">
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
          <el-form-item>
            <el-button type="primary" @click="addQa">确定创建</el-button>
          </el-form-item>
        </el-form>
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
  name:"add",
  data(){
    return{
      activeName:'1',
      form2:{
        title:'',
        sectorId:'',
        tagId:'1',
      },
      form:{
        opType:"1",
        title:'',
        sectorId:'',
      },
      explanation:{
        title:'标签解读:参数选型',
        content:'参数选型指的是:答题的重点在于解释商品的各项参数的具体含义以及在实际使用中的作用。以及如何根据实际情况来选择适合自己的商品型号。'
      },
      explanationShow:false,
      followFriend:[],
      friendIds:[],
      myFollowFriends:[],
      checkAll: true,
      isIndeterminate: true,
      allfriendIds:[],
      sectorList:[],
    }
  },
  mounted(){
    this.index();
    this.getsectorList();
  },
  methods:{
    index(){
      var self=this;
      self.activeName=self.$route.params.id;
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
    addGoods(){
      var self=this;
      var url="/addGoodsSvr",
          param=self.form,
          successd=function(res){
            console.log(res);
            self.addGoodsSvr=false;
            // self.getList1();
          };
      self.$get(url,param,successd);
    },
    addQa(){
      var self=this;
      var url="/addQa";
      var param=self.form2;
      param.friendIds=self.friendIds.join();
      var successd=function(res){
        console.log(res);
        self.addQaShow=false;
        // self.getList2();
      }
      self.$get(url,param,successd);
    },
  }
}
</script>
<style scoped>
#add{width:1000px;margin: 0 auto;}
</style>



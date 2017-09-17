<template>
  <div id="yaoqing">
    <el-tabs v-model="activeName">
      <el-tab-pane label="邀请评价" name="1">
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
  name:'yaoqing',
  data(){
    return{}
  }
}
</script>
<style scoped>
#yaoqing{width: 1000px;margin: 0 auto;}
</style>

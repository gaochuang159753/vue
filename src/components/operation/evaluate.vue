<template>
  <div id="evaluate">
    <el-tabs v-model="activeName">
      <el-tab-pane label="消费评价详情" name="1">
        
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name:'evaluate',
  data(){
    return{
      activeName:'1',

    }
  },
  mounted(){
    this.index();
  },
  methods:{
    index(){
      var self=this;
    }
  }
}
</script>
<style scoped>
#evaluate{width:1000px;margin: 0 auto;}
</style>


<template>
  <div class="hello">
    <div class="logo">
      <h1 class="company">傻果科技</h1>
      <el-tabs v-model="activeName">
        <el-tab-pane label="注册" name="0">
          <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="80px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="name">
              <el-input v-model="ruleForm2.name" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="phone">
              <el-input v-model.number="ruleForm2.phone" placeholder="请输入邮箱"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass" required>
              <el-input type="password" v-model="ruleForm2.pass" auto-complete="off" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass" required>
              <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="请再次输入密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm2')">注册</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="登录" name="1">
          <el-form :model="ruleForm1" :rules="rules1" ref="ruleForm1" label-width="80px" class="demo-ruleForm">
            <el-form-item label="邮箱" prop="phone" required>
              <el-input v-model.number="ruleForm1.phone" placeholder="请输入邮箱"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="ruleForm1.pass" auto-complete="off" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitLogin('ruleForm1')">登录</el-button>
              <el-button type="text">忘记密码？</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import md5 from 'js-md5';
export default {
  name: 'hello',
  data () {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      msg: 'Welcome to Your Vue.js App',
      activeName:'0',
      ruleForm2:{
        name:'',
        phone:'',
        pass:'',
        checkPass:''
      },
      rules2:{
        name:[{ required: true, message: '请输入姓名', trigger: 'blur' }],
        phone:[{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
                { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }],
        pass:[{ validator: validatePass, trigger: 'blur' }],
        checkPass:[{ validator: validatePass2, trigger: 'blur' }]
      },
      ruleForm1:{
        phone:'',
        pass:''
      },
      rules1:{
        phone:[{type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }],
        pass:[{required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  mounted(){

  },
  methods:{
    submitLogin(form){
      var self = this;
      this.$refs[form].validate((valid) => {
        if (valid) {
          // self.$router.push('/index');
          var url="http://hzmozhi.com:81/emailLogin",
              param={
                email:self.ruleForm1.phone,
                pwd:md5(self.ruleForm1.pass)
              },
              successd=function(res){
                self.setCookie('accessToken',res.data.accessToken);
                self.setCookie('userName',res.data.userName);
                self.setCookie('userId',res.data.userId);
                self.setCookie('email',res.data.email);
                self.$router.push('/index');
              };
          self.$post(url,param,successd);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    submitForm(form){//注册
      var self = this;
      this.$refs[form].validate((valid) => {
        if (valid) {
          // self.$router.push('/index');
          var url="http://hzmozhi.com:81/emailReg",
              param={
                email:self.ruleForm2.phone,
                pwd:self.ruleForm2.pass,
                userName:self.ruleForm2.name,
                repwd:self.ruleForm2.checkPass
              },
              successd=function(res){
                console.log(res);
              };
          self.$post(url,param,successd);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.logo{width: 400px;margin: 0 auto;background-color: #fff;padding: 20px;}
.logo .el-tabs__nav{width: 100%;}
.logo .el-tabs__item{width: 50%;text-align: center;}
.logo .company{font-size: 30px;line-height: 50px;text-align: center;margin: 20px 0;color: #4db3ff;}
</style>

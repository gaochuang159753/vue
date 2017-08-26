<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view></router-view>
    <footer>
      <h1>傻果科技有限公司</h1>
    </footer>
  </div>
</template>

<script>
import css from './css/main.css'
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #333;
  padding-bottom: 60px;
  min-height: 100%；
}
#app footer{position: absolute;width: 100%;height: 60px;text-align: center;bottom: 0;background-color: #324157;}
footer h1{color: #fff;}
</style>

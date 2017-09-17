import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import index from '@/components/index'
import wenda from '@/components/index/wenda.vue'
import search from '@/components/index/searchResult'
import yaoqing from '@/components/index/yaoqing'
import goodsDetail from '@/components/detail/goodsDetail'
import searchNull from '@/components/index/seachNull';
import userDetail from '@/components/detail/userDetail';
import wendaDetail from '@/components/detail/wendaDetail';
import qudaoDetail from '@/components/detail/qudaoDetail';
import mywenda from '@/components/operation/mywenda';
import evaluate from '@/components/operation/evaluate';
import add from '@/components/add/add';
import personal from '@/components/detail/personal';

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'index',
    //   component: index
    // },
    {
      path:'/login/:id',
      name:'login',
      component:Hello
    },
    {
      path:'/',
      name:'index',
      component:index,
      children:[
        {
          path:'/',
          name:'wenda',
          component:wenda
        },
        {
          path:'/index/wenda',
          name:'wenda',
          component:wenda
        },
        {
          path:'/index/searchNull',
          name:'seachNull',
          component:searchNull
        },
        {
          path:'/index/search',
          name:'search',
          component:search
        },
        {
          path:'/index/yaoqing',
          name:'yaoqing',
          component:yaoqing
        },
        {
          path:'/index/goodsDetail',
          name:'goodsDetail',
          component:goodsDetail
        },
        {
          path:'/index/userDetail',
          name:'userDetail',
          component:userDetail
        },
        {
          path:'/index/wendaDetail',
          name:'wendaDetail',
          component:wendaDetail
        },
        {
          path:'/index/qudaoDetail',
          name:'qudaoDetail',
          component:qudaoDetail
        },
        {
          path:'/index/mywenda',
          name:'mywenda',
          component:mywenda
        },
        {
          path:'index/evaluate',
          name:'evaluate',
          component:evaluate
        },
        {
          path:'index/add/:id',
          name:'add',
          component:add
        },
        {
          path:'index/personal',
          name:'personal',
          component:personal
        }
      ]
    }
  ]
})

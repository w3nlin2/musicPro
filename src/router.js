import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import song from './components/subcomponents/song.vue'
import album from './components/subcomponents/album.vue'
import hotlist from './components/subcomponents/hotlist.vue'
import search from './components/subcomponents/search'
import lyrics from './components/subcomponents/lyrics'

Vue.use(Router)

export default new Router({
  routes: [
    {path:'/lyrics',component:lyrics},
    {path:'/search',component:search},
    {path:'/hotlist',component:hotlist},
    {path:'/album',component:album},
    {path:'/song',component:song},
    {path:'/Home',component:Home},
    {path:'/',component:Home},
  ]
})

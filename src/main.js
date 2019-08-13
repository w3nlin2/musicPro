import Vue from 'vue'
import App from './App.vue'
import router from './router'
//以上的三行不要动保留原来位置
//原因是引入要有序
// 第三方组件库在下面引入
// 1.完整引入mint-ui
import MintUI from 'mint-ui'
// 2.单独引入mint-ui样式
import'mint-ui/lib/style.css'
// 3.将mint-ui注册到实例
Vue.use(MintUI);
// 4.引入图标字体样式文件
import './font/iconfont.css'
//5:引入axios.js文件
import axios from "./axios"
import Vuex from 'vuex'
Vue.use(Vuex);
var store=new Vuex.Store({
   state:{
    musicLists:[417596830,1379848099,1378926893,1381380904, 28923967], //歌单列表
    currentMusicId:417596830,//当前播放歌曲的id
    currentPlayList:[],//当前播放列表详情
    currentMusicIndex:0,  //当前歌曲的下标
    isShow:true, //播放器是否隐藏
    starttime: "00:00", //正在播放时长初始值00:00
    duration: "01:03", //总时长
    totalTime:"",//总时长 时间单位秒
    currentTime:"",//获取audio当前播放时间 单位秒
    Playing:false,//audio播放状态
    updateTime:"",//更新audio播放时间
    loop:false,//是否循环
   },
   mutations:{//逻辑处理，但Mutation 必须是同步函数
    // 增加时更新音乐播放列表
     UpdataMusiclist(state,newId){
        //  如果当前的播放歌曲Id不为空和不存在播放列表中
        if(newId!==''&&state.musicLists.indexOf(newId)===-1){
        //  将当前id放到播放列表中
           state.musicLists.unshift(newId);
        }  
     },
    // 删除音乐播放列表中的歌曲
    deleteMusiclist(state,delIndex){
       //  将当前newId放到播放列表中
       state.musicLists.splice(delIndex,1);
    },
    // 切换当前播放的歌曲
     UpdateCurrentMusicId(state,newId){
         state.currentMusicId=newId;
     }
   },
   getters:{//获取全局共享数据函数
      getMusicLists:function(state){
        return state.musicLists;
      },
      currentMusicId:function(state){
        return state.currentMusicId;
      },
      getPaused:function(state){
        return state.paused;
      }
   }

})
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App),
  store
}).$mount('#app')

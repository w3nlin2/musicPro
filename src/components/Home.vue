<template>
  <div class="music_container">
    <side-bar class="sidebar" v-show="active" v-on:changeActive="showchange"></side-bar>
    <search v-show="scT_f" v-on:emi="emiFn"></search>
    <!-- 顶部标题 -->
    <div class="header">
      <div class="thead">
        <div @click="sideBar"><img :src="require('../assets/imgs/zd.png')"></div>
        <div class="title">VMUSICJIN</div>
        <div @click="search"><img :src="require('../assets/imgs/ss.png')"></div>
      </div>
      <!-- 顶部导航栏 -->
      <div class="tabbar">
        <mt-navbar v-model="selected">
          <mt-tab-item id="rec">推荐</mt-tab-item>
          <mt-tab-item id="rank">歌手</mt-tab-item>
          <mt-tab-item id="singer">排行</mt-tab-item>
        </mt-navbar>
      </div>
    </div>
    <!-- 顶部导航栏子面板 -->
    <div class="tabbar-item">
        <mt-tab-container v-model="selected">
          <mt-tab-container-item id="rec">
             <rec></rec>
          </mt-tab-container-item>
          <mt-tab-container-item id="rank">
            <singer></singer>
          </mt-tab-container-item>     
          <mt-tab-container-item id="singer">
            <rank></rank>
          </mt-tab-container-item>
        </mt-tab-container>
    </div>
  </div>
</template>
<script>
// 导入推荐歌单、歌手、排行模块
import rec from './subcomponents/rec.vue';
import singer from './subcomponents/singer.vue';
import rank from './subcomponents/rank.vue';
import sideBar from './subcomponents/sideBar.vue'
import search from './subcomponents/search'
export default {
  data(){
    return {
      selected:"rec",
      active:false,
       scT_f:false,
      showOrHide:{d_show:true,d_hide:false}
    }
  },//data end
  components:{
    rec,
    singer,
    rank,
    'side-bar':sideBar,
    search
  },//components end
  methods: {
    showchange(res){
     this.active=res;
    },
    // 搜索框
    search(){
       this.scT_f=!this.scT_f;
       if(this.scT_f){
         setTimeout(()=>{
           this.showOrHide.d_show=false;
          this.showOrHide.d_hide=true;
         },50)
       }else{
         setTimeout(()=>{
          //  console.log(this.scT_f);
         this.showOrHide.d_show=true;
         this.showOrHide.d_hide=false;
        //  console.log(this.showOrHide.d_show);
        //  console.log(this.showOrHide.d_hide);
         },50)
       }
    },
    // 侧边栏
   sideBar(){
        this.active=true;
   },
    emiFn(para){
     this.scT_f=para;
    //  console.log("para"+para);
   }
  },//methods end
 scT_f(){
      console.log(this.scT_f);
      if(this.scT_f){
         setTimeout(()=>{
           this.showOrHide.d_show=false;
         this.showOrHide.d_hide=true;
         },50)
       }else{
         setTimeout(()=>{
           console.log(this.scT_f);
         this.showOrHide.d_show=true;
         this.showOrHide.d_hide=false;
         console.log(this.showOrHide.d_show);
         console.log(this.showOrHide.d_hide);
         },50)
       }
    }
}
</script>
<style scoped>
/* 侧边栏样式sidebar */
 .sidebar{
   position:fixed;
   z-index: 100;
 }
/* 父元素溢出隐藏 */
  .music_container{
    overflow: hidden;
  }
  /* 头部样式 */
  .header{
    width:100%;
    background:rgb(226,91,81);
  }
  /* 顶部标题栏样式 */
  .thead{
    display:flex;
    align-items:center;
    justify-content: space-between;
    color:#fff;
    height:48px;
    padding:0 7px;
  }
  /* 顶部标题左右两侧图片样式 */
  .thead img{
    width:24px;
    height:24px;
  }
  /* 标题样式 */
  .thead .title{
    font-size:18px;
    font-weight:bold;
    letter-spacing: 3px;
  }
  /* 导航栏样式 */
  .tabbar{
   width:100%;
   color:#fff;
  }
  /* 重写顶部导航栏样式 */
   .mint-navbar{
     background:rgb(226,91,81);
   }
   /* 重写字体样式 */
  .mint-navbar .mint-tab-item.is-selected{
    border-bottom: none;
    color: #fff;
    font-weight:bolder;
    margin:0;
  }
.d_show{
  display: block;
}
.d_hide{
  display: none;
}
</style>

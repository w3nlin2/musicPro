<template>
 <div class="app-container">
    <router-view></router-view>
    <player v-show="this.$store.state.isShow"></player>
 </div>
</template>
<script>
import player from './components/subcomponents/player'
export default {
   data(){
      return {}
   },//data end
   components:{
      player
   }
}
</script>
<style>
   /* 去除body的外边距 */
   body{
      margin:0;
      background: whitesmoke;
   }
   /* 播放清单点击时字体样式 */
 .active{
   color:#007cff;
   animation:rowup 10s linear infinite;
   
 }
 @keyframes rowup{
        0%{ color:#0670e0 }  
        10%{ color:#2517df }  
        20%{ color:rgb(163, 33, 189) }  
        30%{ color:#cf3088}  
        40%{ color:#f01633; }  
        50%{ color:#f5570d;}
        60%{ color:#9b3845;}  
        70%{ color:#da9b27;} 
        80%{ color:rgb(171, 173, 31); }  
        90%{ color:#40f0c4; } 
        100%{ color:#3177e0; }  
  }
   .app-container{
     padding-top:0;
     padding-bottom:0;
     overflow-x:hidden;
   }

 .mui-bar-tab .mui-tab-item-tao.mui-active {
    color: #007aff;
 }
.mui-bar-tab .mui-tab-item-tao {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}
.mui-bar-tab .mui-tab-item-tao .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}

.mui-bar-tab .mui-tab-item-tao .mui-icon~.mui-tab-label {
   font-size:11px;
   display:block;
   overflow:hidden;
   text-overflow:ellipsis;
}
</style>

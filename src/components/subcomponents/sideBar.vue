<template>
    <!-- HOME左上方点击事件侧边栏 -->
    <!-- 加鼠标滚轮事件  -->
    <div class="sidebar"  @touchmove.prevent @mousewheel.prevent>
        <!-- 遮罩层：-->
        <div class="Mask" @click="hidden"></div>
        <div class="content">
          <div class="persionInfo">
             <div class="pic"></div>
             <div class="info">
                 <div>
                     <span>{{userName}}</span>
                     <span>{{levels}}</span>
                 </div>
                 <span><img :src="require('../../assets/imgs/sign.png')" ></span>
             </div>
          </div>
          <div class="cont">
           <ul>
            <li class="news">
               <i></i>我的消息
            </li>
            <li class="member">
               <i></i>会员中心
            </li>
            <li class="shopping">
               <i></i>商城
            </li>
            <li class="listen">
               <i></i>在线听歌免流量
            </li>
            <li class="skin">
               <i></i>主题换肤
            </li>
            <li class="night">
               <i></i>夜间模式
            </li>
           </ul>
          </div>
          <div class="set">
             <span>设置</span>
             <span>退出应用</span>
          </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
           userName:'你那么美',
           levels:'lv13'
         }
    },//data end
    methods:{
        hidden(){
            this.$emit("changeActive",false);
        }
    }
}
</script>
<style scoped>
   /* 整个侧边栏样式 */
    .sidebar{
     width:100%;
     height:100%;
     overflow: hidden;
     position:relative;
     font-size:14px;
     position: absolute;
     animation:ani .2s;
    }

    /* 遮罩 */
    .Mask{
     position:absolute;
     top:0;
     left:0;
     width:100%;
     height:100%;
     background:rgba(0, 0,0, 0.2)
    }

   @keyframes ani{
       from{left:-100%;}
       to{left:0}
    }
    /* 左侧内容 */
    .content{
      position:absolute;
      top:0;
      left:0;
      width:80%;
      height: 100%;
      background:rgba(255,255,255,0.9)
    }
    /* 个人信息 */
    .persionInfo{
      display:flex;
      flex-direction: column;
      justify-content: center;
      width:100%;
      height:200px;
      color:#fff;
      background:url(../../assets/imgs/mybg.jpg) no-repeat center;
      background-size:100%;
    }
    /* 等级签到 */
    .persionInfo .info{
       display:flex;
       justify-content: space-around;
    }
    /* 头像 */
    .pic{
        margin:20px 50px;
        width:50px;
        height:50px;
        border-radius:50%;
        background:url(../../assets/imgs/11.jpg) no-repeat center;
        background-size:100%;
    }
    /* 中间内容 */
    .cont ul{
       list-style: none;
       padding:0;

    }
    .cont ul li{
       padding:8px 30px;
    }
     .cont ul li i{
         display:inline-block;
         width:20px;
         height:20px;
         vertical-align: middle;
         margin-right:10px;
     }
    /* 我的消息*/
    .news i{
      background:url(../../assets/imgs/news.png) no-repeat  center center ;
      background-size:100% 100%;
    }
   /* 会员中心 */
    .member i{
      background:url(../../assets/imgs/member.png) no-repeat  center center ;
      background-size:100% 100%;  
    }
    /* 商城 */
    .shopping i{
      background:url(../../assets/imgs/shopping.png) no-repeat  center center ;
      background-size:100% 100%;  
    }
    /* 在线听歌免流量 */
    .listen i{
      background:url(../../assets/imgs/listen.png) no-repeat  center center ;
      background-size:100% 100%;   
    }
    /* 主题换肤 */
    .skin i{
      background:url(../../assets/imgs/skin.png) no-repeat  center center ;
      background-size:100% 100%;   
    }
    /* 夜间模式 */
    .night i{
      background:url(../../assets/imgs/night.png) no-repeat  center center ;
      background-size:100% 100%;    
    }
    /* 设置 退出应用 */
    .set{
        position:absolute;
        bottom:20px;
        width:100%;
        display: flex;
        justify-content: space-around;
    }
</style>
<template>
   <!--HOME子组件：推荐歌单  -->
   <div class="rec_container">
     <div  class="swipe-wrapper">
        <mt-swipe :auto="4000">
           <mt-swipe-item  v-for="(item,i) of imageUrl" :key="i">
               <img :src="item" class="swipeImg">
           </mt-swipe-item>
       </mt-swipe> 
     </div>
     <h5 class="title">推荐歌单</h5>
     <ul class="rec_song">
       <li class="rec_details" v-for="(item,i) of recs" :key="i" @click="toSong(i)">
         <div class="rec_img">
           <img :src="item.picUrl">
         </div>
         <p class="rec_title">{{item.name}}</p>
       </li>
     </ul>
   </div>
</template>
<script>
export default {
    data(){
        return{
           imageUrl:[],//轮播图路径
           recs:[],  //推荐歌单
        }
    },//data end
    methods:{
       toSong(i){
          var id=this.recs[i].id;
          this.$router.push({
              path:'/song',//跳转路径
              query:{
                  id
              }
          })
      }   
      ,loadMore(){
        this.axios.get('banner').then(res=>{
            var banners=res.data.banners;
            for(var i of banners){
                 this.imageUrl.push(i.imageUrl);
            }
        })  
      },
      getRoc(){
        this.axios.get("personalized").then(res=>{
            var recs=res.data.result;
            for(var rec of recs){
                this.recs.push(rec);
            }  
        })
      }

       
    }//已经有data对象了，但是没有虚拟DOM树
    ,created(){
       this.loadMore();
       this.getRoc();
    }
}
</script>
<style scoped>
    /* 轮播图的宽高 */
    .swipe-wrapper{
        width:98%;
        height:160px;
        margin:5px auto;
       
    }
    /* 轮播图边角 */
    .mint-swipe{
       border-radius:5px;
    }
    /* 图片大小 */
    .swipe-wrapper img{
        height:160px;
    }
    .swipeImg{
        width:100%;
    }
    /* 标题央视 */
    .title{
      margin-left:1%;
    }
    /* 推荐歌单 去除ul默认样式 */
    ul.rec_song{
       list-style:none;
       padding:0%;
       display:flex;
       flex-wrap:wrap;
       
    }
    /* 每个推荐歌单的样式 */
    li.rec_details{
        width:30%;
        height:160px;
        margin:6px;
    }
    /* 图片大小 */
    .rec_img img{
        width:100%;
    }
    /* 标题样式 */
    .rec_title{
        margin:0;
        font-size:12px;
        color:#666;
    }
   


</style>
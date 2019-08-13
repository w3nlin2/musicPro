<template>
    <!-- HOME子组件：排行榜的详情内容 -->
    <div>
     <div class="songs">
      <div class="song_top">
          <!-- 顶部标题 -->
        <div class="head">
          <div class="back" @click="back"><img src='../../assets/imgs/jt2.png'></div>
          <div>排行榜</div>
          <div><img src='../../assets/imgs/yp.png'></div>    
        </div> 
        <!-- 中间歌单信息 -->
        <div class="song_info">
           <div class="pic">
               <img :src=" details.coverImgUrl">
           </div>
           <div class="song_det">
             <p class="song_name">{{details.name}}</p>
             <div class="creator">
                 <img :src="details.creator.avatarUrl">
                 <span class="nickname">{{details.creator.nickname}}</span>
                 <img src="../../assets/imgs/jt.png">
            </div>
            
           </div>
        </div>
        <!-- 底部评论转发 -->
        <div class="share">
           <div class="guanzhu" >
               <img src="../../assets/imgs/gz.png">
               <span>{{details.subscribedCount}}</span>
            </div>
           <div class="pinglun">
               <img src="../../assets/imgs/pl.png">
               <span>{{details.commentCount}}</span>
           </div>
           <div class="zhuanfa">
               <img src="../../assets/imgs/zf.png">
               <span>{{details.shareCount}}</span>
           </div>
        </div>
      </div>
      <div class="song_list">
          <ul ref="ul_list">
            <li class="title">
              <span>序号</span>
              <span>歌曲</span>
              <span>歌手</span>
            </li>
            <li class="song_li" v-for="(item,i) of playlist" :key="i" @click="ckplay(i)">
              <span>{{i}}</span>
              <span>{{item.name}}</span>
              <span>{{item.ar[0].name}}</span>
            </li>
          </ul>
      </div>
    </div> 
    </div>
</template>
<script>
export default {
    data(){
        return {
         playlist:[], //歌单
         details:{
          commentCount:'', //评论
          coverImgUrl:'', //图片
          name:'', //名称
          shareCount:'',//分享
          subscribedCount:'',//关注
          creator:{
            avatarUrl:'',
            nickname:''
          },
          ckIndex:0//当前选中下标
         },
        }
    },//data end
    methods:{
        back(){
         this.$router.push({
             path:'/Home'
         })
       }
      ,loadMore(id){
          this.axios.get(`playlist/detail?id=${id}`).then(res=>{
              this.details=res.data.playlist;
              this.playlist=res.data.playlist.tracks;
          })
      },
      ckplay(i){
          this.ckIndex=i;
          var id=this.playlist[i].id;
           var lis=this.$refs.ul_list.children;
           for(var li of lis){
                 li.classList.remove("active");
           }
           var curLi=lis[i+1]
           curLi.classList.add("active");
           this.ckIndex=i;
           this.$store.state.currentMusicIndex=i;
           this.$store.commit('UpdateCurrentMusicId',id);
           this.$store.commit("UpdataMusiclist",id);
      }

    },//methods end
    created(){
      var id=this.$route.query.id;
      this.loadMore(id);
    },//created end
    computed:{
     listenMusic(){
      return this.$store.state.currentMusicId;
    }
    },
    watch:{
        listenMusic:function(){
         if(this.playlist[this.ckIndex]!==undefined){
           if(this.$store.state.currentMusicId!==this.playlist[this.ckIndex].id){
              var lis=this.$refs.ul_list.children;
              for(var li of lis){
              li.classList.remove("active");
            }   
           }            
         }   
      }
    }
}
</script>
<style scoped>
     /* 歌单顶部背景颜色 */
    .song_top{
      height:230px;
      background:linear-gradient(to right,#ddd,rgb(94, 93, 93));
      color:#fff;
    }
    /* 头部标题布局 */
    .head{
        height:46px;
        display:flex;
        justify-content:space-between;
        align-items: center;
    }
    /* 顶部左右图片大小 */
    .head img{
      width:20px;
      margin:10px;
    }
    /* 发布者 */
    .creator img:first-child{
       width:40px;
       height:40px;
       border-radius:50%;
       margin-right:10px;
       vertical-align: middle;
    }
     .creator img:last-child{
         width:18px;
         vertical-align: middle;
         margin-left:5px;
     }
    /* 歌单信息弹性布局 */
    .song_info{
      display:flex;
      font-size:14px;
    }
    /* 左侧图片 */
    .song_info .pic{
        width:120px;
        height:120px;
        margin:8px 15px;
    }
    .song_info .pic img{
          width:100%;
    }
    /* 左侧歌单信息 */
    .song_info .song_name{
       width:210px;
       word-wrap: break-word;   
    }
    /* 底部关注 评论布局 */
    .share{
       display:flex;
       justify-content: space-around;
    }
    /* 图片大小 */
    .share img{
        width:20px;
    }
    /* 底部关注和数量排列 */
    .share>div{
        display:flex;
        flex-direction:column;
        align-items: center;
        font-size:12px;
    }
    /* 歌单列表 */
    /* 歌单列表 */
     .song_list ul{
         list-style:none;
         padding:0;
         margin:0;
     }
     /* 弹性布局 */
     .song_list li{
         display:flex;
         justify-content:space-around;
         align-items:center;
     }
     /* 标题样式 */
     .song_list .title{
         font-size:14px;
         height:30px;
         background:rgb(250, 245, 245);
     }
     /* 每行歌单样式 */
    .song_li:not(:first-child){
        font-size:12px;
        height:40px;
        border-bottom:1px solid rgb(250, 245, 245);
        display:flex;
        align-items:center;
    }
  .song_list span:first-child{
      width:40px;
      text-align:center;
  }
    .song_list span:not(:first-child){
        width:30%;
        overflow:hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
</style>

<template>
    <!-- HOME子组件：推荐歌单的详情内容 -->
    <div class="songs">
      <div class="song_top">
          <!-- 顶部标题 -->
        <div class="head">
          <div class="back" @click="back"><img src='../../assets/imgs/jt2.png'></div>
          <div>歌单</div>
          <div><img src='../../assets/imgs/yp.png'></div>    
        </div> 
        <!-- 中间歌单信息 -->
        <div class="song_info">
           <div class="pic">
               <img :src="coverImgUrl">
           </div>
           <div class="song_det">
             <p class="song_name">{{name}}</p>
             <div class="creator">
                 <img :src="avatarUrl">
                 <span class="nickname">{{nickname}}</span>
                 <img src="../../assets/imgs/jt.png">
            </div>
            
           </div>
        </div>
        <!-- 底部评论转发 -->
        <div class="share">
           <div class="guanzhu" >
               <img src="../../assets/imgs/gz.png">
               <span>{{playlist.subscribedCount}}</span>
            </div>
           <div class="pinglun">
               <img src="../../assets/imgs/pl.png">
               <span>{{playlist.commentCount}}</span>
           </div>
           <div class="zhuanfa">
               <img src="../../assets/imgs/zf.png">
               <span>{{playlist.shareCount}}</span>
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
            <li class="song_li" v-for="(p,i) of list" :key="i" @click="checkMusic(p.id,i)">
              <span>{{i}}</span>
              <span>{{p.name}}</span>
              <span>{{p.ar[0].name}}</span>
            </li>
          </ul>
      </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
         id:"",//歌单id
         playlist:{},//歌单列表
         coverImgUrl:"", //右侧大图片
         avatarUrl:"",//左侧小图片
         name:"",//标题
         nickname:"",//发布者
         list:[],
         ckIndex:''//保存当前歌单当前点击下标

        }
    },//data end
    methods:{
       back(){
         this.$router.push({
             path:'/Home'
         })
       }
       ,
       getSongs(){
            this.axios.get(`playlist/detail?id=${this.id}`).then(res=>{
                for(var i in res.data.playlist){
                    this.playlist[i]=res.data.playlist[i];
                } 
                this.coverImgUrl=this.playlist.coverImgUrl;
                this.avatarUrl=this.playlist.creator.avatarUrl;
                this.name=this.playlist.name;
                this.nickname=this.playlist.creator.nickname;
                for(var i=0;i<this.playlist.tracks.length;i++){
                   this.list.push(this.playlist.tracks[i])
                }
               
            })
       },
    //点击的时候提取歌曲的id，并将id放到音乐播放列表中保存
       checkMusic(id,i){
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
    }
    ,created(){
    // 接收参数
      this.id=this.$route.query.id;
      this.getSongs();
    },//created end
    computed:{
     listenMusic(){
      return this.$store.state.currentMusicId;
    }
    },
    watch:{
        listenMusic:function(){
         if(this.list[this.ckIndex]!==undefined){
           if(this.$store.state.currentMusicId!==this.list[this.ckIndex].id){
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
        font-size:13px;
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
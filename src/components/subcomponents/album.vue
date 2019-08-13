<template>
    <!-- HOME子组件：歌手的详情内容-->
    <div class="songs">
       <div class="song_top">
          <!-- 顶部标题 -->
        <div class="head">
          <div class="back" @click="back"><img src='../../assets/imgs/jt2.png'></div>
          <div>歌手</div>
          <div><img src='../../assets/imgs/yp.png'></div>    
        </div> 
        <!-- 中间歌单信息 -->
        <div class="song_info">
           <div class="pic">
               <img :src="img1v1Url">
           </div>
           <div class="song_det">
             <p class="song_name">{{name}}</p>
             <div class="details">
                 <span>{{briefDesc.slice(0,85)}}...</span>
                 <!-- <img src="../../assets/imgs/jt.png"> -->
            </div>
           </div>
        </div>
      </div>
      <div class="song_list">
          <ul ref="ul_list">
            <li class="title">
              <span>序号</span>
              <span>歌曲</span>
              <span>专辑</span>
            </li>
            <li class="song_li" v-for="(item,i) of playlist[0]" :key="i" @click="ckplay(i)">
              <span>{{i}}</span>
              <span>{{item.name}}</span>
              <span>{{item.al.name}}</span>
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
         playlist:[],//歌单
         artist:[],//歌手信息
         img1v1Url:"", //歌手图片
         name:"",//歌手名字
         briefDesc:"",//歌手详情
         ckIndex:0,//当前选中下标
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
           this.axios.get("artists?id="+this.id).then(res=>{
               this.playlist.push(res.data.hotSongs);
               this.artist.push(res.data.artist);
               this.img1v1Url=this.artist[0].img1v1Url;
               this.name=this.artist[0].name;
               this.briefDesc=this.artist[0].briefDesc;
           })
 
       },
      ckplay(i){
          this.ckIndex=i;
          var id=this.playlist[0][i].id;
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
    }//method end
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
         if(this.playlist[0][this.ckIndex].id!==undefined){
           if(this.$store.state.currentMusicId!==this.playlist[0][this.ckIndex].id){
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
        min-width:120px;
        min-height:120px;
        margin:8px 15px;
    }
    .song_info .pic img{
          width:100%;
    }
    /* 左侧歌单信息 */
    .song_info .song_name{
       width:210px;
       word-wrap: break-word;
       padding-right:10px; 
     }
     .details{
         font-size:12px;
         padding-right:10px;
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
    /* .song_det{
       width:70%;
    } */
</style>
<template>
   <!-- 全局组件播放器 -->
   <div id="myplayer">
     <!-- 插入音频 -->
    <audio  type="audio/mp3" :src="audioUrl" ref='audio' controls preload hidden @ended="over"  @canplay="getDuration" @timeupdate="updateTime"></audio>
      <!-- 底部播放器 -->
     <div class="play-music hide">
      <div class="songInfo"  @click="toLyrics">
          <img :src="this.$store.state.currentPlayList.picUrl">
          <div class="Title">
            <span class="title">{{ this.$store.state.currentPlayList.name}}</span>
             <span class="singer">{{this.$store.state.currentPlayList.alias}}</span>
          </div>
      </div>
      <div class="player">
        <div class="more" @click="more">
          <img src="../../assets/imgs/more.png"></div>
        <div id="myplay" class="play" @click="play">
          <img ref='playImg' src="../../assets/imgs/play-red.png">
        </div>
        <div class="next" id="next" @click="next">
          <img src="../../assets/imgs/next-red.png">
        </div>
      </div>
    </div>
    <!-- 当前播放器的清单列表-->
    <div class="bg_tab"  @touchmove.prevent @mousewheel.prevent >
      <div class="show-all">
        <!-- li-1播放风格 -->
        <ul class="song_style">
          <li>
             <!-- 播放风格：循环播放、单曲循环、随机播放 -->
            <div class="pstyle">
              <div class="pstyle-icon" @click="turnsty">      
                  <img :src="pimgs[i]">
              </div>
			      <span></span>
              </div>  
              <div class="del" @click="delAll">
                <img src="../../assets/imgs/del.png" >
              </div>
          </li>            
        </ul>
        <ul class="song_list" >
          <li ref="playlist" class="p-list" v-for="(p,i) of playlist[0]" :key="i" @click="play2(i)">
            <span>{{p.name}}</span>
               <!-- 删除的图标 -->
            <span class="del-item" @click.stop="delItem(i)">
              <img src="../../assets/imgs/close.png" >
            </span>
          </li>
        </ul>
        <div class="close" @click="close">关闭</div>
      </div>
    </div> 
  </div>
</template>
<script>
export default {
    data(){
        return {
          audioUrl:'',
          playlist:[],//播放列表清单
          pimgs:[
           require('../../assets/imgs/xh.png'),
           require('../../assets/imgs/sj.png'),
           require('../../assets/imgs/dq.png')],//播放模式
          pstyle:["顺序播放","随机播放","单曲循环"],//播放风格
           i:0,//控制循环体的下标
        }
    },//data end
    methods:{
      // 跳转到播放详情界面
      toLyrics(){
        this.$router.push({path:'lyrics'})
      },
     // 初始化加载数据
     loadMore(){
       this.getPlayList()
        // 获取vuex 当前播放歌曲的id和播放列表
      var id=this.$store.state.currentMusicId;
      this.axios.all([
          this.axios.get('song/url?id='+id),
          this.axios.get('song/detail?ids='+id),
      ])
      .then(this.axios.spread((res1,res2)=>{
             this.$store.state.currentPlayList.name=res2.data.songs[0].name;this.$store.state.currentPlayList.picUrl=res2.data.songs[0].al.picUrl.replace(/https/,'http');
             this.$store.state.currentPlayList.alias=res2.data.songs[0].ar[0].name;
             this.audioUrl=res1.data.data[0].url;
      }))    
    },
    // 获取播放清单列表
    getPlayList(){
       // 播放列表中的歌单
       if(this.$store.state.musicLists.length!==0){
           var  ids=this.$store.getters.getMusicLists.join(',');
           this.axios.get('song/detail?ids='+ids).then((res)=>{
           this.playlist.push(res.data.songs);
       })
      }else{
        console.log("播放列表为空")
      }
      
    },
     // 点击更多的时候触发播放歌曲的清单列表/播放器隐藏
     more(){
       var bg_tab=document.getElementsByClassName("bg_tab")[0];
       var player=document.getElementsByClassName("play-music")[0];
       player.classList.add("hide");
       bg_tab.style.display="block";
     },
     //关闭时隐藏面板 显示播放器
    close(e){
        var player=document.getElementsByClassName("play-music")[0];
        player.classList.remove("hide");
        var el=e.currentTarget;
        var elPre=el.parentElement.parentElement;
        elPre.style.display="none";
    },
      // 播放风格：循环播放、单曲循环、随机播放
    turnsty(){
        if(this.i<3){
          this.i++;
        }
        if(this.i==3){
           this.i=0; 
        }
    },
    // 音频播放结束后事件
    over(){ 
      if(this.i===0){ //顺序播放
       var idx=this.$store.state.currentMusicIndex;
        // 当前下标
        for(idx;idx<this.$store.state.musicLists.length;idx++){
             var newd=this.$store.state.musicLists[idx];
              this.$store.commit("UpdateCurrentMusicId",newd)
        }
      }else if(this.i===1){ //随机播放
        var idx= Math.floor(Math.random() *$store.state.musicLists.length);
        var newd=this.$store.state.musicLists[idx];
         this.$store.commit("UpdateCurrentMusicId",newd)
      }else{//循环播放
          this.$store.state.loop=true;//单曲循环即可：
      }
      console.log("播放结束end")
    },
     // 当点击播放器播放图标时，当前歌曲实现播放/暂停
     play(){
         var audio=this.$refs.audio;
         var img=this.$refs.playImg;
        if(audio.paused){
            img.src=require("../../assets/imgs/stopPlay-r.png");
            audio.play();
            this.$store.state.Playing=true;
        }else{
            audio.pause();
            img.src=require("../../assets/imgs/play-red.png");
            this.$store.state.Playing=false;
        }
     },
    //  下一首
     next(){ 
       var id=this.$store.state.currentMusicId;
       this.$store.state.Playing=true
       var i=this.$store.state.musicLists.indexOf(id);
       if(i<this.$store.state.musicLists.length-1){
            var curId=this.$store.state.musicLists[i+1];
            this.$store.commit("UpdateCurrentMusicId",curId);
       }else{
          //  每下一首，就从头开始
          var curId=this.$store.state.musicLists[0];
          this.$store.commit("UpdateCurrentMusicId",curId);
       }
    
     },
    //  在播放清单中点击播放歌曲，切换歌曲
     play2(i){
        var id=this.$store.state.musicLists[i];
        this.$store.commit("UpdateCurrentMusicId",id);
        this.$store.state.currentMusicIndex=i;
     },
    //在播放列表清单中点击删除 单首 delItem
    delItem(i){
        this.$store.commit("deleteMusiclist",i);
    },
    // 清空播放列表清单
    delAll(){
      this.$store.state.musicLists=[];
    },
    //开始播放音频时触发该事件获取歌曲总时间。
    getDuration(){
      //处理时长
       var time =this.$refs.audio.duration;
       this.$store.state.totalTime=time;
       //分钟
       var minute = time / 60;
       var minutes = parseInt(minute);
       if (minutes < 10) {
            minutes = "0" + minutes;
        }
          //秒
        var second = time % 60;
        var seconds = Math.round(second);
        if (seconds < 10) {
        seconds = "0" + seconds;
        }
        this.$store.state.duration=minutes+":"+seconds;
    },
    //在音频的播放位置发生改变时触发该事件。
    updateTime(){
        this.$store.state.currentTime=this.$refs.audio.currentTime;//获取audio当前播放时间
        var minute =this.$store.state.currentTime / 60;
        var minutes = parseInt(minute);
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        //秒
        var second = this.$store.state.currentTime% 60;
        var seconds = Math.round(second);
        if (seconds < 10) {
           seconds = "0" + seconds;
        }
        this.$store.state.starttime=minutes+":"+seconds;

    }
  },//method end
    created(){
      this.loadMore();
    },
  computed:{
    // 监听当前播放器歌曲id
    listenMusic(){
      return this.$store.state.currentMusicId;
    },
    // 监听播放列表
    listenMusicList(){
      return this.$store.state.musicLists;
    },
    listenMusicNext(){
      return this.$store.state.nextMusicId;
    },
     listenIndexChange(){
       return this.$store.state.nextMusicIndex;
    },
    // 监听音乐播放状态
     listenPlaying(){
       return this.$store.state.Playing;
     },
     listenUpdateTime(){
       return this.$store.state.updateTime;
     },
     listenLoopMusic(){
       return this.$store.state.loop;
     }
  },
  watch:{
     listenLoopMusic(){
        var audio=this.$refs.audio;
        if(this.$store.state.loop===true){
           audio.loop = true;//单曲循环即可：
        }
     },
    listenUpdateTime(){
      var audio=this.$refs.audio;
      audio.currentTime = this.$store.state.updateTime;  
    }
    ,listenMusicNext:function(newd,old){
        console.log(newd,old)
    },
     // 监听当前播放器歌曲id，切换播放器内容,并实时播放
    listenMusic:function(newd,old){
      this.loadMore();
      var audio=this.$refs.audio;
      var img=this.$refs.playImg;
      var playlist=this.$refs.playlist;
      var i=this.$store.state.musicLists.indexOf(newd);
      for(var p of playlist){
         p.firstChild.classList.remove("active");
      }
      if( playlist[i]!==undefined){
           playlist[i].firstChild.classList.add("active");
      }
      audio.load();
      audio.oncanplaythrough = function () { //谷歌浏览器问题
        audio.play();
        img.src=require("../../assets/imgs/stopPlay-r.png");
      }
    },
    // 更新播放列表清单
    listenMusicList:function(newd){
        if(newd.length!==0){
            var ids=newd.join(',');
            this.axios.get('song/detail?ids='+ids).then((res)=>{
            this.playlist=[];
            this.playlist.push(res.data.songs);
           })
        }else{
          if(this.playlist.length===0){
             this.$toast("播放列表为空")
          }else{
            this.$messagebox.confirm("是否清空播放列表").then(()=>{
               this.playlist=[];
            }).catch(err=>{})
          }        
        }
    },
    listenPlaying(){
      var audio=this.$refs.audio;
      var img=this.$refs.playImg;
      if(this.$store.state.Playing===true){
          audio.play();
          img.src=require("../../assets/imgs/stopPlay-r.png");
      }else{
         audio.pause();
         img.src=require("../../assets/imgs/play-red.png");
      }
    },
  }
}
</script>
<style scoped>

    /*  面板的宽高 */
    .songList{
         height:100vh;
         width:100vw;
    }
    /* 遮罩样式 */
    .bg_tab{
         width:100vw;
         height:100vh;
         position:fixed;
         top:0;
         bottom:0;
         background:rgba(0,0,0,0.1);
         display:none;
     }
      /* 显示播放列表的宽高定位样式 */
     .show-all{
        height:45vh;
        width:100vw;
        position:fixed;
        bottom:0;
        background:#f5f5f5;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        overflow:auto
     }
     /* 去除列表项标识 设置内边距 */
    .show-all ul{
       list-style: none;
       padding:10px 15px;
       margin:0;
    }

    /* 除了最后一个li 其他都弹性布局 横线排列 两端对齐 */
   .show-all ul li{
          display:flex;
          align-items: center;
          justify-content: space-between;
   }
   ul.song_list{
      height:73%;
      overflow:scroll;
      padding-top:0;
   }
     ul.song_list li{
         font-size:14px;
         padding:6px 0;
         overflow: hidden;
     }
    /* 最后一个li的文字居中 "关闭"*/
     .show-all>div.close{
         position:absolute;
         bottom:20px;
         width:40px;
         left:50%;
         margin-left:-20px;
     }
     /* 循环：弹性布局 文字和图标对齐 */
     .pstyle{
         display: flex;
         align-items: center;
     }
     /* 图标用背景的方式嵌入 */
   .pstyle-icon{
       width:20px;
       height:20px;
       margin-right:10px;
    }
    /* 图标缩小到容器的大小 */
    .pstyle-icon img{
        width:100%;
    }
    /* 右侧删除图标容器大小 */
    .del{
      width:16px;
      height:16px;  
    }
    /* 右侧删除图标容器大小 */
    .del-item{
      width:12px;
      height:12px;  
    }
    /* 删除的图标的大小设置 */
   .del img, .del-item img{
       width:100%;
   }
   /* 播放器隐藏 */
   .hide{
      display:block;
   }


     /* 播放图标 */
     .play-icon{
         width:20px;
         height:20px;
         background:url(../../assets/imgs/paly.png)  no-repeat center center;
         background-size:100%;
         margin:3px 15px 3px 8px;
     }

    /* 设置播放器整体的弹性布局，两端对齐 定位固定在底部*/
    .play-music{
        position:fixed;
        bottom:0;
        left:0;
        background:#fff;
        width:100%;
        display:flex;
        justify-content:space-between;
        align-items: center;
        padding:5px 0;
    }

    /* 弹性布局横向排列 */
    .songInfo{
        display:flex;
        width:60%; 
    }
    /* 弹性布局横线排列 靠右侧方向 */
    .player{
      display:flex;
      justify-content: flex-end;
    }
    /* 图片距离 */
    .player div{
        width:20px;
        height:20px;
        margin:10px;
    }
    /* 图片与文字垂直居中 */
    .player div img{
        width:100%;
        vertical-align:middle;
    }
   /* 设置图片的大小 */
    .songInfo img{
      width:40px;
      height:40px;
      border-radius:8px;
      margin:0 8px;
    }
   /* 歌手和歌名弹性布局竖向排列 */
    .Title{
        display:flex;
        flex-direction:column;
        justify-content: center;
    }
    .title{
        font-size:13px;
    }
    /* 歌手字体大小设置 */
    .singer{
        font-size:12px;
        color:#333;
    }
    /* 隐藏滚动条 */
  ::-webkit-scrollbar {
     width: 0 !important;
   }
 
</style>

<template>
<!-- 播放详情界面 -->
  <div class="lyric">
    <div class="header">
      <div class="back" @click="back">
        <img src="../../assets/imgs/back.png">
      </div>
      <div class="Title">
        <span class="title">{{this.$store.state.currentPlayList.name}}</span>
        <span class="singer">{{this.$store.state.currentPlayList.alias}}</span>
      </div>
      <div class="share">
        <img src="../../assets/imgs/share.png">
      </div>
    </div>
    <div class="turntable" ref="turntable" @click="turntable">
      <img  :src="this.$store.state.currentPlayList.picUrl">
    </div>
    <div class="music-lrc" ref="music_lyc" @click="musicLyc">
       <div class="lyricWrap" ref="lyrics">
         <p v-for="(item,i) of this.lyric" :key="i" >
           {{item}}
         </p>
       </div>
    </div>
    <div class="audioOff">
      <div class="progress-bar">
       <div class="bar-inner">
        <div class="progress" ref="progress"></div>
        <div class="progress-btn-wrapper">
           <div class="progress-btn" ref="pro_btn" @touchstart="start"
           @touchmove="move" @touchend="end"></div>
        </div>
       </div>
      </div>
      <div class="duration">
          <span>{{this.$store.state.starttime}}</span>
          <span class="right-timer">{{this.$store.state.duration}}</span>
      </div>
      <div class="player">
        <div class="loop" @click="loop">
          <img src="../../assets/imgs/dq1.png">
        </div>
        <div class="prev" @click="prev">
          <img src="../../assets/imgs/next.png">
        </div>
        <div class="play" ref="play" @click="play">
          <img src="../../assets/imgs/play-w.png">
        </div>
        <div class="next" @click="next">
          <img src="../../assets/imgs/next.png">
        </div>
        <div class="shouc" @click="shoucang">
          <img src="../../assets/imgs/sc.png">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      timer:[],//时间戳
      lyric:[],//歌词
      tstart:"",//进度条开始touchstart的X距离
      tend:"",//进度条开始touchend的X距离
      flags: false,//开关控制小球滑动
      nx: '',//拖拽移动的距离
      dx: '', //元素边框外侧到父元素左侧距离
      // xPum: '',//元素移动的水平距离(left)
      list:'',//清单
      a:""
    }
  },//data end
  methods:{
    back(){
      this.$store.state.isShow=true;
      this.$router.go(-1);
    },
    // 循环
    loop(e){
       var loopImg=e.currentTarget.firstElementChild;
       this.$store.state.loop=!this.$store.state.loop;
       if(this.$store.state.loop===true){
           loopImg.src=require('../../assets/imgs/dq2.png')
       }else{
           loopImg.src=require('../../assets/imgs/dq1.png')
       }
    },
    // 播放
    play(){
      this.$store.state.Playing=!this.$store.state.Playing;
    },
    // 上一首
    prev(){
      var curId=this.$store.state.currentMusicId;
      var i=this.$store.state.musicLists.indexOf(curId);
      if(i===0){
        i=this.$store.state.musicLists.length-1;
      }else{
        i--;
      }
      var newId=this.$store.state.musicLists[i];
      this.$store.commit("UpdateCurrentMusicId",newId);
      this.$store.state.Playing=true;
      
    },
    // 下一首
    next(){
      var curId=this.$store.state.currentMusicId;
      var i=this.$store.state.musicLists.indexOf(curId);
      if(i===this.$store.state.musicLists.length-1){
        i=0;
      }else{
        i++;
      }
      var newId=this.$store.state.musicLists[i];
      this.$store.commit("UpdateCurrentMusicId",newId);
      this.$store.state.Playing=true;
    },
    //播放按钮
    // 音乐进度条触摸开始
    start(){
      var btn=this.$refs.pro_btn;
      this.flags =true; 
      var touch = event.touches[0];
      this.tstart=touch.clientX;
      this.dx =btn.offsetLeft;//元素到浏览器的左侧距离
    },
    // 接触点改变，滑动时
    move(e){
      // 阻止页面的滑动默认事件
      e.preventDefault();
       if(this.flags){
         var touch = event.touches[0];
         this.nx = touch.clientX - this.tstart;//拖拽移动的距离 
         if(this.nx+this.dx>=0&&this.nx+this.dx<=300){
            this.xPum= this.dx+this.nx;//控制元素左右移动距离
            // var btn=this.$refs.pro_btn;
            // var progress=this.$refs.progress;
            //  progress.style.width=parseInt(this.xPum*300/this.$store.state.totalTime)+"px";
            //  btn.style.left=parseInt(this.xPum*300/this.$store.state.totalTime)+"px";
         }
       }
    },
    // 	触摸结束，手指离开屏幕时
    end(){
        this.$store.state.Playing=false;
        this.flags = false;  
        var xPum=this.xPum;
        var total=this.$store.state.totalTime;
        var ctime=total*xPum/300 //进度条长度300
        this.$store.state.updateTime=ctime;
        this.$store.state.Playing=true;
    },
    // 收藏
    shoucang(e){
        var el=e.currentTarget;
        var sc=el.firstElementChild;
       if(sc.src==require('../../assets/imgs/sc.png')){
         sc.src=require('../../assets/imgs/sc1.png');
       }else{
         sc.src=require('../../assets/imgs/sc.png');
       }
    },
    // 点击转盘时显示歌词
    turntable(e){
       e.currentTarget.style.display="none";
       var lyc=this.$refs.music_lyc;
       lyc.style.display="block";
    },
    // 点击歌词时显示转盘
    musicLyc(e){
        e.currentTarget.style.display="none";
        var turntable=this.$refs.turntable;
        turntable.style.display="block";
    },
  },//methods end
  created(){
    this.$store.state.isShow=false;
    this.axios.get("/lyric?id="+this.$store.state.currentMusicId).then(res=>{
      var lyr=res.data.lrc.lyric;
      var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g
      var time= lyr.match(timeReg);
      var content=lyr.replace(timeReg,'');
      this.lyric=content.split(/[\r\n]/g).slice(0,-1);
      for(var p of time){
           var minite=(Number(p.substr(1,2)*60)+Number(p.substr(4,2))+Number(p.substr(7,2)/60)).toFixed(2);
           this.timer.push(minite)
      }
    }) 
  },//created end
  mounted(){
    var btn=this.$refs.pro_btn;
    var progress=this.$refs.progress;
    var playImg=this.$refs.play.firstChild;
     if(this.$store.state.Playing===true){
       playImg.src=require("../../assets/imgs/stopPlay.png");
     }else{
       playImg.src=require("../../assets/imgs/play-w.png");
     }
    progress.style.width=parseInt(this.$store.state.currentTime*300/this.$store.state.totalTime)+"px";
    btn.style.left=parseInt(this.$store.state.currentTime*300/this.$store.state.totalTime)+"px";
  },
  computed:{
    //  监听音乐播放状态：改变播放或暂停按钮 
    listenMusicState(){
      return this.$store.state.currentTime;
    },
     // 监听当前播放器歌曲id
    listenMusic(){
      return this.$store.state.currentMusicId;
    },
  },
  watch:{
    listenMusicState(){
     var btn=this.$refs.pro_btn;
     var turntable=this.$refs.turntable.firstChild;
     var playImg=this.$refs.play.firstChild;
     var progress=this.$refs.progress;
    //  播放
     if(this.$store.state.Playing===true){
        turntable.classList.add("turnImg");
        playImg.src=require("../../assets/imgs/stopPlay.png");
        progress.style.width=parseInt(this.$store.state.currentTime*300/this.$store.state.totalTime)+"px";
        btn.style.left=parseInt(this.$store.state.currentTime*300/this.$store.state.totalTime)+"px";
        var lineNo = 0; // 当前行歌词
        var preLine = 6; // 当播放6行后开始滚动歌词
        var lineHeight = -37; // 每次滚动的距离
        // 歌词高亮  增加类名active
        var curtimer=this.$store.state.currentTime.toFixed(2);
        // console.log(curtimer,this.timer)
        for(var i=0;i<this.timer.length;i++){
          if(this.timer[i]<curtimer<this.timer[i+1]){
              // console.log("1")
          }
        }
     }else{
      //  停止
       turntable.classList.remove("turnImg");
        playImg.src=require("../../assets/imgs/play-w.png");
     }
      //  结束
     if(this.$store.state.currentTime===this.$store.state.totalTime){
        turntable.classList.remove("turnImg");
        playImg.src=require("../../assets/imgs/play-w.png");
        progress.style.width=0+"px";
        btn.style.left=0+"px";
     }
   },
    // 监听当前播放器歌曲id，切换播放器内容,并实时播放
    listenMusic(){
      this.axios.get("/lyric?id="+this.$store.state.currentMusicId).then(res=>{
         var lyr=res.data.lrc.lyric;
         var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g
         var time = lyr.match(timeReg);
         var content=lyr.replace(timeReg,'');
         this.lyric=content.split(/[\r\n]/g).slice(0,-1);
         for(var p of time){
           var minite=(Number(p.substr(1,2)*60)+Number(p.substr(4,2))+Number(p.substr(7,2)/60)).toFixed(2);
           this.timer.push(minite);
       }
     }) 
    },
  }
}
</script>
<style scoped>
.lyric {
  height: 100vh;
  background: url("../../assets/imgs/bg3.png") no-repeat;
  background-position: cover;
  background-size: 100%;
  position: relative;
}
/* 头部弹性布局 横向排列 */
.header {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}
/* 歌手和歌名弹性布局竖向排列 */
.lyric .Title {
  display: flex;
  align-items: center;
  flex-direction: column;
  color: #f5f5f5;
}
.title{
  font-size:16px;
}
/* 中间转盘*/
.turntable {
  /* display: none; */
  width: 300px;
  height: 300px;
  position: absolute;
  top: 20%;
  left: 50%;
  margin-left: -150px;
  background: url("../../assets/imgs/default.png") no-repeat;
  background-size: 100%;
  border-radius: 50%;
  text-align: center;
  /* border: 1px solid red; */
}
/* 转盘中的图片位置调整 */
.turntable>img {
  width: 270px;
  height:270px;
  margin-top: 15px;
  border-radius: 50%;
}
.turnImg{
   animation:rotateImg 9s linear infinite; 
}
 @keyframes rotateImg {
  0% {transform : rotate(0deg);}
  100% {transform : rotate(360deg);}
}


/* 歌词 */
.music-lrc{
  display:none;
  font-size:16px;
  color:#f5f5f5;
  position: absolute;
  top: 13%;
  width: 80%;
  height: 58%;
  left:10%;
  text-align:center;
  overflow:hidden;
}
/*  */

/* 底部进度条样式和播放器的样式 */
 .audioOff {
  position: fixed;
  bottom:10%;
  width: 80%;
  left: 50%;
  margin-left: -40%;
  padding: 0.4rem 0;
  } 
 
/* 播放器位置调整，弹性布局横向排列 */
.audioOff .player {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
 /*进度条容器的高度*/
	 .progress-bar{
	     height:30px;
       width:80vw;
			 background:none;
       /* border:1px solid red; */
	 }
    /* 进度条：宽度 位置*/
    .bar-inner{
		  position: relative;
      top:14px;
      height:3px;
      background: rgba(255,255,255, 0.6);
		}
      /* 播放进度完成进度条颜色     */
      .progress{
	   position: absolute;
       height:3px;
		/* width:50%; */
       background :rgb(64, 131, 207);
				/* border:1px solid lightblue; */
		}
/* */
      .progress-btn-wrapper{
			  position: absolute;
        left: 0px;
        top: -5px;
        width: 30px;
        height: 30px;
			
			}  
       /* 进度球的颜色样式位置     */ 
        .progress-btn{
          position:relative;
          box-sizing: border-box;
          width :12px;
          height :12px;
          border-radius :50%;
          background:#fff;
			}
      .duration{
           width:80vw;
           display:flex;
          color:#fff;
          font-size:12px;
          margin-bottom:15px;
          justify-content: space-between; 

      }

    /* 上一首调整方向 */
   .prev img{
    transform: rotateY(180deg); 
    }
</style>

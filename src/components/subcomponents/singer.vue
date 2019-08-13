<template>
    <!-- HOME 子组件：歌手 -->
    <div class="hot_singer">
      <!-- 歌手导航栏 -->
      <div class="tabbar">
        <mt-navbar v-model="selected">
          <mt-tab-item id="msinger">华语男歌手</mt-tab-item>
          <mt-tab-item id="wsinger">华语女歌手</mt-tab-item>
          <mt-tab-item id="tsinger">华语男歌手</mt-tab-item>
        </mt-navbar>
      </div>
      <mt-tab-container  v-model="selected">
         <mt-tab-container-item id="msinger">
            <mt-index-list>
              <mt-index-section :index="p" v-for="(p,j) of list" :key="j">
                    <div class="singer_list" v-for="(item,i) of artists_m[j]" :key="i" @click="tosongs(item.id)">
                      <div class="singer_pic">
                        <img :src="item.img1v1Url">
                      </div>
                      <span class="sname">{{item.name}}</span>
                    </div> 
              </mt-index-section>  
            </mt-index-list>
         </mt-tab-container-item>
         <mt-tab-container-item id="wsinger">
            <mt-index-list>
              <mt-index-section :index="p" v-for="(p,j) of list" :key="j">
                    <div class="singer_list" v-for="(item,i) of artists_w[j]" :key="i" @click="tosongs(item.id)">
                      <div class="singer_pic">
                        <img :src="item.img1v1Url">
                      </div>
                      <span class="sname">{{item.name}}</span>
                    </div> 
              </mt-index-section>  
            </mt-index-list>
         </mt-tab-container-item>
         <mt-tab-container-item id="tsinger">
            <mt-index-list>
              <mt-index-section :index="p" v-for="(p,j) of list" :key="j">
                    <div class="singer_list" v-for="(item,i) of artists_t[j]" :key="i" @click="tosongs(item.id)">
                      <div class="singer_pic">
                        <img :src="item.img1v1Url">
                      </div>
                      <span class="sname">{{item.name}}</span>
                    </div> 
              </mt-index-section>  
            </mt-index-list>
         </mt-tab-container-item>
      </mt-tab-container>
    </div>
</template>
<script>
export default {
    data(){
        return{
            artists_m:[],//男歌手列表
            artists_w:[],//女歌手列表
            artists_t:[],//歌手组合列表
            selected:"msinger",  //选择歌手类型a
            id:"",//歌手id
            list:["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
        }
    },//data end
    methods: {
        tosongs(id){
            this.$router.push({
              path:'/album',//跳转路径
              query:{
                  id
              }
            })
        }
        ,getSinger(){
            for(var i=0;i<26;i++){
            var s=String.fromCharCode(97+i);
             this.axios.all([
                this.axios.get(`artist/list?cat=1001&limit=8&initial=${s}`),
                this.axios.get(`artist/list?cat=1002&limit=8&initial=${s}`),
                this.axios.get(`artist/list?cat=1003&limit=8&initial=${s}`)
             ])
             .then(this.axios.spread((singer_m,singer_w,singer_t)=>{
                 this.artists_m.push(singer_m.data.artists);
                 this.artists_w.push(singer_w.data.artists);
                 this.artists_t.push(singer_t.data.artists);
                 }));
             }

        }
    
   
    },//methods end
    created(){
       this.getSinger();
    //    this.selected=this.$route.query.selected; 
    }//created end
    ,watch: {
        selected(){
          
        }
    },
}
</script>
<style scoped>
    /* 热门歌手位置居中 */
    .hot_singer{
        width:98%;
        margin:0 auto;
    }
    .classify{
        margin:5px auto;
    }
   
    /* 每位歌手列表的高度 */
    .singer_list{
        height:60px;
        margin:5px 8px;
        display:flex;
        align-items: center;
        border-bottom:1px solid #ddd;
    }
    /* 歌手图片的宽高 */
    .singer_pic{
        width:50px;
        height:50px;
    }
    .singer_pic img{
        width:100%;
        border-radius:5px;
    }
    /* 歌手姓名 */
    .sname{
        margin-left:20px;
        font-size:12px;
    }
    .mint-navbar .mint-tab-item.is-selected{
        border-bottom:none;
        color:rgb(226,91,81);
    }
    .mint-indexlist-nav{
       border-left:none;
    }
    .mint-indexlist-navitem{
        padding: 0px 6px !important;
    }

</style>

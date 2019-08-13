<template>
    <!-- HOME子组件：排行 -->
    <div class="ranking">
      <h5 class="title">云音乐特色榜</h5>
      <ul>
        <li class="rank_list" v-for="(item,i) of rank.slice(0,4)" :key="i" @click="tohostlist(item.id)">
          <div class="classify">
              <img :src="item.coverImgUrl">
          </div>
          <ol class="top_rank">
              <li v-for="(p,i) of item.tracks" :key="i">
                <p>{{p.first}}-{{p.second}}</p>
              </li>
          </ol>
        </li>
      </ul>
      <h5 class="title">全球媒体榜</h5>
      <ul>
        <li class="rank_list" v-for="(item,i) of rank.slice(4)" :key="i" @click="tohostlist(item.id)">
          <div class="classify">
              <img :src="item.coverImgUrl">
          </div>
          <div class="top_rank">
              <p>{{item.name}}</p>
              <p>{{item.updateFrequency}}</p>
          </div>
        </li>
      </ul>
    </div>
</template>
<script>
export default {
    data(){
        return{
        rank:[]//排行榜
        }
    },//data end
    methods:{
        tohostlist(id){
          this.$router.push({
              path:'/hotlist',
              query:{id}
          })
        }
        ,getRank(){
            this.axios.get(`toplist/detail`).then(res=>{  
                  for(var p of res.data.list){
                     this.rank.push(p);
                  }
            })
        }



    },//method end
    created(){
        this.getRank();
    }

}
</script>
<style scoped>
   /* 排行榜 */
    .ranking{
        width:98%;
        margin:0 auto;
        font-size:12px;
    }
    .ranking .title{
       padding:5px 15px;
       margin:8px 0;
       background:rgba(110, 109, 109, 0.1);
    }
    /* ul去除默认样式 */
    .ranking ul{
        margin:0;
        padding:0;
        list-style:none;
    }
    /* li弹性布局 横向排列 */
    li.rank_list{
        padding:5px 0;
        display:flex;
        border-bottom:1px solid rgb(233, 226, 226);
        align-items: center;
    }
    /* 左侧图片容器 */
    .classify{
       height:105px;
       width:105px;
       margin-left:10px;

    }
    /* 图片百分百显示 */
    .classify img{
        width:100px;
        height:100px;
        border-radius:5px;
        margin-top:3px;
    }
    /* 右侧热门前三榜单 */
     ol.top_rank{
         width:100%;  
     }
     div.top_rank{
         padding-left:18px;
     }

</style>

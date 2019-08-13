<template>
    <div id="searchPage" :class="cla">
        <div class="scBox" >
            <span ><img @click="fn" class="backImg" :src="require('../../assets/imgs/back.png')"/></span>
        <input v-model="ScContent" type="search" placeholder="搜索歌曲、歌手">
        </div>

        <mt-tab-container v-model="tab"> 
            <mt-tab-container-item id="tab1"> 
                <ul class="searchList">
                    <li @click="getSongUrl(i)" :data-a="i" v-for="(item,i) of list" :key="i">
                        <div class="art_first">{{i}}--{{item.name}}</div>
                        <div class="art_grey_font">{{item.artists[0].name}}</div>
                    </li>
                </ul> 
            </mt-tab-container-item> 
            <mt-tab-container-item id="tab2"> <span class="hot" v-for="(item,i) of hots" :key="i">{{item.first}}</span> </mt-tab-container-item> 
        </mt-tab-container>
    </div>
</template>
<script>
    export default{   
        data(){           
            return{
                fnT_f:false,
                cla:{slideLeft:true,mode1:true,mode2:false},
                ScContent:"",
                list:[],
                
                listname:"",
                hots:[],
                tab:"tab2"
                
                
            }     
        },
        methods:{
            fn(){
                this.ScContent="";
                this.$emit("emi",this.fnT_f);
                // console.log(this.list); 
            },
            getSongUrl(i){
                 var newId=this.list[i].id;
                this.$store.commit("UpdateCurrentMusicId",newId);
                this.$store.commit("UpdataMusiclist",newId);
                this.$store.state.Playing=true;
                this.$emit("emi",this.fnT_f);
            }
        },
        created(){
                this.cla.mode1=true;
                this.cla.mode2=false;      
                this.axios.get("http://localhost:3000/search/hot").then(result=>{
                    // console.log(result.data.result);
                    this.hots=result.data.result.hots;
                    // console.log(this.hots);            
                });
        },
        watch:{
            ScContent(){
                // console.log(this.ScContent);    
                if(this.ScContent==null||this.ScContent==""){
                    this.cla.mode1=true;
                    this.cla.mode2=false;
                    this.list=[];
                    this.tab="tab2";
                    
                }else{
                    // console.log(13132);
                    this.cla.mode1=false;
                    this.cla.mode2=true;
                    // console.log(this.cla.mode1);
                    this.tab="tab1"
                    this.axios.get("http://localhost:3000/search?keywords="+this.ScContent).then(result=>{
                    // console.log(result.data.result.songs);
                    this.list=result.data.result.songs;
                    this.listname=result.data.result.songs[0].name;
                });
                }
                
            }
        }
    }
</script>
<style>
#searchPage.mode1{
    width: 100%;
    height:100%;
    position: absolute;
    top:0;
    left:0;
    background: whitesmoke;
    z-index: 999;
    
}
#searchPage.mode2{
    width: 100%;
    
    position: absolute;
    top:0;
    left:0;
    background: whitesmoke;
    z-index: 999;
    
}
.slideLeft{
    animation: ani1 0.1s;
}

@keyframes ani1{
    0%{left:100%}
    10%{left:90%}
    20%{left:80%}
    30%{left:70%}
    40%{left:60%}
    50%{left:50%}
    60%{left:40%}
    70%{left:30%}
    80%{left:20%}
    90%{left:10%}
    100%{left:0}
}
.scBox{
    position: relative;
    background:#e25b51;
    display: flex;
}
.scBox>span{
    width: 30px;
    height:30px;
    padding:10px;
    position: absolute;
    top:0;
    left:0;
}
input[type=search]{
    width: 100%;
    display: inline-block;
    background: #e25b51;
    border:none;
    height:50px;
    font-size:16px; 
    margin: 0;
    padding:0;
    text-indent: 50px;
    color: white;
}
.backImg{
    width: 26px;
    height:26px;
    vertical-align: middle;
}

ul.searchList{
    font-size:14px;
    list-style:none;
    margin:0;
    padding:0;
    overflow: hidden;
}
ul.searchList>li{
    border-bottom:1px solid grey;
    width: 80%;
    margin: 0 auto;
    padding: 5px;
}
ul.searchList>li>div{
    pointer-events: none;
}
.art_first{
    margin: 5px 0;
}
.art_grey_font{
    color:grey;
    font-size:12px;
    margin: 5px 0;
    
}
input::-webkit-input-placeholder{
    color:whitesmoke;
    font-size: 16px;
    font-weight:10;
    margin-bottom:50px; 
}
.hot{
    display: inline-block;
    margin: 10px;
    background: #ece2e2;
    border:1px solid rgb(228, 208, 208);
    border-radius: 20px;
    padding: 8px;
}
</style>
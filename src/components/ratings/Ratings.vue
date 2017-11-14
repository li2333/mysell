<template>
    <div class="ratings">
      <div class="sell-msg">
        <div class="left">
          <div class="score">{{sellera.score}}</div>
          <p class="dec">综合评分</p>
          <p class="rank-rate">高于周边商家{{sellera.rankRate}}%</p>
        </div>
        <div class="right">
          <div class="service-score">
            <span class="service">服务态度</span>
            <div class="star">
              <star :score="sellera.serviceScore"></star>
            </div>
            <span class="text">{{sellera.serviceScore}}</span>
          </div>
          <div class="food-score">
            <span class="food">服务态度</span>
            <div class="star">
              <star :score="sellera.foodScore"></star>
            </div>
            <span class="text">{{sellera.foodScore}}</span>
          </div>
          <!--送达时间-->
          <div class="delivery-time">
              <span>送达时间</span>
            <span class="time">{{sellera.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <div class="bg"></div>
      <!--评价类别和数量-->
      <div  class="listRatings">
        <div class="listRatings-content">
          <div class="ratings-num">
            <p class="all">
              <!--<span v-for="(item,index) in items" @click="toggleClass(index)"></span>-->
              <span class="span1" @click="alltatings" >全部{{sellera.ratingCount}}</span>
              <span class="span2" @click="starating">满意{{satis.length}}</span>
              <span class="span3" @click="nostarating">不满意{{noSatis.length}}</span>
            </p>
          </div>
          <!--具体评价内容-->
          <div class="ratings-content" >
            <div class="header" @click="hasText">
              <i class="icon-check_circle" :class="{checked:flag}"></i>
              <span >只看有内容的评价</span>
            </div>
            <div class="content" ref="ratingsContent">
              <ul>
                <li v-for="rating in nowRatings">
                  <!--头像-->
                  <div class="avatar">
                    <img :src="rating.avatar" alt="">
                  </div>
                  <div class="id">
                    {{rating.username}}
                  </div>

                  <div class="score">
                    <star :score="rating.score"></star>
                  </div>
                  <div class="delivery-time">{{rating.deliveryTime}}分钟送达</div>
                  <div class="rate-time">
                    {{new Date(rating.rateTime).toLocaleString()}}
                  </div>
                  <!--评价内容-->
                  <div class="rating-content">
                    {{rating.text}}
                  </div>
                  <!--推荐-->
                  <div class="recommend" >
                    <i v-if="rating.rateType==0" class="icon-thumb_up"></i>
                    <i v-if="rating.rateType==1" class="icon-thumb_down"></i>
                    <div class="reCon">
                        <span v-for="rec in rating.recommend">{{rec}}</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
  import  axios from 'axios';
  import BScroll from "better-scroll";
  import Star from "../starScore/StarScore.vue"
  export default{
    props:["sellera"],
    components:{Star},
    data(){
          return{
              ratings:[],
              satis:[],
              noSatis:[],
              nowRatings:[],
              time:"",
              type:"",
              hastext:[],
              flag:false,
              rateClassType:false,

          }
    },

    methods:{
      getTime(){
        this.ratings.forEach((rating)=>{
          this.time=new Date(rating.rateTime).toLocaleString();

        })
      },
      alltatings(){
          this.nowRatings= this.ratings;
         this.toscroll();
      },
      starating(){
        this.nowRatings= this.satis;
        this.toscroll();
      },
      nostarating(){
        this.nowRatings= this.noSatis;
        this.toscroll();
      },
      toscroll(){
        this.$nextTick(()=>{
          this.scroll=new BScroll(this.$refs.ratingsContent,{
            click:true,
          })
        })
      },
      hasText(){
          if(this.flag==false){
            this.nowRatings=this.hastext;
            this.toscroll();
          }else {
              this.nowRatings=this.ratings;
              this.toscroll();
          }
        this.flag=!this.flag;
      },
      toggleClass(){

      }
    },
    created(){
          let that=this;
          axios.get("http://localhost:8080/api/ratings").then((res)=>{
              console.log(res);
              that.ratings=res.data.data;
              that.nowRatings=that.ratings;
              console.log(that.ratings);
              //将满意和不满意的分别放在练歌数组种
              that.ratings.forEach((rating)=>{
                  if(rating.rateType==0){
                    that.satis.push(rating);
                  }else {
                    that.noSatis.push(rating);
                  };

                  //将有内容的评论放到hasText中
                  if (rating.text!=""){
                      that.hastext.push(rating);
                  }
              });
//              滚动
            that.toscroll();
          }).catch((err)=>{

          });
    }

  }
</script>
<style>
  .ratings .sell-msg{
    height: 110px;
    border-bottom: 1px solid #f5f5f5;

  }
  .ratings .sell-msg .left{

    float: left;
    width: 138px;
    height: auto;

    padding: 18px 0;
    text-align: center;
    box-sizing: border-box;
    border-right:1px solid #f5f5f5 ;
  }
  .ratings .sell-msg .left .score{
    font-size: 24px;
    color: rgb(255,153,0);
    line-height: 28px;
    margin-bottom: 6px;
  }
  .ratings .sell-msg .left .dec{
    font-size: 12px;
    color: rgb(7,17,27);
    line-height: 12px;
    margin-bottom: 10px;
  }
  .ratings .sell-msg .left .rank-rate{
    font-size: 10px;
    color: rgb(7,17,27);
    line-height:10px;

  }
  .ratings .sell-msg .right{
    float: left;
    border-left: 1px solid #f5f5f5;
    width: 236px;

    padding: 18px 0;
  }
  .ratings .sell-msg .right span{
    display:inline-block ;
    font-size: 12px;
    color: rgb(7,17,27);
    line-height: 18px;
    margin-left:24px;
  }
  .ratings .sell-msg .right .star span{
    width: 18px;
    height: 18px;
    display: inline-block;
    background-size: 18px 18px;
    margin-right:-20px;
  }
  .ratings .sell-msg .right .service-score{
    display: inline-block;
    padding-bottom:8px ;
  }
  .ratings .sell-msg .right .service-score .service{
        float: left;
  }
  .ratings .sell-msg .right .service-score .star{
    float: left;
    margin-left: -5px;
  }
  .ratings .sell-msg .right .service-score .text{
    font-size: 12px;
    color:rgb(255,153,0);
    line-height:18px;
    display: inline-block;
    /*margin-right: 12px;*/
  }
  .ratings .sell-msg .right .food-score{
    padding-bottom: 8px;
  }
  .ratings .sell-msg .right .food-score .food{
    float: left;
  }
  .ratings .sell-msg .right .food-score .star{
    float: left;
    margin-left: -5px;
  }
  .ratings .sell-msg .right .food-score .text{
    font-size: 12px;
    color:rgb(255,153,0);
    line-height:18px;
    display: inline-block;
  }
  .ratings .sell-msg .right .delivery-time{
    /*margin-bottom: 8px;*/
    position: relative;
  }
  .ratings .sell-msg .right .delivery-time .time{
    font-size: 12px;
    color:rgb(147,153,159);
    line-height:18px;
    display: inline-block;
    /*float: left;*/
    position: absolute;
    top:1px;
    left:64px;
  }
  .ratings .bg{
    background:#f6f6f6;
    width: 100%;
    height:18px;
  }
  /*评价数量*/
  .ratings .listRatings{
    /*min-height: 200px;*/
    /*position: relative;*/

  }
  .ratings .listRatings-content{
    /*position: absolute;
    top:0;
    left:0;
    width: 100%;
    height:100%;
    overflow: hidden;
    z-index: -100;*/
  }
  .ratings .ratings-num{
    clear: both;
    border-bottom: 1px solid #f5f5f5;
  }
  .ratings .ratings-num .all{
    padding:18px 0;
    padding-left: 18px;
  }
  .ratings .ratings-num .all span{
    height:25px;
    width: 50px;
    line-height: 26px;
    color: rgba(7,17,27,0.8);
    text-align: center;
    display: inline-block;
    padding:5px;
    font-size: 10px;
    background: rgba(7,17,27,0.1);
    margin-right: 5px;

  }
  .ratings .ratings-num .all span.lineHeight{
    background:rgb(0,160,220) ;
    color: #fff;
  }
  .ratings .ratings-num .all span.unline{
    background: rgba(7,17,27,0.1);
    color: rgba(7,17,27,0.8);
  }
  /*.ratings .ratings-num .all span:nth-child(1){
    background:rgb(0,160,220) ;
    color: #fff;

  }
  .ratings .ratings-num .all span:nth-child(2){
    background:rgba(0,160,220,0.2) ;
  }*/
  .ratings .ratings-content{
    position: relative;
  }
  .ratings .ratings-content .header{
    background: #fff;
    padding:18px;
    color: rgb(147,153,159);
    border-bottom: 1px solid rgba(147,153,159,0.5);
  }
  .ratings .ratings-content .header i{
    font-size: 24px;
    display: inline-block;
    vertical-align: top;
  }
  .ratings .ratings-content .header i.checked{
    color:rgb(0,160,220);
  }
  .ratings .ratings-content .header span{
    font-size: 16px;
    display: inline-block;
    vertical-align:top;
    line-height: 22px;
  }
  .ratings .ratings-content .content{
    /*padding:;*/
    height:220px;
    width: 100%;
    position: absolute;
    top: 70px;
    overflow: hidden;

  }
  .ratings .ratings-content .content ul li{
    margin:18px;
    /*background: lawngreen;*/
    position: relative;
    border-bottom: 1px solid rgba(7,17,27,0.1);
    overflow: hidden;
  }
  .ratings .ratings-content .content ul li .avatar{
    width: 28px;
    height: 28px;
    display: inline-block;
    float: left;
  }
  .ratings .ratings-content .content ul li .avatar img{
    display: inline-block;
    width: 28px;
    height:28px;
    border-radius: 50%;

  }
  .ratings .ratings-content .content ul li .id{
    float: left;
    font-size: 10px;
    color:rgb(7,17,27);
    line-height:24px;
    margin-left: 12px;
  }
  .ratings .ratings-content .content ul li .score{
    position: absolute;
    top: 14px;
    left: 40px;
    margin-top: 4px;
  }
  .ratings .ratings-content .content ul li .score span{
    width: 12px;
    height: 12px;
    display: inline-block;
    background-size: 12px 12px;
    background-repeat:no-repeat;
    margin-right: 2px;
  }
  .ratings .ratings-content .content ul li .delivery-time{
    position: absolute;
    top: 20px;
    left: 110px;
    font-size:10px ;
    font-weight:200;
    color: rgb(147,153,159);
    line-height:12px;
  }
  .ratings .ratings-content .content ul li .rate-time{
    float: right;
    font-size: 10px;
    font-weight: 200;
    color: rgb(147,153,159);
    line-height:24px;
    vertical-align: bottom;
  }
  .ratings .ratings-content .content ul li .rating-content{
    clear: both;
    padding:12px 6px 0px 40px;
    font-size: 12px;
    color: rgb(7,17,27);
    line-height: 18px;
  }
  .ratings .ratings-content .content ul li .recommend{
    position: relative;
    padding: 8px  0 12px 0;
  }
  .ratings .ratings-content .content ul li .recommend i{
    display: inline-block;
    padding-left:40px;
    font-size: 12px;
    color:rgb(0,160,220);
    line-height:16px;


  }
  .ratings .ratings-content .content ul li .recommend i.icon-thumb_down{
    color:rgb(183,187,191);
  }
  .ratings .ratings-content .content ul li .recommend .reCon{
    white-space: nowrap;
    overflow: hidden;
    position: absolute;
    top: 8px;
    left:48px;

  }
  .ratings .ratings-content .content ul li .recommend .reCon span{
    display: inline-block;
    border:1px solid rgba(7,17,27,0.1);
    border-radius: 2px;
    background-color: rgb(255,255,255);
    padding: 0 6px;
    font-size: 9px;
    color: rgb(147, 153, 159);
    line-height:16px;
    margin-left: 8px;
  }
</style>

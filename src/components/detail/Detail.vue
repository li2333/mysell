<template>
    <div class="detail"  ref="detailwapper">

      <div class="content">
        <div class="top">
          <img :src="food.image" alt="">
          <div class="con">
            <div class="name">{{food.name}}</div>
            <div class="msg">
              <span>月售{{food.sellCount}}份</span>
              <span>好评{{food.rating}}率</span>
            </div>
            <div class="price">
              <span class="new">￥{{food.price}}</span>
              <span class="old">￥{{food.oldPrice}}</span>
            </div>
            <div class="addCart">
              加入购物车
            </div>
          </div>
        </div>
        <!--商品介绍-->
        <div class="production">
          <div class="title">商品介绍</div>
          <div class="content">{{food.info}}</div>
        </div>
        <!--商品评价-->
        <div class="ratings">
          <div class="title">商品评价</div>
          <div class="type">
            <span>全部</span>
            <span>推荐</span>
            <span>吐槽</span>
          </div>
          <div class="cheakCon">
            <i class="icon-check_circle"></i>
            <span>只看有内容的评价</span>
          </div>
          <div class="ratContent">
            <ul>
              <li v-for="rating in food.ratings">
                <div class="ratTime">{{rating.rateTime}}</div>
                <div class="text">
                  <i v-if="rating.rateType==0" class="icon-thumb_up"></i>
                  <i v-if="rating.rateType==1" class="icon-thumb_down"></i>
                  <span>{{rating.text}}</span>
                </div>
                <div class="rator">
                  <p class="id">{{rating.username}}</p>
                  <img :src="rating.avatar" alt="">
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
  import BScorll from "better-scroll";
  export default{
    props:["food","flag"],
    created(){
        this.$nextTick(()=>{
            this.scroll=new BScorll(this.$refs.detailwapper,{
                click:true
            })
        })
    }
  }
</script>
<style>
  .detail{
    /*position: absolute;*/
    width: 100%;
    top: 0;
    /*overflow: hidden;*/



  }
  .detail .content{

  }
  .detail .content .top{
    background: #fff;
  }
  .detail .content .top img{
    width: 100%;
    height:375px;
    display: block;
  }
  .detail .content .top .con{
    margin:18px;
    position: relative;
  }
  .detail .content .top .con .name{
    font-size: 14px;
    font-weight:700;
    color: rgb(7,17,27);
    line-height: 14px;
  }
  .detail .content .top .con .msg{
    margin-top: 8px;
    margin-bottom: 18px;
  }
  .detail .content .top .con .msg span{
    display: inline-block;
    margin-right: 12px;
    font-size: 10px;
    color: rgb(147,153,159);
    line-height: 10px;
  }
  .detail .content .top .con .price span{
    display: inline-block;
    padding-bottom: 18px;
  }
  .detail .content .top .con .price .new{
    font-size: 14px;
    font-weight: 700;
    color: rgb(240,20,20);
    line-height:24px;
  }
  .detail .content .top .con .price .old{
    margin-left: 12px;
    font-size: 10px;
    font-weight:700;
    color: rgb(147,153,159);
    line-height: 24px;
    text-decoration: line-through;
  }
  .detail .content .top .con .addCart{
    position: absolute;
    bottom: 18px;
    right: 0;
    width: 74px;
    height:24px;
    font-size: 10px;
    color:rgb(255,255,255);
    line-height: 24px;
    border-radius: 12px;
    background-color: rgb(0,160,220);
    text-align: center;
  }
  .detail .content .production{
    margin-top: 16px;
    background: #fff;
    padding: 18px;
  }
  .detail .content .production .name{
      font-size: 14px;
    color: rgb(7,17,27);
    line-height:14px;
  }
  .detail .content .production .content{
    margin-top: 6px;
    padding:0 8px;
    font-size: 12px;
    font-weight:200;
    color:rgb(77,85,93);
    line-height:24px;
  }
  .detail .content .ratings{
    background: #fff;
    margin-top: 16px;
    padding:18px;
  }
  .detail .content .ratings .title{
    font-size: 14px;
    color: rgb(7,17,27);
    line-height:14px;
  }
  .detail .content .ratings .type{
    margin-top: 18px;

    font-size: 12px;
    color: rgb(77,85,93);
    border-radius: 2px;
    padding-bottom:18px;
    border-bottom: 1px solid rgba(7,17,27,0.1);
  }
  .detail .content .ratings .type span{
    padding:8px 12px;
    text-align: center;
    line-height:16px;
    display: inline-block;
    margin-right:8px;
  }
  .detail .content .ratings .type span:nth-child(1){
    background-color: rgb(0,160,220);
    color: #fff;
  }
  .detail .content .ratings .type span:nth-child(2){
    background: rgba(0,160,220,0.2);
  }
  .detail .content .ratings .type span:nth-child(3){
    background: rgba(77,85,93,0.2);
  }
  .detail .content .ratings .cheakCon{
    padding:12px 0;
    border-bottom: 1px solid rgba(7,17,27,0.1);
  }
  .detail .content .ratings .cheakCon i{
    font-size: 24px;
    color: rgb(147,153,159);
    line-height:24px;
  }
  .detail .content .ratings .cheakCon span{
    display: inline-block;
    margin-left: 4px;
    font-size: 12px;
    color: rgb(147,153,159);
    line-height:24px;
    vertical-align: top;
  }
  .detail .content .ratings .ratContent{

  }
  .detail .content .ratings .ratContent li{
    padding:16px 0;
    position: relative;
    border-bottom: 1px solid rgba(7,17,27,0.1);
  }
  .detail .content .ratings .ratContent li .ratTime{
    font-size: 10px;
    color: rgb(147,153,159);
    line-height:12px;
  }
  .detail .content .ratings .ratContent li .text{
    padding-top: 6px;

  }
  .detail .content .ratings .ratContent li .text i{
    font-size: 12px;
    line-height:24px;
    color: rgb(0,160,220);
  }
 /* .detail .content .ratings .ratContent li .text i.icon-thumb_up{

  }*/
  .detail .content .ratings .ratContent li .text i.icon-thumb_down{
    color: rgb(147,153,159);
  }
  .detail .content .ratings .ratContent li .text span{
    font-size: 12px;
    color: rgb(7,17,27);
    line-height:16px;
    display: inline-block;
    margin-left: 4px;
  }
  .detail .content .ratings .ratContent li .rator{
    position: absolute;
    top:16px;
    right:0;
  }
  .detail .content .ratings .ratContent li .rator .id{
    display: inline-block;
    font-size: 10px;
    color:rgb(147,153,159);
    line-height:12px;
  }
  .detail .content .ratings .ratContent li .rator img{
    display: inline-block;
    width: 12px;
    height:12px;
    margin-left: 6px;
    border-radius: 50%;
    vertical-align: bottom;
  }

</style>

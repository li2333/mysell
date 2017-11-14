<template>
    <div class="seller" v-if="sellera!=null" ref="sellerContent">
        <!--<star-score :score="seller.score"></star-score>-->
      <!--dfsfkjskf-->
        <div class="content" >
          <div class="top">
            <h1>{{sellera.name}}</h1>
            <!--评星组件-->
            <div class="star-wrapper">
              <star-score :score="sellera.score"></star-score>

            </div>
            <!--评价数量-->
            <span class="assess">({{sellera.ratingCount}})</span>
            <!--销售数量-->
            <span class="sale">月售{{sellera.sellCount}}单</span>
              <div class="fav">
                <i class="icon-favorite"></i>
                <p>已收藏</p>
              </div>
          </div>


          <!--送货-->
          <div class="trans">
            <div class="item">
              <p>起送价</p>
              <span class="msg">{{sellera.minPrice}}</span>
              <span>元</span>
            </div>
            <div class="item">
              <p>商家配送</p>
              <span class="msg">{{sellera.deliveryPrice}}</span>
              <span>元</span>
            </div>
            <div class="item">
              <p>平均配送时间</p>
              <span class="msg">{{sellera.deliveryTime}}</span>
              <span class="text">分钟</span>
            </div>
          </div>
          <!--背景-->
          <div class="bg"></div>
          <!--公告与活动-->
          <div class="annouce">
            <h1>公告与活动</h1>
            <p class="content">{{sellera.bulletin}}</p>
            <!--活动-->
            <div class="actives">
              <div class="item" v-for="active in sellera.supports">
                <span class="icon" :class="iconMap[active.type]"></span>
                <span class="text">{{active.description}}</span>
              </div>
            </div>
          </div>
          <div class="bg"></div>
          <!--商家实景-->
          <div class="sence">
            <h1>商家实景</h1>
            <div ref="photoSwiper">
              <div class="photo">
                <span v-for="item in sellera.pics" class="pics" >
                  <img :src="item" alt="">
                </span>
              </div>
            </div>
          </div>
          <div class="bg"></div>
          <!--商家信息-->
          <div class="sellerMsg">
            <h1>商家信息</h1>
            <p class="item" v-for="item in sellera.infos">{{item}}</p>

          </div>
        <!--购物车模块-->
        </div>
    </div>

</template>
<script>
  import axios from "axios";
  import StarScore from "../starScore/StarScore.vue";
  import BScroll from "better-scroll";
  import Cart from "../cart/Cart.vue"
  export  default{
      components:{
        StarScore,Cart
      },
    props:["sellera"],
    data(){
          return{
            iconMap:["decrease","discount","guarantee","invoice","special"],//用来保存小图标的数组
          }
    },
    created(){
        this.$nextTick(function () {
          this.scroll=new BScroll(this.$refs.sellerContent,{
            click:true,
          });
          this.scoll1=new BScroll(this.$refs.photoSwiper,{
              scrollX:true
          })
        })

    }

  }
</script>
<style>
  .seller{
    width: 100%;
    height: 450px;
    position: absolute;
    top:174px;
    left: 0;
    z-index: -1000;
    overflow: hidden;
  }

  .top{
      font-size: 12px;
      color: rgb(77,85,93);
      position: relative;
      margin: 18px;
      padding-bottom: 18px;
      border-bottom:1px solid rgba(7,17,27,0.1);
  }
   h1{
     margin-bottom: 8px;
     font-size: 14px;
    color: rgb(7,17,27);
    line-height:18px;
  }
  .top .star-wrapper{
    float: left;
  }
  .top .star-wrapper .star-item{
  width: 18px;
  height: 18px;
  display: inline-block;
  background-size: 18px 18px;
  background-repeat: no-repeat;
  margin-right: 5px;
  }
  .top .assess{
    display: inline-block;
    float: left;
    font-size: 10px;
    vertical-align:top;
    line-height: 20px;
    margin: 0 12px 0 8px;
  }
  .top .sale{
    display: inline-block;
    line-height: 20px;
    font-size: 10px;
    line-height: 20px;
  }
  .top .fav{
    position: absolute;
    top: 0;
    right: 0;
    text-align: center;
  }
  .top .fav .icon-favorite{
    display: block;
    font-size: 24px;
    color: rgb(240,20,20);
    line-height:24px;
    margin-bottom: 4px;
  }
  .top .fav p{
    font-size: 10px;
    color:rgb(77,85,93);
    line-height: 10px;
  }
  .seller .bg{
    width: 100%;
    height: 16px;
    background: rgba(147,153,159,0.1);
    border:1px solid rgba(7,17,27,0.1)
  }

  .seller .trans{
    clear: both;
    display: flex;
    margin: 18px 0;
  }
  .seller .trans .item{
    flex: 1;
    text-align: center;
    border-right: 1px solid rgba(7,17,27,0.1);
  }
  .seller .trans .item p{
    font-size: 10px;
    color: rgb(147,153,159);
    line-height: 10px;
    margin-bottom: 4px;
  }
  .seller .trans .item span{
    font-size: 10px;
    font-weight:200;
    color: rgb(7,17,27);
    line-height: 24px;
  }
  .seller .trans .item .msg{
    font-size: 24px;
  }
  .seller .annouce{
    margin: 18px;
  }
  .seller .annouce h1{
    margin-bottom: 8px;
  }
  .seller .annouce .content{
    margin: 0 12px;
    font-size: 12px;
    font-weight:200;
    color: rgb(240,20,20);
    line-height: 24px;
    margin-bottom: 16px;
  }
  .seller .annouce .actives{
    margin: 0 12px;
  }
  .seller .annouce .actives .item{
    border-top: 1px solid rgba(7,17,27,0.1);
    /*margin: 16px 0;*/
  }

  .seller .annouce .actives .item .icon{
   /*margin:16px 6px 16px 16px;*/
    margin:16px 0 ;
    display: inline-block;
    width: 16px;
    height: 16px;
    vertical-align: top;
    background-size: 16px 16px;
  }
 .icon.decrease{
    background-image: url("images/decrease_1@2x.png");
  }
 .icon.discount{
    background-image: url("images/discount_1@2x.png");
  }
  .icon.guarantee{
    background-image: url("images/guarantee_1@2x.png");
  }
 .icon.invoice{
    background-image: url("images/invoice_1@2x.png");
  }
 .icon.special{
    background-image: url("images/special_1@2x.png");
  }
  .seller .annouce .actives .item .text{
    display: inline-block;
    margin-top: 16px;
    font-size: 12px;
    font-weight: 200;
    color: rgb(7,17,27);
    line-height:16px;
  }
  .seller .content .sence{
    padding:18px 0 18px 18px;
  }
  .seller .content .sence h1{
    font-size: 14px;
    color: rgb(7,17,27);
    line-height:14px;
    margin-bottom: 12px;
  }
  .seller .content .sence {
    overflow: hidden;
    white-space: nowrap;
  }
  .seller .content .sence .photo{
    width:150%;
  }
  .seller .content .sence .photo .pics{
    width:120px;
    height:90px;
    display: inline-block;
    margin-right: 6px;
  }
  .seller .content .sence .pics img{
    width:100%;
    height:100%;
    display:inline-block;

  }
  .seller .content .sellerMsg{
    padding:18px;
  }
  .seller .content .sellerMsg h1{
    font-size: 14px;
    color: rgb(7,17,27);
    line-height:14px;
    margin-bottom: 12px;

  }
  .seller .content .sellerMsg .item{
    padding: 16px 12px;
    font-size: 12px;
    font-weight:200;
    color:rgb(7,17,27);
    line-height:16px;
    border-top: 1px solid rgba(7,17,27,0.1);
  }
</style>

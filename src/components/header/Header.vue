<template>
  <div class="header" v-if="seller!=null">
    <div class="content-wrapper">
      <!--商家头像-->
      <div class="avatar">
        <img :src="seller.avatar" alt="" width="64" height="64">
      </div>
      <!--信息区域-->
      <div class="content">
        <div class="title">
          <!--商家名-->
          <span class="brand"></span>
          <!--送货公司名-->
          <span class="name">{{seller.name}}</span>
          <!--送货时间-->
          <div class="description">
            {{seller.description}}/ {{seller.deliveryTime}}分钟送达
          </div>
          <!--在线支付减免-->
          <div class="support" >
            <span class="icon" :class="iconMap[seller.supports[0].type]"></span>
            <span class="text">{{seller.supports[0].description}}</span>
          </div>
        </div>
        <!--个数-->
        <div class="support-count" @click="isblock=true">
          <span class="count">{{seller.supports.length}}个</span>
          <i class="icon-keyboard_arrow_right"></i>
        </div>
      </div>
      <!--公告信息-->
      <div class="bulletin-wrapper">
        <span class="bulletin-title" ></span>
        <span class="bulletin-text">{{seller.bulletin}}</span>
        <!--文字图标-->
        <i class="icon-keyboard_arrow_right" @click="isblock=true"></i>
      </div>
      <!--模糊背景-->
      <div class="background" >
        <img :src="seller.avatar" alt="">
      </div>
      <!--弹出层-->
      <div class="detail" v-show="isblock">
        <!--clearfix 用sticky footer的方式-->
        <!--商品页公告和优惠信息-->
        <div class="detail-wrapper clearfix">   <!--css sticky footer-->
          <!--商家名-->
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <!--评星组件-->
            <div class="star-wrapper">
              <star-score :score="seller.score"></star-score>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>

            </div>
            <!--优惠数据-->
            <ul class="supports">
              <li class="support-item" v-for="support in seller.supports">
                <span class="icon" :class="iconMap[support.type]"></span>
                <span class="text">{{support.description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <!--公告内容-->
            <div class="bulletin">
              <p class="content">
                {{seller.bulletin}}
              </p>
            </div>
          </div>
        </div>
        <!--背景模糊层-->
        <!--<div class="background"></div>-->
        <!--关闭按钮-->
        <div class="detail-close">
          <span class="icon-close" @click="isblock=false"></span>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
  import  axios from "axios";
  import StarScore from "../starScore/StarScore.vue"
  export default{
      data(){
          return{
              isblock:false,
              iconMap:["decrease","discount","guarantee","invoice","special"]
          }
      },
    props:["seller"],
    components:{
      StarScore
    }

  }
</script>
<style>
  .header{
    color: #fff;
    overflow: hidden;
    background: rgba(7,17,27,0.5);
    position: relative;
  }
  .header .content-wrapper{
    position: relative;
    padding: 24px 12px 0px 24px;
    font-size: 0;
  }
  .header .content-wrapper .avatar{
    display: inline-block;
    margin-bottom: 45px;
  }
  .header .content-wrapper .avatar img{
    border-radius: 2px;
  }
  .header .content-wrapper .content{
    display: inline-block;
    font-size: 14px;
    margin-left: 16px;
  }
  .header .content-wrapper .content .title{
    margin: 2px 0 8px 0;
  }
  .header .content-wrapper .content .title .brand{
    display: inline-block;
    vertical-align: top;
    width: 30px;
    height: 18px;
    background: url("images/brand@2x.png");
    background-size: 30px 18px;
  }
  .header .content-wrapper .content .title .name{
    margin-left: 6px;
    font-size: 16px;
    color: rgb(255,255,255);
    font-weight: bold;
    line-height: 18px;
  }
  .header .content-wrapper .content .title .description{
    margin-bottom: 10px;
    margin-top: 8px;
    font-size: 12px;
    color: rgb(255, 255, 255);
    font-weight: 100;
    line-height: 12px;
  }
  .header .content-wrapper .content .title .support{

  }
  .header .content-wrapper .content .title .support .text{
    font-size: 12px;
    line-height: 12px;
    vertical-align: top;
  }
  .header .content-wrapper .content .title .support .icon{
    display: inline-block;
    width: 12px;
    height: 12px;
    vertical-align: top;
    background-size: 12px 12px;
  }
  .header .content-wrapper .content .title .support .icon.decrease{
      background-image: url("images/decrease_1@2x.png");
  }
  .header .content-wrapper .content .title .support .icon.discount{
    background-image: url("images/discount_1@2x.png");
  }
  .header .content-wrapper .content .title .support .icon.guarantee{
    background-image: url("images/guarantee_1@2x.png");
  }
  .header .content-wrapper .content .title .support .icon.invoice{
    background-image: url("images/invoice_1@2x.png");
  }
  .header .content-wrapper .content .title .support .icon.special{
    background-image: url("images/special_1@2x.png");
  }
  .header .content-wrapper .content .support-count{
    font-size: 12px;
    position: absolute;
    bottom: 40px;
    right: 12px;
    padding: 0 8px;
    height: 24px;
    line-height: 24px;
    border-radius: 14px;
    background: rgba(0,0,0,0.2);
  }
  .header .content-wrapper .bulletin-wrapper{
    position: absolute;
    left: 0;
    bottom: 0;
    height: 28px;
    line-height: 28px;
    padding: 0 22px 0 12px;
    /*white-space: nowrap;*/
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 12px;
    background: rgba(7,17,27,0.2);
  }
  .header .content-wrapper .bulletin-wrapper .bulletin-title{
    display: inline-block;
    width: 22px;
    height: 12px;
    vertical-align: top;
    margin-top: 8px;
    background-image: url("images/bulletin@2x.png");
    background-repeat: no-repeat;
    background-size: 22px 12px;
  }
  .header .content-wrapper .bulletin-wrapper .bulletin-text{
    margin: 0 4px;

  }
  .header .content-wrapper .bulletin-wrapper i{
    position: absolute;
    right: 12px;
    top: 0;
    line-height:28px;

  }
  .header .content-wrapper .background{
    position: absolute;
    left: 0;
    top:0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(10px);
  }
  .header .content-wrapper .background img{
    width: 100%;
    height: 100%;
  }
  .header .content-wrapper .detail{
    position: fixed;
    top: 0;
    left:0;
    z-index: 100;
    width: 100%;
    height: 100%;
    overflow: auto;
    background: rgba(7,17,27,0.8);

  }
  /*弹出层*/
  .header .content-wrapper .background{
    /*position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index:-100;
    !*background:rgba(7,17,27,0.8) ;*!
    filter: blur(10px);*/

  }
  .header .content-wrapper .detail .detail-wrapper{
    min-height: 100%;
    width: 100%;
  }
  .header .content-wrapper .detail .detail-wrapper .detail-main{
    margin-top: 64px;
    padding-bottom: 64px;
  }
  .header .content-wrapper .detail .detail-wrapper .detail-main .name{
    line-height: 16px;
    text-align: center;
    font-size: 16px;
    font-weight: 700;
  }
  .header .content-wrapper .detail .detail-wrapper .detail-main .star-wrapper{
    margin-top: 18px;
    padding: 2px 0;
    text-align: center;
  }
  .header .content-wrapper .detail .detail-wrapper .detail-main .title{
    display: flex;
    width: 80%;
    margin:28px auto 24px auto;
  }
  .header .content-wrapper .detail .detail-wrapper .detail-main .title .line{
    flex: 1;
    position: relative;
    top: -6px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }
  .header .content-wrapper .detail .detail-wrapper .detail-main .title .text{
    padding: 0 12px;
    font-size:  14px;
    font-weight: 700;
  }
  .header .content-wrapper .detail .detail-wrapper .detail-main .supports{
    width: 80%;
    margin: 0 auto;
  }
  .header .content-wrapper .detail .detail-wrapper .detail-main .supports  .support-item{
    padding: 0 12px;
    margin-bottom: 12px;
    font-size: 0;
  }
  .header .content-wrapper .detail .detail-wrapper .detail-main .supports  .support-item:last-child{
    margin-bottom: 0;
  }
  .header .content-wrapper .detail .detail-wrapper .detail-main .supports .icon{
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-right: 6px;
    background-size:16px;
    vertical-align: top;
  }
  .header .content-wrapper .detail .detail-wrapper .detail-main .supports .icon.decrease{
    background-image: url('images/decrease_1@2x.png');
  }
  .header .content-wrapper .detail .detail-wrapper .detail-main .supports .icon.discount{
    background-image: url('images/discount_1@2x.png');
  }
  .header .content-wrapper .detail .detail-wrapper .detail-main .supports .icon.invoice{
    background-image: url('images/invoice_1@2x.png');
  }
  .header .content-wrapper .detail .detail-wrapper .detail-main .supports .icon.special{
    background-image: url('images/special_1@2x.png');
  }
  .header .content-wrapper .detail .detail-wrapper .detail-main .supports .icon.guarantee{
    background-image: url('images/guarantee_1@2x.png');
  }
  .header .content-wrapper .detail .detail-wrapper .detail-main .supports  .support-item .text{
    line-height:16px;
    font-size: 12px;
  }
  .header .content-wrapper .detail .detail-wrapper .detail-main .bulletin{
    width: 80%;
    margin: 0 auto;
  }
  .header .content-wrapper .detail .detail-wrapper .detail-main .bulletin .content{
    font-size: 12px;
    font-weight: 200;
    color:rgb(255,255,255);
    line-height: 24px;
  }
  .header .content-wrapper .detail .detail-close{
      position: relative;
    width: 32px;
    height:32px;
    color: rgba(255,255,255,0.5);
    font-size: 32px;
    margin: -50px auto 0 auto;
    clear: both;
  }
  .header .content-wrapper .detail .clearfix{
    display: inline-block;
  }
  .header .content-wrapper .detail .clearfix:after{
    display: block;
    content: "";
    height: 0;
    line-height: 0;
    clear: both;
  }






</style>

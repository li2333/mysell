<template>
  <div>
    <div class="shopcart">
      <div class="content" @click="toggleList">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{highlight:totalCount>0}">
              <i class="icon-shopping_cart" :class="{highlight:totalCount>0}"></i>
            </div>
            <!--商品数量-->
            <!--增加个条件，当totalCount商品总数大于零的时候才会显示-->
            <div class="num" v-show="totalCount>0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{highlight:totalCount>0}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费{{deliveryPrice}}元</div>
        </div>
        <div class="content-right">
          <div class="pay" :class="{nowpay:totalPrice>=minPrice}">{{payDes}}</div>
        </div>
      </div>
      <!--购物车详情页-->
      <div class="shop-list" v-show="listshow">
        <div class="list-head">
          <span class="title">购物车</span>
          <span class="emity" @click="empty">清空</span>
        </div>
        <div class="list-content" ref="listContent">
          <ul>
            <li class="list-item" v-for="food in selectFoods">
              <span class="name">{{food.name}}</span>
              <div class="price">￥{{food.price}}/{{food.count}}</div>
              <div class="count">
                <!--数量控制模块，要传入food,因为要计算count的值-->
                <count :food="food"></count>
              </div>
            </li>
          </ul>
        </div>
      </div>

    </div>
    <!--蒙版-->
    <div class="bg" v-show="listshow" @click="toggleList"></div>
  </div>
</template>
<script>
  import axios from "axios";
  import Count from "../count/Count.vue";
  import BScroll from "better-scroll";
  export default{
    data(){
      return {
        flag: false,
      }
    },
    components: {Count},
    props: ["selectFoods", "minPrice", "deliveryPrice"],
    methods: {
      toggleList(){
          //通过控制flag的值来对listshow进行操作
        this.flag = !this.flag
      },
      empty(){
        this.selectFoods.forEach(function (food) {
          food.count = 0
        })
      }
    },
    computed: {
      //计算商品数量food.count 是用Count模块定义的一个新的属性，主要用来保存点击的商品数量、
      //totalCount函数是计算全部增加的商品数量，保存到购物车模块上的num中
      totalCount(){
        let counts = 0;
        this.selectFoods.forEach((food)=>{
            counts+=food.count;
          }
        );
//        console.log(this.selectFoods);
        return counts;
      },
//      计算商品总价
      totalPrice(){
        let price = 0;
        this.selectFoods.forEach((food) => {
          price += food.price * food.count;
        })
        return price;
      },
      //商品起送状态判断
      payDes(){
        if (this.totalPrice === 0) {
          return "￥" + this.minPrice + "起送";
        } else if (this.totalPrice > 0 && this.totalPrice < this.minPrice) {
          let ss = parseInt(this.minPrice) - parseInt(this.totalPrice)
          return "还差" + ss + "起送";
        } else {
          return "立即下单";
        }
      },
      //购物车详情显示判断
     listshow(){
        if (!this.totalCount) {
          this.flag = false;
          return false
        } else {
          let show = this.flag;
//             在这加scoll初始化，原因 当totalCount 存在时，当show为true时，才会进行scroll初始化
          if (show) {
            this.$nextTick(() => {
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true,
              })
            })
          }
          return show;
        }
      },
    }
  }
</script>
<style>
  .shopcart {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 50;
    height: 48px;
  }

  .shopcart .content {
    display: flex;
    background: #141d27;
    color: rgba(255, 255, 255, 0.4);
  }

  .shopcart .content .content-left {
    flex: 1;
  }

  .shopcart .content .content-left .logo-wrapper {
    display: inline-block;
    position: relative;
    top: -10px;
    margin: 0 12px;
    padding: 6px;
    width: 56px;
    height: 56px;
    box-sizing: border-box;
    vertical-align: top;
    border-radius: 50%;
    background: #141d27;
  }

  .shopcart .content .content-left .logo-wrapper .logo {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: #2b343c;
    text-align: center;
  }

  .shopcart .content .content-left .logo-wrapper .logo.highlight {
    background: rgb(0, 160, 220);
  }

  .shopcart .content .content-left .logo-wrapper .logo .icon-shopping_cart {
    line-height: 44px;
    font-size: 24px;
    color: #80858a;
  }

  .shopcart .content .content-left .logo-wrapper .logo .icon-shopping_cart.highlight {
    color: #fff;
  }

  .shopcart .content .content-left .logo-wrapper .num {
    position: absolute;
    top: 0;
    right: 0;
    width: 24px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    border-radius: 16px;
    font-size: 9px;
    font-weight: 700;
    color: #fff;
    background: rgb(240, 20, 20);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
  }

  .shopcart .content .content-left .price {
    display: inline-block;
    vertical-align: top;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.4);
    font-weight: 700;
    line-height: 24px;
    margin-top: 12px;
    padding-right: 12px;
    box-sizing: border-box;
    border-right: 1px solid rgba(255, 255, 255, 0.1);
  }

  .shopcart .content .content-left .price.highlight {
    color: #fff;
  }

  .shopcart .content .content-left .desc {
    display: inline-block;
    background: #141d27;
    padding: 12px 0 12px 12px;
    font-size: 13px;
    color: rgba(255, 255, 255, .4);
    line-height: 24px;
  }

  .shopcart .content .content-right {
    flex: 0 0 105px;
    width: 105px;
  }

  .shopcart .content .content-right .pay {
    height: 48px;
    line-height: 48px;
    text-align: center;
    font-size: 12px;
    font-weight: 700;
    background: #2b333b;
  }

  .shopcart .content .content-right .pay.nowpay {
    background: green;
    color: #fff;
  }

  .shopcart .shop-list {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    background: #fff;
    transform: translateY(-100%);
  }

  .shopcart .shop-list .list-head {
    height: 40px;
    line-height: 40px;
    padding: 0 18px;
    background: #f3f5f7;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  }

  .shopcart .shop-list .list-head .title {
    float: left;
    color: rgb(7, 17, 27);
    font-size: 14px;
  }

  .shopcart .shop-list .list-head .emity {
    float: right;
    font-size: 14px;
    display: inline-block;
    color: rgb(0, 160, 220);
  }

  .shopcart .shop-list .list-content {
    padding: 0 18px;
    max-height: 217px;
    overflow: hidden;
  }

  .shopcart .shop-list .list-content .list-item {
    position: relative;
    padding: 12px 0;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  }

  .shopcart .shop-list .list-content .list-item .name {
    font-size: 14px;
    color: rgb(7, 17, 27);
    line-height: 24px;
  }

  .shopcart .shop-list .list-content .list-item .price {
    position: absolute;
    top: 12px;
    right: 80px;
    font-size: 14px;
    font-weight: 700;
    color: rgb(240, 20, 20);
    line-height: 24px;
  }

  .shopcart .shop-list .list-content .list-item .count {
    float: right;
  }

  .bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 40;
    background: rgba(7, 17, 27, 0.6);
    filter: blur(10px)
  }

</style>

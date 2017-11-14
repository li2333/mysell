<template>
  <div>


    <div class="goods" v-if="goods!=null">
      <!--左侧导航栏-->
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li class="menu-item" v-for="(good,index) in goods" :class="{current:menuCurrIndex==index}">
            <span class="text">
              <!--当点击或滑动到当前选项是要加载一个小图标-->
              <span class="icon" v-if="good.type>=0" v :class="iconMap[good.type]"></span>{{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <!--右侧商品-->
      <div class="goods-wrapper" ref="goodsWrapper">
        <!--商品列表-->
        <ul>
          <li class="food-list" v-for="good in goods" >
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item" v-for="food in good.foods" @click="flag=!flag,nowfood=food">
                <!--食物图片-->
                <div class="icon">
                  <img :src="food.icon" alt="" width="57" height="57">
                </div>
                <div class="content">
                  <!--食物名-->
                  <h2 class="name">{{food.name}}</h2>
                  <!--食物描述-->
                  <p class="desc">{{food.description}}</p>
                  <!--销售情况-->
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <!--食物价格-->
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old">{{food.oldPrice}}</span>
                  </div>
                  <!--添加或减少商品数量的容器-->
                  <div class="cartcontrol-wrapper">
                    <count :food="food"></count>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <!--购物车组件-->
      <div>
      <cart :selectFoods="selectFoods" :minPrice="sellera.minPrice" :deliveryPrice="sellera.deliveryPrice"></cart>
      </div>

    </div>
    <!--商品详情组件-->
    <div class="detailcon">
      <detail v-if="flag" :food="nowfood" :flag="flag"></detail>
    </div>
  </div>
</template>
<script>
  import axios from "axios";
  import Count from "../count/Count.vue"
  import BScroll from "better-scroll";
  import Cart from "../cart/Cart.vue"
  import Detail from "../detail/Detail.vue"
  export  default{
      props:["sellera"],
    data(){
          return{
              iconMap:["decrease", "discount", "guarantee", "invoice", "special"],
              goods:null,
              foodsHeight:[],
              scrollY:0,
              menuScroll:null,
              goodsScroll:null,
              flag:false,
              nowfood:""
          }
    },
    components:{
      Count,Cart,Detail
    },
    created(){
//        console.log(this.sellera)
        let that=this;
      axios.get("http://localhost:8080/api/goods").then((res)=>{
        that.goods=res.data.data;
        that.$nextTick(()=>{
            //保证数据跟新后一起Dom更新之后才调用
          that.menuScroll=new BScroll(that.$refs.menuWrapper,{});
          that.goodsScoll =new BScroll(that.$refs.goodsWrapper,{
              click:true,//点击事件生效，为count做准备
              probeType:3
          });
          that.goodsScoll.on("scroll",(pos)=>{
              that.scrollY =Math.abs(Math.round(pos.y))
//            console.log(that.scrollY)
          });
          //计算高度
          that.calHeight();
        });
      }).catch((err)=>{
        console.log(err);
      })
    },
    methods:{

        calHeight(){
          let foodsList=this.$refs.goodsWrapper.getElementsByClassName("food-list");
          let height=0;
          this.foodsHeight.push(height);
          for(let i=0;i<foodsList.length;i++){
              let obj=foodsList[i];
              height +=obj.clientHeight;
              this.foodsHeight.push(height);
          }
        },


    },
    computed:{
        //获得索引
        menuCurrIndex(){
            for(let i=0;i<this.foodsHeight.length;i++){
                let h1=this.foodsHeight[i];
                let h2=this.foodsHeight[i+1];
                if (this.scrollY>h1 && this.scrollY<h2){
                    return i;
                }
            }
            return 0;
        },
      //存商品
      selectFoods(){
            let foods=[];
            this.goods.forEach(good=>{
                good.foods.forEach(food=>{
                    if (food.count) {
                      foods.push(food);
                    }
                });
            });
            return foods;
      },

    }
  }
</script>
<style>
  .goods{
    position: absolute;
    width: 100%;
    top:174px;
    bottom: 46px;
    display: flex;
    overflow: hidden;
  }
  .goods .menu-wrapper{
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;
  }
  .goods .menu-wrapper .menu-item{
    display: table;
    height: 54px;
    width: 56px;
    line-height: 14px;
    padding:0 12px;
  }
  /*当前选中的menu-item的状态*/
  .goods .menu-wrapper .menu-item.current{
    background: #fff;
    z-index: 10;
  }
  .goods .menu-wrapper .current .text{
      border-bottom: none;
    /*font-weight:600;*/
  }
  .goods .menu-wrapper .menu-item.current .icon{
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-right: 6px;
    background-size: 16px 16px;
  }
  .goods .menu-wrapper .menu-item.current .icon.decrease{
    background-image: url("images/decrease_3@2x.png");
  }
  .goods .menu-wrapper .menu-item.current .icon.discount{
    background-image: url("images/discount_3@2x.png");
  }
  .goods .menu-wrapper .menu-item.current .icon.guarantee{
    background-image: url("images/guarantee_3@2x.png");
  }
  .goods .menu-wrapper .menu-item.current .icon.invoice{
    background-image: url("images/invoice_3@2x.png");
  }
  .goods .menu-wrapper .menu-item.current .icon.special{
    background-image: url("images/special_3@2x.png");

  }
  .goods .menu-wrapper .menu-item .text{
    display: table-cell;
    width:56px;
    vertical-align: middle;
    font-size: 12px;
    position: relative;
  }
  .goods .menu-wrapper .menu-item .text:after{
    display: block;
    position: absolute;
    left:0;
    bottom:0;
    width: 100%;
    border-top:1px solid rgba(7,17,27,0.1);
    content: "";
  }
  .goods .goods-wrapper{
    flex:1;
    /*overflow: scroll;*/
  }
  .goods .goods-wrapper .title{
    padding-left: 14px;
    height:26px;
    line-height:26px;
    font-size: 14px;
    border-left:2px solid #d9ddee;
    color:rgb(147,153,159);
    background: #f3f5f7;
  }
  .goods .goods-wrapper .food-item{
    display: flex;
    margin:18px;
    padding-bottom: 18px;
    border-bottom:1px solid rgba(7,17,27,0.1);
  }
  .goods .goods-wrapper .food-item:last-child{
    border-bottom:none;
  }
  .goods .goods-wrapper .food-item .icon{
    flex:0 0 57px;
    margin-right: 10px;
  }
  .goods .goods-wrapper .food-item .content{
    flex:1;
    position: relative;
  }
  .goods .goods-wrapper .food-item .content .name{
    margin:2px 0 8px 0;
    color:rgb(7,17,27);
    font-size: 14px;
    line-height:14px;
    height: 14px;
  }
  .goods .goods-wrapper .food-item .content .desc, .extra{
    font-size: 12px;
    line-height:12px;
    color:rgb(147,153,159);
  }
  .goods .goods-wrapper .food-item .content .desc{
    margin-bottom:8px;
    line-height:12px;
  }
  .goods .goods-wrapper .food-item .content .extra .count{
    margin-right:12px;
  }
  .goods .goods-wrapper .food-item .content .price{
    font-weight:700;
    line-height:24px;
  }
  .goods .goods-wrapper .food-item .content .price .now{
    margin-right: 8px;
    font-size: 14px;
    color:rgb(240,20,20);
    font-weight:600;
  }
  .goods .goods-wrapper .food-item .content .price .old{
    text-decoration: line-through;
    color:rgb(147,153,159);
    font-size: 10px;
  }
  .goods .goods-wrapper .food-item .content .cartcontrol-wrapper{
    position: absolute;
    right: 0;
    bottom: 0;
  }
   .shop-list {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    background: #fff;
    transform: translateY(-100%);
  }

  .shop-list .list-head {
    height: 40px;
    line-height: 40px;
    padding: 0 18px;
    background: #f3f5f7;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  }

  .shop-list .list-head .title {
    float: left;
    color: rgb(7, 17, 27);
    font-size: 14px;
  }

  .shop-list .list-head .emity {
    float: right;
    font-size: 14px;
    display: inline-block;
    color: rgb(0, 160, 220);
  }

  .shop-list .list-content {
    padding: 0 18px;
    max-height: 217px;
    overflow: hidden;
  }

  .shop-list .list-content .list-item {
    position: relative;
    padding: 12px 0;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  }

   .shop-list .list-content .list-item .name {
    font-size: 14px;
    color: rgb(7, 17, 27);
    line-height: 24px;
  }

   .shop-list .list-content .list-item .price {
    position: absolute;
    top: 12px;
    right: 80px;
    font-size: 14px;
    font-weight: 700;
    color: rgb(240, 20, 20);
    line-height: 24px;
  }
   .shop-list .list-content .list-item .count {
    float: right;
  }
 .detailcon{
    position: absolute;
    top:0;
    left:0;
    z-index: 100;
    /*overflow: hidden;*/
    background: #f3f5f7;

  }
</style>

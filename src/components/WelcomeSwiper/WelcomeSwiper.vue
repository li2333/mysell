<template>
  <swiper :options="swiperOption">
    <swiper-slide class="one">
      <h2>welcome</h2>
    </swiper-slide>
    <swiper-slide class="two">
      <div class="twoInner">
        <h2>hello</h2>
        <router-link to="/main">立即体验</router-link>
      </div>
    </swiper-slide>
    <!--控制点-->
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>
<script>
  import {swiper, swiperSlide} from "vue-awesome-swiper";
  export default{
    data(){
      return {
        swiperOption: {
          autoplayStopOnLast: true,
          autoplay: 3000,
          pagination: ".swiper-pagination",
          paginationClickable: true,
          autoplayDisableOnInteraction: false
        }
      }
    },
    components: {
      swiper,
      swiperSlide
    }
  }
</script>
<style>
  .swiper-container{
    height: 100%;
  }
  .swiper-wrapper{
    height:100%;
    color: #fff;
    text-align: center;
    position: relative;
  }
  .swiper-wrapper h2{
    font-size:26px;
  }
  .one{
    background: lightblue;
  }
  .two{
    background: slateblue;
  }
  .one h2{
    width:100%;
    position: absolute;
    top:50%;
    transform: translateY(-50%);
  }
  .two .twoInner{
    width:100%;
    position: absolute;
    top:50%;
    transform: translateY(-50%);
  }
  .two .twoInner a{
    margin-top:30px;
    display: inline-block;
    color: green;
    padding:10px 30px;
    border: 1px solid green;
  }
</style>

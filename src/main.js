// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import "./assets/css/reset.css"
import  "./assets/css/style.css"
// import  "./assets/js/adaptive.js"
import WelcomeSwiper from "./components/WelcomeSwiper/WelcomeSwiper.vue";
import VueSwiper from "vue-awesome-swiper";
import  Goods from "./components/goods/Goods.vue";
import Ratings from  "./components/ratings/Ratings.vue";
import Seller from "./components/seller/Seller.vue";
//import StarScore from "./components/starScore/StarScore.vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
Vue.config.productionTip = false

/* eslint-disable no-new */
const router=new VueRouter({
    routes:[
      {path:"/goods",component:Goods},
      {path:"/ratings",component:Ratings},
      {path:"/seller",component:Seller},
      {path:"/",redirect:"/goods"}
      ]
});

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router
})

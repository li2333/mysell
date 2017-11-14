<template>
  <div id="app" v-if="seller!=null">
    <myheader :seller="seller"></myheader>
    <div id="tabs">
      <div class="item">
          <router-link to="/goods">商品
          </router-link>
      </div>
      <div class="item">
        <router-link to="/ratings">评价
        </router-link>
      </div>
      <div class="item" >
          <router-link to="/seller" >商家
          </router-link>
      </div>

    </div>

    <router-view :sellera="seller">

    </router-view>

  </div>
</template>

<script>
  import  axios from "axios";
  import  myheader from "./components/header/Header.vue"

export default {
  name: 'app',
  data(){
      return {
          seller:null,
      }
  },
  components: {
      //注册组件
      myheader,
  },
  created(){
    let that=this;
    axios.get("http://localhost:8080/api/seller").then((res)=>{
      that.seller = res.data.data;
    }).catch((err)=>{
      console.log(err);
    })

  }
}
</script>

<style>
#app {

}
#tabs{
  display: flex;

}
  #tabs .item{
    flex: 1;
    text-align: center;
    height: 40px;
    border-bottom:1px solid rgba(7,17,27,0.1);

  }
#tabs .item a{
  font-size: 14px;
  color:rgb(77,85,93);
  line-height: 40px;
}
#tabs a.router-link-active{
  font-size: 14px;
  color: rgb(240, 20, 20);
  line-height: 40px;
}

</style>

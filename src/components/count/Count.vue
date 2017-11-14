<template>
    <div class="count">
      <i class="icon-remove_circle_outline" @click.stop.prevent="sub" id="sub" v-show="food.count"></i>
      <p id="item" v-if="food.count>0">{{food.count}}</p>
      <i class="icon-add_circle"  @click.stop.prevent="add" id="add"></i>
    </div>
</template>
<script>
  import  Vue from "vue";
  export default{
      props:["food"],
    created(){
//        console.log(this.food);
    },
    data(){
        return{
          flag: false,
        }
    },
    methods:{
        add(){
//            给food添加一个属性count ,用来保存商品的个数
            if (!this.food.count){
                Vue.set(this.food,"count",1);
            }else{
                this.food.count=this.food.count+1;
                console.log(this.food.name+":"+this.food.count);
            }
        },
        sub(){
            this.food.count--;
        }
    }
  }
</script>
<style>
  .count{
    position: relative;
  }
  .count i{
    font-size: 24px;
    color:rgb(0,160,220);
    line-height: 24px;
    display: inline-block;
  }
  .count #add{

  }
  .count #item{
    font-size: 12px;
    color: rgb(147,155,159);
    line-height:24px;
    vertical-align: top;
    display: inline-block;
  }

</style>

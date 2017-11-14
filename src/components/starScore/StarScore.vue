<template>
    <div class="star">
        <span class="star-item" v-for="item in starclass" :class="item"></span>
    </div>
</template>
<script>
  export default{
      props:["score"],
    data(){
          return{
            starclass:[]
          }
    },
    created(){
      itemClass:{
        const LENGTH=5;
        let intScore=parseInt(this.score);
        let sy=this.score-intScore;
//        console.log(sy);
        for(let i=0;i<intScore;i++){
          this.starclass.push("on");
        }
        if (sy>=0.5){
          this.starclass.push("half");
        }
        while(this.starclass.length<LENGTH){
          this.starclass.push("off");
        }
      }
      /*console.log(this.starclass);
      console.log(this.score);*/
    }
  }
</script>
<style>
  .star-item{
    width: 24px;
    height: 24px;
    display: inline-block;
    background-size: 24px 24px;
    background-repeat:no-repeat;
    margin-right: 20px;
  }
  .star-item.on{
    background-image: url("images/star48_on@2x.png");
  }
  .star-item.half{
    background-image: url("images/star48_half@2x.png");
  }
  .star-item.off{
    background-image: url("images/star48_off@2x.png");
  }
</style>

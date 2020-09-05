<template id="star">
    <div>
      <div class="starItem" v-for="(item,index) in starItem" :key="index" >
          <div style="position:relative">
         <img :src="item.pic" alt="" class="starPic">
         <img :src="item.hover" alt="" class="starPicHover" :style="'left:'+index*25+'%'">
         </div>
      </div>
    </div>
</template>

<script>
export default {
    name:'star',
    data(){
      return {
          left:'25%',
          starItem:[
              {pic:'/img/main/main_star_1.jpg',hover:'/img/main/main_star1_hover.png'},
              {pic:'/img/main/main_star_2.jpg',hover:'/img/main/main_star2_hover.png'},
              {pic:'/img/main/main_star_3.jpg',hover:'/img/main/main_star3_hover.png'},
              {pic:'/img/main/main_star_4.jpg',hover:'/img/main/main_star4_hover.png'},
          ]
      }
    }
}
</script>
<style scoped>
  .starItem{
      margin:0 0;
      display: block;
  }
  .starItem .starPic {
      position: relative;
      display: block;
      width: 25%;
      float: left;
  }
  .starItem .starPicHover{
      position: absolute;
      width: 25%;
      left: 0;
      bottom: -182px;
      opacity: 0;
  }
  .starItem .starPicHover:hover{
      opacity: 1;
  }

</style>

<template id='searchList'>
  <div>
    <ul>
      <li
        v-for="(item,index) in listData"
        :key="index"
        @click="goto(item._id)"
      >{{item.title ? item.title : item}}</li>
    </ul>
  </div>
</template>
<script>
export default {
    name:'searchList',
    
    data(){
        return {

        }
    },
    computed:{
     listData(){
         return this.$store.getters.getSearch;
     }
    },
    methods:{
        goto(id){
            console.log(id,'search')
        this.$router.push({
            name:'Goods',
            params:{
                id
            }
        }
 
        )
    }
    }
}
</script>
<style lang="scss" scoped>
li {
  padding-left: 20px;
  font-size: 14px;
  line-height: 24px;
  margin: 0 10px;
  display: block; //块状显示
  overflow: hidden; //隐藏文字
  text-overflow: ellipsis; //显示...
  white-space: nowrap; //不换行
  width: 80%; //超过100px就截取
  &:hover {
    border: 1px solid rgba($color: blue, $alpha: 0.7);
    background-color: rgba($color: #fdfafd, $alpha: 0.6);
    color: rgb(16, 92, 66);
    border-radius: 4px;
  }
}
</style>
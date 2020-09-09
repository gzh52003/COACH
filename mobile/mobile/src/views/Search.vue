<template id='search'>
    <div style="margin-top:50px;">
      <search-list></search-list>
    </div>
</template>
<script>
import searchList from '../components/Search'
export default {
    name:'search',
    components:{searchList},
    created(){

    },
   mounted(){
   this.$store.commit('displayTabbar',false)
  },
  destroyed() {
    this.$store.commit('displayTabbar',true)
  },
}
</script>
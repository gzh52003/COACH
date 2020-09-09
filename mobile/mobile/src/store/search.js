const search = {
    state:{
      searchArr:[],
      showBool:true,
      searchBool:false,
    },
    mutations:{
     changeSearchArr(state,payload){
        const{ dataArr} = payload;
        state.searchArr = dataArr;
     },
     changeShowBool(state,payload){
         let {bool} = payload;
         console.log(bool+'sb')
         state.showBool = bool
         console.log(Boolean(bool),'b')
         console.log(state.showBool,'state')
     },
     changeSearchBool(state,payload){
         let {bool} = payload;
         state.searchBool = bool; 
         console.log('搜索框',bool)
     }
    },
    actions:{
      trgChangeArr(context,payload){
          const {data} = payload;
          context.commit('changeSearchArr',{dataArr:data});
          console.log(data,'changeArr')
      },
      trgChangeShowBool(context,payload){
          const {bool} = payload;
          console.log(bool,'tsb')
          context.commit('changeShowBool',{bool})
      },
      trgChangeSearchBool(context,payload){
          const {bool} = payload;
          context.commit('changeSearchBool',{bool})
      }
    },
    getters:{
     getSearch(state,getters,rootState,rootGetters){
         return state.searchArr;
     },
     getShowBool(state){
         return state.showBool
        
     },
     getSearchBool(state){
         return state.searchBool
     }
    }
}
export default search;
const logStatus = {
    state:{
     vcodeShow:false, 
     userShow:false
    },
    mutations:{
     changevcodeShow(state,payload){
         let {bool} = payload;
         state.vcodeShow = bool;
     },
     changeUserShow(state,payload){
         let {bool} = payload;
         state.userShow = bool;
     }
    },
    actions:{
     trgChangevcodeShow(context,payload){
         let {bool} = payload;
         context.commit('changevcodeShow',{bool:bool});
     },
     trgChangeUserShow(context,payload){
        let {bool} = payload;
        context.commit('changeUserShow',{bool:bool}); 
     }
    },
    getters:{
     getVcodeShow(state){
        return state.vcodeShow;
     },
     getUserNameShow(state){
         return state.userShow
     }
    }
}
export default logStatus;
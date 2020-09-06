const common = {
    state:{
        showTabbar:true
    },
    getters:{

    },
    mutations:{
        displayTabbar(state,payload){
            state.showTabbar = payload;
        }
    }
}

export default common;
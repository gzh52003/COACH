import Vue from 'vue';
import Vuex from 'vuex';

import common from './common';
import carts from './carts';
import dischild from './dischild';
import search from './search';
import loginStatus from './logStatus';
Vue.use(Vuex);

const store = new Vuex.Store({
  modules:{
    carts,
    common,
    dischild,
    search,
    loginStatus
  }
})

export default store;
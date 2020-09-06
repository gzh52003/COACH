import Vue from 'vue';
import Vuex from 'vuex';

import common from './common';
import carts from './carts';
import dischild from './dischild';
Vue.use(Vuex);

const store = new Vuex.Store({
  modules:{
    carts,
    common,
    dischild
  }
})

export default store;
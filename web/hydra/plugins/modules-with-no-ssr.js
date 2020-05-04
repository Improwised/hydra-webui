import Vue from 'vue';

import Toasted from 'vue-toasted';
if (typeof window !== 'undefined' && window.Vue) {
  window.Toasted = Toasted;
}

Vue.use(Toasted);

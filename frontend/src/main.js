import Vue from 'vue';
import Toasted from 'vue-toasted';
import App from './App.vue';
import store from './store';
import vuetify from './plugins/vuetify';
import { VueMaskDirective } from 'v-mask';

Vue.config.productionTip = false;
Vue.use(Toasted, { duration: 3000 });
Vue.directive('mask', VueMaskDirective);

new Vue({
  store,
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app');

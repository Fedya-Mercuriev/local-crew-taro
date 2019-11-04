import Vue from 'vue';
import App from './App.vue';
const element = document.querySelector('[vue-app]');

Vue.config.productionTip = false;
Vue.config.devtools = process.env.NODE_ENV !== 'production';

const app = new Vue({
  render: h => h(App)
}).$mount(element);

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import Bus from './bus.js'
import moment from 'moment';


Vue.use(ElementUI);
Vue.use(MintUI);
Vue.config.productionTip = false
Vue.prototype.bus = Bus;
Vue.prototype.moment = moment;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

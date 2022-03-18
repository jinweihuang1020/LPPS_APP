import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import MintUI from 'mint-ui'
import { Spinner } from 'mint-ui';
import './registerServiceWorker'
import 'mint-ui/lib/style.css'
import Bus from './bus.js'
import moment from 'moment';
import { firestore } from "./api/FirebaseAPI"
import VueApexCharts from 'vue-apexcharts'
import { APPSettings } from './store.js';

Vue.component('apexchart', VueApexCharts)
Vue.component(Spinner.name, Spinner);

Vue.use(ElementUI);
Vue.use(MintUI);
Vue.config.productionTip = false
Vue.prototype.bus = Bus;
Vue.prototype.moment = moment;
Vue.prototype.$FireStore = firestore;
Vue.prototype.$APPSettings = APPSettings;
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

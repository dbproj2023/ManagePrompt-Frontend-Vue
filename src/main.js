import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';


import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

import { FormCheckboxPlugin } from 'bootstrap-vue'
Vue.use(FormCheckboxPlugin)

import { BFormCheckboxGroup } from 'bootstrap-vue'
Vue.component('b-form-checkbox-group', BFormCheckboxGroup)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import VuetifulBoard from 'vuetiful-board'
Vue.use(VuetifulBoard)

import { BCard } from 'bootstrap-vue'
Vue.component('b-card', BCard)

// import './components/app.scss'

import store from './store'

import vuetify from './plugins/vuetify'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/css/v4-shims.css';

import ArgonDashboard from "./argon-dashboard";


Vue.prototype.$http = axios;
Vue.use(axios);
Vue.use(Vuetify);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
  vuetify: new Vuetify(),
  store
}).$mount('#app')

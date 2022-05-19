import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import registerUI from './elementui/index'
import VueTypedJs from 'vue-typed-js'
import VueLazyload from 'vue-lazyload'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.config.productionTip = false

Vue.use(mavonEditor)
Vue.use(VueLazyload, {
  loading: require('./assets/images/loading.gif') //图片未加载之前显示的图片
})
registerUI(Vue)
Vue.use(VueTypedJs)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')

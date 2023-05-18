import Vue from 'vue'
import App from './App.vue'
import SvgIcon from 'vue-svgicon'

Vue.config.productionTip = false

// Default tag name is 'svgicon'
Vue.use(SvgIcon, {
    tagName: 'svgicon'
})

new Vue({
  render: h => h(App),
}).$mount('#app')

import Vue from 'vue'
import App from '@vue/App'

new Vue({
  el: document.querySelector('#app') as Element,
  components: {App},
  render (h) {
    return h('App', {attrs: {start: 100}})
  }
})

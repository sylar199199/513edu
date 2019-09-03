import Vue from 'vue'
import marked from 'marked'

Vue.filter('marked', data => {
  return marked(data)
})

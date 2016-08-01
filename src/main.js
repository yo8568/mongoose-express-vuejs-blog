import Vue from 'vue'
import App from './App'
import Home from './components/Home.vue'
import create from './components/create.vue'
import edit from './components/edit.vue'
import post from './components/post.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
/* eslint-disable no-new */
Vue.use(VueResource)
Vue.use(VueRouter)
const router = new VueRouter()
router.map({
  '/': {
    component: Home
  },
  '/create': {
    component: create
  },
  '/edit/:slug': {
    component: edit,
    paraid: '{{this.$route.params.slug}}'
  },
  '/post/:slug': {
    component: post
  },
  '/delete': {
    component: Home
  }

})
router.start(App, '#app') // 下面一定要空一行

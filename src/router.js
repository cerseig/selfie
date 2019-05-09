import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Intro from './views/Intro.vue'
import Gallery from './views/Gallery.vue'
import Experience from './views/Experience.vue'
import DebugExperience from './views/DebugExperience.vue'
import Conclusion from './views/Conclusion.vue'
import Share from './views/Share.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/intro',
      name: 'intro',
      component: Intro
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: Gallery
    },
    {
      path: '/share',
      name: 'share',
      component: Share
    },
    {
      path: '/experience',
      name: 'experience',
      component: Experience
    },
    {
      path: '/conclusion',
      name: 'conclusion',
      component: Conclusion
    },
    {
      path: '/debug-experience',
      name: 'debugExperience',
      component: DebugExperience
    }
  ]
})

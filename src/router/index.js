import { createRouter, createWebHistory } from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue';
import SiteDashboard from '../components/SiteDashboard.vue'
import MovieList from '../components/MovieList.vue';
import LoginTmp from '../components/LoginTmp.vue'
import WikiPage from '../components/WikiPage.vue';
import RentBike from '../components/RentBike.vue'
import OverallCommentBox from '../components/OverallCommentBox.vue';
import { auth } from '../fireconf'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginTmp, //() => import('../components/LoginTmp.vue')
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/landing',
    name: 'Dashboard',
    component: SiteDashboard,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/movies',
    name: 'MovieList',
    component: MovieList,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/bikes',
    name: 'Bikes',
    component: RentBike,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/overallComm',
    name: 'OverallCommentBox',
    component: OverallCommentBox,
    meta: {
      requiresAuth: false
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/' && auth.currentUser) {
    next('/hello')
    return;
  }
  if (to.matched.some(record => record.meta.requiresAuth) && !auth.currentUser) {
    next('/')
    return;
  }
  next()
})

export default router
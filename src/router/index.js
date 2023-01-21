import { createRouter, createWebHistory } from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue';
import MovieList from '../components/MovieList.vue';
import LoginTmp from '../components/LoginTmp.vue'
import WikiPage from '../components/WikiPage.vue';
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
    path: '/hello',
    name: 'HelloWorld',
    component: HelloWorld,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/movies',
    name: 'MovieList',
    component: MovieList,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/wiki',
    name: 'Wiki',
    component: WikiPage,
    meta: {
      requiresAuth: true
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
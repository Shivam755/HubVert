import { createRouter, createWebHashHistory } from 'vue-router';
import Login from '../components/login.vue';
import Register from '../components/register.vue';
import Profile from '../components/profile.vue';
import ChangePassword from '../components/changePassword.vue';
import Diary from '../components/diary.vue';
import Feed from '../components/Feed.vue';
import ChangePic from '../components/changeProfilePic.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/sign-up',
    name: 'Sign-up',
    component: Register
  },{
    path: '/feed',
    name: 'feed',
    component: Feed
  },
  {
    path: '/profile',
    name:'profile',
    component: Profile
    
  },
  {
    path: '/changePassword',
    name:'changePassword',
    component: ChangePassword
  },
  {
    path: '/changeProfilePic',
    name: 'changePic',
    component: ChangePic
  },
  {
    path: '/diary',
    name:'diary',
    component: Diary
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/About.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

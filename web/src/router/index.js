import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Login from '@/components/Login';
import SignUp from '@/components/SignUp';
import Stubit from '@/components/Stubit';
import getUserCreds from '../helpers/getUserCreds';

Vue.use(Router);

function requireAuth(to, from, next) {
  if (getUserCreds() === null) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}
function redirectToMocks(to, from, next) {
  if (getUserCreds()) {
    next({
      path: '/stubit',
    })
  } else {
    next()
  }
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      beforeEnter: redirectToMocks
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp,
    },
    {
      path: '/stubit',
      name: 'Stubit',
      component: Stubit,
      beforeEnter: requireAuth
    }
  ],
});

import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import Login from '@/components/Login';
import SignUp from '@/components/SignUp';
import Mockit from '@/components/Mockit';
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

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
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
      path: '/mockit',
      name: 'Mockit',
      component: Mockit,
      beforeEnter: requireAuth
    }
  ],
});

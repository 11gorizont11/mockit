// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import { Button, Input, Card, Loading, Form, FormItem, Row, Col, Container } from 'element-ui';
import App from './App';
import router from './router';

Vue.use(Container);
Vue.use(Row);
Vue.use(Col);
Vue.use(Button);
Vue.use(Input);
Vue.use(Card);
Vue.use(Form);
Vue.use(FormItem);

Vue.use(Loading.directive);


Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});

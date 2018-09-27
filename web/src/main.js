// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import { Button, Input, Card, Loading, Form, FormItem, Row, Col, Container, Tabs, TabPane, Select, Option, Table, TableColumn } from 'element-ui';
import ApiService from './services/api.service';
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
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Select);
Vue.use(Option);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Loading.directive);

Vue.config.productionTip = false;

Vue.prototype.$http = new ApiService();
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});

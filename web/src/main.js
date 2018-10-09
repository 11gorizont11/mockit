// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import { Button, Input, Card, Loading, Form, FormItem, Row, Col, Container, Header, Tabs, TabPane, Select, Option, Table, TableColumn, Message, Dropdown, DropdownMenu, DropdownItem } from 'element-ui';
import ApiService from './services/api.service';
import App from './App';
import Base from './components/Layouts/Base';
import router from './router';

Vue.use(Container);
Vue.use(Header);
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
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Loading.directive);
Vue.component('base-layout', Base);

Vue.config.productionTip = false;

Vue.prototype.$http = new ApiService();
Vue.prototype.$message = Message;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});

import Vue from "vue";
import AppComponent from "./App/App.vue";
import { Table, TableColumn } from 'element-ui'
const div = document.createElement('div');
div.classList.add('--chrome');
document.body.appendChild(div);
console.log('3333')
Vue.component("app-component", AppComponent);
Vue
  .use(Table)
  .use(TableColumn)
new Vue({
  render: createElement => {
    return createElement(AppComponent);
  }
}).$mount(div)

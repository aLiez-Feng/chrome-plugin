import Vue from "vue";
// import axios from 'axios';
import AppComponent from "./App/App.vue";
import { Form, FormItem, Select, Option, Button, Dialog, Input, Card, DatePicker, Message, Popover, Alert } from 'element-ui'

const div = document.createElement('div');
const meta = document.createElement('meta');
const elementIcons = document.createElement('style');


// elementIcons.type = 'text/css';
elementIcons.textContent = `
      @font-face {
          font-family: "element-icons";
          src: url('${window.chrome.extension.getURL("fonts/element-icons.woff")}') format('woff'),
          url('${window.chrome.extension.getURL("fonts/element-icons.ttf ")}') format('truetype'); /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
      }
  `;
meta.setAttribute('http-equiv', "Content-Security-Policy")
meta.setAttribute('content', "upgrade-insecure-requests")
// <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />

document.body.appendChild(div);
document.head.appendChild(meta);
document.head.appendChild(elementIcons);
Vue.prototype.$message = Message
Vue.component("app-component", AppComponent);
Vue
  .use(Form)
  .use(FormItem)
  .use(Input)
  .use(Select)
  .use(Option)
  .use(Button)
  .use(Dialog)
  .use(Card)
  .use(DatePicker)
  .use(Popover)
  .use(Alert)
new Vue({
  render: createElement => {
    return createElement(AppComponent);
  }
}).$mount(div)

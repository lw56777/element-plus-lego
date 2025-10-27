import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'virtual:uno.css';
import './styles/common.css';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';

import {
  ElButton,
  ElInput,
  ElCascader,
  ElCheckbox,
  ElDatePicker,
  ElRadio,
  ElSelect,
  ElSwitch,
} from 'element-plus';
import ElementPlusLego from '../../index';

const app = createApp(App);

const componentMap = {
  button: ElButton,
  input: ElInput,
  cascader: ElCascader,
  checkbox: ElCheckbox,
  date: ElDatePicker,
  radio: ElRadio,
  select: ElSelect,
  switch: ElSwitch,
};

const pagination = {
  pageSize: 20,
};

app.use(ElementPlusLego, {
  componentMap,
  pagination,
});

app.use(router);
router.isReady().then(() => {
  app.mount('#app');
});

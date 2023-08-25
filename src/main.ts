import { createApp } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import router from '@/router';

import App from './App.vue';
import { AudioManager } from '@/tools/audioManager';
import { defineDevice } from './tools/defineDevice';
import './style/main.css';
import './fontawesomeLibrary';

const audioManager = new AudioManager();
const device = defineDevice();

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(router)
  .provide('audioManager', audioManager)
  .provide('device', device)
  .mount('#app');

import { createApp } from 'vue'
import router from '@/router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import App from './App.vue'
import { AudioManager } from '@/Tools/AudioManager'
import './style/main.css'
import './fontawesomeLibrary.ts'

const audioManager = new AudioManager(window)

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(router)
  .provide('audioManager', audioManager)
  .mount('#app')
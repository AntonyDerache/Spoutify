import { createApp } from 'vue'
import router from '@/router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import App from './App.vue'
import { AudioManager } from '@/Tools/AudioManager'
import { defineDevice } from './tools/defineDevice'
import './style/main.css'
import './fontawesomeLibrary.ts'

const audioManager = new AudioManager()
const device = defineDevice()

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(router)
  .provide('audioManager', audioManager)
  .provide('device', device)
  .mount('#app')

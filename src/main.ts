import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as sharedComponents from './components/shared'

import './styles/index.css'

const app = createApp(App)

Object.entries(sharedComponents).forEach(([name, component]) => app.component(name, component))

app
  .use(store)
  .use(router)
  .mount('#app')

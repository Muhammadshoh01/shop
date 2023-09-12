import { createApp } from 'vue'
import { createPinia } from 'pinia'
import JsonExcel from 'vue-json-excel3'
import VueCookies from 'vue-cookies'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueCookies, { expires: '3d' })
app.use(ElementPlus)
app.component('downloadExcel', JsonExcel)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component)
}

app.mount('#app')

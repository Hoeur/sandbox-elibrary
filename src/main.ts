import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n';

import App from './App.vue'
import router from './router'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { fas, faAd, faCircle } from '@fortawesome/free-solid-svg-icons'
import en from './i18n/en.json'
import km from './i18n/km.json'
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

/* add icons to the library */
library.add(fas,fab,far, faAd, faCircle)

const app = createApp(App)
const lang = localStorage.getItem('lang')
const messages = {
    en: en,
    km: km
};

const i18n = createI18n({
    locale: lang || 'km',
    fallbackLocale: 'km',
    messages
});

app.use(createPinia())
app.use(router)
app.use(i18n)

app.component('font-awesome-icon', FontAwesomeIcon).mount('#app')

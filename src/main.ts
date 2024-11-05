import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import en from './i18n/en.json';
import km from './i18n/km.json';
import './assets/main.css';
import VueGtag from 'vue-gtag';


// Add FontAwesome icons to the library
library.add(fas, fab, far);

// Create a Pinia instance for store management
const pinia = createPinia();

// Define messages for internationalization
const messages = {
  en: en,
  km: km
};

// Create an i18n instance
const i18n = createI18n({
  locale: localStorage.getItem('lang') || 'km', // Retrieve the locale from localStorage or default to 'km'
  fallbackLocale: 'km', // Set fallback locale to 'km'
  messages, // Provide the messages object
});

// Create the Vue app instance
const app = createApp(App);

// Use Pinia for state management
app.use(pinia);

//google analytics
app.use(VueGtag, {
  config: { id: import.meta.env.VITE_VUE_APP_GA_KEY } // Replace with your Google Analytics Measurement ID
}, router); // Pass router if using Vue Router

// Register the globally used FontAwesomeIcon component
app.component('font-awesome-icon', FontAwesomeIcon);


// Use the router for navigation
app.use(router);

// Use i18n for internationalization
app.use(i18n);

// Mount the app to the DOM element with id 'app'
app.mount('#app');
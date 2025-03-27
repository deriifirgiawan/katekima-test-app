import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia';
import { i18n } from './i18n';
import { router } from './routes';


const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(i18n);
app.use(pinia);
app.mount('#app');

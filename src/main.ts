import './styles/main.scss';
import { createApp, ref } from 'vue';
import Main from './Main.vue';
import router from './routes';

let locale = ref('en'); // Default app locale

const app = createApp(Main);

app.use(router);
app.provide('locale', locale);
app.mount('#app');
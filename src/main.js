import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
  IonApp, IonPage, IonicVue, IonRouterOutlet
} from '@ionic/vue';
import '@ionic/core/css/ionic.bundle.css'

const app = createApp(App).use(IonicVue).use(router);

app.component("IonRouterOutlet", IonRouterOutlet)
app.component("IonApp", IonApp)
app.component("IonPage", IonPage)

app.mount('#app');
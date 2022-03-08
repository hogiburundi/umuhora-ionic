import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
  IonApp, IonPage, IonicVue, IonRouterOutlet, IonIcon
} from '@ionic/vue';
import '@ionic/core/css/ionic.bundle.css'
import * as allIcons from "ionicons/icons";

const app = createApp(App).use(IonicVue).use(router).use(store);

app.component("IonRouterOutlet", IonRouterOutlet)
app.component("IonApp", IonApp)
app.component("IonPage", IonPage)

app.mixin({
  computed:{
    "active_user"(){
      return this.$store.state.user
    }
  },
  methods: {
    icon(name) {
      return allIcons[name];
    }
  }
});

app.mount('#app');
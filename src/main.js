import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
  IonApp, IonPage, IonicVue, IonRouterOutlet, IonIcon, IonTabs, IonLabel,
  IonInput, IonItem, IonButton, IonButtons, IonCol, IonContent, IonTabButton, IonTabBar,
  IonTitle, IonToolbar, IonHeader, IonMenuButton, IonFabButton
} from '@ionic/vue';
import '@ionic/core/css/ionic.bundle.css'
import * as allIcons from "ionicons/icons";

const app = createApp(App).use(IonicVue).use(router).use(store);

app.component("IonRouterOutlet", IonRouterOutlet)
app.component("IonApp", IonApp)
app.component("IonPage", IonPage)
app.component("IonTabs", IonTabs)
app.component("IonLabel", IonLabel)
app.component("IonInput", IonInput)
app.component("IonItem", IonItem)
app.component("IonButton", IonButton)
app.component("IonButtons", IonButtons)
app.component("IonCol", IonCol)
app.component("IonIcon", IonIcon)
app.component("IonContent", IonContent)
app.component("IonTabButton", IonTabButton)
app.component("IonTabBar", IonTabBar)
app.component("IonTitle", IonTitle)
app.component("IonToolbar", IonToolbar)
app.component("IonHeader", IonHeader)
app.component("IonMenuButton", IonMenuButton)
app.component("IonFabButton", IonFabButton)

app.mixin({
  computed:{
    "active_user"(){
      return this.$store.state.user
    }
  },
  methods: {
    getIcon(name) {
      return allIcons[name];
    }
  }
});

app.mount('#app');
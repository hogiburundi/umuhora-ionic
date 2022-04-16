import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import {
  IonApp, IonPage, IonicVue, IonRouterOutlet, IonIcon, IonTabs, IonLabel,
  IonInput, IonItem, IonButton, IonButtons, IonCol, IonContent, IonTabButton,
  IonTabBar, IonTitle, IonToolbar, IonHeader, IonMenuButton, IonFabButton,
  IonList, IonMenu, IonToggle, IonFooter, IonItemDivider, IonPopover, IonBadge,
  IonSelectOption, IonSelect, IonText, IonDatetime
} from '@ionic/vue';
import '@ionic/core/css/ionic.bundle.css'
import * as allIcons from "ionicons/icons";
import { App as CapacitorApp } from '@capacitor/app';

window.axios = axios;
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
app.component("IonList", IonList)
app.component("IonMenu", IonMenu)
app.component("IonToggle", IonToggle)
app.component("IonFooter", IonFooter)
app.component("IonItemDivider", IonItemDivider)
app.component("IonPopover", IonPopover)
app.component("IonBadge", IonBadge)
app.component("IonSelectOption", IonSelectOption)
app.component("IonSelect", IonSelect)
app.component("IonText", IonText)
app.component("IonDatetime", IonDatetime)

app.mixin({
  methods: {
    getIcon(name) {
      return allIcons[name];
    },
    money(x) {
      let cash = parseFloat(x).toFixed(0)
      if(!x) return "0";
      return cash.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    },
    isNumeric(x) {
      let str = x.toString();
      if (str.match(/^[0-9]+$/)) return true;
      return false;
    },
    logOut(x) {
      if(confirm("Voulez-vous vraiment deconnecter?")){
        this.$store.state.user = null
        this.$store.state.active_kiosk = null
      }
    },
    money(x) {
      let cash = parseFloat(x).toFixed(0)
      if(!x) return "0";
      return cash.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    },
    cleanString(str){
      if (!str) return "";
      if(typeof(str)=='object'){
        let string = ""
        for( let [clef, valeur] of Object.entries(str)){
          if(typeof(valeur)=='object'){
            let child = ""
            for( let [key, value] of Object.entries(valeur)){
              child += `- ${key}: ${value}. `
            }
            valeur = child;
          }
          string+=`${clef}: ${valeur}. `
        }
        return string;
      };
      str = str.toString();
      return str.replace( /(<([^>]+)>)/ig, '');
    },
    getGroupName(id){
      let group = this.$store.state.groups.find(x => x.id == id)
      return !!group? group.name:"-";
    },
    getGroupId(name){
      let group = this.$store.state.groups.find(x => {
        return x.name.toLowerCase() == name.toLowerCase()
      })
      return !!group? group.id:-1;
    },
    userIs(personnel, group_id){
      let groups = personnel.user.groups;
      return groups.includes(group_id);
    },
    datetime(x) {
      if(!x) return "-"
      let date = new Date(x);
      return new Intl.DateTimeFormat(
        'en-GB',
        { dateStyle: 'short', timeStyle: 'short' }
      ).format(date)
    },
    date(x) {
      if(!x) return "-"
      let date = new Date(x);
      return new Intl.DateTimeFormat(
        'en-GB',
        { dateStyle: 'short' }
      ).format(date)
    },
    displayErrorOrRefreshToken(error, callback, elseCallback){
      if(!!error.response){
        if(error.response.data.code == "token_not_valid"){ 
          let refresh = this.$store.state.user.refresh
          if(!refresh){
            this.$store.state.user = null;
            return
          }
          axios.post(this.url+"/refresh/", {"refresh":refresh})
          .then((response) => {
            this.$store.state.user.access = response.data.access
            if(typeof callback == "function") callback()
          }).catch((error) => {
            this.$store.state.user = null;
            console.error(error)
          })
        } else {
          console.error(error)
          if(typeof(elseCallback) == 'function'){
            elseCallback()
          }
        }
      }
    },
    getActiveKiosk(){
      if(!this.$store.state.active_kiosk && this.active_user){
        if(!!this.active_user.kiosks && this.active_user.kiosks.length == 1){
          this.$store.state.active_kiosk = this.active_user.kiosks[0]
        }
      }
      return this.$store.state.active_kiosk
    }
  },
  computed:{
    active_user(){
      return this.$store.state.user;
    },
    active_user_fullname(){
      return `${this.active_user.first_name} ${this.active_user.last_name}`;
    },
    user_is_owner(){
      return !!this.getActiveKiosk() && this.active_user.owned.includes(this.getActiveKiosk().id)
    },
    base_url(){
      return this.$store.state.base_url;
    },
    url(){
      return this.base_url + this.$store.state.api;
    },
    headers(){
      return {
        headers:{
          "Authorization":"Bearer "+this.$store.state.user.access
        }
      }
    }
  }
})
CapacitorApp.addListener('backButton', ({canGoBack}) => {
  if((!canGoBack) || (window.history.state.back == null)){
    CapacitorApp.exitApp();
  } else {
    window.open(window.history.state.back, "_self")
  }
});
app.mount('#app');
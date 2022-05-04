import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import {
  IonApp, IonPage, IonicVue, IonRouterOutlet, IonIcon, IonTabs, IonLabel,
  IonInput, IonItem, IonButton, IonButtons, IonCol, IonContent, IonTabButton,
  IonTabBar, IonTitle, IonToolbar, IonHeader, IonMenuButton, IonFabButton,
  IonList, IonMenu, IonToggle, IonFooter, IonItemDivider, IonPopover, IonBadge,
  IonSelectOption, IonSelect, IonText, IonDatetime, toastController, IonSearchbar,
  IonSpinner
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
app.component("IonSearchbar", IonSearchbar)
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
app.component("IonSpinner", IonSpinner)

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
      let commandes = JSON.parse(localStorage.getItem("commandes"))
      let stocks = JSON.parse(localStorage.getItem("stocks"))
      let pertes = JSON.parse(localStorage.getItem("pertes"))
      let produits = JSON.parse(localStorage.getItem("produits"))
      let payments = JSON.parse(localStorage.getItem("payments"))
      let clients = JSON.parse(localStorage.getItem("clients"))

      if(!!commandes){
        commandes = Object.keys(commandes).filter(x => x < 0)
        if(commandes.length > 0) {
          this.makeToast("Erreur", "synchronisation des commandes obligatoire")
          return
        }
        localStorage.setItem("commandes", "{}")
      }
      if(!!stocks){
        stocks = Object.keys(stocks).filter(x => x < 0)
        if(stocks.length > 0) {
          this.makeToast("Erreur", "synchronisation des stocks obligatoire")
          return
        }
        localStorage.setItem("stocks", "{}")
      } 
      if(!!pertes){
        pertes = Object.keys(pertes).filter(x => x < 0)
        if(pertes.length > 0) {
          this.makeToast("Erreur", "synchronisation des pertes obligatoire")
          return
        }
        localStorage.setItem("pertes", "{}")
      } 
      if(!!produits){
        produits = Object.keys(produits).filter(x => x < 0)
        if(produits.length > 0) {
          this.makeToast("Erreur", "synchronisation des produits obligatoire")
          return
        }
        localStorage.setItem("produits", "{}")
      }
      if(!!payments){
        payments = Object.keys(payments).filter(x => x < 0)
        if(payments.length > 0) {
          this.makeToast("Erreur", "synchronisation des payments obligatoire")
          return
        }
        localStorage.setItem("payments", "{}")
      }
      if(!!clients){
        clients = Object.keys(clients).filter(x => x < 0)
        if(clients.length > 0) {
          this.makeToast("Erreur", "synchronisation des clients obligatoire")
          return
        }
        localStorage.setItem("clients", "{}")
      }

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
    makeToast(title, message, duration=5000){
      toastController.create({
        header: title,
        message: message,
        icon: this.getIcon('informationCircleOutline'),
        duration:duration,
        buttons: [
          {
            text: 'OK',
            handler: () => {}
          }
        ]
      }).then(toast => {
        toast.present();
      });
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
          this.makeToast('erreur', this.cleanString(error.response.data))
          if(typeof(elseCallback) == 'function'){
            elseCallback()
          }
        }
      } else {
        console.error(error)
      }
    },
    getActiveKiosk(){
      if(!this.$store.state.active_kiosk && this.active_user){
        if(!!this.active_user.kiosks && this.active_user.kiosks.length == 1){
          this.$store.state.active_kiosk = this.active_user.kiosks[0]
        }
      }
      return this.$store.state.active_kiosk
    },
    getMaxID(storage){
      let kiosk_id = this.getActiveKiosk().id;
      let id = null
      let db = JSON.parse(localStorage.getItem(storage))
      if(!db){
        db = []
        localStorage.setItem(storage, "{}")
      } else {
        let cond
        db = Object.values(db)
        if(db.length == 0) return id
        id = db[0].id
        for(let item of db){
          if(item.id > id) id = item.id
        }
      }
      return id
    },
    generateId(storage){
      let kiosk_id = this.getActiveKiosk().id;
      let id = -1
      let db = JSON.parse(localStorage.getItem(storage))
      if(!db){
        db = []
        localStorage.setItem(storage, "{}")
      } else {
        let cond
        db = Object.values(db).filter(x => cond && x.id < 0)
        if(db.length == 0) return id
        let ids = db.map(x => x.id)
        return Math.min(...ids) -1
      }
      return id
    },
    getMaxTime(storage){
      let kiosk_id = this.getActiveKiosk().id;
      let date = null
      let db = JSON.parse(localStorage.getItem(storage))
      if(!db){
        db = []
        localStorage.setItem(storage, "{}")
      } else {
        let cond
        db = Object.values(db)
        if(db.length == 0) return date
        date = new Date(db[0].updated_at)
        for(let item of db){
          let new_date = new Date(item.updated_at)
          if(new_date > date) date = new_date
        }
        date = date.toISOString()
      }
      return date
    },
    getCreated(storage){
      let results = []
      let db = JSON.parse(localStorage.getItem(storage))
      if(!db){
        db = []
        localStorage.setItem(storage, "{}")
      } else {
        results = Object.values(db).filter(x => !!x.created)
      }
      return results
    },
    saveInDB(storage, data){
      let db = JSON.parse(localStorage.getItem(storage))
      if(Array.isArray(data)){
        for(let item of data){
          db[item.id.toString()] = item
        }
      } else {
        db[data.id.toString()] = data
      }
      localStorage.setItem(storage, JSON.stringify(db))
      console.log(`${storage.toUpperCase()} SAVED`)
    },
    deleteFromDB(storage, data){
      let db = JSON.parse(localStorage.getItem(storage))
      if(Array.isArray(data)){
        for(let id of data){
          delete(db[id])
        }
      } else {
        delete(db[id])
      }
      localStorage.setItem(storage, JSON.stringify(db))
      console.log(`${storage.toUpperCase()} SAVED`)
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
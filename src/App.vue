<template>
  <ion-app>
    <div v-if="!!active_user">
      <KioskChooser :active="must_choose_kiosk"/>
      <keep-alive>
        <ion-router-outlet id="main"/>
      </keep-alive>
      <ion-menu side="start" class="drawer-layout" content-id="main">
      <div class="menu-content">
        <div class="session-info">
          <div class="img-user">
            <img :src="!!active_kiosk?active_kiosk.logo:''" alt="">
          </div>
          <div>{{ !!active_kiosk?active_kiosk.nom:'' }}</div>
          <div>{{ active_user_fullname }}</div>
        </div>
        <div class="menus" @click="doThings">
          <ion-list lines="none">
            <ion-item-divider>menu</ion-item-divider>
            <ion-item button routerLink="/home/vente">
              <ion-icon :src="getIcon('cartOutline')"/>
              <ion-label>Vente</ion-label>
            </ion-item>
            <ion-item button routerLink="/home/stock">
              <ion-icon :src="getIcon('basketOutline')"/>
              <ion-label>Stock</ion-label>
            </ion-item>
            <ion-item button routerLink="/home/stats">
              <ion-icon :src="getIcon('statsChart')"/>
              <ion-label>Statistiques</ion-label>
            </ion-item>
          </ion-list>
          <ion-list lines="none">
            <ion-item-divider>Compte</ion-item-divider>
            <ion-item button routerLink="/profile">
              <ion-icon :src="getIcon('personOutline')"/>
              <ion-label>Edition</ion-label>
            </ion-item>
            <ion-item button @click="logout">
              <ion-icon :src="getIcon('logOutOutline')"/>
              <ion-label>Deconnexion</ion-label>
            </ion-item>
          </ion-list>
          <ion-list lines="none">
            <ion-item-divider>Autres</ion-item-divider>
            <ion-item button @click="openWhatsapp">
              <ion-icon :src="getIcon('logoWhatsapp')"/>
              <ion-label>Demander l'aide</ion-label>
            </ion-item>
          </ion-list>
        </div>
      </div>
      </ion-menu>
    </div>
    <LoginForm v-else/>
  </ion-app>
</template>
<script>
import { useIonRouter, menuController } from '@ionic/vue';
import LoginForm from "./components/login_form"
import KioskChooser from "./components/kiosk_chooser"
import CustomPlugins from './plugins'

export default {
  components: { LoginForm, KioskChooser },
  data(){
    return {
    }
  },
  computed:{
    must_choose_kiosk(){
      return !!this.active_user.kiosks &&
             this.active_user.kiosks.length>1 &&
             !this.$store.state.active_kiosk
    },
    active_kiosk(){
      return this.getActiveKiosk()
    }
  },
  watch:{
    "$store.state.user":{
      deep:true,
      handler(new_val){
        if(!!new_val){
          localStorage.setItem('user', JSON.stringify(new_val));
        } else {
          localStorage.removeItem('user')
        }
      }
    },
    "$store.state.active_kiosk"(new_val){
      if(!!new_val){
        localStorage.setItem('active_kiosk', JSON.stringify(new_val));
      } else {
        localStorage.removeItem('active_kiosk')
      }
    },
  },
  methods:{
    logout(){
      this.$store.state.active_kiosk = null
      this.$store.state.user = null
    },
    openWhatsapp(){
      CustomPlugins.openWhatsapp()
    },
    doThings(event){
      menuController.close();
    },
    loadDB(){
      const request = indexedDB.open(this.$store.state.db_name, 1);

      request.onupgradeneeded = function() {
        console.log("DB CREATION")
        const db = request.result;

        let store = db.createObjectStore('commandes', {keyPath: "id"});
        store.createIndex("by_kiosk", "kiosk");
        store.createIndex("by_date", "updated_at");
        store.createIndex("by_offline", "offline");

        store = db.createObjectStore('payments', {keyPath: "id"});
        store.createIndex("by_kiosk", "kiosk");
        store.createIndex("by_date", "updated_at");
        store.createIndex("by_offline", "offline");

        store = db.createObjectStore('stocks', {keyPath: "id"});
        store.createIndex("by_kiosk", "kiosk");
        store.createIndex("by_date", "updated_at");
        store.createIndex("by_offline", "offline");
        // store.createIndex("by_quantite", "quantite_actuelle");

        store = db.createObjectStore('pertes', {keyPath: "id"});
        store.createIndex("by_kiosk", "kiosk");
        store.createIndex("by_date", "updated_at");
        store.createIndex("by_offline", "offline");

        store = db.createObjectStore('produits', {keyPath: "id"});
        store.createIndex("by_kiosk", "kiosk");
        store.createIndex("by_date", "updated_at");
        // store.createIndex("by_offline", "offline");
        // store.createIndex("by_quantite", "quantite");
        store.createIndex("by_nom", "nom", {unique: true});

        store = db.createObjectStore('clients', {keyPath: "id"});
        store.createIndex("by_kiosk", "kiosk");
        store.createIndex("by_date", "updated_at");
        store.createIndex("by_offline", "offline");

        store = db.createObjectStore('deleted_commandes', {keyPath: "id"});
        store.createIndex("by_kiosk", "kiosk");

        store = db.createObjectStore('deleted_payments', {keyPath: "id"});
        store.createIndex("by_kiosk", "kiosk");

        store = db.createObjectStore('deleted_stocks', {keyPath: "id"});
        store.createIndex("by_kiosk", "kiosk");

        store = db.createObjectStore('deleted_pertes', {keyPath: "id"});
        store.createIndex("by_kiosk", "kiosk");

        store = db.createObjectStore('validated_stocks', {keyPath: "id"});
        store.createIndex("by_kiosk", "kiosk");

        store = db.createObjectStore('validated_pertes', {keyPath: "id"});
        store.createIndex("by_kiosk", "kiosk");

      };
    }
  },
  mounted(){
    var user = JSON.parse(localStorage.getItem('user'));
    var active_kiosk = JSON.parse(localStorage.getItem('active_kiosk'));

    if(user) this.$store.state.user = user;
    if(active_kiosk) this.$store.state.active_kiosk = active_kiosk;

    this.loadDB()
  },
};
</script>
<style src="./style.css">
</style>

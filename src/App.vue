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
    "$store.state.commandes":{
      deep:true,
      handler(new_val){
        if(new_val){
          localStorage.setItem("commandes", JSON.stringify(new_val))
        }else{
          localStorage.removeItem("commandes")
        }
      }
    },
    "$store.state.payments":{
      deep:true,
      handler(new_val){
        if(new_val){
          localStorage.setItem("payments", JSON.stringify(new_val))
        }else{
          localStorage.removeItem("payments")
        }
      }
    },
    "$store.state.stocks":{
      deep:true,
      handler(new_val){
        if(new_val){
          localStorage.setItem("stocks", JSON.stringify(new_val))
        }else{
          localStorage.removeItem("stocks")
        }
      }
    },
    "$store.state.pertes":{
      deep:true,
      handler(new_val){
        if(new_val){
          localStorage.setItem("pertes", JSON.stringify(new_val))
        }else{
          localStorage.removeItem("pertes")
        }
      }
    },
    "$store.state.produits":{
      deep:true,
      handler(new_val){
        if(new_val){
          localStorage.setItem("produits", JSON.stringify(new_val))
          this.$store.state.produits = new_val
          this.$store.state.ibidandazwa = new_val.filter(x => x.quantite > 0)
        }else{
          localStorage.removeItem("produits")
        }
      }
    },
    "$store.state.clients":{
      deep:true,
      handler(new_val){
        if(new_val){
          localStorage.setItem("clients", JSON.stringify(new_val))
        }else{
          localStorage.removeItem("clients")
        }
      }
    },
    "$store.state.deleted_commandes":{
      deep:true,
      handler(new_val){
        if(!!new_val){
          localStorage.setItem("deleted_commandes", JSON.stringify(Array.from(new_val)))
        } else {
          localStorage.removeItem("deleted_commandes")
        }
      }
    },
    "$store.state.deleted_payments":{
      deep:true,
      handler(new_val){
        if(!!new_val){
          localStorage.setItem("deleted_payments", JSON.stringify(Array.from(new_val)))
        } else {
          localStorage.removeItem("deleted_payments")
        }
      }
    },
    "$store.state.deleted_stocks":{
      deep:true,
      handler(new_val){
        if(!!new_val){
          localStorage.setItem("deleted_stocks", JSON.stringify(Array.from(new_val)))
        } else {
          localStorage.removeItem("deleted_stocks")
        }
      }
    },
    "$store.state.validated_stocks":{
      deep:true,
      handler(new_val){
        if(!!new_val){
          localStorage.setItem("validated_stocks", JSON.stringify(Array.from(new_val)))
        } else {
          localStorage.removeItem("validated_stocks")
        }
      }
    },
    "$store.state.deleted_pertes":{
      deep:true,
      handler(new_val){
        if(!!new_val){
          localStorage.setItem("deleted_pertes", JSON.stringify(Array.from(new_val)))
        } else {
          localStorage.removeItem("deleted_pertes")
        }
      }
    },
    "$store.state.validated_pertes":{
      deep:true,
      handler(new_val){
        if(!!new_val){
          localStorage.setItem("validated_pertes", JSON.stringify(Array.from(new_val)))
        } else {
          localStorage.removeItem("validated_pertes")
        }
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
    loadData(){
      let user = this.$store.state.user;
      let active_kiosk = this.$store.state.active_kiosk;

      if(!user || !active_kiosk) return

      this.$store.state.deleted_commandes = deleted_commandes
      this.$store.state.deleted_payments = deleted_payments
      this.$store.state.deleted_stocks = deleted_stocks
      this.$store.state.deleted_pertes = deleted_pertes
      this.$store.state.validated_stocks = validated_stocks
      this.$store.state.validated_pertes = validated_pertes
    },
    loadDB(){
      const request = indexedDB.open("umuhora", 1);
      const state = this.$store.state

      request.onupgradeneeded = function() {
        console.log("DB CREATION")
        state.db = request.result;

        let store = state.db.createObjectStore('commandes', {keyPath: "id"});
        store.createIndex("by_kiosk", "kiosk");
        store.createIndex("by_date", "updated_at");
        store.createIndex("by_offline", "offline");

        store = state.db.createObjectStore('payments', {keyPath: "id"});
        store.createIndex("by_kiosk", "kiosk");
        store.createIndex("by_date", "updated_at");
        store.createIndex("by_offline", "offline");

        store = state.db.createObjectStore('stocks', {keyPath: "id"});
        store.createIndex("by_kiosk", "kiosk");
        store.createIndex("by_date", "updated_at");
        store.createIndex("by_offline", "offline");
        store.createIndex("by_quantite", "quantite_actuelle");

        store = state.db.createObjectStore('pertes', {keyPath: "id"});
        store.createIndex("by_kiosk", "kiosk");
        store.createIndex("by_date", "updated_at");
        store.createIndex("by_offline", "offline");

        store = state.db.createObjectStore('produits', {keyPath: "id"});
        store.createIndex("by_kiosk", "kiosk");
        store.createIndex("by_date", "updated_at");
        store.createIndex("by_offline", "offline");
        store.createIndex("by_quantite", "quantite");
        store.createIndex("by_nom", "nom", {unique: true});

        store = state.db.createObjectStore('clients', {keyPath: "id"});
        store.createIndex("by_kiosk", "kiosk");
        store.createIndex("by_date", "updated_at");
        store.createIndex("by_offline", "offline");

        store = state.db.createObjectStore('deleted_commandes', {keyPath: "id"});
        store.createIndex("by_kiosk", "kiosk");

        store = state.db.createObjectStore('deleted_payments', {keyPath: "id"});
        store.createIndex("by_kiosk", "kiosk");

        store = state.db.createObjectStore('deleted_stocks', {keyPath: "id"});
        store.createIndex("by_kiosk", "kiosk");

        store = state.db.createObjectStore('deleted_pertes', {keyPath: "id"});
        store.createIndex("by_kiosk", "kiosk");

        store = state.db.createObjectStore('validated_stocks', {keyPath: "id"});
        store.createIndex("by_kiosk", "kiosk");

        store = state.db.createObjectStore('validated_pertes', {keyPath: "id"});
        store.createIndex("by_kiosk", "kiosk");

      };

      request.onsuccess = function() {
        this.$store.state.db = request.result;
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

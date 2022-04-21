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
  mounted(){
    var user = JSON.parse(localStorage.getItem('user'));
    var active_kiosk = JSON.parse(localStorage.getItem('active_kiosk'));
    var commandes = JSON.parse(localStorage.getItem('commandes'))
    var payments = JSON.parse(localStorage.getItem('payments'))
    var stocks = JSON.parse(localStorage.getItem('stocks'))
    var pertes = JSON.parse(localStorage.getItem('pertes'))
    var produits = JSON.parse(localStorage.getItem('produits'))
    var clients = JSON.parse(localStorage.getItem('clients'))

    var deleted_commandes = new Set(JSON.parse(localStorage.getItem('deleted_commandes')))
    var deleted_payments = new Set(JSON.parse(localStorage.getItem('deleted_payments')))
    var deleted_stocks = new Set(JSON.parse(localStorage.getItem('deleted_stocks')))
    var validated_stocks = new Set(JSON.parse(localStorage.getItem('validated_stocks')))
    var deleted_pertes = new Set(JSON.parse(localStorage.getItem('deleted_pertes')))
    var validated_pertes = new Set(JSON.parse(localStorage.getItem('validated_pertes')))

    if(user) this.$store.state.user = user;
    if(active_kiosk) this.$store.state.active_kiosk = active_kiosk;
    if(commandes) this.$store.state.commandes = commandes
    if(payments) this.$store.state.payments = payments
    if(stocks) this.$store.state.stocks = stocks
    if(pertes) this.$store.state.pertes = pertes
    if(produits) this.$store.state.produits = produits
    if(clients) this.$store.state.clients = clients

    if(deleted_commandes) this.$store.state.deleted_commandes = deleted_commandes
    if(deleted_payments) this.$store.state.deleted_payments = deleted_payments
    if(deleted_stocks) this.$store.state.deleted_stocks = deleted_stocks
    if(validated_stocks) this.$store.state.validated_stocks = validated_stocks
    if(deleted_pertes) this.$store.state.deleted_pertes = deleted_pertes
    if(validated_pertes) this.$store.state.validated_pertes = validated_pertes
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
    }
  }
};
</script>
<style src="./style.css">
</style>

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
        this.loadData()
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

      var db_commandes = JSON.parse(localStorage.getItem('commandes'))
      var db_payments = JSON.parse(localStorage.getItem('payments'))
      var db_stocks = JSON.parse(localStorage.getItem('stocks'))
      var db_pertes = JSON.parse(localStorage.getItem('pertes'))
      var db_produits = JSON.parse(localStorage.getItem('produits'))
      var db_clients = JSON.parse(localStorage.getItem('clients'))

      var deleted_commandes = new Set(JSON.parse(localStorage.getItem('deleted_commandes')).filter(x => {
        return !!commandes[x]
      }))
      var deleted_payments = new Set(JSON.parse(localStorage.getItem('deleted_payments')).filter(x => {
        return !!payments[x]
      }))
      var deleted_stocks = new Set(JSON.parse(localStorage.getItem('deleted_stocks')).filter(x => {
        return !!stocks[x]
      }))
      var deleted_pertes = new Set(JSON.parse(localStorage.getItem('deleted_pertes')).filter(x => {
        return !!pertes[x]
      }))
      var validated_stocks = new Set(JSON.parse(localStorage.getItem('validated_stocks')).filter(x => {
        return !!stocks[x]
      }))
      var validated_pertes = new Set(JSON.parse(localStorage.getItem('validated_pertes')).filter(x => {
        return !!pertes[x]
      }))

      this.$store.state.db_commandes = db_commandes
      this.$store.state.db_payments = db_payments
      this.$store.state.db_stocks = db_stocks
      this.$store.state.db_pertes = db_pertes
      this.$store.state.db_produits = db_produits
      this.$store.state.db_clients = db_clients

//=====================================================================================

      var commandes = Object.values(db_commandes).filter(x => {
        return x.kiosk == active_kiosk.id
      })
      var payments = Object.values(db_payments).filter(x => !!commandes[x.commande])
      var stocks = Object.values(db_stocks).filter(x => x.kiosk == active_kiosk.id)
      var pertes = Object.values(db_pertes).filter(x => x.kiosk == active_kiosk.id)
      var produits = Object.values(db_produits).filter(x => x.kiosk == active_kiosk.id)
      var clients = Object.values(db_clients).filter(x => x.kiosk == active_kiosk.id)

      this.$store.state.commandes = commandes.sort((x, y) => Math.abs(y.id) - Math.abs(x.id))
      this.$store.state.payments = payments.sort((x, y) => Math.abs(y.id) - Math.abs(x.id))
      this.$store.state.stocks = stocks.sort((x, y) => Math.abs(y.id) - Math.abs(x.id))
      this.$store.state.pertes = pertes.sort((x, y) => Math.abs(y.id) - Math.abs(x.id))
      this.$store.state.produits = produits
      this.$store.state.ibidandazwa = produits.filter(x => x.quantite > 0)
      this.$store.state.clients = clients.sort((x, y) => Math.abs(y.id) - Math.abs(x.id))

      this.$store.state.deleted_commandes = deleted_commandes
      this.$store.state.deleted_payments = deleted_payments
      this.$store.state.deleted_stocks = deleted_stocks
      this.$store.state.deleted_pertes = deleted_pertes
      this.$store.state.validated_stocks = validated_stocks
      this.$store.state.validated_pertes = validated_pertes
    }
  },
  mounted(){
    var user = JSON.parse(localStorage.getItem('user'));
    var active_kiosk = JSON.parse(localStorage.getItem('active_kiosk'));

    if(user) this.$store.state.user = user;
    if(active_kiosk) this.$store.state.active_kiosk = active_kiosk;

    if(!!active_kiosk) this.loadData()
  },
};
</script>
<style src="./style.css">
</style>

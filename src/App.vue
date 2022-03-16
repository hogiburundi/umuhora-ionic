<template>
  <ion-app>
    <div class="logged-in" v-if="!!active_user">
      <ion-router-outlet id="main"/>
      <ion-menu side="start" class="drawer-layout" content-id="main">
        <div class="session-info">
          <div class="img-user">
            <img src="/img/ic_user.png" alt="">
          </div>
          <div>Jonathan NKURUNZIZA</div>
          <div>HOGI Super Market</div>
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
            <ion-item button @click="logout()">
              <ion-icon :src="getIcon('logOutOutline')"/>
              <ion-label>Deconnexion</ion-label>
            </ion-item>
          </ion-list>
          <ion-list lines="none">
            <ion-item-divider>Autres</ion-item-divider>
            <ion-item button @click="openWhatsapp()">
              <ion-icon :src="getIcon('logoWhatsapp')"/>
              <ion-label>Demander l'aide</ion-label>
            </ion-item>
          </ion-list>
        </div>
      </ion-menu>
    </div>
    <LoginForm v-else/>
  </ion-app>
</template>
<script>
import LoginForm from "./components/login_form"
import { useIonRouter, menuController } from '@ionic/vue';
export default {
  components: {
    LoginForm
  },
  data(){
    return {
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
    }
  },
  mounted(){
    var user = JSON.parse(localStorage.getItem('user'));
    var active_kiosk = JSON.parse(localStorage.getItem('active_kiosk'));
    if (user) {
      this.$store.state.user = user;
    }
    if(active_kiosk) {
      this.$store.state.active_kiosk = active_kiosk;
    }
  },
  methods:{
    logout(){
      this.$store.state.user = null
    },
    openWhatsapp(){
    },
    doThings(event){
      menuController.close();
    }
  }
};
</script>
<style src="./style.css">
</style>

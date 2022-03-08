<template>
  <ion-app>
    <div class="logged-in" v-if="!!active_user">
    <ion-tabs @ionTabsWillChange="beforeTabChange" @ionTabsDidChange="afterTabChange">
      <ion-router-outlet/>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="vente" href="/vente">
          <ion-icon :src="getIcon('calendar')"></ion-icon>
          <ion-label>Vente</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="stock" href="/stock">
          <ion-icon :src="getIcon('personCircle')"></ion-icon>
          <ion-label>Stock</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="stats" href="/stats">
          <ion-icon :src="getIcon('personCircle')"></ion-icon>
          <ion-label>Statistiques</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
    </div>
    <LoginForm v-else/>
  </ion-app>
</template>
<script>
import LoginForm from "./components/login_form"
export default {
  components: {
    LoginForm
  },
  // watch:{
  //   "$store.state.user":{
  //     deep:true,
  //     handler(new_val){
  //       if(!!new_val){
  //         localStorage.setItem('user', JSON.stringify(new_val));
  //       } else {
  //         localStorage.removeItem('user')
  //       }
  //     }
  //   },
  //   "$store.state.active_kiosk"(new_val){
  //     if(!!new_val){
  //       localStorage.setItem('active_kiosk', JSON.stringify(new_val));
  //     } else {
  //       localStorage.removeItem('active_kiosk')
  //     }
  //   }
  // },
  // mounted(){
  //   var user = JSON.parse(localStorage.getItem('user'));
  //   var active_kiosk = JSON.parse(localStorage.getItem('active_kiosk'));
  //   if (user) {
  //     this.$store.state.user = user;
  //   }
  //   if(active_kiosk) {
  //     this.$store.state.active_kiosk = active_kiosk;
  //   }
  // },
  methods:{
    beforeTabChange(){

    },
    afterTabChange(){

    },
  }
};
</script>
<style src="./style.css">
</style>

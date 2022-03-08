<template>
  <ion-page>
    <ion-content>
    <ion-col class="center-h ion-padding">
      <ion-col size=12>
        <ion-item>
          <ion-label position="floating">Username</ion-label>
          <ion-input type=text placeholder="Username" v-model="username" clearInput/>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Password</ion-label>
          <ion-input type=password placeholder="Password" v-model="password" clearInput/>
        </ion-item>
        <ion-button expand="block" @click="login">
          CONNEXION
        </ion-button>
      </ion-col>
      <div>
        Mot de passe oublié?
        <a>
          Demandez de l'aide
          <ion-icon :src="getIcon('logo-whatsapp')"></ion-icon>
        </a>
      </div>
    </ion-col>
    </ion-content>
  </ion-page>
</template>

<script>
export default {
  data(){
    return {
      username:"", password:""
    }
  },
  methods:{
    login(){
      this.$store.state.user = {
        username:this.username,
        password:this.password,
      }
    }
  }
}
</script>
<style>
.center-h{
  position: absolute;
  top: 50%;
  transform: translateY(-90%);
}
</style>
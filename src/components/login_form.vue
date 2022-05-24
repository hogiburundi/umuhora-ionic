<template>
  <ion-page>
    <ion-content>
    <ion-col class="center-h ion-padding">
      <ion-col size=12>
        <ion-item class="ion-no-padding">
          <ion-label position="floating">Username</ion-label>
          <ion-input type=text placeholder="Username"
            @IonChange="username=$event.target.value" clearInput/>
        </ion-item>
        <ion-item class="ion-no-padding">
          <ion-label position="floating">Password</ion-label>
          <ion-input type=password placeholder="Password"
            @IonChange="password=$event.target.value" clearInput/>
        </ion-item>
        <ion-label color="danger">{{ logs }}</ion-label>
        <ion-button expand="block" @click="login">
          CONNEXION
        </ion-button>
      </ion-col>
      <div>
        Mot de passe oublié?
        <a @click="openWhatsapp">
          Demandez de l'aide
          <ion-icon :src="getIcon('logoWhatsapp')"></ion-icon>
        </a>
      </div>
    </ion-col>
    </ion-content>
  </ion-page>
</template>

<script>
import CustomPlugins from '../plugins'

export default {
  data(){
    return {
      username:"", password:"", logs:""
    }
  },
  methods:{
    login(){
      this.logs = ""
      axios.post(this.url+"/login/", 
        {"username": this.username, "password":this.password}
      ).then((response) => {
        let active_kiosk = JSON.parse(localStorage.getItem("active_kiosk"))
        if(active_kiosk){
          let ids = response.data.kiosks.map(x => x.id)
          if(!ids.includes(active_kiosk.id)){
            this.logs = `Seul les utilisateurs du kiosk "${active_kiosk.nom}" peuvent se connecter`
            return
          }
        }
        this.$store.state.user = response.data
        this.$store.state.user.username = this.username
      }).catch((error) => {
        console.log(error)
        this.logs = error.response.data
      })
    },
    openWhatsapp(){
      CustomPlugins.openWhatsapp()
    }
  }
}
</script>
<style>
.center-h{
  position: absolute;
  top: 50%;
  transform: translateY(-60%);
}
</style>
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button slot="start" routerLink="/home/stats">
            <ion-icon :src="getIcon('arrowBack')"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>UMUHORA</ion-title>
        <ion-buttons slot="secondary">
          <ion-button>
            <ion-icon slot="icon-only" :icon="getIcon('calendar')"/>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-col>
        <VersementItem v-for="i in 13" :item="{}"/>
      </ion-col>
    </ion-content>
    <ion-fab-button class="todo-fab" @click="">
      <ion-icon :src="getIcon('walletOutline')"></ion-icon>
    </ion-fab-button>
    <ion-footer>
      <div class="group">
        <div>Montant: </div>
        <div>0</div>
      </div>
      <div class="group">
        <div>Payée: </div>
        <div>0</div>
      </div>
      <div class="group">
        <div>Reste: </div>
        <div>0</div>
      </div>
    </ion-footer>
  </ion-page>
</template>
<script>
import VersementItem from "../components/versement_item"
export default {
  components:{VersementItem},
}
</script>
<style scoped>
ion-footer{
  display: flex;
  justify-content: space-between;
  padding: 5px 10px;
}
.group{
  display: flex;
}
ion-fab-button{
  position: fixed;
  right: 10px;
  bottom: 40px;
}
</style>

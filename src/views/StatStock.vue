<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
          <ion-buttons slot="start">
            <ion-button slot="start" routerLink="/home/stats">
              <ion-icon :src="getIcon('arrowBack')"></ion-icon>
            </ion-button>
          </ion-buttons>
        <ion-title>URUFATANAMENDE</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-col>
        <StatStockItem v-for="i in 13" :item="{}"/>
      </ion-col>
    </ion-content>
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
import StatStockItem from "../components/stat_stock_item"
export default {
  components:{StatStockItem},
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
</style>

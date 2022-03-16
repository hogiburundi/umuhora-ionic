<template>
<ion-page>
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
            <ion-icon slot="icon-only" :icon="getIcon('calendar')"
              @click="showDateDialog"/>
          </ion-button>
        </ion-buttons>
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
  <DialogDateFilter :active="date_shown" @close="date_shown=false"/>
</ion-page>
</template>

<script>
import StatStockItem from "../components/stat_stock_item"

import DialogDateFilter from "../components/dialog_date_filter"

export default {
  components:{StatStockItem,},
  data(){
    return {
      date_shown:false
    }
  },
  methods:{
    showDateDialog(){
      this.date_shown = true
    }
  }
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

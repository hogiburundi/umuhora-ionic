<template>
  <ion-page>
    <ion-col>
      <ion-col class="menu" routerLink="/commande">
        <div>HISTORIQUE DES VENTES</div>
        <ion-icon :src="getIcon('bagCheckOutline')"/>
        <ion-button routerLink="/commande">VOIR LES VENTES</ion-button>
      </ion-col>
      <ion-col class="menu">
        <div>HISTORIQUE DES STOCKS</div>
        <ion-icon :src="getIcon('pieChartOutline')"/>
        <ion-button>VOIR LES STOCKS</ion-button>
      </ion-col>
      <ion-col class="menu">
        <div>HISTORIQUE DES DETTES</div>
        <ion-icon :src="getIcon('receiptOutline')"/>
        <ion-button>VOIR LES DETTES</ion-button>
      </ion-col>
      <ion-col class="menu">
        <div>HISTORIQUE DES PERTES</div>
        <ion-icon :src="getIcon('barChartOutline')"/>
        <ion-button>VOIR LES PERTES</ion-button>
      </ion-col>
      <ion-col class="menu">
        <div>HISTORIQUE DES CLIENTÈLES</div>
        <ion-icon :src="getIcon('peopleOutline')"/>
        <ion-button>VOIR LES CLIENTS</ion-button>
      </ion-col>
      <ion-col class="menu">
        <div>VERSEMENT</div>
        <ion-icon :src="getIcon('walletOutline')"/>
        <ion-button>LES VERSEMENTS</ion-button>
      </ion-col>
    </ion-col>
    <ion-tab-bar slot="bottom">
      <ion-tab-button tab="vente" href="/home/vente">
        <ion-icon :src="getIcon('cartOutline')"></ion-icon>
        <ion-label>Vente</ion-label>
      </ion-tab-button>
      <ion-tab-button tab="stock" href="/home/stock">
        <ion-icon :src="getIcon('basketOutline')"></ion-icon>
        <ion-label>Stock</ion-label>
      </ion-tab-button>
      <ion-tab-button tab="stats" href="/home/stats">
        <ion-icon :src="getIcon('statsChart')"></ion-icon>
        <ion-label>Statistiques</ion-label>
      </ion-tab-button>
    </ion-tab-bar>
  </ion-page>
</template>
<script>
export default {
  data(){
    return {
    }
  },
}
</script>
<style scoped>
ion-col{
  max-height: 100%;
  overflow-y: auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 5px;
  grid-row-gap: 5px;
  background: #eee;
  align-items: flex-start;
  align-content: flex-start;
}
.menu{
  height: 160px;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 5px;
}
.menu ion-icon{
  flex-grow: 1;
  width: 100%;
  color: var(--ion-color-primary);
}
</style>
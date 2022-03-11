<template>
  <ion-page>
    <ion-col>
      <VenteItem v-for="i in 12" :item="default_vente"/>
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
import VenteItem from "../components/vente_item"
export default {
  data(){
    return {
      default_vente:{
        id:1, quantite:5, nom:"ibiharage", prix_vente:2000,
        unite_sortante:"kg"
      }
    }
  },
  components:{VenteItem},
}
</script>
<style scoped>
ion-col{
  max-height: 100%;
  overflow-y: auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: flex-start;
  align-content: flex-start;
}
</style>
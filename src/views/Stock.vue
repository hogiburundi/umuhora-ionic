<template>
  <ion-page>
    <ion-col>
      <StockItem v-for="i in 13" :item="default_vente"/>
    </ion-col>
  </ion-page>
</template>
<script>
import StockItem from "../components/stock_item"
export default {
  data(){
    return {
      default_vente:{
        id:1, quantite:5, nom:"ibiharage", prix_vente:2000,
        unite_sortante:"kg"
      }
    }
  },
  components:{StockItem},
}
</script>
<style scoped>
ion-col{
  max-height: 100%;
  overflow-y: auto;
}
</style>